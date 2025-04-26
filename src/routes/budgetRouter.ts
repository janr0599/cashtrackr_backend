import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({ message: "Budget API is working" });
});

export default router;
