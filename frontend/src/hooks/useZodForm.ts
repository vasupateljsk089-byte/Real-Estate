import { useState, useCallback } from "react";
import { z, ZodType } from "zod";

export function useZodForm<T extends ZodType<any, any, any>>(schema: T) {
  type FormData = z.infer<T>;

  const [values, setValues] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const validate = useCallback(
    (data: Partial<FormData>) => {
      const result = schema.safeParse(data);

      if (result.success) {
        setErrors({});
        return true;
      }

      const fieldErrors = result.error.flatten().fieldErrors;
      const nextErrors: typeof errors = {};

      for (const key in fieldErrors) {
        if (touched[key as keyof FormData]) {
          nextErrors[key as keyof FormData] =
            fieldErrors[key]?.[0];
        }
      }

      setErrors(nextErrors);
      return false;
    },
    [schema, touched]
  );

  const register = (name: keyof FormData) => ({
    value: values[name] ?? "",
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
    },
    onBlur: () => {
      setTouched((t) => ({ ...t, [name]: true }));
      validate(values);
    },
  });

  const isValid = schema.safeParse(values).success;

  return {
    values,
    errors,
    isValid,
    register,
  };
}
