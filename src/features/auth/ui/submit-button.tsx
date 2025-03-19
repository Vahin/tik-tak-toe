import { Button } from "@/shared/ui/button";

type AuthFormLayoutProps = {
  children: React.ReactNode;
  isPending?: boolean;
};

export const SubmitButton = (props: AuthFormLayoutProps) => {
  const { children, isPending } = props;

  return (
    <Button disabled={isPending} type="submit" className="w-full">
      {children}
    </Button>
  );
};
