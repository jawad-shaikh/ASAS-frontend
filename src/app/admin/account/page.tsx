'use client'
import { providerRegister } from "@/api";
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

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<FormValues>({
    resolver: zodResolver(providerAccountFormSchema),
});

const [isDisable, setDisable] = useState(true);
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
      <TableHeader title="Account" />
      <Button onClick={() => setDisable(false)} size={"small"}>Edit Profile</Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
           

            <div className='mt-3'>
                <FormInput
                    label={"First Name"}
                    placeholder="First Name"
                    register={register}
                    name={"firstName"}
                    errors={errors}
                />
                <FormInput
                    label={"Last Name"}
                    placeholder="Last Name"
                    register={register}
                    name={"lastName"}
                    errors={errors}
                />
                <FormInput
                    label={"Business Name"}
                    placeholder="Business Name"
                    register={register}
                    name={"businessName"}
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
                    label={"Phone Number"}
                    placeholder="Phone Number"
                    register={register}
                    name={"phoneNumber"}
                    errors={errors}
                />

            </div>
            <div className='mt-10 flex justify-end'>
                <Button disabled={isDisable} size={'small'}>
                Save Changes
                </Button>
            </div>
        </form>
    </div>
  );
}
