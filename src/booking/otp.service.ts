import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { BookingOTP, BookingOTPDocument } from "./schemas/booking-otp.schema";
import { OTPPurpose } from "./enums/otp-purpose.enum";

@Injectable()
export class OTPService {
    private readonly OTP_LENGTH = 6;
    private readonly OTP_EXPIRY_MINUTES = 5;
    private readonly MAX_ATTEMPTS = 3;
    private readonly SALT_ROUNDS = 10;

    constructor(
        @InjectModel(BookingOTP.name)
        private readonly otpModel: Model<BookingOTPDocument>
    ) { }

    /**
     * Generate a random 6-digit OTP
     */
    private generateOTPCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    /**
     * Generate and store OTP for a booking
     */
    async generateOTP(
        bookingId: Types.ObjectId,
        purpose: OTPPurpose
    ): Promise<{ otp: string; expiresAt: Date }> {
        // Invalidate any existing OTP for this booking and purpose
        await this.otpModel.updateMany(
            {
                bookingId,
                purpose,
                isUsed: false
            },
            {
                $set: { isUsed: true }
            }
        );

        // Generate new OTP
        const otpCode = this.generateOTPCode();
        const otpHash = await bcrypt.hash(otpCode, this.SALT_ROUNDS);
        const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);

        // Store OTP
        await this.otpModel.create({
            bookingId,
            purpose,
            otpHash,
            expiresAt,
            isUsed: false,
            attempts: 0
        });

        return {
            otp: otpCode,
            expiresAt
        };
    }

    /**
     * Verify OTP for a booking
     */
    async verifyOTP(
        bookingId: Types.ObjectId,
        otpCode: string,
        purpose: OTPPurpose,
        workerId?: Types.ObjectId
    ): Promise<boolean> {
        // Find the active OTP
        const otpRecord = await this.otpModel.findOne({
            bookingId,
            purpose,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            throw new NotFoundException("OTP not found or expired");
        }

        // Check if max attempts exceeded
        if (otpRecord.attempts >= this.MAX_ATTEMPTS) {
            throw new BadRequestException("Maximum OTP verification attempts exceeded");
        }

        // Verify OTP
        const isValid = await bcrypt.compare(otpCode, otpRecord.otpHash);

        if (!isValid) {
            // Increment attempts
            await this.otpModel.updateOne(
                { _id: otpRecord._id },
                { $inc: { attempts: 1 } }
            );
            throw new BadRequestException("Invalid OTP");
        }

        // Mark OTP as used
        const updateData: any = { isUsed: true };

        // If workerId is provided, add to appliedWorkers array
        if (workerId) {
            updateData.$addToSet = { appliedWorkers: workerId };
        }

        await this.otpModel.updateOne(
            { _id: otpRecord._id },
            updateData
        );

        return true;
    }

    /**
     * Check if OTP exists and is valid
     */
    async isOTPValid(
        bookingId: Types.ObjectId,
        purpose: OTPPurpose
    ): Promise<boolean> {
        const otpRecord = await this.otpModel.findOne({
            bookingId,
            purpose,
            isUsed: false,
            expiresAt: { $gt: new Date() }
        });

        return !!otpRecord;
    }

    /**
     * Invalidate all OTPs for a booking
     */
    async invalidateOTPs(bookingId: Types.ObjectId): Promise<void> {
        await this.otpModel.updateMany(
            { bookingId, isUsed: false },
            { $set: { isUsed: true } }
        );
    }
}
