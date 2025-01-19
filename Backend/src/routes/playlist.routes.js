import { Router } from "express";
import { createPlayList, deletePlaylist, getPlaylists, removeSongfromPlayList, updateplaylist } from "../controllers/playlist.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";

const router=Router();
router.use(verifyJwt);
router.route("/createplaylist").post(createPlayList);

router.route("/getplaylists").get(getPlaylists);

router.route("/updateplaylist").patch(updateplaylist);
router.route("/removesongfromplaylist").patch(removeSongfromPlayList);

router.route("/deleteplaylist/:playlistId").delete(deletePlaylist);
export default router;