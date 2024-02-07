const passport = require('passport');
const Employee = require('../db/models/Employee');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: '790089193679-67bue0qqgv863qvsfnjtaiip0913gmlm.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://42f7-2401-4900-1f32-8fff-00-99-9568.ngrok-free.app/auth/google/callback',
    scope: ['profile', 'email'],
},
    async (accessToken, refreshToken, profile, done) => {
        console.log("blocked !!");
        try {
            console.log('Access Token:', accessToken);
            let employee = await Employee.findOne({ where: { googleId: profile.id } });
            console.log(employee, "in here ");
            console.log(profile, "in profile ");
            if (!employee) {
                employee = await Employee.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                });
            }
            return done(null, employee);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    }
));

module.exports = passport;




// const passport = require('passport');
// const Employee = require('../db/models/Employee');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: '790089193679-67bue0qqgv863qvsfnjtaiip0913gmlm.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: 'https://42f7-2401-4900-1f32-8fff-00-99-9568.ngrok-free.app',
//     scope: ['profile', 'email'],
// },
//     async (accessToken, refreshToken, profile, done) => {
//         console.log(
//             "in Google STrategy")
//         try {
//             console.log('Access Token:', accessToken);
//             let employee = await Employee.findOne({ where: { googleId: profile.id } });
//             console.log(employee, "in here ");
//             console.log(profile, "in profile ");
//             if (!employee) {
//                 employee = await Employee.create({
//                     googleId: profile.id,
//                     displayName: profile.displayName,
//                 });
//             }
//             return done(null, employee);
//         } catch (error) {
//             console.error(error);
//             return done(error);
//         }
//     }
// ));
// module.exports = passport;


// const express = require("express");
// const router = express.Router();
// const { Signup, login, updateUser, deleteUser, forgotpasssword, getUser, getEmployeeTasks, ChnageState, deleteUserProfilePicture, updateImageCl } = require("./EmployeeController");

// router.put("/clupadte/:id", updateImageCl)
// router.post("/signup", Signup);
// what neded here

// { "web": { "client_id": "790089193679-67bue0qqgv863qvsfnjtaiip0913gmlm.apps.googleusercontent.com", "project_id": "lustrous-stack-411505", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_secret": "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" } }



// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// // Replace these placeholders with your actual Google API credentials
// const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
// const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
// const CALLBACK_URL = 'http://your-app/callback';

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: CALLBACK_URL
// },
//     (accessToken, refreshToken, profile, done) => {
//         // Check if the user already exists in your database
//         // If not, create a new user record
//         const user = {
//             id: profile.id,
//             displayName: profile.displayName,
//             // ... other user data from the profile
//         };

//         // For demonstration purposes, you might want to store the user in your database here

//         // Call done with the user object to finish the authentication process
//         return done(null, user);
//     }
// ));







// // Serialize and Deserialize User
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     // Retrieve user from the database using id
//     const user = {
//         id: id,
//         displayName: "John Doe", // Replace with actual user data
//         // ... other user data
//     };
//     done(null, user);
// });

// module.exports = passport;


// 


// passport configuration file (e.g., passport.js)
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const Employee = require('./db/models/Employee'); // Adjust the path accordingly

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await Employee.findByPk(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });                                                                       
// passport.use(new GoogleStrategy({
//     // ... your Google strategy configuration
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             let employee = await Employee.findOne({ where: { googleId: profile.id } });
//             if (!employee) {
//                 employee = await Employee.create({
//                     googleId: profile.id,
//                     displayName: profile.displayName,
//                 });
//             }
//             return done(null, employee);
//         } catch (error) {
//             console.error(error);
//             return done(error);
//         }
//     }
// ));

// module.exports = passport;


// 

// const passport = require('passport');
// const Employee = require('../db/models/Employee');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser((user, done) => {
//     // Store the user's id in the session
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         // Retrieve the user from the database using the stored id
//         const user = await Employee.findByPk(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });

// passport.use(new GoogleStrategy({
//     clientID: '790089193679-67bue0qqgv863qvsfnjtaiip0913gmlm.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: "http://your-app/callback",
// },
//     async (accessToken, refreshToken, profile, done) => {
//         try {
//             let employee = await Employee.findOne({ where: { googleId: profile.id } });
//             if (!employee) {
//                 employee = await Employee.create({
//                     googleId: profile.id,
//                     displayName: profile.displayName,
//                 });
//             }
//             return done(null, employee);
//         } catch (error) {
//             console.error(error);
//             return done(error);
//         }
//     }
// ));

// module.exports = passport;
