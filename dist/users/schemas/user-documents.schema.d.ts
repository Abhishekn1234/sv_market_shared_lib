import { HydratedDocument } from "mongoose";
export type DocumentEntityDocument = HydratedDocument<DocumentEntity>;
export declare class DocumentEntity {
    category: string;
    documentType: string;
    fileName: string;
    filePath: string;
    fileType: string;
}
export declare const DocumentSchema: import("mongoose").Schema<DocumentEntity, import("mongoose").Model<DocumentEntity, any, any, any, import("mongoose").Document<unknown, any, DocumentEntity, any, import("mongoose").DefaultSchemaOptions> & DocumentEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any, DocumentEntity>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    category?: import("mongoose").SchemaDefinitionProperty<string, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    documentType?: import("mongoose").SchemaDefinitionProperty<string, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fileName?: import("mongoose").SchemaDefinitionProperty<string, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    filePath?: import("mongoose").SchemaDefinitionProperty<string, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    fileType?: import("mongoose").SchemaDefinitionProperty<string, DocumentEntity, import("mongoose").Document<unknown, {}, DocumentEntity, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<DocumentEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, DocumentEntity>;
