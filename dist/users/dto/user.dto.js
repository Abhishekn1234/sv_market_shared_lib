"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const userGroupResponse_dto_1 = require("../../user-groups/dto/userGroupResponse.dto");
const user_document_dto_1 = require("./user-document.dto");
const enums_1 = require("../../enums");
class UserDTO {
    constructor(user) {
        this._id = user._id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.phone = user.phone;
        this.isVerified = user.isVerified;
        this.kycStatus = user.kycStatus;
        this.address = user.address;
        this.profilePictureUrl = user.profilePictureUrl;
        this.profilePicturePublicId = user.profilePicturePublicId;
        this.documents = user.documents;
        this.role = user.role;
    }
}
exports.UserDTO = UserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439011' }),
    __metadata("design:type", String)
], UserDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe' }),
    __metadata("design:type", String)
], UserDTO.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], UserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+1234567890' }),
    __metadata("design:type", String)
], UserDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserDTO.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'APPROVED', enum: enums_1.KycStatus }),
    __metadata("design:type", String)
], UserDTO.prototype, "kycStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123 Main Street, City, State' }),
    __metadata("design:type", String)
], UserDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/profile.jpg' }),
    __metadata("design:type", String)
], UserDTO.prototype, "profilePictureUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cloudinary_public_id_123' }),
    __metadata("design:type", String)
], UserDTO.prototype, "profilePicturePublicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [user_document_dto_1.UserDocumentDTO] }),
    __metadata("design:type", Array)
], UserDTO.prototype, "documents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: userGroupResponse_dto_1.UserGroupResponseDTO }),
    __metadata("design:type", userGroupResponse_dto_1.UserGroupResponseDTO)
], UserDTO.prototype, "role", void 0);
//# sourceMappingURL=user.dto.js.map