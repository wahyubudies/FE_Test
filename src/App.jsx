import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './features/home/components/HomePage';
import NotFound from './components/common/NotFound';
import LoginPage from './features/auth/components/LoginPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import ReportPage from "./features/report/components/ReportPage.jsx";
import GatePage from "./features/gate/components/GatePage.jsx";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Routes with layout */}
      <Route path="/" element={<Layout />}>

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
            <Route index element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/gate" element={<GatePage />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;