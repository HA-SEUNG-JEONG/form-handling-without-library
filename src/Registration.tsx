import useForm from "./hooks/useForm";

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
          message:
            "You're not allowed to use special characters or numbers in your name.",
        },
      },
      age: {
        custom: {
          isValid: (value) => Number(value) > 17,
          message: "You have to be at least 18 years old.",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
      email: {
        pattern: {
          value: /^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
          message:
            "You're not allowed to use special characters or numbers in your email.",
        },
      },
    },
    onSubmit: () => alert("User submitted!"),
  });

  const register = (key: keyof User) => ({
    name: key,
    value: user[key] || "",
    onChange: handleChange(key),
  });

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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Registration;
