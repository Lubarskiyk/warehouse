import { object, ObjectSchema, string } from "yup";
import { IOfficeFormInputsData } from "@/components/Office/officeTypes";

export const officeSchema: ObjectSchema<IOfficeFormInputsData> = object({
  name: string().required("Введіть назву офісу"),
  code: string().required("Введіть код офісу"),
  city: string().required("Введіть місто"),
  phone: string(),
  address: string()
});
