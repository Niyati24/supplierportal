const mongoose= require('mongoose');

var Requirement = mongoose.model('Requirement',
    {
        requirementName:{
            type:String,
            required:true,
            minlength:1,
            trim:true
        },
        description:{
            type:String,
            required:true
        },
        supplierCategory:{
            type:String

        },
        closingDate:{
            type:Number
        }
    })
        
    module.exports ={Requirement};