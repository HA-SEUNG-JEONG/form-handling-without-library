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
          value: "^[A-Za-z]*$",
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
    },
    onSubmit: () => alert("User submitted!"),
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange("name")}
      />
      {errors.name && <p>{errors.name}</p>}
      <input
        placeholder="age"
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange("age")}
      />
      {errors.age && <p>{errors.age}</p>}
      <input
        placeholder="Email"
        type="email"
        value={user.email || ""}
        onChange={handleChange("email")}
      />
      <input
        placeholder="Password"
        type="password"
        value={user.password || ""}
        onChange={handleChange("password")}
      />{" "}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Registration;
