import { MoreVertical, LockKeyhole, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/components/dashboard/Layout";
import { AlertLogoutDialog } from "@/components/auth/LogoutDialog";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Link } from "react-router-dom";
import { RemoveAccountDialog } from "@/components/auth/RemoveAccountDialog";
import { useState, useEffect } from "react";
import { SettingsCardSkeleton } from "@/components/dashboard/SettingsCardSkeleton";
import { NotFoundData } from "@/components/request/NotFoundData";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

export function SettingsPage() {
  const [user] = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);
  return (
    <DashboardLayout>
      <>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="space-y-4">
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Forgot Your Password?</CardTitle>
                    <CardDescription className="text-balance max-w-lg leading-relaxed">
                      No worries! If you’ve forgotten your password or just want
                      to change it, we can help you get back into your account.
                      Click the button below to reset your password.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link to="/change-password" className="flex items-center">
                        <LockKeyhole className="h-4 w-4 mr-2" />
                        Reset password
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                  <CardHeader className="pb-3">
                    <CardTitle>Want to Logout?</CardTitle>
                    <CardDescription className="text-balance max-w-lg leading-relaxed">
                      If you're finished with your session or want to log out
                      for security reasons, you can easily do so. Click the
                      button below to log out of your account.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <AlertLogoutDialog>
                      <Button>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </AlertLogoutDialog>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className="sm:col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
              <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
                <CardHeader className="flex flex-row items-center bg-muted/50 py-2">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Profile
                    </CardTitle>
                  </div>
                  {user ? (
                    <div className="ml-auto flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              to="/edit-account"
                              className="flex items-center"
                            >
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <RemoveAccountDialog>
                            <DropdownMenuLabel className="cursor-pointer font-[500] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-sm">
                              Delete
                            </DropdownMenuLabel>
                          </RemoveAccountDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : null}
                </CardHeader>
                {isLoading ? <SettingsCardSkeleton /> : null}
                {user ? (
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Profile Information</div>
                      <ul className="grid gap-3">
                        {user?.displayName ? (
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Name</span>
                            <span>{user?.displayName}</span>
                          </li>
                        ) : null}
                        {user?.email ? (
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span>{user?.email}</span>
                          </li>
                        ) : null}

                        {user?.phoneNumber ? (
                          <li className="flex items-center justify-between">
                            <span className="text-muted-foreground">
                              Phone number
                            </span>
                            <span>{user?.phoneNumber}</span>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-3">
                      <div className="font-semibold">History Information</div>
                      <dl className="grid gap-3">
                        {user?.metadata?.creationTime ? (
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                              Registration Date
                            </dt>
                            <dd>{user?.metadata.creationTime}</dd>
                          </div>
                        ) : null}
                        {user?.metadata?.lastSignInTime ? (
                          <div className="flex items-center justify-between">
                            <dt className="text-muted-foreground">
                              Last login
                            </dt>
                            <dd>{user?.metadata.lastSignInTime}</dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>
                  </CardContent>
                ) : null}
                {!isLoading && !user ? <NotFoundData /> : null}
              </Card>
            </div>
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
