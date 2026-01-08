import { Router } from 'express';
import db from '../database/connection.js';

const router = Router();

router.get('/api/recipes/:name', async (req, res) => {
    const { name } = req.params;
    
    try {
        const result = await db.get(`SELECT * FROM recipes WHERE dish_name = ?`, [name]);
        
        if (!result) {
            return res.status(404).send({
                success: false,
                message: "kunne ikke finde ret med navn: " + name
            });
        }
        return res.status(200).send({ success: true, data: result });
        
    }catch(error) {
        console.error("database fejl:", error);
        return res.status(500).send({
            success: false,
            message: "database fejl",
            error: error.message
        });
    }
});


export default router;