import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../common/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/validations";
import Button from "../common/Button";
import { parentLogin, providerLogin } from "@/api";
import useAuthStore from "@/store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof loginSchema>;

const LogInModal = () => {
  const [user, setUser] = useState("parent");
  const router = useRouter();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    const loadingToastId = toast.loading("Operation in progress...");
    try {
      let res;
      if (user === "parent") {
        res = await parentLogin(data);
      } else {
        res = await providerLogin(data);
      }

      if (res.data && res.data.data.token && res.data.data.userData) {
        console.table(res.data.data.token, res.data.data.userData);
        login(res.data.data.token, res.data.data.userData);
        console.log("Login successful");
        toast.success("Login successful!", { id: loadingToastId });
        user === "parent" ? "" : router.push("/provider/dashboard");
      } else {
        console.error("Token or user data not found in response");
      }
      console.log(res.data.data);
    } catch (error: any) {
      toast.error(error.response.data.error, { id: loadingToastId });
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-6 max-w-[450px] rounded-2xl bg-white"
    >
      <div>
        <Image
          src="/logo.svg"
          width={120}
          height={46}
          alt="logo"
          className="mx-auto mb-4"
        />
        <p className="text-sm">
          Discover After-School Activities in your neighbourhood.
        </p>
      </div>
      <div className="flex items-center border-b mt-4">
        <button
          type="button"
          onClick={() => setUser("parent")}
          className={`p-2 font-medium w-full ${
            user === "parent"
              ? "border-b-2 border-primary text-primary"
              : "text-black"
          }`}
        >
          Parent
        </button>
        <button
          type="button"
          onClick={() => setUser("provider")}
          className={`p-2 font-medium w-full ${
            user === "provider"
              ? "border-b-2 border-primary text-primary"
              : "text-black"
          }`}
        >
          Provider
        </button>
      </div>
      <div className="mt-3">
        <FormInput
          label={"Email Address"}
          placeholder="Email Address"
          register={register}
          name={"email"}
          errors={errors}
        />
        <FormInput
          type={"password"}
          label={"Password"}
          placeholder="Password"
          register={register}
          name={"password"}
          errors={errors}
        />
      </div>
      <div className="mt-10">
        <p className="text-sm mb-4">Dont have an account? Sign Up</p>
        <Button size={"large"}>Login</Button>
      </div>
    </form>
  );
};

export default LogInModal;
