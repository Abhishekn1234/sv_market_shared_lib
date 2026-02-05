import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { BookingEntity } from "./booking.schema";
import { BaseTimestamp } from "../../interfaces";

export type InvoiceDocument = HydratedDocument<InvoiceEntity & BaseTimestamp>

export enum InvoiceStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED"
}

@Schema({ collection: "invoices", timestamps: true, versionKey: false })
export class InvoiceEntity {
    @Prop({ required: true, type: Types.ObjectId, ref: BookingEntity.name })
    bookingId: Types.ObjectId;

    @Prop({ required: true, unique: true })
    invoiceNumber: string;

    @Prop({ required: true })
    originalAmount: number;

    @Prop({ required: true })
    finalAmount: number;

    @Prop({ required: true })
    workerPoolAmount: number;

    @Prop({ required: true })
    commissionAmount: number;

    @Prop({ required: true })
    currency: string;

    @Prop()
    actualWorkHours?: number;

    @Prop()
    actualWorkDays?: number;

    @Prop({ required: true, enum: InvoiceStatus, default: InvoiceStatus.PENDING })
    status: InvoiceStatus;

    @Prop({ required: true })
    generatedAt: Date;

    @Prop()
    paidAt?: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceEntity);

// Create index on bookingId for faster lookups
InvoiceSchema.index({ bookingId: 1 });

