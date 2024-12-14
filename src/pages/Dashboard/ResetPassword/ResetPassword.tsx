import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FirebaseAuth as auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { DashboardLayout } from "@/components/dashboard/Layout";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export function DashBoardResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // login data
  const [loginData, setLoginData] = useState({
    email: "",
  });

  // login with email and password
  const handleResetPassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // chgeck if all inputs are filled
    if (loginData.email === "") {
      toast({
        title: "Email is required",
      });
      return;
    }

    // loader
    setIsLoading(true);

    // register the user
    try {
      await sendPasswordResetEmail(auth, loginData.email);
      toast({
        title: "Reset password link was send to provided email.",
      });
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      const errorMsg = err.message
        .replace("Firebase:", "")
        .replace("Error", "")
        .replace("(", "")
        .replace(")", "")
        .replace("auth", "")
        .replace("/", "");

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg || "There was a problem with your request.",
      });
      setIsLoading(false);
      navigate("/auth/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("/auth/login");
    });
  }, []);

  return (
    <DashboardLayout>
      <div>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter your email below to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({
                      ...loginData,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button
                  onClick={handleResetPassword}
                  type="submit"
                  className="w-full"
                >
                  Reset password
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
