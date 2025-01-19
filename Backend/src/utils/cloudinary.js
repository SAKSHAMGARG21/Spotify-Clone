import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (localFilePath, folder = process.env.CLOUDINARY_FOLDER_NAME) => {
    try {
        if (!localFilePath) return null;
        const options ={folder};
        options.resource_type='auto';
        const res= await cloudinary.uploader.upload(localFilePath,options);
        console.log("File uploaded on cloudinary :",res.secure_url);
        fs.unlinkSync(localFilePath);
        return res.secure_url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading on cloudinary ",error);
        return null;
    }
}

export const deleteFromCloudinary=async(cloudpath)=>{
    try {
        if (!cloudpath) return null;
        const res= await cloudinary.uploader.destroy(cloudpath,{resource_type:'auto'});
        console.log("File deleted from cloudinary successfully",res);
        return res;
    } catch (error) {   
        console.log("Error in deleting file on cloudinary ",error);
        return null;
    }
}