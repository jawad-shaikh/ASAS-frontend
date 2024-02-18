'use client'
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { providerAccountFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormValues = z.infer<typeof providerAccountFormSchema>;

export default function NewActivityPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<FormValues>({
    resolver: zodResolver(providerAccountFormSchema),
});


const onSubmit = async (data: FormValues) => {
  const loadingToastId = toast.loading('Operation in progress...');
  try {
      const response = await providerRegister(data);

      if (response.status === 200 && response.data.success) {
          toast.success('Account updated successfully!', { id: loadingToastId });
      } else {
          // Registration failed
          console.error('Registration failed:', response.data.message);
          toast.error("There is an issue, please try again", { id: loadingToastId });
      }

  } catch (error: any) {
      // An error occurred during registration
      console.error('An error occurred during registration:', error);
      toast.error("There is an issue, please try again", { id: loadingToastId });
  }
};

  return (
    <div className="px-8">
      <div className="flex justify-between items-center">
      <TableHeader title="Add New Activity" />
      {/* <Button onClick={() => setDisable(false)} size={"small"}>Edit Profile</Button> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
           

            <div className='mt-3'>
                <FormInput
                    label={"Title"}
                    placeholder="Title"
                    register={register}
                    name={"title"}
                    errors={errors}
                />
                <FormInput
                    label={"Description"}
                    placeholder="Description"
                    register={register}
                    name={"description"}
                    errors={errors}
                />
                <FormInput
                    label={"Category"}
                    placeholder="Category"
                    register={register}
                    name={"category"}
                    errors={errors}
                />
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

                <FormInput
                    label={"Website"}
                    placeholder="Website"
                    register={register}
                    name={"website"}
                    errors={errors}
                />

                <FormInput
                type="file"
                    label={"Thumbnail"}
                    placeholder="Thumbnail"
                    register={register}
                    name={"thumbnail"}
                    errors={errors}
                />

            </div>
            <div className='mt-10 flex justify-end'>
                <Button size={'small'}>
                Save Changes
                </Button>
            </div>
        </form>
    </div>
  );
}
