const express = require("express");
const app = express.Router();
const UserRouter = require("../src/user/UserRoute")
const StudentRouter = require("../src/student/StudentRoutes")
const EmployeeRouter = require("../src/employee/employeeRoutes")
const AdminRouter = require("../src/admin/adminRoute")
const WarningRouter = require("../src/warnings/warningRoutes")
const NotesRouter = require("../src/Notes/NotesRoute")
const LeaveRouter = require("../src/leave/LeaveRoute")
const BugRouter = require("../src/bug/bugRouter")
const TrainingRouter = require("../src/traning/traningRoute")
const QuickTaskRouter = require("../src/quicktasks/quickTaskRoutes")
const ProjectCoordinatorRouter = require("../src/projectcoordinator/projectCoordinatorRoutes")
const TicketRouter = require("../src/ticket/ticketRoute")
const ProjectRoter = require("../src/project/projectRoutes")
const AnnouncementRouter = require("../src/announcements/announcementRouter")
const DsrRoter = require("../src/dsr/DsrRoute")
const createTimeDuration = require("../src/timerecord/timeRoutes")
const timeRoute = require("../src/timeEntry/timeEntryRoute")
const projectClientBUildRouter = require("../src/projectClientBuild/projectRoute")
const testUSer = require("../src/admin/testUser/testRoute.js")
const stripePayment = require("../stripe/stripeRoute.js")

// const passport = require("../passport/GoogleStrategy.js")
// const session = require('express-session');
// app.use(passport.initialize());
// app.use(passport.session());


app.use("/user", UserRouter)
app.use("/student", StudentRouter)
app.use("/pc", ProjectCoordinatorRouter)
app.use("/admin", AdminRouter)
app.use("/admin/warning", WarningRouter)
app.use("/employee", EmployeeRouter)
app.use("/employee/note", NotesRouter)
app.use("/employee/leave", LeaveRouter)
app.use("/employee/bug", BugRouter)
app.use("/employee/traning", TrainingRouter)
app.use("/projectcc", QuickTaskRouter)
app.use("/ticket", TicketRouter)
app.use("/project", ProjectRoter)
app.use("/dsr", DsrRoter)
app.use("/time", createTimeDuration)
app.use("/announcement", AnnouncementRouter)
app.use("/timeRoute", timeRoute)
app.use("/build", projectClientBUildRouter)
app.use("/test", testUSer)
app.use("/payment", stripePayment)
// route.js
module.exports = app


// pc / qtask

















// Apply isAdmin Middleware
// app.use(isAdmin);

// Define Routes

// isStudent Middleware




// const isStudent = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return RES(res, STATUS.UNAUTHORIZED, "Token not provided");
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         if (decoded.role !== "STUDENT") {
//             return RES(res, STATUS.UNAUTHORIZED, "Student access required");
//         }
//         req.studentId = decoded.id;
//         next();
//     } catch (error) {
//         console.error("Error verifying token:", error);
//         return RES(res, STATUS.UNAUTHORIZED, "Invalid token");
//     }
// };

// // StudentRouter with isStudent Middleware
// const StudentRouter = express.Router();

// StudentRouter.use(isStudent); // Apply isStudent Middleware

// // Define Student Routes
// StudentRouter.get("/profile", (req, res) => {
//     // Handle Student Profile Route
//     res.send("Student Profile");
// });

// StudentRouter.get("/courses", (req, res) => {
//     // Handle Student Courses Route
//     res.send("Student Courses");
// });

// // Export StudentRouter
// module.exports = StudentRouter;










// guide 
// const app = require('express').Router();
// // /api/users/all

// app.use('/users', middleware ,userRouter)

// middleware => token -> user_id -> wallet -> req.body.USER req.USER_DATA

// app.use('/admin', adminRouter)



// ///////// user router 



// app.get('/all', ()=>{})