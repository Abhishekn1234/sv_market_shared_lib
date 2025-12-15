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
exports.UserGroupResponseDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserGroupResponseDTO {
    constructor(group) {
        this._id = group._id.toString();
        this.name = group.name;
        this.modules = group.modules;
        this.createdAt = group.createdAt;
        this.updatedAt = group.updatedAt;
    }
}
exports.UserGroupResponseDTO = UserGroupResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGci01....' }),
    __metadata("design:type", String)
], UserGroupResponseDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin' }),
    __metadata("design:type", String)
], UserGroupResponseDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object], description: 'Array of modules assigned to this user group' }),
    __metadata("design:type", Array)
], UserGroupResponseDTO.prototype, "modules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], UserGroupResponseDTO.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], UserGroupResponseDTO.prototype, "updatedAt", void 0);
//# sourceMappingURL=userGroupResponse.dto.js.map