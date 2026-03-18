import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { Layout } from "./components/Layout.tsx";
import App from "./App.tsx";
import "./styles/globals.css";

const Experiments = lazy(() => import("./pages/Experiments.tsx"));
const CarromGame = lazy(() => import("./pages/CarromGame.tsx"));
const MarbleSolitaire = lazy(() => import("./pages/MarbleSolitaire.tsx"));
const Terminal = lazy(() => import("./pages/Terminal.tsx"));
const Projects = lazy(() => import("./pages/Projects.tsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.tsx"));

const LazyFallback = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#1a1612', color: '#fff' }}>Loading...</div>
);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-center" richColors />
    <Layout>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/projects"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Projects />
            </Suspense>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={<LazyFallback />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        <Route
          path="/experiments"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Experiments />
            </Suspense>
          }
        />
        <Route
          path="/experiments/carroms"
          element={
            <Suspense fallback={<LazyFallback />}>
              <CarromGame />
            </Suspense>
          }
        />
        <Route
          path="/experiments/terminal"
          element={
            <Suspense fallback={<LazyFallback />}>
              <Terminal />
            </Suspense>
          }
        />
        <Route
          path="/experiments/marble-solitaire"
          element={
            <Suspense fallback={<LazyFallback />}>
              <MarbleSolitaire />
            </Suspense>
          }
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);
