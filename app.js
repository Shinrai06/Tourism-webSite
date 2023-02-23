require("dotenv").config({ path: ".env" });
const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/Public")));

// PASSPORT CONFIG
// app.use(
//   require("express-session")({
//     secret: process.env.sessionSecret,
//     resave: false,
//     saveUninitialized: false
//   })
// );
// app.locals.moment = require("moment");
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next) {
//   res.locals.currentUser = req.user;
//   res.locals.error = req.flash("error");
//   res.locals.success = req.flash("success");
//   next();
// });

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(8800, () => console.log(`Connected on port ${8800}`));
