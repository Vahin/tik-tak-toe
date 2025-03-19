"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/auth-fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormLink } from "../ui/auth-form-link";
import { AuthError } from "../ui/auth-error";
import { signInAction } from "../actions/sign-in";
import { useActionState } from "react";

export const SignInForm = () => {
  const [formState, action, isPending] = useActionState(signInAction, {});

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      action={action}
      fields={
        <AuthFields formData={formState.formData} errors={formState.errors} />
      }
      actions={<SubmitButton isPending={isPending}>Sign in</SubmitButton>}
      link={
        <AuthFormLink
          text="Don't have an account?"
          href="/sign-up"
          linkText="Sign Up"
        />
      }
      error={<AuthError error={formState.errors?._errors} />}
    />
  );
};
