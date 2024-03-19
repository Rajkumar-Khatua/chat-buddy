"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { SlSocialGithub } from "react-icons/sl";
import { SiGoogle } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Varient = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Varient>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  //   useCallback is used for memoization of the function so that it does not get re-created on every render of the component.
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  //   useForm is a custom hook provided by react-hook-form to manage the form state. It returns an object with the form state and methods to handle the form.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    //   Call the API to login or register the user

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((error) => {
          toast.error(error.response.data.message);
        })
        .finally(() => setIsLoading(false));
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(callback.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success("Nice! You are logged in!");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Nice! You are logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className="
            mt-8
            sm:mx-auto
            sm:w-full
            sm:max-w-md
  "
    >
      <div
        className="
        backdrop-blur-sm
        bg-white/30
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
    "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              id="name"
              type="text"
              required
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}

          <Input
            label="Email"
            id="email"
            type="email"
            required
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <Input
            label="Password"
            id="password"
            type="password"
            required
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "REGISTER" ? "Register" : "Login"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={SlSocialGithub}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={SiGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
        </div>
        <div className="mt-6">
          <p className="mt-2 text-sm text-center text-gray-500">
            {variant === "REGISTER"
              ? "Already family of Chat Buddy?"
              : "Don't have an account?"}
            <button
              type="button"
              onClick={toggleVariant}
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              {variant === "REGISTER" ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
