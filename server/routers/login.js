import { Router } from 'express'

const router = Router();

import db from '../database/connection.js'
import { comparePassword } from '../util/hashPassword.js';

router.post("/api/login", async(req, res) => {
  const { username, password } = req.body;
  const user = await db.get('SELECT * FROM users WHERE username=?', [username]);

  if (!user) {
    return res.status(401).send({ success : false, error: "ugyldig username eller password" });
  }
  const  isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    return res.status(401).send({ success : false, error: "ugyldig username eller password" });
  }

  //opretter session userID og role. //cookien hentes fra serveres mermoryStore //Session ID linker browseren til session-dataen på serveren.
  req.session.userId = user.id; // gemmes i session objekt. ikke direkte i cookie
  req.session.role = user.role;

  return res.status(200).send({ success: true, message : "Du er logget ind", role : user.role });
});

import { sendMail } from '../util/nodemailer.js';

router.post("/api/resetpassword", async (req,res) => {
  const { email } = req.body;

  if(!email){
    return res.status(400).send({success : false, message : "ugyldig email"});
  }

  //email[] af objekter som matcher SQL query
  const userEmail = await db.all(`SELECT email FROM users WHERE email = ?`, [email]);

  if(userEmail.length > 0){
    await sendMail(email); //nodemailer

  return res.status(201).send({ success : true, message : "Email sendt til: " + email });
  }
  return res.status(400).send({ success : false, message : "mail does not exist. Provided mail: " + email});
});

router.get("/api/signout", (req,res) => {
    req.session = undefined;

    res.status(200).send({ success : true, message : "user er logget ud"});
});

export default router;  