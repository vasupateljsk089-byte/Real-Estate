import {Router} from 'express'
import {getUsers,deleteUser,savePost,profilePosts,updateProfile} from '@controllers/user.controller';
import { upload } from "@middleware/multer";
import { authenticateUser } from '@middleware/verifyjwt';

const router=Router();

// router.get('/search/:id',authenticateUser,getUser); it is not require and it conflict with profilePost
router.get('/',getUsers);
// router.put('/:id',authenticateUser,updateUser);
router.delete('/:id',authenticateUser,deleteUser);
router.post("/save", authenticateUser, savePost);
router.get("/profilePosts", authenticateUser, profilePosts);
router.patch("/profile",authenticateUser,upload.single("profileImage"),updateProfile); // here it must match with filed name on frontend


export default router;