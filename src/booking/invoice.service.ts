import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { InvoiceEntity, InvoiceDocument, InvoiceStatus } from "./schemas/invoice.schema";
import { BookingEntity, BookingDocument } from "./schemas/booking.schema";
import { ServiceEntity, ServiceDocument } from "../services";
import { PricingMode } from "./enums";
import { CommissionType } from "../enums";

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(InvoiceEntity.name)
        private readonly invoiceModel: Model<InvoiceDocument>,
        @InjectModel(BookingEntity.name)
        private readonly bookingModel: Model<BookingDocument>,
        @InjectModel(ServiceEntity.name)
        private readonly serviceModel: Model<ServiceDocument>
    ) { }

    /**
     * Generate unique invoice number
     */
    private generateInvoiceNumber(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `INV-${timestamp}-${random}`;
    }

    /**
     * Calculate final amount based on actual work duration
     */
    private calculateFinalAmount(
        booking: BookingDocument & { service: any },
        actualWorkHours?: number,
        actualWorkDays?: number
    ): {
        finalAmount: number;
        workerPoolAmount: number;
        commissionAmount: number;
    } {
        const service = booking.service;
        const tier = service.pricingTiers.find(
            (t: any) => t.tierId.toString() === booking.serviceTierId.toString()
        );

        if (!tier) {
            throw new NotFoundException("Service tier not found");
        }

        let finalAmount = 0;

        // Calculate based on pricing mode
        if (booking.pricingMode === PricingMode.HOURLY) {
            if (!actualWorkHours || actualWorkHours <= 0) {
                throw new BadRequestException("Actual work hours required for hourly pricing");
            }

            if (!tier.HOURLY) {
                throw new BadRequestException("Hourly pricing not available for this tier");
            }

            finalAmount = tier.HOURLY.ratePerHour * actualWorkHours * (booking.actualWorkersCount || booking.numberOfWorkers);
        } else if (booking.pricingMode === PricingMode.PER_DAY) {
            if (!actualWorkDays || actualWorkDays <= 0) {
                throw new BadRequestException("Actual work days required for daily pricing");
            }

            if (!tier.PER_DAY) {
                throw new BadRequestException("Daily pricing not available for this tier");
            }

            finalAmount = tier.PER_DAY.ratePerDay * actualWorkDays * (booking.actualWorkersCount || booking.numberOfWorkers);
        }

        // Calculate commission
        const { commissionType, commissionValue } = tier;
        let commissionAmount = 0;

        if (commissionType === CommissionType.PERCENTAGE) {
            commissionAmount = (finalAmount * commissionValue) / 100;
        } else {
            commissionAmount = commissionValue;
        }

        const workerPoolAmount = finalAmount - commissionAmount;

        if (workerPoolAmount < 0) {
            throw new BadRequestException("Invalid pricing configuration");
        }

        return {
            finalAmount,
            workerPoolAmount,
            commissionAmount
        };
    }

    /**
     * Generate invoice for a booking
     */
    async generateInvoice(bookingId: Types.ObjectId): Promise<InvoiceDocument> {
        // Check if invoice already exists
        const existingInvoice = await this.invoiceModel.findOne({ bookingId });
        if (existingInvoice) {
            return existingInvoice;
        }

        // Fetch booking with service details
        const booking = await this.bookingModel
            .findById(bookingId)
            .populate({
                path: 'serviceId',
                model: ServiceEntity.name
            }) as any;

        if (!booking) {
            throw new NotFoundException("Booking not found");
        }

        if (!booking.actualWorkHours && !booking.actualWorkDays) {
            throw new BadRequestException("Actual work duration not recorded");
        }

        // Calculate final amounts
        const { finalAmount, workerPoolAmount, commissionAmount } = this.calculateFinalAmount(
            booking,
            booking.actualWorkHours,
            booking.actualWorkDays
        );

        // Create invoice
        const invoice = await this.invoiceModel.create({
            bookingId,
            invoiceNumber: this.generateInvoiceNumber(),
            originalAmount: booking.amount,
            finalAmount,
            workerPoolAmount,
            commissionAmount,
            currency: booking.currency,
            actualWorkHours: booking.actualWorkHours,
            actualWorkDays: booking.actualWorkDays,
            status: InvoiceStatus.PENDING,
            generatedAt: new Date()
        });

        // Update booking with invoice reference
        await this.bookingModel.updateOne(
            { _id: bookingId },
            { $set: { invoiceId: invoice._id } }
        );

        return invoice;
    }

    /**
     * Get invoice by booking ID
     */
    async getInvoiceByBookingId(bookingId: Types.ObjectId): Promise<InvoiceDocument | null> {
        return await this.invoiceModel.findOne({ bookingId }).populate({
            path: 'bookingId',
            model: BookingEntity.name
        });
    }

    /**
     * Get invoice by invoice ID
     */
    async getInvoiceById(invoiceId: Types.ObjectId): Promise<InvoiceDocument | null> {
        return await this.invoiceModel.findById(invoiceId).populate({
            path: 'bookingId',
            model: BookingEntity.name
        });
    }

    /**
     * Mark invoice as paid
     */
    async markInvoiceAsPaid(invoiceId: Types.ObjectId): Promise<InvoiceDocument> {
        const invoice = await this.invoiceModel.findByIdAndUpdate(
            invoiceId,
            {
                $set: {
                    status: InvoiceStatus.PAID,
                    paidAt: new Date()
                }
            },
            { new: true }
        );

        if (!invoice) {
            throw new NotFoundException("Invoice not found");
        }

        return invoice;
    }

    /**
     * Cancel invoice
     */
    async cancelInvoice(invoiceId: Types.ObjectId): Promise<InvoiceDocument> {
        const invoice = await this.invoiceModel.findByIdAndUpdate(
            invoiceId,
            { $set: { status: InvoiceStatus.CANCELLED } },
            { new: true }
        );

        if (!invoice) {
            throw new NotFoundException("Invoice not found");
        }

        return invoice;
    }
}
