import { Link, useNavigate } from "react-router-dom";
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
import { loginWithCredentials } from "@/firebase/credentialsAuth";
import { FirebaseAuth as auth } from "@/firebase/config";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "@/components/ui/loadingButton";
// import { GoogleAuth } from "../GoogleAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Handle form submission
  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const credentials = await loginWithCredentials(data.email, data.password);

      if (credentials) {
        toast({
          title: "Login successfully",
        });
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    } catch (error) {
      const err = error as Error;
      const errorMsg = err.message
        .replace("Firebase:", "")
        .replace("Error", "")
        .replace("(", "")
        .replace(")", "")
        .replace("auth", "")
        .replace("/", "");

      toast({
        variant: "destructive",
        title: errorMsg || "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/reset-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={isHidden ? "password" : "text"}
                  placeholder="******"
                  {...register("password")}
                />
                {isHidden ? (
                  <AiOutlineEyeInvisible
                    className="absolute right-3 top-[10px] cursor-pointer text-black dark:text-white"
                    onClick={() => setIsHidden(!isHidden)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute right-3 top-[10px] cursor-pointer text-black dark:text-white"
                    onClick={() => setIsHidden(!isHidden)}
                  />
                )}
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}

            {/* <GoogleAuth text="Login with Google" /> */}
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
