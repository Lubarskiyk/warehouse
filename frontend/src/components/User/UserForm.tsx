"use client";
import { cn } from "@/lib/utils";

import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, Label } from "@/components/ui";
import { IUserFormInputs } from "@/components/User/userTypes";
import { userSchema } from "@/components/User/validationUserShema";

export function UserForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserFormInputs>({
    defaultValues: {
      login: "",
      password: "",
      name: "",
      surname: "",
      birthday: "",
      phone: "",
    },
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data: IUserFormInputs) => {
    console.log(data);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        noValidate
      >
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="login">Login</Label>
          <Controller
            name="login"
            control={control}
            render={({ field }) => (
              <Input {...field} id="login" type="text" placeholder="login" />
            )}
          />
          {errors.login && (
            <p className="text-sm text-red-500">{errors.login.message}</p>
          )}
        </div>
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="password">Пароль</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type="text"
                placeholder="пароль"
              />
            )}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="name">Имя</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} id="name" type="text" placeholder="Имя" />
            )}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="surname">Фамілія</Label>
          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="surname"
                type="text"
                placeholder="Фамилия"
              />
            )}
          />
          {errors.surname && (
            <p className="text-sm text-red-500">{errors.surname.message}</p>
          )}
        </div>
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="birthday">Дата народження</Label>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="birthday"
                type="text"
                placeholder="Дата народження"
              />
            )}
          />
          {errors.birthday && (
            <p className="text-sm text-red-500">{errors.birthday.message}</p>
          )}
        </div>
        <div className="grid grid-cols-[1fr_4fr] gap-3">
          <Label htmlFor="phone">Телефон</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input {...field} id="phone" type="text" placeholder="Телефон" />
            )}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}
