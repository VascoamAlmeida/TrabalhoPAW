//app.js
var createError = require("http-errors");
const express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser"); //Ajuda o acesso ao diferentes inputs do server
const methodOverride = require("method-override"); //Permite usar o put e o delete

const authRestRouter = require("./routes/authREST");
const usersRestRouter = require("./routes/usersREST");
const entidadesRestRouter = require("./routes/entidadesREST");
const doacoesRestRouter = require("./routes/doacoesREST");
const valesRestRouter = require("./routes/valesREST");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");

const homeRouter = require("./routes/home");
const usersRouter = require("./routes/users");
const doacoesRouter = require("./routes/doacoes");
const entidadesRouter = require("./routes/entidades");
const dashboardRouter = require("./routes/dashboard");
const valesRouter = require("./routes/vales");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

// Ligacao ao MongoDB. A URI deve ser definida por variavel de ambiente em producao.
const mongoose = require("mongoose");
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/recicla_textil";

mongoose
  .connect(mongoUri)
  .then(() => console.log("connection successful"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

const app = express();

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout/layout");
app.use(expressLayouts);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRestRouter);
app.use("/api/v1/users", usersRestRouter);
app.use("/api/v1/entidades", entidadesRestRouter);
app.use("/api/v1/doacoes", doacoesRestRouter);
app.use("/api/v1/vales", valesRestRouter);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/users", usersRouter);
app.use("/doacoes", doacoesRouter);
app.use("/entidades", entidadesRouter);
app.use("/dashboard", dashboardRouter);
app.use("/vales", valesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
