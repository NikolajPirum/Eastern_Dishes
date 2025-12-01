import { Router } from 'express';

const router = Router();

router.get("/api/home", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).send({
            success: false,
            message: "Du er ikke logget ind"
        });
    }
    res.status(200).send({ success: true });
});

export default router;