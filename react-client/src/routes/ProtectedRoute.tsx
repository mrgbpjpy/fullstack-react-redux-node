import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import type { JSX } from "react";

export function ProtectedRoute({children}: {children: JSX.Element}){
    const token = useAppSelector((s) => s.auth.token);
    if (!token) return <Navigate to="/" replace/>;
    return children;
}