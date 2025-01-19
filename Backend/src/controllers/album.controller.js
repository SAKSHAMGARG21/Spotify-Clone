import { Album } from "../modules/album.model.js";
import { Song } from "../modules/song.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createAlbum = asyncHandler(async (req, res) => {
    const { title, artist } = req.body;
    const imgFile = req.file?.path;

    if (!imgFile) {
        throw new ApiError(404, "Image file not found");
    }

    const imageUrl = await uploadOnCloudinary(imgFile);

    if (!imageUrl) {
        throw new ApiError(404, "Error in uploading Album File on cloudinary");
    }

    const album = await Album.create({
        title,
        artist,
        imageUrl,
    })

    if (!album) {
        throw new ApiError(404, "Error in creating new album");
    }

    return res.status(200).json(
        new ApiResponse(200, album, "New Album created successfully")
    )
})

export const updateAlbum = asyncHandler(async (req, res) => {
    const { albumId, songId } = req.body;

    const album = await Album.findByIdAndUpdate(albumId, {
        $addToSet: {
            songs: songId
        }
    }, { new: true }).populate("songs");
    if (!album) {
        throw new ApiError(404, "Error in adding song to album");
    }

    return res.status(200).json(
        new ApiResponse(200, album, "Song added to playlist successfully")
    )
})

export const getAllAlbums = asyncHandler(async (req, res) => {
    const albums = await Album.find();
    return res.status(200).json(
        new ApiResponse(200, albums, "All albums fetched successfully")
    )
});

export const getAlbumById = asyncHandler(async (req, res) => {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
        throw new ApiError(404, "Album not found");
    }

    return res.status(200).json(
        new ApiResponse(200, album, "Ablum fetched successfully")
    )
});

export const deleteAlbum = asyncHandler(async (req, res) => {
    const { albumId } = req.params;
    await Song.deleteMany({ albumId });
    await Album.findByIdAndDelete(albumId);
    return res.status(200).json(
        new ApiResponse(200, {}, "Album deleted successfully")
    )
})