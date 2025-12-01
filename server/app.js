import 'dotenv/config';

import express from 'express'
const app = express();

app.use(express.json()); // uden express.json() bliver req.body = undefined 

app.use(express.urlencoded()); //middleware til at parse form-data.

// angiver url rute og mappen hvor dish_image ligger
app.use('/uploads', express.static('uploads'));

// 
import cors from 'cors';
app.use(cors({ //tillader cors mellem front- og backend 
    origin: true,
    credentials: true //tillader at sende cookies (med sessio info)
}));

import session from 'express-session';

//opretter middleware session for alle HTTP request
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

import dishesRouter from './routers/dishes.js'
app.use(dishesRouter);

import usersRouter from './routers/users.js'
app.use(usersRouter);

import loginRouter from './routers/login.js'
app.use(loginRouter);

import homeRouter from './routers/home.js'
app.use(homeRouter);

const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, ()=> { console.log("server is running on port: " ,PORT) });