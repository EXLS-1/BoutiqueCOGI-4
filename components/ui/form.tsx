"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/components/ui/cn";

/* ------------------------------------------------------------------ */
/*  FormLabel — accessible label primitif (Radix Label)               */
/* ------------------------------------------------------------------ */

type FormLabelProps = React.ComponentPropsWithoutRef<
  typeof LabelPrimitive.Root
>;

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  ),
);
FormLabel.displayName = LabelPrimitive.Root.displayName;

/* ------------------------------------------------------------------ */
/*  FormInput — champ de saisie                                       */
/* ------------------------------------------------------------------ */

type FormInputProps = React.ComponentPropsWithoutRef<"input">;

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  },
);
FormInput.displayName = "FormInput";

/* ------------------------------------------------------------------ */
/*  FormMessage — message d'erreur                                    */
/* ------------------------------------------------------------------ */

type FormMessageProps = React.ComponentPropsWithoutRef<"div">;

const FormMessage = React.forwardRef<HTMLDivElement, FormMessageProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    />
  ),
);
FormMessage.displayName = "FormMessage";

/* ------------------------------------------------------------------ */
/*  FormField — conteneur de champ (label + contrôle + message)       */
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
/*  useForm — hook de formulaire avec validation Zod                  */
/* ------------------------------------------------------------------ */

export type UseFormReturn<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  submitError: string | null;
  setValue: (key: keyof T, value: unknown) => void;
  handleSubmit: (
    handler: (values: T) => void | Promise<void>,
  ) => (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  register: (key: keyof T) => {
    name: string;
    value: unknown;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
};

export function useForm<T extends Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
}: {
  schema: {
    safeParse: (data: unknown) => {
      success: boolean;
      error?: { issues: { path: (string | number)[]; message: string }[] };
      data?: T;
    };
  };
  defaultValues: T;
  onSubmit: (values: T) => void | Promise<void>;
}): UseFormReturn<T> {
  const [values, setValues] = React.useState<T>(defaultValues);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof T, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const setValue = (key: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [key]: value } as T));
    if (errors[key] !== undefined) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit =
    (handler: (values: T) => void | Promise<void>) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(null);
      setIsSubmitting(true);
      const result = schema.safeParse(values);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of (result.error?.issues ?? [])) {
          const path = issue.path[0];
          if (path !== undefined) {
            fieldErrors[String(path)] = issue.message;
          }
        }
        setErrors(fieldErrors as Partial<Record<keyof T, string>>);
        setIsSubmitting(false);
        return;
      }
      try {
        await handler(result.data as T);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Une erreur est survenue.";
        setSubmitError(message);
      } finally {
        setIsSubmitting(false);
      }
    };

  const register = (key: keyof T) => ({
    name: String(key),
    value: values[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(key, e.target.value),
    onBlur: () => {},
  });

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    setValue,
    handleSubmit,
    register,
  };
}

/* ------------------------------------------------------------------ */
/*  Form — élément <form>                                             */
/* ------------------------------------------------------------------ */

type FormProps = React.ComponentPropsWithoutRef<"form">;

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => (
    <form ref={ref} className={cn(className)} {...props} />
  ),
);
Form.displayName = "Form";

export { Form, FormField, FormLabel, FormInput, FormMessage };

type FormFieldProps = {
  name: string;
  label?: string;
  error?: string | null;
  children: React.ReactNode;
};

function FormField({
  name,
  label,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {React.cloneElement(children as React.ReactElement, { id: name, name } as Record<string, unknown>)}
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
}

