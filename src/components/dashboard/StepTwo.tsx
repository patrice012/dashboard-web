import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ReactNode } from "react";

export interface FormData {
  factorCode: string;
}

interface StepTwoProps {
  action: "create" | "update";
  defaultValues?: FormData;
  onFormSubmit?: () => void;
  onData: (data: FormData) => void;
  children?: ReactNode;
}

const StepTwo = ({
  action,
  defaultValues,
  onFormSubmit,
  onData,
  children,
}: StepTwoProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultValues || { factorCode: "" },
  });

  useEffect(() => {
    if (action === "update" && defaultValues) {
      setValue("factorCode", defaultValues.factorCode);
      onData(defaultValues);
    }
  }, [action, defaultValues, setValue, onData]);

  const handleFormSubmit = (data: FormData) => {
    onData(data);
    if (onFormSubmit) onFormSubmit();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-5 py-4">
        <div className="grid gap-2">
          <Label htmlFor="factorCode">2 Factor Code</Label>
          <Input
            id="factorCode"
            type="text"
            placeholder="Enter your 2FA code"
            {...register("factorCode", {
              required: "2FA Code is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "Please enter a valid 6-digit code",
              },
            })}
          />
          {errors.factorCode && (
            <span className="text-red-500">
              {errors.factorCode.message as ReactNode}
            </span>
          )}
        </div>
      </div>

      <DialogFooter>
        {children || (
          <div className="flex items-center justify-center w-full">
            <Button type="submit">
              {action === "create" ? "Verify" : "Update"}
            </Button>
          </div>
        )}
      </DialogFooter>
    </form>
  );
};

export default StepTwo;
