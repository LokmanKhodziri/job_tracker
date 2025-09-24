import { Request, Response } from "express";
import prisma from "../config/prisma";

// Create a new application for the logged-in user
export const createApplication = async (req: Request, res: Response) => {
  const { company, position, status, notes } = req.body;
  try {
    const app = await prisma.application.create({
      data: {
        company,
        position,
        status,
        notes,
        userId: (req as any).user.id,
      },
    });
    res.status(201).json({ application: app });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Failed to create application." });
  }
};

// Get all applications for the logged-in user
export const getApplications = async (req: Request, res: Response) => {
  try {
    const apps = await prisma.application.findMany({
      where: { userId: (req as any).user.id },
    });
    res.status(200).json({ applications: apps });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Failed to fetch applications." });
  }
};

// Get dashboard statistics for the logged-in user
export const getDashboardStats = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const totalApplications = await prisma.application.count({
      where: { userId },
    });

    const upcomingInterviews = await prisma.application.count({
      where: { userId, status: "INTERVIEWING" },
    });

    const rejectedApplications = await prisma.application.count({
      where: { userId, status: "REJECTED" },
    });

    res.status(200).json({
      totalApplications,
      upcomingInterviews,
      rejectedApplications,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Failed to fetch dashboard statistics." });
  }
};
