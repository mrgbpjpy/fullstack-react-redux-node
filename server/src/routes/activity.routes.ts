import { Router } from "express";
import {prisma} from "../config/db";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/", auth, async (req, res) => {
    const userId = (req as any).user.userId;

    const activity = await prisma.activity.findMany({
        where: {userId},
        orderBy: {createdAt: "desc"},
        take: 20,
    });

    res.json(activity);
});

router.post("/", auth, async (req, res) => {
    const userId = (req as any).user.userId;
    const {action} = req.body;

    const activity = await prisma.activity.create({
        data: {userId, action},
    });

    res.json(activity);
});

export default router;