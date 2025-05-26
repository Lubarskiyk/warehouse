"use client";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import {
  IOfficeFormInputs,
  IOfficeFormInputsData,
} from "@/components/Office/officeTypes";
import { officeSchema } from "@/components/Office/validationOfficeShema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OFFICE_INPUT } from "@/components/Office/constant";
import { useOfficeMutation } from '@/api/tanstackReactQuery/offices/mutations';

export default function OfficeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IOfficeFormInputsData>({
    defaultValues: OFFICE_INPUT.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: item.defaultValue || "",
      }),
      {} as IOfficeFormInputsData,
    ),
    resolver: yupResolver(officeSchema),
  });
  const { createOffice } = useOfficeMutation();

  const onSubmit = (data: IOfficeFormInputsData) => {
    createOffice.mutate(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6")}
      noValidate
    >
      {OFFICE_INPUT.map((item: IOfficeFormInputs) => (
        <div
          className="grid grid-cols-[1fr_4fr] items-start gap-3"
          key={item.id}
        >
          <Label htmlFor={item.id}>{item.title}</Label>
          <div className="flex flex-col gap-1">
            <Controller
              name={item.id}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id={item.id}
                  type={item.type}
                  placeholder={item.title || ""}
                />
              )}
            />
            {errors[item.id] && (
              <p className="text-sm text-red-500">{errors[item.id]?.message}</p>
            )}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 self-end bg-blue-600 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
    </form>
  );
}
