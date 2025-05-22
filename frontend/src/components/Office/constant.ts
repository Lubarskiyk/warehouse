import { IOfficeFormInputs } from "@/components/Office/officeTypes";

export const OFFICE_INPUT: IOfficeFormInputs[] = [
  {
    title: "Назва офісу",
    id: "name",
    type: "text",
    defaultValue: "",
  },
  {
    title: "Код офісу",
    id: "code",
    type: "text",
    defaultValue: "",
  },
  {
    title: "Місто офісу",
    id: "city",
    type: "text",
    defaultValue: "",
  },
  {
    title: "Телефон офісу",
    id: "phone",
    type: "phone",
    defaultValue: "",
  },
  {
    title: "Адреса офісу",
    id: "address",
    type: "text",
    defaultValue: "",
  },
];
