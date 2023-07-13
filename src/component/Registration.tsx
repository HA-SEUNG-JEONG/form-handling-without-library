import useForm from "../hooks/useForm";

import { useEffect, useState } from "react";

interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

const Registration = () => {
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<User>({
    validations: {
      name: {
        pattern: {
          value: /^[A-Za-z]+$/,
          message: "이름에 특수문자는 허용되지 않습니다.",
        },
      },
      age: {
        custom: {
          isValid: (value) => Number(value) > 17,
          message: "나이는 17보다 커야 합니다.",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "비밀번호는 6자 이상이어야 합니다.",
        },
      },
      email: {
        pattern: {
          value: /^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
          message: "유효한 이메일을 입력해주세요.",
        },
      },
    },
  });

  const [isValid, setIsValid] = useState(false);

  const register = (key: keyof User) => ({
    name: key,
    value: user[key] || "",
    onChange: handleChange(key),
  });

  useEffect(() => {
    const isFormEmpty = Object.values(user).every((value) => value === "");
    isFormEmpty ? setIsValid(false) : setIsValid(true);
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" type="text" {...register("name")} />
      {errors.name && <p>{errors.name}</p>}
      <input placeholder="age" type="number" {...register("age")} />
      {errors.age && <p>{errors.age}</p>}
      <input placeholder="Email" type="email" {...register("email")} />
      {errors.email && <p>{errors.email}</p>}
      <input placeholder="Password" type="password" {...register("password")} />
      {errors.password && <p>{errors.password}</p>}
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default Registration;
