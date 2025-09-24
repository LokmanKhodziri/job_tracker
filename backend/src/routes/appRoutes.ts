import { Router } from "express";
import { protect } from "../middleware/auth";
import { getDashboardStats } from "../controllers/appController";
import prisma from "../config/prisma";

const router = Router();

// Route to get dashboard statistics
router.get("/stats", protect, getDashboardStats);

// Route to get all applications for the authenticated user
router.get("/", protect, async (req: any, res) => {
  try {
    const { status } = req.query;
    const whereClause: any = { userId: req.user.id };

    if (status && status !== "ALL") {
      whereClause.status = status;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications." });
  }
});

// Route to add a new application
router.post("/", protect, async (req: any, res) => {
  const { company, position, status, notes } = req.body;
  try {
    const application = await prisma.application.create({
      data: {
        company,
        position,
        status,
        notes,
        userId: req.user.id,
      },
    });
    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add application." });
  }
});

// Route to update an existing application
router.put("/:id", protect, async (req: any, res) => {
  const { id } = req.params;
  const { company, position, status, notes } = req.body;
  console.log(`Updating application with id: ${id}`);
  try {
    const application = await prisma.application.update({
      where: {
        id: parseInt(id),
      },
      data: {
        company,
        position,
        status,
        notes,
      },
    });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to update application." });
  }
});

// Route to delete an application
router.delete("/:id", protect, async (req: any, res) => {
  const { id } = req.params;
  try {
    await prisma.application.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete application." });
  }
});


export default router;