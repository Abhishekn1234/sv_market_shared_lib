import mongoose, { HydratedDocument } from "mongoose";
export type UserGroupDocument = HydratedDocument<UserGroup>;
export declare class UserGroup {
    name: string;
    modules: string[];
}
export declare const UserGroupSchema: mongoose.Schema<UserGroup, mongoose.Model<UserGroup, any, any, any, mongoose.Document<unknown, any, UserGroup, any, mongoose.DefaultSchemaOptions> & UserGroup & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, UserGroup>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserGroup, mongoose.Document<unknown, {}, UserGroup, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserGroup & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, UserGroup, mongoose.Document<unknown, {}, UserGroup, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserGroup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    modules?: mongoose.SchemaDefinitionProperty<string[], UserGroup, mongoose.Document<unknown, {}, UserGroup, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserGroup & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, UserGroup>;
