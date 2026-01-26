import { prisma } from "../config/db";

export const ActivityActions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REGISTER: "REGISTER",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  UPDATE_CONFIG: "UPDATE_CONFIG",
  DEBUG_ERROR: "DEBUG_ERROR",
} as const;

type ActivityAction = typeof ActivityActions[keyof typeof ActivityActions];

interface LogActivityParams {
    userId: string;
    action: ActivityAction;
    metadata?: Record<string, any>;
}

export async function logActivity({
    userId,
    action,
    metadata,
}: LogActivityParams) {
    try{
        await prisma.activity.create({
            data: {
                userId,
                action,
                metadata,
            },
        });
    }catch (error) {
        //IMPORTANT: never break auth flows because logging failed
        console.error ("Activity Logging failed:", error);
    }
}
