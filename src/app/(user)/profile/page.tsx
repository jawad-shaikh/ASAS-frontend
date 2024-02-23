'use client'
import { me, updateProfile } from "@/api";
import Child from "@/components/Child";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { profileSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

type FormValues = z.infer<typeof profileSchema>;


export default function ProfilePage() {

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(profileSchema),
  });
  
  const onSubmit = async (formData: FormValues) => {
    try {
      const {data} = await updateProfile(formData);

      console.log(data);

    } catch (error: any) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const { data } = await me();
      Object.keys(data.data).forEach((key: any) => {
        console.log(key, data.data[key])
        return setValue(key, data.data[key]);
      });
    } catch (error: any) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [])

  return (
    <main className="bg-light-gray relative px-4 py-12">
      <div className="container bg-white py-20">
      <form className=" max-w-2xl mx-auto px-6" onSubmit={handleSubmit(onSubmit)}>
        
        <h2 className='mb-6 text-3xl font-medium text-center'>Parent Details</h2>
        <div className="flex flex-col gap-y-4">
          <FormInput
            type="file"
            label={"Add Photo"}
            placeholder="Add Photo"
            register={register}
            name={"profilePicture"}
            errors={errors}
          />
          <FormInput
            label={"Full Name"}
            placeholder="Full Name"
            register={register}
            name={"fullName"}
            errors={errors}
          />
          <FormInput
            label={"Cell Phone"}
            placeholder="Cell Phone"
            register={register}
            name={"phoneNumber"}
            errors={errors}
          />
          <FormInput
            label={"Address"}
            placeholder="Address"
            register={register}
            name={"address"}
            errors={errors}
          />
          <FormInput
            label={"City"}
            placeholder="City"
            register={register}
            name={"city"}
            errors={errors}
          />
          <FormInput
            label={"State"}
            placeholder="State"
            register={register}
            name={"state"}
            errors={errors}
          />

          <FormInput
            label={"Zip"}
            placeholder="Zip"
            register={register}
            name={"zipCode"}
            errors={errors}
          />
        </div>
        <Button size={"large"} className="mt-6">Submit</Button>

      </form>
      </div>
      <Child />
    </main>
  );
}
