import { Router } from "express";
import { protect } from "../middleware/auth";
import prisma from "../config/prisma";

const router = Router();

router.get("/", protect, async (req: any, res) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications." });
  }
});

router.post("/", protect, async (req: any, res) => {
  const { company, position } = req.body;
  try {
    const application = await prisma.application.create({
      data: {
        company,
        position,
        userId: req.user.id,
      },
    });
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add application." });
  }
});

export default router;