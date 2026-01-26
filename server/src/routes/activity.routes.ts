import { Router, Request } from "express";
import {prisma} from "../config/db";
import { auth } from "../middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

const router = Router();

/**
 * GET /api/activity
 * Query params:
 *  - action?: string
 *  - from?: ISO date string
 *  - to?: ISO date string
 *  - limit?: number (default 20)
 *  - cursor?: string (activity id)
 */

router.get("/", auth, async (req, res) => {
   try{
    const userId = req.user!.userId;

    const {
        action,
        from,
        to,
        limit = "20",
        cursor,
    } = req.query;

    const take = Math.min(parseInt(limit as string, 10), 100);

    const where: any = {
        userId, // user-scoped for now
    };

    if (action) {
        where.action = action;
        }

    if (from || to) {
        where.createdAt = {};
        if (from) where.createdAt.gte = new Date(from as string);
        if (to) where.createdAt.lte = new Date(to as string);
    }

    const activities = await prisma.activity.findMany({
        where,
        orderBy: {createdAt: "desc"},
        take: take + 1,
        ...(cursor && {
            cursor: { id: cursor as string},
            skip: 1,
            
        }),
        select: {
            id: true,
            action: true,
            metadata: true,
            createdAt: true,
        },
    });

    let nextCursor: string | null = null;

    if( activities.length > take) {
        const nextItem = activities.pop();
        nextCursor = nextItem!.id;
    }

    res.json({
        items: activities,
        nextCursor,
    });
} catch (error) {
    console.error("ACTIVITY FETCH ERROR:", error);
    res.status(500).json({message: "Failed to fetch activity log" });
    }
    });
        

export default router;