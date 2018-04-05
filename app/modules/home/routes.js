var express = require('express');
var router = express.Router();
var authMiddleware = require('../auth/middlewares/auth');
var multer  = require('multer');

router.use(authMiddleware.hasAuth);
router.use(function(req, res, next) {
  res.locals.currentUser = req.session.user;
  next();
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.fieldname + '-' + Date.now()+'.jpg')
  }
})
var upload = multer({storage: storage});

var indexController = require('./controllers/index');

router.route('/')
  .get((req, res) => {
    res.render("home/views/landing")
  });

router.route('/home')
  .get((req, res) => {
    var db = require('../../lib/database')();
    var queryString =`SELECT strImage FROM tbl_gallery ORDER BY strImage DESC LIMIT 4`
    db.query(queryString, (err, results, fields)=>{
      console.log(results)
    res.render("home/views/index", {images:results})
  });
});

router.route('/gallery')
  .get((req, res) => {
    var db = require('../../lib/database')();
    // const queryString = 'SELECT strImage FROM tbl_gallery ORDER BY DESC';
    db.query('SELECT strImage FROM tbl_gallery ORDER BY strImage DESC', function (err, results, fields) {
      if (err) return res.send(err);
      render(results);
  });
  function render(images) {
    res.render("home/views/gallery", {images:images});
  }
  })
  .post(upload.single('strImage'), (req, res) => {
    var db = require('../../lib/database')();
    console.log(req.file);

    if (typeof req.file !== 'undefined'){
        req.body.strImage = req.file.filename;
        console.log(req.file.filename)
    }
    const queryString = 'INSERT INTO tbl_gallery (strImage) VALUES (?)';    
    db.query(queryString,[req.body.strImage], function (err, results, field) {
         if (err) return res.send(err);
         req.session.user.strImage = req.body.strImage;
         res.redirect('/gallery');
    });
  })

router.route('/reserve/private')
  .get((req, res) => {
    res.render("home/views/reserveprivate")
  })
  .post((req, res) => {
    res.redirect("/home")
    var db = require('../../lib/database')();
    var user = req.body;
    var date = req.body.datDate;
    console.log(req.file);
    console.log(date)
    const queryString = `INSERT INTO tbl_reserve (intReserveAccountID, datDate) VALUES (?,?)`
    db.query(queryString ,[req.session.user.intAccountsID, date] , (err, results, fields) => {
      console.log("hello");   
      if(err) return console.log(err); 
      delete user.password;
      req.session.user = user;
      console.log(req.session.user)
  });    
  })


