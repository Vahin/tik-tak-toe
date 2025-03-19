import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { useId } from "react";

type AuthFieldsProps = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
  };
};

export const AuthFields = (props: AuthFieldsProps) => {
  const { formData, errors } = props;
  const loginId = useId();
  const passwordId = useId();

  const loginDefault = formData?.get("login")
    ? String(formData?.get("login"))
    : "";

  const passwordDefault = formData?.get("password")
    ? String(formData?.get("password"))
    : "";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="login"
          name="login"
          placeholder="login"
          defaultValue={loginDefault}
          required
        />
        {errors?.login && <div>{errors.login}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          name="password"
          type="password"
          defaultValue={passwordDefault}
          required
        />
        {errors?.password && <div>{errors.password}</div>}
      </div>
    </>
  );
};
