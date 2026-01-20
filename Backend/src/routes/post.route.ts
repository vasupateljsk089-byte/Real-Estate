import {Router} from 'express';
import {getPosts ,getPost, addPost, updatePost,deletePost} from "@controllers/post.controller";
import { authenticateUser } from '@middleware/verifyjwt';

const router=Router();

router.get('/',getPosts);   
router.get('/:id',getPost);

router.post('/',authenticateUser,addPost);
router.put('/:id',authenticateUser,updatePost);
router.delete('/:id',authenticateUser,deletePost);

export default router;