router.route('/reserve/public')
  .get((req, res) => {
    res.render("home/views/reservepublic")
  })
  .post((req, res) => {
    res.redirect("/home")
    var db = require('../../lib/database')();
    var user = req.body;
    var date = req.body.datDate;
    var time = req.body.optionday;
    // var time2 = req.body.optiontime2;
    var adult = req.body.adult;
    var booadult = 1;
    var boochild = 2;
    var boobasic = 1;
    var boomedium = 2;
    var boopremium = 3;
    var child = req.body.child;
    var basic = req.body.basic;
    var medium = req.body.medium;
    var premium = req.body.premium;
    var rbasic = req.body.rBasic;
    var rmedium = req.body.rMedium;
    var rpremium = req.body.rPremium;
    console.log(req.file);
    console.log(date);
    console.log(time);
    const queryString = `INSERT INTO tbl_reserve (intReserveAccountID, datDate, booTime) VALUES (?,?,?)`
    db.query(queryString ,[req.session.user.intAccountsID, date, time] , (err, results, fields) => {
      var reservekey = req.session.user.intAccountsID;
      console.log("hello");   
      if(err) return console.log(err);
    })
    console.log("aaaaaaaa");
    db.query(`SELECT * FROM tbl_reserve WHERE intReserveAccountID="${req.session.user.intAccountsID}" ORDER BY intReserveID DESC LIMIT 1`, (err, results, fields) => {
      if (err) throw err;
      if (results.length === 0) return

      var user = results[0];
      var reservekey = user.intReserveID;
      console.log(reservekey);
    if(adult > 0){
      const queryString = `INSERT INTO tbl_reserve_ticket (intRTReserveID, intTicketID, intQTY ) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, booadult, adult] , (err, results, fields) => {
      console.log("Ticket");   
      if(err) return console.log(err);
      })
    }
    if(child > 0){
      const queryString = `INSERT INTO tbl_reserve_ticket (intRTReserveID, intTicketID, intQTY ) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boochild, child] , (err, results, fields) => {
      console.log("Ticket");   
      if(err) return console.log(err);
      })
    }
    if(basic > 0){
      const queryString = `INSERT INTO tbl_reserve_Cottage (intRCReserveID, intRCCottageID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boobasic, basic] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
    if(medium > 0){
      const queryString = `INSERT INTO tbl_reserve_Cottage (intRCReserveID, intRCCottageID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boomedium, medium] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
    if(premium > 0){
      const queryString = `INSERT INTO tbl_reserve_Cottage (intRCReserveID, intRCCottageID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boopremium, premium] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
    
    if(rbasic > 0){
      const queryString = `INSERT INTO tbl_reserve_rooms (intRSReserveID, intRSRoomID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boobasic, rbasic] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
    if(rmedium > 0){
      const queryString = `INSERT INTO tbl_reserve_rooms (intRSReserveID, intRSRoomID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boomedium, rmedium] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
    if(rpremium > 0){
      const queryString = `INSERT INTO tbl_reserve_rooms (intRSReserveID, intRSRoomID, intQTY) VALUES (?,?,?)`
      db.query(queryString ,[reservekey, boopremium, rpremium] , (err, results, fields) => {
      console.log("cottage");   
      if(err) return console.log(err);
      })
    }
      delete user.password;
      req.session.user = user;
      console.log(req.session.user)
  });    
  })
  
router.route('/admin/verifypending')
  .get(authMiddleware.isAdmin, (req, res) => {
    var db = require('../../lib/database')();
    var queryString =`SELECT intReserveID, strFirstname, strLastname, datDate, tbl_reserve.booStatus FROM tbl_reserve JOIN tbl_accounts ON tbl_reserve.intReserveAccountID = tbl_accounts.intAccountsID WHERE booStatus = 0 ORDER BY datDate asc ;`
    db.query(queryString, (err, results, fields)=>{
      console.log(results)
    res.render("home/views/verificationpending", {custInfo:results})
    });
  });
router.route('/admin/verifypending/:intReserveID')
  .get(authMiddleware.isAdmin, (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaa")
  var db = require('../../lib/database')(); 
  const queryString = `UPDATE tbl_reserve SET        
  booStatus = 1
  WHERE intReserveID= ${req.params.intReserveID}`;

  db.query(queryString, [req.body.booStatus], (err, results, fields) => {        
      if (err) throw err;
      res.redirect('/admin/verifypending');
  }); 
});

router.route('/admin/verifypending/del/:intReserveID')
  .get(authMiddleware.isAdmin, (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaa")
  var db = require('../../lib/database')(); 
  const queryString = `UPDATE tbl_reserve SET        
  booStatus = 2
  WHERE intReserveID= ${req.params.intReserveID}`;

  db.query(queryString, [req.body.booStatus], (err, results, fields) => {        
      if (err) throw err;
      res.redirect('/admin/verifypending');
  }); 
});
  
router.route('/admin/reports')
  .get(authMiddleware.isAdmin, (req, res) => {
    var db = require('../../lib/database')();
    var queryString =`SELECT intReserveID, strFirstname, strLastname, datDate, tbl_reserve.booStatus FROM tbl_reserve JOIN tbl_accounts ON tbl_reserve.intReserveAccountID = tbl_accounts.intAccountsID WHERE booStatus = 1 ORDER BY datDate asc;`
    db.query(queryString, (err, results, fields)=>{
      console.log(results)
    res.render("home/views/reports", {custInfo:results})
    });
  });

    //Eldrin, para sa modal to (verify Finish).
  router.route('/admin/reports/:intReserveID')
  .get(authMiddleware.isAdmin, (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaa")
  var db = require('../../lib/database')(); 
  const queryString = `
    SELECt intReserveID, tbl_rooms.strDetails, tbl_reserve_rooms.intQTY, tbl_cottages.strDescription, tbl_reserve_cottage.intQTY, tbl_tickets.strDesc, tbl_reserve_ticket.intQTY
    FROM tbl_reserve join tbl_reserve_rooms on tbl_reserve.intReserveID = tbl_reserve_rooms.intRSReserveID 
    JOIN tbl_reserve_cottage on tbl_reserve.intReserveID = tbl_reserve_cottage.intRCReserveID 
    Join tbl_reserve_ticket on tbl_reserve.intReserveID = tbl_reserve_ticket.intRTReserveID 
    join tbl_accounts on tbl_reserve.intReserveAccountID = tbl_accounts.intAccountsID 
    join tbl_rooms on tbl_reserve_rooms.intRSRoomID = tbl_rooms.intRoomsID 
    join tbl_cottages on tbl_reserve_cottage.intRCCottageID = tbl_cottages.intCottagesID 
    join tbl_tickets on tbl_reserve_ticket	.intTicketID = tbl_tickets.intTicketID     
  WHERE intRSReserveID= ${req.params.intReserveID}`;
  db.query(queryString, (err, results, fields) => {        
    console.log(results)  
    if (err) throw err;
      res.redirect('/admin/reportsresults');
    })
});




//RESERVATION
// router.route('/reservation')
//   .get((req, res) =>{
//     var db = require('./../lib/database')();
//     var user = req.body
//     db.query(`SELECT * FROM tbl_reserve WHERE intReserveAccountID="${req.session.user.intAccountsID}" ORDER BY intReserveID DESC`, (err, results, fields) => {
//       if (err) throw err;
//       if (results.length === 0) return
//       var user = results[0];
//       var reservekey = user.intAccountsID;
//       console.log(reservekey);
//       res.render("home/views/reservation", {custInfo:results})
//   })
//   })
// router.route('/admin/verifycancel')
//   .get((req, res) => {
//     var user = req.body;
//     var db = require('../../lib/database')();
//     var queryString =`SELECT intReserveID, strFirstname, strLastname, datDate, tbl_reserve.booStatus FROM tbl_reserve JOIN tbl_accounts ON tbl_reserve.intReserveAccountID = tbl_accounts.intAccountsID WHERE booStatus = 2 ORDER BY datDate asc;`
//     db.query(queryString, (err, results, fields)=>{
//       console.log(results)
//     res.render("home/views/verificationcanceled", {custInfo:results})
//     });
//   });

//     //Eldrin, para sa modal (verifycancel) to.
//   router.route('/admin/verifycancel/:intReserveID')
//   .get((req, res) => {
//     console.log("aaaaaaaaaaaaaaaaaa")
//   var db = require('../../lib/database')(); 
//   const queryString = `SELECT * FROM tbl_reserve_rooms
//   WHERE intRSReserveID= ${req.params.intReserveID}`;
//   db.query(queryString, (err, results, fields) => {        
//     console.log(results)  
//     if (err) throw err;
//       res.redirect('/admin/verifycanceled');
//     }); 
//   const queryString1 = `SELECT * FROM tbl_reserve_tickets
//   WHERE intRTReserveID= ${req.params.intReserveID}`;
//   db.query(queryString1, (err, results, fields) => {        
//     console.log(results)  
//     if (err) throw err;
//       res.redirect('/admin/verifycanceled');
//     }); 

//   const queryString2 = `SELECT * FROM tbl_reserve_cottage
//   WHERE intRCReserveID= ${req.params.intReserveID}`;
//   db.query(queryString2, (err, results, fields) => {        
//     console.log(results)  
//     if (err) throw err;
//       res.redirect('/admin/verifycanceled');

//   }); 
// }); 



//eldrin, para to sa reservation(NAVBAR SA CLIENT SIDE)


/**
 * Here we just export said router on the 'index' property of this module.
 */
exports.index = router;