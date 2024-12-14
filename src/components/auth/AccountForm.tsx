import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserProfile } from "@/firebase/updateProfile";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { ButtonLoading } from "../ui/loadingButton";
import postReq from "@/helpers/postReq";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const [user] = useCurrentUser();
  const [formDefaultValues, setFormDefaultValues] = useState<
    Partial<AccountFormValues>
  >({});

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: formDefaultValues,
  });

  const { toast } = useToast();

  // Fetch user data and set default values
  useEffect(() => {
    if (user) {
      const defaultValues = {
        name: user?.displayName || "",
        email: user?.email || "",
      };
      setFormDefaultValues(defaultValues);
      form.reset(defaultValues);
    }
  }, [user, form]);

  async function onSubmit(data: AccountFormValues) {
    try {
      setIsLoading(true);

      const response = await updateUserProfile({
        displayName: data.name,
        email: data.email,
      });

      if (response) {
        await postReq({
          data: { uid: user?.uid, email: data.email, name: data.name },
          url: "/api/user/update",
        });
        toast({
          title: "Profile updated successfully",
        });
        setIsLoading(false);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
        });
        setIsLoading(false);
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
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button type="submit">Update account</Button>
        )}
      </form>
    </Form>
  );
}
