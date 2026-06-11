import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="ootd" element={<OOTDPage />} />
          <Route path="settings" element={<Navigate to="/settings/general" replace />} />
          <Route path="settings/:tab" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
