var mysql = require('mysql') ;                                                                                      
//connection config
var connection = mysql.createConnection({
  host : config.mysqlHost,
  user : config.mysqlUser,
  password : config.mysqlPass,
  database : config.mysqlName
});


var dao = {};

function User(user){
 this.username = user.username ;
 this.password = user.password ;
}
User.prototype.getUserbyUsername = function(username,callback){
 var selectSql = 'select * from user where name = ?' ;
 connection.query(selectSql,[username],function(err,res){
   if(err){
     console.log('getUserbyUsername err:' + err) ;
     return ;
   }
   console.log('Get name success') ;
   callback(err,res) ;
 }) ;
};
dao.user = User;


module.exports = dao;