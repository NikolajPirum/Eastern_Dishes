import { Router } from 'express'

const router = Router();

import db from '../database/connection.js'

//middleware for tjek om user role = ADMIN
function isAdmin(req, res, next) {
    if (req.session.role === "ADMIN") {
        return next();
    }
    return res.status(403).send({ error: "adgang forbudt" });
}

router.get("/api/users", async (req,res) => {
    try{
        const result = await db.all('SELECT id, username, email FROM users');

        return res.status(200).send({
            success : true,
            data: result
        });
    }catch(error){
        console.error("kunne ikke hente brugere", error);
        return res.status(500).send({
            success : false,
            message : "kunne ikke hente brugere",
            error : error.message
        });
    }
});

import { hashPassword } from '../util/hashPassword.js';

//opret user
router.post("/api/users", async (req,res) => {
    const {username, password, email} = req.body;
    

        if(!username || !password || !email){
            return res.status(400).send({success : false , message : "udfyld alle felter"});
        };

    try{
        const hashedPassword = await hashPassword(password);
        const defaultRole = "USER";

        const { lastID }  = await db.run('INSERT INTO users (username, password, email, role) VALUES (?,?,?,?);',
            [username,hashedPassword,email, defaultRole]);

        return res.status(201).send({
            success : true,
            data: { createdId: lastID } 
        });
    }catch(error){
        console.error("kunne ikke oprætte bruger", error);
        return res.status(400).send({
            success : false,
            error : error.message
        });
    };
});

//slet bruger hvis bruge role = ADMIN
router.delete("/api/users/:userId", isAdmin, (req,res) => {
    const userId = req.params.userId;

    if(!userId){
        return res.status(400).send({
            success : false,
            message : "angiv user id" });
    }
    try{
        const {userID} = db.run('DELETE FROM users WHERE id=?', userId);
        return res.status(200).send({success : true, data: {deletedUser: userID}});
    }catch(error){
        console.error("kunne ikke slette brugeren", error);
        res.status(500).send({success : false,
            message : "serveren kunne ikke slette bruger",
            error : error.message
        });
    }
});

export default router;