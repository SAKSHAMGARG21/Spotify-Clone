import mongoose, { Schema } from "mongoose";

const songSchema = new Schema({
    songName: {
        type: String,
        required: true,
        trim: true
    },
    songFile: {
        type: String,
        required: true,
        trim: true
    },
    songImg: {
        type: String,
    },
    artist: {
        type: String,
        required: true
    },
    albumId: {
        type: Schema.Types.ObjectId,
        ref: 'Album'
    },
    rating: {
        type: Number,
    }
}, { timestamps: true });

export const Song = mongoose.model("Song", songSchema);