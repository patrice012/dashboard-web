import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { ButtonLoading } from "@/components/ui/loadingButton";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import postReq from "@/helpers/postReq";
import { useQueryClient } from "@tanstack/react-query";
import { TwoFactorType } from "../../pages/Dashboard/type";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { FormData as IStepOneFormData } from "./StepOne";
import { FormData as IStepTwoFormData } from "./StepTwo";
import { Button } from "../ui/button";

export function NewTwoFactorCodeDialog({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [user] = useCurrentUser();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [stepOneData, setStepOneData] = useState<IStepOneFormData>({
    email: "",
    password: "",
  });
  const [stepTwoData, setStepTwoData] = useState<IStepTwoFormData>({
    factorCode: "",
  });

  const handleStepOneData = (data: IStepOneFormData) => {
    setStepOneData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const handleStepTwoData = (data: IStepTwoFormData) => {
    setStepTwoData((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };

  const [currentStep, setCurrentStep] = useState(1);

  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const requestData: TwoFactorType = {
        ...stepOneData,
        ...stepTwoData,
        uid: user?.uid || "",
      };

      const response = await postReq({
        data: requestData,
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

      queryClient.invalidateQueries({
        queryKey: ["get-all-twoFactors"],
      });
    } catch (error) {
      const err = error as Error;
      console.log(err.message);
      const errorMsg = err.message;

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg || "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [stepOneData, stepTwoData, user?.uid]);

  // Submit if all fields are filled
  useEffect(() => {
    const stepOneIsFilled = Object.values(stepOneData).every(
      (field) => !!field
    );
    const stepTwoIsFilled = Object.values(stepTwoData).every(
      (field) => !!field
    );
    if (stepOneIsFilled && stepTwoIsFilled) {
      handleFormSubmit();
    }
  }, [stepOneData, stepTwoData, handleFormSubmit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-center w-full">Add new</DialogTitle>
        </DialogHeader>

        {currentStep === 1 ? (
          <StepOne
            onFormSubmit={() => setCurrentStep(2)}
            onData={handleStepOneData}
            action="create"
          >
            <div className="flex items-center justify-center w-full">
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit">Continue</Button>
              )}
            </div>
          </StepOne>
        ) : null}

        {currentStep === 2 ? (
          <StepTwo onData={handleStepTwoData} action="create">
            <div className="flex items-center justify-center gap-10 w-full">
              <Button variant={"outline"} onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              {isLoading ? (
                <ButtonLoading />
              ) : (
                <Button type="submit">save</Button>
              )}
            </div>
          </StepTwo>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
