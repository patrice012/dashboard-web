import { AccountForm } from "@/components/auth/AccountForm";
import { DashboardLayout } from "@/components/dashboard/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EditAccountPage() {
  return (
    <DashboardLayout>
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Account</CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <AccountForm />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
