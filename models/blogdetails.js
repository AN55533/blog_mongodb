const {Schema}=require('mongoose');//from mongoose download schema & model
const {model}=require('mongoose');
const demo =new Schema({
    BlogID:{ type:String,required:true},//requiredtrue means must need//false 
    title:{ type:String, required: true},
    author:{type:String,required:true},
    content:{type:String,required:true},
   

});
const sample=model('blog',demo);//sample1 is the colllection(data stored as collection) name//
module.exports=sample;