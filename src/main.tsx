import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./styles/globals.css";

const CarromGame = lazy(() => import("./pages/CarromGame.tsx"));

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-center" richColors />
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/carroms"
        element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1612', color: '#fff' }}>Loading...</div>}>
            <CarromGame />
          </Suspense>
        }
      />
    </Routes>
  </BrowserRouter>
);
