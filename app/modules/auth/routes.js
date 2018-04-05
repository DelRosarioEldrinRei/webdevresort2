var express = require('express');
var loginRouter = express.Router();
var landingRouter = express.Router();
var signupRouter = express.Router();
var logoutRouter = express.Router();
var router = express.Router();
var app = express()

var authMiddleware = require('./middlewares/auth');

landingRouter.route('/')
.get((req, res) => {
  res.render("auth/views/landing")
});

loginRouter.route('/')
    .get(authMiddleware.noAuthed, (req, res) => {
        res.render('auth/views/login',req.query);
    })
    .post((req, res) => {
        var db = require('../../lib/database')();

        db.query(`SELECT * FROM tbl_accounts WHERE strEmail="${req.body.email}"`, (err, results, fields) => {
            if (err) throw err;
            if (results.length === 0) return res.redirect('/login?incorrect');

            var user = results[0];

            if (user.strPassword !== req.body.password) return res.redirect('/login?incorrect');

            delete user.password;

            req.session.user = user;

            return res.redirect('/');
        });
    });

logoutRouter.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

signupRouter.route('/')
.get((req, res) => {
  res.render("home/views/signup")
});

signupRouter.post('/',(req,res) =>{
    var db = require("../../lib/database")();
    var user = req.body;
    var first = req.body.first;
    var last = req.body.last;
    var email = req.body.email;
    var password = req.body.password;
    const queryString = `INSERT INTO tbl_accounts (strFirstName, strLastname, strPassword, strEmail) VALUES (?,?,?,?)`;
    db.query(queryString ,[first, last, password, email] , (err, results, fields) => {
        console.log("hello");   
        if(err) return console.log(err); 
        delete user.password;

        req.session.user = user;
        console.log(req.session.user)
        return res.redirect('/login');
    });
})

exports.login = loginRouter;
exports.landing = loginRouter;
exports.signup = signupRouter;
exports.logout = logoutRouter;