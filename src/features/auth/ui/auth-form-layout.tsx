import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type AuthFormLayoutProps = {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error?: React.ReactNode;
  action: (formData: FormData) => void;
};

export const AuthFormLayout = (props: AuthFormLayoutProps) => {
  const { title, description, fields, actions, link, error, action } = props;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          {fields}
          {error}
          {actions}
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">{link}</CardFooter>
    </Card>
  );
};
