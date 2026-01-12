import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "../config/db";


const router = Router();

router.post("/register", async (req, res) => {
    const {email, password, name } = req.body;

    const existing = await prisma.user.findUnique({ where: {email}});
    if(existing) return res.status(400).json({message: "Email already in use"});

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {email, password: hashed, name},
    });

    res.json({id: user.id, email: user.email})
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await prisma.user.findUnique({ where: {email}});
    if (!user) return res.status(401).json({message: "Invalid credentials"});

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({message: "Invalid credentials"});

    const token = jwt.sign(
        {userId: user.id, role: user.role},
        process.env.JWT_SECRET!,
        {expiresIn: "1h"}
    );

    res.json({token});

});

export default router;