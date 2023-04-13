const express = require("express");
const app = new express();
const db = require("./models");
const bodyParser = require("body-parser");
const logger = require("morgan");
const expressSession = require("express-session");
app.use(expressSession({ 
     secret: 'Welcome to Sharing',
     //resave: true,
     //saveUninitialized: true
 }))

global.loggedIn = null;
app.use("*", (request, response, next) => {
    loggedIn = request.session.userId;
    next();
});

app.use(bodyParser.json());
app.use(logger("dev"))
app.use(express.static('public'));
app.set("view engine", "ejs");


const PhotosRouter = require('./routes/PhotosRouter');
const CommentsRouter = require('./routes/CommentsRouter');
const UsersRouter = require('./routes/UsersRouter');
const PageRouter = require('./routes/PageRouter');
app.use('/images', PhotosRouter);
app.use('/Comments', CommentsRouter);
app.use('/users', UsersRouter);
app.use('/', PageRouter)
//db
const sqlPort = 3306;
db.sequelize
    .sync() //if we add force:true it automaticaly dump database it uses for testing 
    .then(()=>{
        app.listen(sqlPort, ()=>{
            console.log(`Mariadb Connection Successful - http://localhost:${sqlPort}`);
        });
    })
    .catch((error)=>{
        console.log("Unable to connet Database", error);
    });
//server
const port = 8080;
app.use(express.static('public'))
app.set("view engine", "ejs")

app.listen(port, ()=>{
    console.log(`serving photosharing app on http://localhost:${port}`);
});

app.get("/photo", (request, response) => {
    console.log("/photo");
    response.render("photo");
  });
