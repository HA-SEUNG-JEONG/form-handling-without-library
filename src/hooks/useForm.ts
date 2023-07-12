import { ChangeEvent, FormEvent, useState } from "react";

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
    (key: keyof T) => (event: ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [key]: event.target.value });
    };

  const isValidString = (value: unknown) => typeof value === "string";

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationOption = option?.validations;

    if (validationOption) {
      let valid = true;
      const newErrors: Errors<T> = {};
      for (const key in validationOption) {
        const value = data[key];
        const validation = validationOption[key];

        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;

        if (pattern?.value && !pattern.value.test(value as string)) {
          valid = false;
          newErrors[key] = pattern.message;
        }
        const custom = validation?.custom;

        if (
          custom?.isValid &&
          (!isValidString(value) || !custom?.isValid(value as string))
        ) {
          valid = false;
          newErrors[key] = custom?.message;
        }

        if (!valid) {
          setErrors(newErrors);
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
  return { data, errors, handleChange, handleSubmit, isSubmitting };
};

export default useForm;
