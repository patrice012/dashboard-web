import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import postReq from "@/helpers/postReq";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface StepOneFormData {
  email: string;
  password: string;
}

interface StepTwoFormData {
  factorCode: string;
}

export function CreateTwoFactorCodeDialog({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = useQueryClient();
  const [user] = useCurrentUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    factorCode: string;
    uid: string;
  }>({
    email: "",
    password: "",
    factorCode: "",
    uid: user?.uid || "",
  });

  // Step One Form
  const {
    register: registerStepOne,
    handleSubmit: handleSubmitStepOne,
    reset: stepOneFormReset,
    formState: { errors: errorsStepOne },
    trigger: triggerStepOne,
  } = useForm<StepOneFormData>();

  // Step Two Form
  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    reset: stepTwoFormReset,
    formState: { errors: errorsStepTwo },
    trigger: triggerStepTwo,
  } = useForm<StepTwoFormData>();

  // Validate first step before moving to next step
  const handleStepOneSubmit = async (data: StepOneFormData) => {
    // Trigger validation
    const isValid = await triggerStepOne();

    if (isValid) {
      setFormData((prev) => ({ ...prev, ...data }));
      setCurrentStep(2);
    }
  };

  // Handle final form submission
  const handleStepTwoSubmit = async (data: StepTwoFormData) => {
    // Trigger validation for step two
    const isValid = await triggerStepTwo();

    if (isValid) {
      try {
        setIsLoading(true);

        const submitData = {
          ...formData,
          ...data,
        };

        const response = await postReq({
          data: { ...submitData, uid: user?.uid || "" },
          url: "/api/twoFactor/create",
        });

        if (!response?.ok) {
          toast({
            title: "Something went wrong, Try again!",
          });
          return;
        }

        toast({
          title: "2 Factor Code created successfully",
        });

        setOpen(false);
        stepOneFormReset();
        stepTwoFormReset();
        setCurrentStep(1);

        queryClient.invalidateQueries({
          queryKey: ["get-all-twoFactors", 1],
        });
      } catch (error) {
        const err = error as Error;
        const errorMsg = err.message;

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMsg || "There was a problem with your request.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center w-full">Create 2FA</DialogTitle>
        </DialogHeader>

        {currentStep === 1 ? (
          <form onSubmit={handleSubmitStepOne(handleStepOneSubmit)}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...registerStepOne("email", {
                    required: "Email is required",
                  })}
                />
                {errorsStepOne.email && (
                  <span className="text-red-500">
                    {errorsStepOne.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={isHidden ? "password" : "text"}
                    placeholder="******"
                    {...registerStepOne("password", {
                      required: "Password is required",
                    })}
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
                  {errorsStepOne.password && (
                    <span className="text-red-500">
                      {errorsStepOne.password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="w-full">
              <div className="flex items-center justify-center w-full">
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button type="submit">Continue</Button>
                )}
              </div>
            </DialogFooter>
          </form>
        ) : null}

        {currentStep === 2 ? (
          <form onSubmit={handleSubmitStepTwo(handleStepTwoSubmit)}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-2">
                <Label htmlFor="factorCode">2 Factor Code</Label>
                <Input
                  id="factorCode"
                  type="text"
                  placeholder="Enter your 2FA code"
                  {...registerStepTwo("factorCode", {
                    required: "2FA Code is required",
                  })}
                />
                {errorsStepTwo.factorCode && (
                  <span className="text-red-500">
                    {errorsStepTwo.factorCode.message}
                  </span>
                )}
              </div>
            </div>

            <DialogFooter>
              <div className="flex items-center justify-center gap-10 w-full">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                {isLoading ? (
                  <ButtonLoading />
                ) : (
                  <Button type="submit">Create</Button>
                )}
              </div>
            </DialogFooter>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
