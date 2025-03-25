"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/auth-fields";
import { SubmitButton } from "../ui/submit-button";
import { AuthFormLink } from "../ui/auth-form-link";
import { AuthError } from "../ui/auth-error";
import { signUpAction } from "../actions/sign-up";
import { useActionState } from "react";
import { routes } from "@/kernel/routes";

export const SignUpForm = () => {
  const [formState, action, isPending] = useActionState(signUpAction, {});

  return (
    <AuthFormLayout
      title="Create an account"
      description="Enter your email and create a password to get started"
      action={action}
      fields={
        <AuthFields formData={formState.formData} errors={formState.errors} />
      }
      actions={<SubmitButton isPending={isPending}>Sign up</SubmitButton>}
      link={
        <AuthFormLink
          text="Already have an account?"
          href={routes.signIn()}
          linkText="Sign In"
        />
      }
      error={<AuthError error={formState.errors?._errors} />}
    />
  );
};
