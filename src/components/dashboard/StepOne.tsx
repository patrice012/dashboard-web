import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ReactNode } from "react";

export interface FormData {
  email: string;
  password: string;
}

interface StepOneProps {
  action: "create" | "update";
  defaultValues?: FormData;
  onFormSubmit?: () => void;
  children?: ReactNode;
  onData: (data: FormData) => void;
}

const StepOne = ({
  action,
  defaultValues,
  onFormSubmit,
  onData,
  children,
}: StepOneProps) => {
  const [isHidden, setIsHidden] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      action === "update"
        ? defaultValues
        : {
            email: "",
            password: "",
          },
  });

  // Set default values when in update mode
  useEffect(() => {
    if (action === "update" && defaultValues) {
      setValue("email", defaultValues.email);
      setValue("password", defaultValues.password);
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
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-500">
              {errors.email.message as ReactNode}
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
              {...register("password", {
                required: action === "create" ? "Password is required" : false,
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

            {errors.password && (
              <span className="text-red-500">
                {errors.password.message as ReactNode}
              </span>
            )}
          </div>
        </div>
      </div>

      <DialogFooter className="w-full">
        {children && children}

        {!children && (
          <div className="flex items-center justify-center w-full">
            <Button type="submit">
              {action === "create" ? "Create" : "Update"}
            </Button>
          </div>
        )}
      </DialogFooter>
    </form>
  );
};

export default StepOne;
