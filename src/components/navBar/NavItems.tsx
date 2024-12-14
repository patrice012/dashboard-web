import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package2,
  Settings,
  LogOut,
} from "lucide-react";
import { AlertLogoutDialog } from "../auth/LogoutDialog";

export function DesktopNavBar() {
  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <LogoutUI />
      </div>
    </>
  );
}

export function MobileNavBar() {
  return (
    <>
      <nav className="grid gap-2 text-lg font-medium">
        <Link to="#" className="flex items-center gap-2 text-lg font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to="/"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Home className="h-5 w-5" />
          Home
        </Link>

        <Link
          to="/settings"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </nav>
      <div className="mt-auto">
        <LogoutUI />
      </div>
    </>
  );
}

export function LogoutUI() {
  return (
    <AlertLogoutDialog>
      <Button size="lg" className="w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </AlertLogoutDialog>
  );
}
