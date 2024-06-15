import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Layout from '@/layout/Layout';
import Loading from '@/components/Loading';
import { eventBus } from '@/api/eventBus';

const Login = lazy(() => import('../pages/auth/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));

//! - SUBEYONETIMI
const FirmaYonetimi = lazy(() => import('../pages/firmaYonetimi'));
const SubeYonetimi = lazy(() => import('../pages/subeYonetimi'));
const GrifinYonetimi = lazy(() => import('../pages/grifinYonetimi'));

//? - KARTLAR -----------------------------------------------------------
const Kartlar = lazy(() => import('../pages/kartlar'));
const Firma = lazy(() => import('../pages/kartlar/firma'));
const FirmaProfile = lazy(() => import('../pages/kartlar/firma/Profile'));
const Sube = lazy(() => import('../pages/kartlar/sube'));
const SubeProfile = lazy(() => import('../pages/kartlar/sube/Profile'));
const Pozisyon = lazy(() => import('../pages/kartlar/pozisyon'));

const MainRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorized = () => {
      navigate('/login');
    };
    eventBus.on('unauthorized', handleUnauthorized);
    return () => {
      eventBus.off('unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        //? - DASHBOARD -------------------------------------------------
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
        //! - GRIFINYONETIMI ---------------------------------------------
        <Route path="grifinyonetimi" element={<GrifinYonetimi />} />
        <Route path="firma" element={<Firma />} />
        <Route path="sube" element={<Sube />} />
        <Route path="kullanici" element={<Firma />} />
        <Route path="pozisyon" element={<Pozisyon />} />
        //? - FIRMAYONETIMI ----------------------------------------------
        <Route path="firmayonetimi" element={<FirmaYonetimi />} />
        <Route path="sube" element={<Sube />} />
        <Route path="kullanici" element={<Firma />} />
        <Route path="pozisyon" element={<Pozisyon />} />
        //? - SUBEYONETIMI -----------------------------------------------
        <Route path="subeyonetimi" element={<SubeYonetimi />} />
        <Route path="kullanici" element={<Firma />} />
        <Route path="pozisyon" element={<Pozisyon />} />
        //? - KARTLAR ----------------------------------------------------
        <Route path="kartlar" element={<Kartlar />} />
        <Route path="pozisyon" element={<Pozisyon />} />
        //* - DETAYSAYFALARI ---------------------------------------------
        <Route path="firma/:id" element={<FirmaProfile />} />
        <Route path="sube/:id" element={<SubeProfile />} />
        <Route path="kullanici/:id" element={<FirmaProfile />} />
      </Route>

      <Route
        path="/login"
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default MainRoutes;
