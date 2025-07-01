import { useLocation } from "react-router-dom";
import MainLayout from "./main-layout";
import React from "react";

export default function ConditionalLayout({ children }) {
    const location = useLocation();
    const isAuthPage = location.pathname.startsWith('/auth');

    if (isAuthPage) {
        return <>{children}</>;
    }

    return <MainLayout>{children}</MainLayout>;
} 