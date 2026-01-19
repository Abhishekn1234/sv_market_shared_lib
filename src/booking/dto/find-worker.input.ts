import { Types } from "mongoose";
import { WorkerStatus } from "../../worker";

export class FIndWorkerInput {
    lat: number;
    lng: number;

    serviceTierId?: Types.ObjectId;
    categoryId?: Types.ObjectId;

    status?: WorkerStatus;
}