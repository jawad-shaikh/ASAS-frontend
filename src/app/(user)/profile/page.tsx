'use client'
import { me, updateProfile, updateProfilePicture } from "@/api";
import Child from "@/components/Child";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { profileSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  profilePicture: z.any().optional(), // Assuming profile picture will be stored as a string (e.g., file path or URL)
  fullName: z.string().nonempty({ message: 'Full name is required' }),
  phoneNumber: z.string().nonempty({ message: 'Phone number is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  city: z.string().nonempty({ message: 'City is required' }),
  state: z.string().nonempty({ message: 'State is required' }),
  zipCode: z.string().nonempty({ message: 'Zip code is required' }),
});

type FormValues = z.infer<typeof schema>;


export default function ProfilePage() {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  
  const onSubmit = async (formData: FormValues) => {
    const loadingToastId = toast.loading('Updating profile...');
    // Remove the profilePicture field from the formData object
    const { profilePicture, ...formDataWithoutProfilePicture } = formData;
    console.log(profilePicture)
    try {
      if(profilePicture[0]){
        const formDataToSend = new FormData();
        formDataToSend.append('profile', profilePicture[0]);
        await updateProfilePicture(formDataToSend)
      }
      const {data} = await updateProfile(formDataWithoutProfilePicture);

      console.log(data);

      toast.success("Profile updated", { id: loadingToastId });
      getData()
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.error, { id: loadingToastId });
    }
  };

  const getData = async () => {
    try {
      const { data } = await me();
      Object.keys(data.data).forEach((key: any) => {
        // console.log(key, data.data[key])
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
