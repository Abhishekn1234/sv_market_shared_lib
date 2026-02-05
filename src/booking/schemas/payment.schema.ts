import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BookingEntity } from "./booking.schema";
import { InvoiceEntity } from "./invoice.schema";
import { UserEntity } from "../../users";
import { BaseTimestamp } from "../../interfaces";

export type PaymentDocument = HydratedDocument<PaymentEntity & BaseTimestamp>

export enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}

export enum PaymentMethod {
    CARD = "CARD",
    UPI = "UPI",
    WALLET = "WALLET",
    NET_BANKING = "NET_BANKING",
    CASH = "CASH"
}

@Schema({ collection: "payments", timestamps: true, versionKey: false })
export class PaymentEntity {
    @Prop({ required: true, type: Types.ObjectId, ref: BookingEntity.name })
    bookingId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: InvoiceEntity.name })
    invoiceId: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: UserEntity.name })
    userId: Types.ObjectId;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    currency: string;

    @Prop({ required: true, enum: PaymentMethod })
    paymentMethod: PaymentMethod;

    @Prop()
    transactionId?: string;

    @Prop()
    gatewayOrderId?: string;

    @Prop({ type: Object })
    gatewayResponse?: any;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Prop()
    failureReason?: string;

    @Prop({ required: true })
    initiatedAt: Date;

    @Prop()
    completedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentEntity);

// Create indexes for faster lookups
PaymentSchema.index({ bookingId: 1 });
PaymentSchema.index({ invoiceId: 1 });
PaymentSchema.index({ userId: 1 });
PaymentSchema.index({ transactionId: 1 });
