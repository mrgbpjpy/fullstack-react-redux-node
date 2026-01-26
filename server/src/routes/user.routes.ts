import { Router } from "express";
import bcrypt from "bcrypt";
import { auth } from "../middleware/auth";
import { prisma } from "../config/db";

const router = Router();

router.get("/me", auth, async (req, res) => {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});

router.put("/me", auth, async (req, res) => {
    const userId = (req as any).user.userId;
    const { name, email } = req.body as { name?: string; email?: string };

    if (!name || !email) {
        return res.status(400).json({ message: "name and email are required" });
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
        select: { id: true, email: true, name: true, role: true },
    });

    res.json(user);
});

router.put("/password", auth, async (req, res) => {
    const userId = (req as any).user.userId;
    const { currentPassword, newPassword } = req.body as {
        currentPassword?: string;
        newPassword?: string;
    };

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "currentPassword and newPassword are required" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(401).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: userId },
        data: { password: hashed },
    });

    res.json({ message: "Password updated" });
});

export default router;