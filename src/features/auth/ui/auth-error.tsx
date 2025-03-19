import { Alert, AlertDescription } from "@/shared/ui/alert";
import { AlertCircle } from "lucide-react";

type AuthErrorProps = {
  error?: string;
};

export const AuthError = ({ error }: AuthErrorProps) => {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return null;
};
