import mongoose, { Schema } from "mongoose";

const playlistSchema= new Schema({
    listName:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    songs:[
        {
            type:Schema.Types.ObjectId,
            ref:'Song'
        }
    ],
},{timeStamps:true});

export const Playlist=mongoose.model("Playlist",playlistSchema);