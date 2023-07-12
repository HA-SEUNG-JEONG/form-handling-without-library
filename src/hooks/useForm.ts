import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
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
  onSubmit: () => void;
}) => {
  const [data, setData] = useState((option?.initialValue || {}) as T);
  const [errors, setErrors] = useState<Errors<T>>({});

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

        if (pattern?.value && isValidString(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;

        if (custom?.isValid && isValidString(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }

        if (!valid) {
          setErrors(newErrors);
          return;
        }

        setErrors({});

        if (option?.onSubmit) option.onSubmit();
      }
    }
  };
  return { data, errors, handleChange, handleSubmit };
};

export default useForm;
