import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { BookingEvents } from "../enums/booking-events.enum";
import { BookingActivityType } from "../enums/booking-activity-type.enum";
import { BookingActivityService } from "../booking-activity.service";

@Injectable()
export class BookingActivityListener {
    constructor(
        private readonly activityService: BookingActivityService
    ) { }
    EVENT_TO_ACTIVITY_MAP: Partial<Record<BookingEvents, BookingActivityType>> = {
        [BookingEvents.CREATED]: BookingActivityType.CREATED,
        [BookingEvents.ACCEPTED]: BookingActivityType.ACCEPTED,
        [BookingEvents.ASSIGNED]: BookingActivityType.ASSIGNED,

        [BookingEvents.WORKER_ACCEPTED]: BookingActivityType.WORKER_ACCEPTED,
        [BookingEvents.WORKER_REJECTED]: BookingActivityType.WORKER_REJECTED,
        [BookingEvents.WORKER_STARTED]: BookingActivityType.WORKER_STARTED,
        [BookingEvents.WORKER_COMPLETED]: BookingActivityType.WORKER_COMPLETED,

        [BookingEvents.ALL_WORKERS_STARTED]: BookingActivityType.ALL_WORKERS_STARTED,
        [BookingEvents.ALL_WORKERS_COMPLETED]: BookingActivityType.ALL_WORKERS_COMPLETED,

        [BookingEvents.FINALIZED]: BookingActivityType.FINALIZED,
        [BookingEvents.PAID]: BookingActivityType.PAID,
        [BookingEvents.REFUNDED]: BookingActivityType.REFUNDED,

        [BookingEvents.CANCELLED_BY_CUSTOMER]: BookingActivityType.CANCELLED_BY_CUSTOMER,
        [BookingEvents.CANCELLED_BY_WORKER]: BookingActivityType.CANCELLED_BY_WORKER,
        [BookingEvents.CANCELLEDLED_BY_PLATFORM]: BookingActivityType.CANCELLED_BY_PLATFORM,

        [BookingEvents.REVIEWED]: BookingActivityType.REVIEWED,
        [BookingEvents.EXPIRED]: BookingActivityType.EXPIRED
    };


    @OnEvent('booking.*')
    async handleBookingEvent(event: any) {
        const activityType = this.EVENT_TO_ACTIVITY_MAP[event.eventName];
        if (!activityType){ 
            return;
        }
        await this.activityService.logActivity(event.bookingId, event.actorId, activityType);
    }
}

