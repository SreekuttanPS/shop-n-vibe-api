import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.redirect('/admin/admin-login')
  } else {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      if ((decoded as any).role !== "admin") throw new Error("Not an admin");
      (req as any).admin = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: "Forbidden" });
    }
  }
};
