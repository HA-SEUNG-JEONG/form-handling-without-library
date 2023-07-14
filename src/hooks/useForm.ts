import React, { useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type Errors<T> = Partial<Record<keyof T, string>>;

type Validations<T> = Partial<Record<keyof T, Validation>>;

const useForm = <T>(option?: {
  validations?: Validations<T>;
  initialValue?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState((option?.initialValue || {}) as T);
  const [errors, setErrors] = useState<Errors<T>>({});
  const isSubmitting = false;

  const handleChange =
    (key: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({ ...prevData, [key]: event.target.value }));
    };

  const isValidString = (value: unknown) => typeof value === "string";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationOption = option?.validations;

    if (validationOption) {
      for (const key in validationOption) {
        const value = data[key];
        const validation = validationOption[key];

        const setValidationError = (key: string, message: string) =>
          setErrors((prevErrors) => ({ ...prevErrors, [key]: message }));

        if (validation?.required?.value && !value) {
          setValidationError(key, validation?.required?.message);
          return;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !pattern?.value?.test(value as string)) {
          setValidationError(key, pattern?.message);
          return;
        }
        const custom = validation?.custom;

        if (
          custom?.isValid &&
          (!isValidString(value) || !custom?.isValid(value as string))
        ) {
          setValidationError(key, custom?.message);
          return;
        }

        setErrors({});

        if (!isSubmitting) {
          alert("제출되었습니다!");
          return;
        }
      }
    }
  };
  return { data, errors, handleChange, handleSubmit };
};

export default useForm;
