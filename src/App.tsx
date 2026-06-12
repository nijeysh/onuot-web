import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';
import { Dashboard, CalendarPage, ChatPage, OOTDPage, SettingsPage, LoginPage, AuthCallbackPage } from './components/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="auth/callback" element={<AuthCallbackPage />} />
          <Route path="calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
          <Route path="ootd" element={<ProtectedRoute><OOTDPage /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Navigate to="/settings/general" replace /></ProtectedRoute>} />
          <Route path="settings/:tab" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
