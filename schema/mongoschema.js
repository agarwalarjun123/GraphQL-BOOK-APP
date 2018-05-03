const mongoose=require('mongoose');
const secret=require('../secret');
mongoose.connect("mongodb://"+secret.username+":"+secret.password+"@ds263988.mlab.com:63988/confusion",(err,result)=>{
  console.log("connected to mongodb");
});
const Schema=mongoose.Schema;
var bookschema=new Schema({
name:{
  type:String
},
genre:{
  type:String
},
authorid:{
  type:String
}
});
var Authorschema=new Schema({
name:{
  type:String
},
age:{
  type:Number
}
});
const bookModel=mongoose.model('book',bookschema);
const AuthModel=mongoose.model('Author',Authorschema);
exports.book=bookModel;
exports.author=AuthModel;
