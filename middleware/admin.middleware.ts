import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Check if token is valid
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token missing or invalid" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    console.log("Decoded", decoded)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalid or expired" });
  }
}

// Check role
export function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('Req:', req.user )
    if ((req as any).user?.role !== role)
      return res.status(403).json({ message: "Access denied: insufficient role" });
    next();
  };
}