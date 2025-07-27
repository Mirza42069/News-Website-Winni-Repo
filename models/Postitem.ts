import mongoose from "mongoose";

const postItemSchema = new mongoose.Schema(
  {
    img: {type: String, required: true},
    category: {type: String, require: true},
    date: {type: Date, default: Date.now},
    title: {type: String, require: true},
    brief: {type: String, require: null},
    avatar: {type: String, default: null},
    author: {type: String, require: null},
    top: {type: Boolean, require: false},
    trending: {type: Boolean, require: false}
  }, {
    timestamps: true,
  }
);

const PostItem = 
  mongoose.models.postitem || mongoose.model('postitem', postItemSchema);
  
export default PostItem;
