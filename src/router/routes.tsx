import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from "../auth/authRouter/ProectedRoute.tsx";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const ForbiddenPage = lazy(() => import('../components/pages/error/ForbiddenPage.tsx'));
const shirt = lazy(() => import('../components/3dComponents/shirt.tsx'));
const updload = lazy(() => import('../components/pages/canvas/imageUpload.tsx'));
const dashBoard = lazy(() => import('../components/pages/dashboard/dashboard.tsx'));

export function Rotas() {
    return (
        <Suspense fallback={<Spin size="large" />}>
            <Routes>
                <Route path="/updload" element={<ProtectedRoute component={dashBoard} />} />
                <Route path="/404" element={<ProtectedRoute component={ForbiddenPage} />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Suspense>
    );
}
