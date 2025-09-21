import { Request, Response } from "express";
import prisma from "../config/prisma";

// Get all applications for the logged-in user
export const createApplication = async (req: Request, res: Response) => {
  const { company, position, status, notes } = req.body;
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
};

export const getApplications = async (req: Request, res: Response) => {
  const apps = await prisma.application.findMany({
    where: { userId: (req as any).user.id },
  });
  res.status(200).json({ applications: apps });
};
