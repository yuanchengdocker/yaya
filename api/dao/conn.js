var mysql = require('mysql') ;                                                                                      
//connection config
var connection = mysql.createConnection({
  host : config.mysqlHost,
  user : config.mysqlUser,
  password : config.mysqlPass,
  database : config.mysqlName
});

var dao = {};

function Page(page){
  this.currentPage = page.currentPage;
  this.pageSize = page.pageSize;
  this.table = page.table;
}
Page.prototype.query = function(callback,total){
  var self = this;
  var sqlTotal = 'select count(*) as count from '+this.table; 
  excuteSql(sqlTotal,[],function(err,res){
    total = res[0].count;
    var sql = 'select * from '+self.table+' limit '+(self.currentPage-1)*self.pageSize+','+(self.currentPage)*self.pageSize;
    excuteSql(sql,[],callback,total)
  })
}

function User(user){
  this.id = user.id;
  this.name = user.name;
  this.password = user.password;
  this.phone = user.phone;
  this.age = user.age;
  this.type = user.type;
  this.address = user.address;
}
User.prototype.getUserbyUsername = function(callback){
    var sql = 'select id,name,password,phone,type,address from user where name = ?' ;
    excuteSql(sql,[this.name],callback)
};
User.prototype.getUserbyId = function(callback,valid){
  var sql = 'select id,name,password,phone,type,address from user where id = ?' ;
  var arr = [this.id];
  if(valid){
    sql = 'select id,name,password,phone,type,address from user where id != ? and '+valid +"= ?" ;
    arr.push(this[valid])
  }
  excuteSql(sql,arr,callback)
};
User.prototype.updateUserById = function(isPass,callback){
  var password = "";
  var arr = [this.name,this.phone,this.age,this.address];
  if(isPass){
    password=",password=?";
    arr = [this.name,this.password,this.phone,this.age,this.address]
  };
  var sql = 'update user set name=?'+password+',phone=?,age=?,address=?  where id ='+this.id ;
  excuteSql(sql,arr,callback)
}

function excuteSql(sql,arr,callback,param){
  connection.query(sql,arr,function(err,res){
    if(err){
      console.log('excuteSql err:' + err) ;
      return ;
    }
    console.log('excuteSql success') ;
    callback(err,res,param) ;
  }) ;
}
dao.user = User;
dao.page = Page;
module.exports = dao;