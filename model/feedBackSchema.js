import  mongoose from 'mongoose'
 
const feedbackschema = new mongoose.Schema({
     trainee_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"traineeSchema",
       required: true
     },
     batch_id:{
          type: mongoose.Schema.Types.ObjectId,
        ref:"batch",
       required: true
     },
     rating:{
        type:Number,
        require:true
     },
 comments:{
        type:Number,
        require:true
     }
 
})


