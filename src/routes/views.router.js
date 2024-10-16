import { Router } from "express";

const router = Router();

router.get('/chat', (req, res) => {
    const data = {
    };
    res.status(200).render('chat', data);
})

router.get('/home', async (req, res) => {
    let data = {
        fName: "Hilda",
        lName: "Roldan"
    };
    res.status(200).render('home', data);
})

export default router;