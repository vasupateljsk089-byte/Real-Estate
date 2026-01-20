import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express ,{ Application } from 'express';
import cookieParser from 'cookie-parser';
import postRoute from '@routes/post.route';
import authRoute from '@routes/auth.route'; 
import userRoute from '@routes/user.route';
import chatRoute from '@routes/chat.route';
import messageRoute from '@routes/message.route';

const app : Application = express();
const port: number = Number(process.env.PORT) || 3000;
const CLIENT_URL: string = process.env.CLIENT_URL || "*";

app.use(cors({origin:CLIENT_URL,credentials:true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/chats',chatRoute);
app.use('/api/messages',messageRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});