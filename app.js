const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const mainRouter = require("./router/mainRouter");
const userRouter = require("./router/userRouter");

const db = require("./model/db");

class AppServer extends http.Server {
  constructor(config) {
    const app = express();
    super(app);
    this.config = config;
    this.app = app;

    // 동시성 처리를 위한 준비 코드, 후반부에
    this.currentConns = new Set();
    this.busy = new WeakSet();
    this.stop = false;
  }

  set() {
    this.app.engine("html", require("ejs").renderFile);
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "html");
    this.app.use("/public", express.static(__dirname + "/public"));
  }

  middleWare() {
    this.app.use(helmet());
    this.app.use(bodyParser());
    this.app.use(cookieParser());
    this.app.use((req, res, next) => {
      console.log("미들웨어");
      next();
    });
  }

  router() {
    this.app.use("/", mainRouter);
    this.app.use("/user", userRouter);
    this.app.use((req, res, next) => {
      res.status(404);
      res.send("잘못된 요청입니다.");
      // res.render(); // 페이지 꾸밀 수 있음
    });
  }

  dbConnection() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("디비접속 완료");
        return db.sequelize.sync({ force: false });
      })
      .then(() => {
        console.log("디비접속이 완료된 다음 할 일");
      })
      .catch((err) => {
        console.log("디비접속이 실패됐을 경우");
        console.log(err);
      });
  }

  start() {
    this.set();
    this.middleWare();
    this.router();
    this.dbConnection();
    return this;
  }
}

const createServer = (config = () => {
  const server = new AppServer();
  return server.start();
});

exports.createServer = createServer;
