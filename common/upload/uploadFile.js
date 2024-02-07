const { RES, STATUS } = require("../common");

const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: "do7fwlqpn",
    api_key: "184276342363441",
    api_secret: "djMIkbWThwKF2A7mu3CO52c69FA",
    secure: true
});
console.log(cloudinary.config, "in cloudinary ")
const uploadImage = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "images"
        });
        console.log("in here in upoad images ")
        console.log(result, "here in result ");
        return info = result.public_id
    } catch (error) {
        console.error(error);
        return error
    }
};
const deleteImage = async (res, imagekey) => {
    try {
        let image = await cloudinary.uploader.destroy(imagekey);
        return RES(res, STATUS.OK, "Successfully deleted", image);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error deleting image");
    }
};
const upadteimage = async (res, imagekey, imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            public_id: imagekey
        });
        return RES(res, STATUS.OK, "IMAGE updated ", result);
    } catch (error) {
        console.error(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "no image UPloaded ");
    }
};
const testUserUpload = async (imagePath) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: "videos"
        });
        console.log("In uploadVideo function");
        console.log(result, "Result for video upload");
        return result.public_id;
    } catch (error) {
        console.error("Error uploading video:", error);
        throw error;
    }
};

module.exports = { uploadImage, deleteImage, upadteimage, testUserUpload }

// cloudinary.uploader.upload('path_to_new_image.jpg', {
//     public_id: 'existing_public_id',  
//     overwrite: true  
// })
//     .then(uploadResult => {
//         console.log(uploadResult);
//         // The updated image URL will be available in uploadResult.url
//     })
//     .catch(error => {
//         console.error(error);
//     });

// const cloudinary = require("cloudinary").v2;
// const bcrypt = require('bcrypt'); // Assuming you've imported bcrypt for password hashing

// Configure Cloudinary
// cloudinary.config({
//     cloud_name: "your_cloud_name",
//     api_key: "your_api_key",
//     api_secret: "your_api_secret",
//     secure: true
// });

// 
// form.parse(req, async (error, fields, files) => {
//     if (error) {
//         console.error("Error parsing form:", error);
//         return reject(new Error("Error occurred during parsing the Data"));
//     }

//     console.log("Files:", files); // Log files object to inspect its contents

//     if (files.profilePicture && Array.isArray(files.profilePicture) && files.profilePicture.length > 0) {
//         const uploadedFile = files.profilePicture[0];
//         const imagePath = uploadedFile.filepath;
//         console.log("Here in image path:", imagePath);

//         // Now you can use imagePath in your further processing

//         // For example, you can upload the image to Cloudinary
//         const public_id = await uploadImage(imagePath);
//         console.log("Here in publicID:", public_id);

//         // Continue with your code
//     } else {
//         console.error("No profilePicture file found in the form data");
//         return reject(new Error("No profilePicture file found"));
//     }
// });

// 