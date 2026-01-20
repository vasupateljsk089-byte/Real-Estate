import {Router} from 'express'
import {getUsers,updateUser,deleteUser,savePost,profilePosts} from '@controllers/user.controller';
import { authenticateUser } from '@middleware/verifyjwt';

const router=Router();

// router.get('/search/:id',authenticateUser,getUser); it is not require and it conflict with profilePost
router.get('/',getUsers);
router.put('/:id',authenticateUser,updateUser);
router.delete('/:id',authenticateUser,deleteUser);
router.post("/save", authenticateUser, savePost);
router.get("/profilePosts", authenticateUser, profilePosts);


export default router;