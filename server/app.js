import 'dotenv/config';

import express from 'express'
const app = express();

app.use(express.json()); 

app.use(express.urlencoded()); //middleware til at parse form-data.

// angiver url rute og mappen for dish_image
app.use('/uploads', express.static('uploads'));

//========================================= CORS =======================================================
import cors from 'cors';
app.use(cors({  
    origin: process.env.CLIENT_URL,
    credentials: true //tillader at sende cookies (med session info)
}));

//============================================= SESSION ===================================================
import session from 'express-session';

//opretter middleware session for alle HTTP request
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sessionMiddleware);

// ============================================ CREATE SERVER ====================================
import http from 'http';
const server = http.createServer(app);

import { Server } from 'socket.io'
const io = new Server(server, {
  cors : {
    origin : [process.env.CLIENT_URL],
    credentials : true
  }
});

// Bind Express-session with socket.io connection 
io.engine.use(sessionMiddleware);

//============================================================ ROUTERS ================================================
import dishesRouter from './routers/dishes.js'
app.use(dishesRouter);

import usersRouter from './routers/users.js'
app.use(usersRouter);

import loginRouter from './routers/login.js'
app.use(loginRouter);

import homeRouter from './routers/home.js'
app.use(homeRouter);

import recipesRouter from './routers/recipes.js'
app.use(recipesRouter);

//=================================================== SOCKET.IO =======================================================
import db from './database/connection.js'
io.on('connection', async (socket) =>{
    
  const usernameObj = await db.get(`SELECT username FROM users WHERE id=?;`, [socket.request.session.userId]);

  //sends username to frontend
  let username = usernameObj.username;
  
  socket.emit('server-sends-user', username);


  socket.on('client-sends-message', (chatMessage) => {
    if(socket.connected){
    socket.broadcast.emit('server-sends-message',{
      user : username,
       message : chatMessage.message,
       online : true });
    }
  });
  

  socket.on('disconnect', () => {
    console.log('sokcet disconnected: ', socket.id);
  })

});


//============================================ PORT ===================================================================
const PORT = Number(process.env.PORT || 8080);
server.listen(PORT, ()=> { console.log("server is running on port:" ,PORT) });