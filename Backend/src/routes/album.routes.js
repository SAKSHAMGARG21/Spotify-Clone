import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, updateAlbum } from "../controllers/album.controller.js";
import { verifyJwt } from "../middleware/Auth.middleware.js";
const router= Router();
router.use(verifyJwt);
router.route("/createalbum").post(upload.single("imgFile"),createAlbum);
router.route("/getallalbums").get(getAllAlbums);
router.route("/getalbmbyid/:albumId").get(getAlbumById);

router.route("/updatealbum").patch(updateAlbum);

router.route("/deletealbum/:albumId").delete(deleteAlbum);

export default router;