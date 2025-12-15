import mongoose, { HydratedDocument } from "mongoose";
import { KycStatus } from "../../enums/kycStatus.enum";
export type UserEntityDocument = HydratedDocument<UserEntity>;
export declare class UserEntity {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    isVerified: boolean;
    kycStatus: KycStatus;
    address: string;
    profilePictureUrl: string;
    profilePicturePublicId: string;
    documents: string[];
    role: string;
}
export declare const UserSchema: mongoose.Schema<UserEntity, mongoose.Model<UserEntity, any, any, any, mongoose.Document<unknown, any, UserEntity, any, mongoose.DefaultSchemaOptions> & UserEntity & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any, UserEntity>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    fullName?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    phone?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    kycStatus?: mongoose.SchemaDefinitionProperty<KycStatus, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    address?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    profilePictureUrl?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    profilePicturePublicId?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    documents?: mongoose.SchemaDefinitionProperty<string[], UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    role?: mongoose.SchemaDefinitionProperty<string, UserEntity, mongoose.Document<unknown, {}, UserEntity, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<UserEntity & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, UserEntity>;
