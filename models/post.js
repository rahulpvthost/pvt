const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please provide title for post']
    },
    content:{
        type:String,
        required:[true,'Please provide content for post']
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'Post must belong to an author']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{
        type:Number,
        default:0
    }
});
module.exports = mongoose.model('Post', postSchema)