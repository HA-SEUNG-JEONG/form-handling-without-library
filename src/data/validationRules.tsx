export const validationRules = {
  name: {
    pattern: {
      value: /^[A-Za-z]+$/,
      message: "이름에 특수문자는 허용되지 않습니다.",
    },
  },
  age: {
    custom: {
      isValid: (value: string) => Number(value) > 17,
      message: "나이는 17보다 커야 합니다.",
    },
  },
  password: {
    custom: {
      isValid: (value: string) => value.length > 6,
      message: "비밀번호는 6자 이상이어야 합니다.",
    },
  },
  email: {
    pattern: {
      value: /^[A-Za-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
      message: "유효한 이메일을 입력해주세요.",
    },
  },
};
