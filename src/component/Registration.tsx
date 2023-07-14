import { validationRules } from "../data/validationRules";
import useForm from "../hooks/useForm";

import { useEffect, useState } from "react";

interface User {
  name: string;
  age: number;
  email: string;
  password: string;
}

const Registration = () => {
  const [isValid, setIsValid] = useState(false);
  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm<User>({ validations: validationRules });

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
