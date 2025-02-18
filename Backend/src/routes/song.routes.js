import { Router } from "express";
import { createSong, deleteSongById, deleteSongsByIds, getAlbum, getFeaturedSongs, getSongById,getSongs, getSongsByYear, getTopRatedSongs } from "../controllers/song.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const router = Router();

router.route("/createsong").post(
    upload.fields([
        {
            name: "songFile",
            maxCount: 1
        },
        {
            name: "songImgFile",
            maxCount: 1
        }
    ]), createSong);

router.route("/getsongs").get(getSongs);
router.route("/getfeaturesongs").get(verifyJwt,getFeaturedSongs);
router.route("/getsongsbyid/:songId").get(verifyJwt,getSongById);
router.route("/gettopSongs").get(verifyJwt,getTopRatedSongs);
router.route("/getsongsbyyear").post(verifyJwt,getSongsByYear);
router.route("/getalbum").post(getAlbum);

router.route("/deletesongbyid/:songId").delete(deleteSongById);
router.route("/deletesongsByIds").delete(deleteSongsByIds);

export default router;