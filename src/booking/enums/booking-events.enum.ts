export enum BookingEvents {
  CREATED = "booking.created",
  ACCEPTED = "booking.accepted",
  ASSIGNED = "booking.assigned",

  WORKER_ACCEPTED = "booking.worker.accepted",
  WORKER_REJECTED = "booking.worker.rejected",
  WORKER_STARTED = "booking.worker.started",
  WORKER_COMPLETED = "booking.worker.completed",

  ALL_WORKERS_STARTED = "booking.all-workers.started",
  ALL_WORKERS_COMPLETED = "booking.all-workers.completed",

  FINALIZED = "booking.finalized",
  PARTIALLY_PAID = "booking.partially-paid",
  PAID = "booking.paid",
  REFUNDED = "booking.refunded",

  CANCELLED_BY_CUSTOMER = "booking.cancelled.customer",
  CANCELLED_BY_WORKER = "booking.cancelled.worker",
  CANCELLEDLED_BY_PLATFORM = "booking.cancelled.platform",

  REVIEWED = "booking.reviewed",
  EXPIRED = "booking.expired"
}
