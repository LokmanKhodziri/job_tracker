import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: "User already registered", error });
    }
};

// Log in a user
export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
};