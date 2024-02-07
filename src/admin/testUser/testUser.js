const { RES, STATUS } = require("../../../common/common")
const testUser = require("../../../db/models/TestUser")
const bcrypt = require("bcrypt")
const formidable = require("formidable")
const { processFormFields, createToken } = require("../../../utils/helper")
const { uploadImage, deleteImage, testUserUpload } = require("../../../common/upload/uploadFile")
const { Welcome, forgotpass, congrats } = require("../../../common/emailTemplate")
const sendMail = require("../../../common/sendMail/sendMail")
const PasswordResetToken = require("../../../db/models/PasswordResetToken")


// incoming from ()
//  new promise
// from parse with req and err , feild , files 
// convert all fieild to single
// give acces to url which might be in array 
const CreateUser = async (req, res) => {
    const form = new formidable.IncomingForm();
    try {
        const returndata = await new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    return reject(new Error("error occured during parsing the Data "))
                }
                console.log(files, "files content ")
                const processedData = processFormFields(fields)
                const { userName, email, LastName, password } = processedData
                const hashedPassword = await bcrypt.hash(password, 10)
                let profilePictureUrl = "";
                if (files.profilePicture && Array.isArray(files.profilePicture) && files.profilePicture.length > 0) {

                    const uploadedFile = files.profilePicture[0];
                    const imagePath = uploadedFile.filepath
                    console.log(imagePath, "here in image path")
                    const public_id = await testUserUpload(imagePath)
                    console.log(" here in publicID ", public_id)
                    profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`
                }
                const find = await testUser.findOne({
                    where: { email },
                    attributes: { exclude: ["password"] }
                })
                if (find) {
                    return RES(res, STATUS.BAD_REQUEST, "EMAIL HAS ALREADY TAKEN ")
                }
                const newUser = await testUser.create({
                    userName,
                    email,
                    LastName,
                    password: hashedPassword,
                    profilePicture: profilePictureUrl
                })
                return RES(res, STATUS.OK, "CREATED", newUser)
            })
        })
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}
const DeleProfile = async (req, res) => {
    const { id } = req.params;
    console.log(id, "in user id for deleting profile picture");
    try {
        const user = await testUser.findByPk(id);
        if (!user) {
            return RES(res, STATUS.NOT_FOUND, "User not found");
        }
        if (!user.profilePicture) {
            return RES(res, STATUS.NOT_FOUND, "User does not have a profile picture");
        }
        const publicIdMatch = user.profilePicture.match(/\/image\/upload\/(.+)$/);
        const publicId = publicIdMatch ? publicIdMatch[1] : null;
        if (publicId) {
            await deleteImage(res, publicId);
            user.profilePicture = "";
            await user.save();
        }
        return RES(res, STATUS.OK, "Profile picture deleted successfully");
    } catch (error) {
        console.error("Error deleting profile picture:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR, "Error deleting profile picture");
    }
}
const updateImage = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return RES(res, STATUS.NOT_FOUND, "User ID not provided");
    }
    const form = new formidable.IncomingForm();
    try {
        const returndata = await new Promise((resolve, reject) => {
            form.parse(req, async (error, fields, files) => {
                if (error) {
                    return reject(new Error("Error occurred during parsing the data"));
                }
                const user = await testUser.findByPk(id);
                if (!user) {
                    return reject(new Error("User not found"));
                }
                let profilePictureUrl = user.profilePicture || "";

                if (files.profilePicture && Array.isArray(files.profilePicture) && files.profilePicture.length > 0) {
                    const uploadedFile = files.profilePicture[0];
                    const imagePath = uploadedFile.filepath;
                    const public_id = await uploadImage(imagePath);
                    profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;

                    if (user.profilePicture) {
                        const publicIdMatch = user.profilePicture.match(/\/image\/upload\/(.+)$/);
                        const oldPublicId = publicIdMatch ? publicIdMatch[1] : null;
                        if (oldPublicId) {
                            await deleteImage(res, oldPublicId);
                        }
                    }
                }
                user.profilePicture = profilePictureUrl;
                await user.save();
                return RES(res, STATUS.OK, "Profile picture updated successfully", user)
                // return resolve(RES(res, STATUS.OK, "Profile picture updated successfully", user));
            });
        });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)

    }
};


// app.post('/api/users/:id/updateimage', updateImage);

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const find = await testUser.findOne({
            where: { email: email }
        });
        if (!find) {
            return RES(res, STATUS.NOT_FOUND);
        }
        const userVerify = await bcrypt.compare(password, find.password);
        if (!userVerify) {
            return RES(res, STATUS.UNAUTHORIZED, "Password doesn't match");
        }
        const token = {
            id: find.id,
            email: find.email
        };
        const tokenn = createToken(token);
        res.json({ tokenn })
        console.log(tokenn, "here in token ");
        // let emailContent = {
        //     name: find.email,
        //     // title: find.email,
        //     // message: "hihih"
        // };
        // // json.toString(Welcome(messageContent))
        // const { title, description } = Welcome(emailContent)
        // console.log(emailContent, "here in email content ")
        // const info = await sendMail(find.email, title, description);
        // return RES(res, STATUS.OK, "CREATED TOKEN ", info);
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
};
const forgot = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) {
            return (RES(res, STATUS.INTERNAL_SERVER_ERROR))
        }
        const find = await testUser.findOne({
            where: { email }
        })
        if (!find) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const tokenc = {
            id: find.id,
            email: find.email
        }
        const token = createToken(tokenc)
        await res.json({ token })
        const url = `https://cloudinary.com/documentation/node_integration${token}`
        const emailContent = {
            name: find.email,
            url: url
        }
        const { title, description } = forgotpass(emailContent)
        console.log("title", title)
        console.log("description", description)
        const info = await sendMail(find.email, title, description)
        console.log(info, "email info")
        await PasswordResetToken.create({
            userId: find.id,
            token: token,
            expiresAt: new Date(Date.now() + 20 * 60 * 1000)
        })
    } catch (error) {
        // console.log(error)
        return
    }
}
const verifytoken = async (req, res) => {
    try {
        const { token } = req.query
        if (!token) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const findToken = await PasswordResetToken.findOne({ where: { token: token } });
        if (!findToken) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const findUser = await testUser.findOne({ where: { id: findToken.userId } });
        return RES(res, STATUS.OK, "Token matched", findUser);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
}

const resetpassword = async (req, res) => {
    const { password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const matchTokenInDbAndQuery = await PasswordResetToken.findOne({ where: { token: req.query.token } });

        if (!matchTokenInDbAndQuery) {
            return RES(res, STATUS.NOT_FOUND);
        }

        const user = await testUser.findOne({ where: { id: matchTokenInDbAndQuery.userId } });

        if (!user) {
            return RES(res, STATUS.NOT_FOUND);
        }
        user.password = hashedPassword;
        await user.save();

        const emailContent = {
            name: user.email
        };
        const { title, description } = congrats(emailContent);
        const info = await sendMail(user.email, title, description);

        console.log(info);
        return RES(res, STATUS.OK, "Successfully Changed", user);
    } catch (error) {
        console.log(error);
        return RES(res, STATUS.INTERNAL_SERVER_ERROR);
    }
};
const updateFields = async (req, res) => {
    const { id } = req.params
    try {
        const { userName, email, LastName, } = req.body
        if (!id) {
            return RES(res, STATUS.NOT_FOUND)
        }
        const find = await testUser.findByPk(id)
        if (find.userName) {
            find.userName = userName;
        }
        find.email = email,
            find.LastName = LastName
        await find.save()
        return RES(res, STATUS.OK)
    } catch (error) {
        console.log(error)
        return RES(res, STATUS.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { CreateUser, LoginUser, forgot, verifytoken, resetpassword, DeleProfile, updateFields, updateImage }



//      / employee/signup
//  /test/user



// const { userName, email, LastName, password, profilePicture } = req.body
// const find = await testUser.findOne({
//     where: { email },
//     attributes: { exclude: ["password"] }
// })
// if (!find) {
//     return RES(res, STATUS.BAD_REQUEST, "User Email Already Exist")
// }
// const hashedPassword = bcrypt.hash("password", 10)
// const user = testUser.create({
//     userName,
//     email,const CreateUser = async (req, res) => {
//     const form = new formidable.IncomingForm();

//     try {
//         const fields = await new Promise((resolve, reject) => {
//             form.parse((error, fields, files) => {
//                 if (error) {
//                     reject(new Error("Error occurred during parsing the data"));
//                 } else {
//                     resolve(fields);
//                 }
//             });
//         });
//         const processedData = processFormFields(fields);
//         const { userName, email, LastName, password } = processedData;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         let profilePictureUrl = "";
//         if (files.profilePicture) {
//             const imagePath = files.profilePicture.path;
//             const public_id = await uploadImage(imagePath);
//             profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }

//         const find = await testUser.findOne({
//             where: { email }, // Correct syntax for the where clause
//             attributes: { exclude: ["password"] }
//         });

//         if (find) {
//             return RES(res, STATUS.BAD_REQUEST, "Email has already been taken");
//         }

//         await testUser.create({
//             userName,
//             email,
//             LastName,
//             password: hashedPassword,
//             profilePicture: profilePictureUrl
//         });

//         return RES(res, STATUS.OK, "User created successfully");
//     } catch (error) {
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };

//     LastName,
//     password: hashedPassword,
//     profilePicture
// })
// return RES(res, STATUS.OK, "User created Successfully ")


// incoming form 
// promise
// form.parse with err,filed,files
// processFormFields
// body = processFormfileds





// module.exports = { CreateUser };


// 


// which i wrote 
// const CreateUser = async (req, res) => {
//     const form = new formidable.IncomingForm();
//     const returndata = new Promise((resolve, reject) => {
//         form.parse(async (error, fields, files) => {
//             if (error) {
//                 return reject(new Error("error occured during parsing the Data "))
//             }
//             const processedData = processFormFields(fields)
//             const { userName, email, LastName, password } = processedData
//             const hashedPassword = bcrypt.hash("password", 10)
//             let profilePictureUrl = "";
//             if (files.profilePicture) {
//                 const imagePath = files.profilePicture.path;
//                 const public_id = await uploadImage(imagePath)
//                 profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`
//             }
//             const find = await testUser.findOne({
//                 where: email,
//                 attributes: { exclude: ["password"] }
//             })
//             if (find) {
//                 return RES(res, STATUS.BAD_REQUEST, "EMAIL HAS ALREADY TAKEN ")
//             }
//             await testUser.create({
//                 userName,
//                 email,
//                 LastName,
//                 password: hashedPassword,
//                 profilePicture: profilePictureUrl
//             })
//             return resolve(returndata)
//             // return RES(res, STATUS.OK, "CREATED", returndata)
//         })
//     })
// }
// module.exports = { CreateUser }



// which i got 
// const CreateUser = async (req, res) => {
//     const form = new formidable.IncomingForm();
//     try {
//         const fields = await new Promise((resolve, reject) => {
//             form.parse((error, fields, files) => {
//                 if (error) {
//                     reject(new Error("Error occurred during parsing the data"));
//                 } else {
//                     resolve(fields);
//                 }
//             });
//         });
//         const processedData = processFormFields(fields);
//         const { userName, email, LastName, password } = processedData;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         let profilePictureUrl = "";
//         if (files.profilePicture) {
//             const imagePath = files.profilePicture.path;
//             const public_id = await uploadImage(imagePath);
//             profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }
//         const find = await testUser.findOne({
//             where: { email },
//             attributes: { exclude: ["password"] }
//         });
//         if (find) {
//             return RES(res, STATUS.BAD_REQUEST, "Email has already been taken");
//         }
//         await testUser.create({
//             userName,
//             email,
//             LastName,
//             password: hashedPassword,
//             profilePicture: profilePictureUrl
//         });
//         return RES(res, STATUS.OK, "User created successfully");
//     } catch (error) {
//         return RES(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
//     }
// };