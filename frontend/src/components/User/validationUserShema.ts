import { object, ObjectSchema, string } from "yup";

import { IUserFormInputs } from "@/components/User/userTypes";

export const userSchema: ObjectSchema<IUserFormInputs> = object().shape({
  login:  string().required(),
  password:  string().required(),
  name: string().required(),
  surname: string().required(),
  birthday: string().required(),
  phone: string().required(),
});
