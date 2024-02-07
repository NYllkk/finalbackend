const express = require("express");
const router = express.Router();
const { Signup, login, updateUser, deleteUser, forgotpasssword, getUser, getEmployeeTasks, ChnageState, deleteUserProfilePicture, updateImageCl, AuthSignup, render, dontrender, payment } = require("./EmployeeController");
const passport = require("../../passport/GoogleStrategy.js");

// but if we are using formidable we dont have to use any of this 
// with using multer 
// const isEmployee = require("../../middleware/authenticateEmployee")
router.put("/clupadte/:id", updateImageCl)
router.post("/signup", Signup);
// const isAuthenticated = require("../../middleware/isAuthenticated.js")
// like this 
// upper is with using multer 

// with using cloudinary  
// we also neeed multer here like we have defined here when we need to send data in form 
// router.post("/signup",upload.single <like this ....... Signup);

// with using cloudinary  
// authroute
// http://192.168.1.45:2000/api/employee/auth/google


// use this api to Authneticated bu googlr 
// http://192.168.1.73:2000/api/employee//auth/protected
// 

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('https://42f7-2401-4900-1f32-8fff-00-99-9568.ngrok-free.app');
    });
// Google authentication callback




// router.get('/auth/google', AuthSignup,
//     passport.authenticate('google', {
//         scope: ['profile', 'email'],
//     })
// );
// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: "https://42f7-2401-4900-1f32-8fff-00-99-9568.ngrok-free.app",
//         failureRedirect: "/auth/google/failure"
//     }),
// );
router.get("/auth/protected", (req, res) => {
    res.render("render")
})
router.get("/auth/google/failure", (req, res) => {
    res.render("dontrender")
})
router.get("/auth/payment", (req, res) => {
    res.render("payment")
})
// );
// http://192.168.1.9:2000/api/employee//auth/google
// ..............
// http://192.168.1.9:2000/api/employee/login/forgot
// http://192.168.1.66:2000/api/employee//signup
// emoyee middle  
// router.use(isEmployee)
// emoyee middle 

// with auth passport  
// router.post("/", AuthSignup)
// with auth passport  
router.put("/login/changeTaskState/:taskId", ChnageState);
router.post("/login", login)
router.delete('/delete/:userId', deleteUserProfilePicture);
router.put("/login/update/:userId", updateUser)
router.delete("/login/delete/:userId", deleteUser)
router.post("/login/forgot", forgotpasssword)
router.get("/login/getUser/:userId", getUser)
router.get('/login/employees/:userId', getEmployeeTasks);
router.get("/failureroute", dontrender)


// router.put('/employees/:taskId', updateTaskState);
// router.put('/tasks/:taskId', updateTaskState);

module.exports = router;



// login / employees / 123


// http://192.168.1.63:2000/api/employee/login/employees/2
// for getting the  task 


// http://192.168.1.19:2000/api/admin/login/task 
// 26-dec





// employeeRoutes.js

// const createUploadMiddleware = require("../../middleware/uploadMiddleware");

// Create a new Multer middleware instance with the desired destination


// router.post("/signup", upload.single("profilePicture"), Signup);

module.exports = router;






























// const express = require("express");
// const passport = require("../passport/GoogleStrategy"); // Path to your GoogleStrategy file
// const router = express.Router();
// const { Signup, login, updateUser, deleteUser, forgotpasssword, getUser, getEmployeeTasks, ChnageState, deleteUserProfilePicture, updateImageCl } = require("./EmployeeController");

// // Define a route for Google OAuth2.0 authentication
// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// // Define the callback route for Google OAuth2.0 authentication
// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect to a page or respond as needed
//         res.redirect('/dashboard');
//     }
// );

// // Route for updating employee profile picture
// router.put("/clupadte/:id", updateImageCl);

// // Route for employee signup
// router.post("/signup", Signup);

// // Other routes for login, updating user, deleting user, etc.
// // ...

// module.exports = router;





// 






// in bottom router

// router.get('/success-route', (req, res) => {
//     res.send('Authentication successful!');  // You can render a success page or redirect as needed
// });

// router.get('/failure-route', (req, res) => {
//     res.send('Authentication failed!');  // You can render a failure page or redirect as needed
// });

// 


// last try 
// const express = require('express');
// const router = express.Router();
// const AuthSignup = require('../controllers/AuthSignup'); 
// router.get('/auth/google/callback', AuthSignup);
// // Other routes and middleware for authentication
// module.exports = router;








// ch
// const express = require('express');
// const router = express.Router();
// const AuthSignup = require('../controllers/AuthSignup'); // Adjust the path
// const passport = require('../passport/GoogleStrategy'); // Adjust the path

// // Google authentication initiation
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google authentication callback
// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         // Successful authentication, redirect to your desired URL
//         res.redirect('https://42f7-2401-4900-1f32-8fff-00-99-9568.ngrok-free.app');
//     });

// // Other routes and middleware for authentication

// module.exports = router;
