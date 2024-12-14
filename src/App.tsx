import { Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import "./styles/index.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Login } from "./pages/Auth/Login/Login";
import { Register } from "./pages/Auth/Register/Register";
import { ResetPassword } from "./pages/Auth/ResetPassword/ResetPassword";
import { Logout } from "./pages/Auth/Logout/Logout";
import { NotFound } from "./pages/404/NotFound";

import { Toaster } from "@/components/ui/toaster";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { DashBoardResetPassword } from "./pages/Dashboard/ResetPassword/ResetPassword";
import { SettingsPage } from "./pages/Settings/Settings";
import EditAccountPage from "./pages/Dashboard/EditAccount/EditAccount";
import { ThemeProvider } from "@/components/theme/themeProvider";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <>
            <Toaster />
            <div className="main">
              <Routes>
                {/* dashboad pages */}
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/change-password"
                  element={<DashBoardResetPassword />}
                />
                <Route path="/edit-account" element={<EditAccountPage />} />
                <Route path="/settings" element={<SettingsPage />} />

                {/* auth pages */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route
                  path="/auth/reset-password"
                  element={<ResetPassword />}
                />
                <Route path="/auth/logout" element={<Logout />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
