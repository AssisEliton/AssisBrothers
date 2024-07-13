import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from "../auth/authRouter/ProectedRoute.tsx";
import { lazy, Suspense } from "react";
import { Spin } from "antd";

const ForbiddenPage = lazy(() => import('../components/pages/error/ForbiddenPage.tsx'));

export function Rotas() {
    return (
        <Suspense fallback={<Spin size="large" />}>
            <Routes>
                <Route path="/404" element={<ProtectedRoute component={ForbiddenPage} />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
        </Suspense>
    );
}
