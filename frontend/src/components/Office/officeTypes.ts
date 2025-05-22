export interface IOfficeFormInputsData {
  name: string;
  code: string;
  city: string;
  phone?: string;
  address?: string;
}

export interface IOfficeFormInputs {
 title: string;
  id: keyof IOfficeFormInputsData;
  type: string;
  defaultValue: string;

}
