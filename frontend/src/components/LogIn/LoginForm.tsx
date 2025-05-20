"use client";
import { cn } from "@/lib/utils";
import { ComponentProps, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/api/tanstackReactQuery/auth/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/components/LogIn/validationShema";
import { ILoginFormInputs } from "@/components/LogIn/loginTypes";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";

export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const router = useRouter();
  const { loginMutation } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = (data: ILoginFormInputs) => {
    loginMutation.mutate(data);
  };
  useEffect(() => {
    if (loginMutation.isSuccess) {
      router.push("/dashboard");
    }
  }, [loginMutation.isSuccess, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your login below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <div className="grid gap-3">
              <Label htmlFor="login">login</Label>
              <Controller
                name="login"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="login"
                    type="text"
                    placeholder="login"
                  />
                )}
              />
              {errors.login && (
                <p className="text-sm text-red-500">{errors.login.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="password"
                  />
                )}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
