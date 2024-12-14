import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// firebase auth comps
import { logoutFirebase } from "@/firebase/credentialsAuth";
import { FirebaseAuth as auth } from "@/firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { Button } from "@/components/ui/button";

export const Logout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // logout
      const isLogout: unknown = await logoutFirebase();

      if (isLogout) {
        setIsLoading(false);
        toast({
          title: "You have been logged out successfully",
        });
      }
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
        title: errorMsg || "There was a problem with your request.",
      });
      setIsLoading(false);
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
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3 text-center">
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            This action cannot be undone. Logging out will end your current
            session.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4 justify-center mt-4">
          <Button asChild variant="outline">
            <Link to="/">Cancel</Link>
          </Button>
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button onClick={handleLogout}>Continue</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
