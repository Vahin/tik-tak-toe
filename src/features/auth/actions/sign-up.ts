"use server";

import { createUser, sessionService } from "@/entities/user/server";
import { redirect } from "next/navigation";
import { z } from "zod";

type SignUpFormState = {
  formData?: FormData;
  errors?: {
    login?: string;
    password?: string;
    _errors: string;
  };
};

const formDataSchema = z.object({
  login: z.string().min(3),
  password: z.string().min(3),
});

export const signUpAction = async (
  state: SignUpFormState,
  formData: FormData,
): Promise<SignUpFormState> => {
  const data = Object.fromEntries(formData.entries());

  const result = formDataSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.format();

    return {
      formData,
      errors: {
        login: formattedErrors.login?._errors.join(", "),
        password: formattedErrors.password?._errors.join(", "),
        _errors: formattedErrors._errors.join(", "),
      },
    };
  }

  const createUserResult = await createUser(result.data);

  if (createUserResult.type === "right") {
    await sessionService.addSession(createUserResult.value);

    redirect("/");
  }

  return {
    formData,
    errors: {
      _errors: createUserResult.error,
    },
  };
};
