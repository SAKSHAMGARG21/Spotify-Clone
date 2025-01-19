import { Playlist } from "../modules/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createPlayList = asyncHandler(async (req, res) => {
    const { listName } = req.body;

    const playlist = await Playlist.create({
        listName,
        user: req.user._id,
    })

    if (!playlist) {
        throw new ApiError(404, "Error in creating playlist");
    }


    return res.status(200).json(
        new ApiResponse(200, playlist, "Playlist created successfully")
    )
})

export const getPlaylists = asyncHandler(async (req, res) => {
    const playlists = await Playlist.find({ user: req.user._id }).populate("songs");
    if (!playlists) {
        throw new ApiError(404, "Playlist not found");
    }
    return res.status(200).json(
        new ApiResponse(200, playlists, "All playlist fetched successfully")
    )
})

// Add song to playlist
export const updateplaylist = asyncHandler(async (req, res) => {
    const { playlistId, songId } = req.body;


    // const playilst = await Playlist.findById(playlistId);
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet: {
                songs: songId
            }
        }, {
        new: true
    }).populate("songs")
    if (!updatedPlaylist) {
        throw new ApiError(404, "Error in updating playlist");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedPlaylist, "Song added to playlist successfully")
    )
})

export const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

    if (!deletedPlaylist) {
        throw new ApiError(404, "Error in deleting playlist");
    }

    return res.status(200).json(
        new ApiResponse(200, deletedPlaylist, "Playlist deleted successfully")
    )
})

export const removeSongfromPlayList = asyncHandler(async (req, res) => {
    const { playlistId, songId } = req.body;

    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $pull: {
                songs: songId
            }
        }, {
        new: true
    })

    if (!updatedPlaylist) {
        throw new ApiError(404, "Error in removing song from playlist");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedPlaylist, "Song removed from playlist")
    )
})



