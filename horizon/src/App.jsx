import React from "react";
import {useState} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
// Import the new chat components
// import AuthPage from './views/admin/contact/components/AuthPage';
// import ChatsPage from './views/admin/contact/components/ChatsPage';

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import SignupPage from "views/auth/SIgnup";
import { ProjectProvider } from "context/ProjectContext";
const App = () => {
  const [user, setUser] = useState(undefined);

  return (

    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="auth/sign-up" element={<SignupPage />} />
      <Route path="admin/*" element={<ProjectProvider><AdminLayout /></ProjectProvider>} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* Chat Route */}
      {/* <Route
          path="/chat"
          element={
            !user ? (
              <AuthPage onAuth={(user) => setUser(user)} />
            ) : (
              <ChatsPage user={user} />
            )
          }
        /> */}
    </Routes>
  );
};

export default App;
