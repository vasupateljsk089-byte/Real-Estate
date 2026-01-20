import {Router} from 'express';
import {addMessage} from "@controllers/message.controller";
import {authenticateUser} from "@middleware/verifyjwt";

const router = Router();
router.post('/:chatId',authenticateUser,addMessage);

export default router;