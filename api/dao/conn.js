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

function Member(member){
  this.id = member.id;
  this.name = member.name;
  this.sex = member.sex;
  this.phone = member.phone;
}
Member.prototype.add = function(callback){
  var sql = 'insert into member(name,phone,sex) values(?,?,?)' ;
  excuteSql(sql,[this.name,this.sex,this.phone],callback)
};
Member.prototype.delete = function(callback){
  var sql = 'delete from member where id = ?' ;
  excuteSql(sql,[this.id],callback)
};
Member.prototype.getMemberbyUsernameOrPhone = function(value,callback){
    var sql = 'select * from member where name = ? or phone = ?' ;
    excuteSql(sql,[value,value],callback)
};
Member.prototype.updateMemberById = function(callback){
  var arr = [this.name,this.phone,this.sex];
  
  var sql = 'update member set name=?,phone=?,sex=? where id ='+this.id ;
  excuteSql(sql,arr,callback)
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
User.prototype.add = function(callback){
  var sql = 'insert into user(name,age,phone,address,type,password,sex) values(?,25,?,?,1,12345,1)' ;
  excuteSql(sql,[this.name,this.phone,this.address],callback)
};
User.prototype.delete = function(callback){
  var sql = 'delete from user where id = ?' ;
  excuteSql(sql,[this.id],callback)
};
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
dao.member = Member;
module.exports = dao;