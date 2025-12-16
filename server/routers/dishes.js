import { Router } from 'express'
import db from '../database/connection.js'

const router = Router();

//middleware handler for upload af multipart/formdata. Oploadet filer lokation: server/uploads
import multer from 'multer';
const upload = multer({
    dest: './uploads',
});

// POST ny ret med billede(jpg eller png)
router.post("/api/dishes", upload.single("dish_image"), async (req, res) => {
    const userId = req.session.userId 
    const {name, dish_origin } = req.body;
    const dish_image = req.file.filename;

    try{
        const {lastID} = await db.run(`INSERT INTO dishes (name, dish_origin, dish_image, user_id) VALUES (?, ?, ?, ?)`,
            [name, dish_origin, dish_image, userId]
        );
        const createdDish = await db.get(`SELECT * FROM dishes WHERE id = ?`, [lastID]
        );
        res.status(201).send({ success: true, data : createdDish});

        }catch(error){
            console.error("Kunne ikke oploade ny ret", error);

            res.status(400).send({success : false,
                 message : "kunne ikke oplaode ny ret" ,
                  error : error.message}
            );
        }
});


router.get("/api/dishes", async (req,res) => {
    try{
        const result = await db.all('SELECT * FROM dishes;');

        res.status(200).send({success: true, data: result});
    }catch(error){
        console.error("Kunne ikke hente data", error)
        res.status(500).send({ success: false, error : error.message})
    }
});


router.get("/api/dishes/:userId", async (req,res) => {
    const {userId} = req.params.userId;
    try{
        const result = await db.all('SELECT * FROM dishes WHERE user_id = ?;' , [userId]);

        res.status(200).send({ success : true, data: result});
    }catch(error){
        console.error("kunne ikke finde user med id:", userId, error);

        res.status(400).send({
            success : false,
            message : "kunne ikke finde user",
            error : error.message}
        );
    }
});

export default router;  