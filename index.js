const express = require('express');
const cors = require('cors');
const app = express();
const passport = require("./passport/GoogleStrategy");
const session = require('express-session');
const ejs = require('ejs');
const sequelize = require('./sequlize');
const router = require('./routes/routes');
const Employee = require('./db/models/Employee');
// const paymentIntentent = require("./stripe/stripe")
// const stripe = require("./stripe/stripe.js")
app.use(session({
    secret: 'thgtrhhhythtyuyjuh',
    resave: false,
    saveUninitialized: true,
}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
// index.js
console.log('Server is starting...');
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Employee.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful!');
        await sequelize.sync();
        console.log('Database synchronization successful');
    } catch (error) {
        console.error('Unable to connect to the database or synchronize:', error);
        process.exit(1);
    }
})();



// // make strategy
// // add session 
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const passport = require("./passport/GoogleStrategy");
// const session = require('express-session');
// const ejs = require('ejs');
// const sequelize = require('./sequlize');
// const router = require('./routes/routes');

// app.use(session({
//     secret: 'thgtrhhhythtyuyjuh',
//     resave: false,
//     saveUninitialized: true,
// }));
// app.set('view engine', 'ejs');
// app.use(cors());
// app.use(express.json());
// app.set('views', __dirname + '/view');
// console.log(__dirname + '/view', "in INDEX FILE IN CONSOLE ");

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/api', router);

// console.log('Server is starting...');
// const PORT = process.env.PORT || 2000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection successful!');
//         await sequelize.sync();
//         console.log('Database synchronization successful');
//     } catch (error) {
//         console.error('Unable to connect to the database or synchronize:', error);
//         process.exit(1);
//     }
// })();


// // index.js






















// lustrous - stack - 411505

// ////////
// app.js

// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./sequelize');
// const userRoutes = require('./routes/userRoutes');
// const otherRoutes = require('./routes/otherRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Use the userRoutes for paths starting with '/users'
// app.use('/users', userRoutes);
// app.use('/other', otherRoutes);

// // Start server
// const PORT = process.env.PORT || 3000;
// sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// });


// passport.use(new GoogleStrategy({
//     clientID: YOUR_GOOGLE_CLIENT_ID,
//     clientSecret: YOUR_GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://your-app/callback"
// },
//     (accessToken, refreshToken, profile, done) => {
//         // Verify user and call done accordingly
//     }
// ));


// serialize and desearilize 
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     // Retrieve user from the database using id
//     done(null, user);
// });


// routes 
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/' }),
//     (req, res) => {
//         res.redirect('/dashboard');
//     }
// );

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });


// protected route or middleware 
// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// };

// app.get('/dashboard', isAuthenticated, (req, res) => {
//     // Render dashboard for authenticated users
// });





// client id 
// 790089193679- 
// 67bue0qqgv863qvsfnjtaiip0913gmlm.apps.googleusercontent.com

// client secret 

// GOCSPX- 
// O3VtmquLH3aLZqRfiljVoFaJMcB9




// 



// ggole 
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: 'YOUR_GOOGLE_CLIENT_ID',
//     clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
//     callbackURL: "http://your-app/callback"
// },
//     (accessToken, refreshToken, profile, done) => {
//         // Verify user and call done accordingly
//     }
// ));





// const express = require('express');
// const session = require('express-session');
// const passport = require('./path-to-passport-config'); // Adjust the path accordingly
// const AuthSignup = require('./path-to-auth-signup'); // Adjust the path accordingly
// const { RES, STATUS } = require('./path-to-common'); // Adjust the path accordingly
// const Employee = require('./path-to-employee-model'); // Adjust the path accordingly

// const app = express();

// // Add express-session middleware
// app.use(session({
//     secret: 'your-secret-key', // Replace with a strong and secure secret key
//     resave: false,
//     saveUninitialized: true,
// }));

// // Add Passport middleware
// app.use(passport.initialize());
// app.use(passport.session()); // Enable session support

// // Use the AuthSignup function
// app.post('/api/signup', AuthSignup);

// // Other routes and middleware...

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });




// .............................................. //
// stripe config
// stripe/stripeConfig.js
// const stripe = require('stripe')('sk_test_2efhL91lWltncwSzISxIyn5ctEJ37I55K8qYwKw8MbUE9vJ3NEjxqJ6xs021pMuWUc00EDz0AG69');

// module.exports = stripe;



// stripe/payment.js
// stripe/payment.js
// const stripe = require('./stripeConfig');

// async function createPaymentIntent() {
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: 1000,
//             currency: 'inr',
//             description: 'One-to-one payment',
//         });
//         return { success: true, paymentIntent };
//     } catch (error) {
//         console.error('Payment failed:', error.message);
//         return { success: false, error: error.message };
//     }
// }

// module.exports = { createPaymentIntent };


// route
// routes/paymentRoutes.js
// const express = require('express');
// const { createPaymentIntent } = require('../stripe/payment');

// const router = express.Router();

// router.post('/pay', createPaymentIntent);

// module.exports = router;


// index.js
// index.js
// const express = require('express');
// const paymentRoutes = require('./routes/paymentRoutes');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use('/payment', paymentRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
