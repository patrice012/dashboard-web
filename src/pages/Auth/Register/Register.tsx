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
import { signInWithCredentials } from "@/firebase/credentialsAuth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseAuth as auth } from "@/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { GoogleAuth } from "../GoogleAuth";
import { saveCredentials } from "@/firebase/saveCredentials";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const registrationSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .min(1, "Password is required"),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHidden, setIsHidden] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  // Handle form submission
  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithCredentials(
        data.email,
        data.password
      );

      if (userCredential) {
        const credentials = {
          uid: userCredential.uid,
          email: userCredential.email,
          name: data.name,
        };

        const response = await saveCredentials({
          data: credentials,
          url: "/api/user/create",
        });

        if (response?.ok || response?.status === 201) {
          toast({
            title: "Signin successfully",
          });
          navigate("/");
        } else {
          toast({
            title: "Something went wrong, Try again!",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
      }
    } catch (error) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: err.message.replace(/Firebase|auth|\(|\)/g, ""),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setIsHidden((prev) => !prev);
  };

  // Redirect to homepage if user is already authenticated
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) navigate("/");
    });
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Max" {...register("name")} />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isHidden ? "text" : "password"}
                    placeholder="******"
                    {...register("password")}
                  />
                  {isHidden ? (
                    <AiOutlineEyeInvisible
                      className="absolute right-3 top-[10px] cursor-pointer text-black dark:text-white"
                      onClick={togglePassword}
                    />
                  ) : (
                    <AiOutlineEye
                      className="absolute right-3 top-[10px] cursor-pointer text-black dark:text-white"
                      onClick={togglePassword}
                    />
                  )}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              )}
              <GoogleAuth text="Sign up with Google" />
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
