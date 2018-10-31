/*database connection 1
database 1t api data insert klam ewa output 1 pennaw e page ekem*/ 

var mysql = require('mysql');
var db; //database 1 variable 1k
var settings = {

    host     : "localhost",
    user     : "root",
    password : "",
    database : "curdapp" //database name
};

function connectDatabase() {//database 1t connect krn function 1

    if (!db){
        db = mysql.createConnection(settings);
        db.connect(function (err) { //db 1 connect unad balnw database 1t

            if(!err){
                console.log("Database connected");
            }else {
                console.log("Error database connected")
            }
        })
    } 

    return db;
}
 module.exports = connectDatabase(); 
 // route eken eliedi use krnna oni nisa function 1 export krnwa