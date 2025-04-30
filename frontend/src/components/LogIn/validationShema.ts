import { object, ObjectSchema, string } from 'yup';
import { ILoginFormInputs } from '@/components/LogIn/loginTypes';

export const SignInSchema: ObjectSchema<ILoginFormInputs> = object().shape({
  login: string().required("login обов’язковий"),
  //.min(6, "Мінімум 6 символів") ,
  password: string()
    // .min(6, "Мінімум 6 символів")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])/,
    //   "Пароль повинен містити велику та малу літеру",
    // )
    .required("Необхідно ввести пароль"),
});