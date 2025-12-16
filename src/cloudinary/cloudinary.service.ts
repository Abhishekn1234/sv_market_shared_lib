import { BadRequestException, Injectable } from "@nestjs/common";
import { v2 as Cloudinary, UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File, folder: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
        if (!file) {
            throw new BadRequestException('File is missing');
        }

        return new Promise((resolve, reject) => {
            Cloudinary.uploader.upload_stream({
                folder,
                resource_type: 'auto'
            }, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result);
            }).end(file.buffer);
        })
    }

    async deleteFile(publicId: string) {
        return new Promise((resolve, reject) => {
            Cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }

    async deleteEmptyFolder(folderName:string){
        return new Promise((resolve,reject)=>{
            Cloudinary.api.delete_folder(folderName,(error,result)=>{
                if(error) return reject(error);
                resolve(result);
            })
        })
    }

}