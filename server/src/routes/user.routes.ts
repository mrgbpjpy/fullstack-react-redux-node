import { Router } from "express";
import { auth } from "../middleware/auth";
import  {prisma}  from "../config/db";

const router = Router();

router.get("/me", auth, async (req, res) => {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {id: true, email: true, name: true, role: true},
    });

    res.json(user);
});

export default router;