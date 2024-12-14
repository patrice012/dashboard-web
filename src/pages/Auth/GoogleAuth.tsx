import { useToast } from "@/hooks/use-toast";
import { signinWithGoogle } from "@/firebase/googleAuth";
import { ToastAction } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { saveCredentials } from "@/firebase/saveCredentials";

export function GoogleAuth({ text }: { text: string }) {
  const { toast } = useToast();
  // login with google
  const googleLogin = async (e: {
    stopPropagation: () => void;
    preventDefault: () => void;
  }) => {
    e.stopPropagation();
    e.preventDefault();
    
    try {
      const user = await signinWithGoogle();
      if (user) {
        const data = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        };

        const response = await saveCredentials({
          data,
          url: "/api/user/create",
        });

        console.log(response, "response");
        if (response?.ok || response?.status === 201) {
          toast({
            title: "Login successfully",
          });
        } else {
          toast({
            title: "Something went wrong, Try again!",
          });
        }
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
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
        title: "Uh oh! Something went wrong.",
        description: errorMsg || "There was a problem with your request.",
      });
    }
  };
  return (
    <Button onClick={googleLogin} variant="outline" className="w-full">
      <FcGoogle className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
}
