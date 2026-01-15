import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
const router = Router();
router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log("REGISTER BODY:", req.body);
        if (!email || !password || !name) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.log("Hashing password...");
        const hashed = await bcrypt.hash(String(password), 10);
        console.log("Creating user in DB...");
        const user = await prisma.user.create({
            data: {
                email: String(email),
                password: hashed,
                name: String(name),
            },
        });
        console.log("User created:", user.id);
        await prisma.activity.create({
            data: { userId: user.id, action: "Registered account" },
        });
        res.status(201).json({
            id: user.id,
            email: user.email,
            name: user.name,
        });
    }
    catch (err) {
        console.error("REGISTER ERROR FULL:", err);
        res.status(500).json({ message: "Server error during registration" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const valid = await bcrypt.compare(String(password), user.password);
        if (!valid)
            return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await prisma.activity.create({
            data: { userId: user.id, action: "Logged in" },
        });
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Server error during login" });
    }
});
export default router;
