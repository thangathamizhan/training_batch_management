import  mongoose from 'mongoose'
 
const feedbackschema = new mongoose.Schema({
     traineeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Trainee",
       required: true
     },
     batchId:{
         type: mongoose.Schema.Types.ObjectId,
        ref:"Batch",
       required: true
     },
     rating:{
        type:Number,
        required:true
     },
 comments:{
        type:String,
        required:true
     }
 
})

export const feedbackmodel= mongoose.model('feedback',feedbackschema)


