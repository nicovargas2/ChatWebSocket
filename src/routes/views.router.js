import { Router } from "express";

const router = Router();

router.get('/chat', (req, res) => {
    const data = {
    };
    res.status(200).render('chat', data);
})

router.get('/realTimeProducts', async (req, res) => {
    let data = {
        fName: "Hilda",
        lName: "Roldan"
    };
    res.status(200).render('realTimeProducts', data);
})

export default router;