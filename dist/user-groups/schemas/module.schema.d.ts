import mongoose, { HydratedDocument } from "mongoose";
export type ModuleEntityDocument = HydratedDocument<ModuleEntity>;
export declare class ModuleEntity {
    module: string;
    moduleLanguageKey: string;
    sort: number;
    parent: string | null;
}
export declare const ModuleSchema: mongoose.Schema<ModuleEntity, mongoose.Model<ModuleEntity, any, any, any, mongoose.Document<unknown, any, ModuleEntity, any, mongoose.DefaultSchemaOptions> & ModuleEntity & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, ModuleEntity>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ModuleEntity, mongoose.Document<unknown, {}, ModuleEntity, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ModuleEntity & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    module?: mongoose.SchemaDefinitionProperty<string, ModuleEntity, mongoose.Document<unknown, {}, ModuleEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ModuleEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    moduleLanguageKey?: mongoose.SchemaDefinitionProperty<string, ModuleEntity, mongoose.Document<unknown, {}, ModuleEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ModuleEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    sort?: mongoose.SchemaDefinitionProperty<number, ModuleEntity, mongoose.Document<unknown, {}, ModuleEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ModuleEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    parent?: mongoose.SchemaDefinitionProperty<string, ModuleEntity, mongoose.Document<unknown, {}, ModuleEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<ModuleEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, ModuleEntity>;
