'use client'
import { meProvider, updateMeProvider } from "@/api";
import TableHeader from "@/components/TableHeader";
import Button from "@/components/common/Button";
import FormInput from "@/components/common/FormInput";
import { providerAccountFormSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
    firstName: z.string().nonempty({ message: 'First name is required' }),
    lastName: z.string().nonempty({ message: 'Last name is required' }),
    businessName: z.string().nonempty({ message: 'Business name is required' }),
    website: z.string().nonempty({ message: 'Invalid website URL' }),
    phoneNumber: z.string().nonempty({ message: 'Phone number is required' }),
  });

type FormValues = z.infer<typeof schema>;

export default function ProfilePage() {
    const [data, setData] = useState<FormValues | null>(null); // Initialize data state

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormValues) => {
        const loadingToastId = toast.loading('Operation in progress...');
        try {
            const response = await updateMeProvider(data);
            toast.success('Account updated successfully!', { id: loadingToastId });
            getData()


        } catch (error: any) {
            // An error occurred during registration
            console.error('An error occurred during registration:', error);
            toast.error(error.response.data.error, { id: loadingToastId });
        }
    };

    const getData = async () => {
        try {
            const response = await meProvider();
            console.log(response.data.data);
            setData(response.data.data); // Set data state with response data
        } catch (error: any) {
            console.error('An error occurred while fetching data:', error);
            // Handle error
        }
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (data) {
            const keysToSet: Array<keyof FormValues> = [
                "firstName",
                "lastName",
                "businessName",
                // "email",
                // "password",
                "website",
                "phoneNumber",
                // Add other keys as needed
            ];

            keysToSet.forEach((key) => {
                setValue(key, data[key]);
            });
        }
    }, [data, setValue]);

    return (
        <div className="px-8">
            <div className="flex justify-between items-center">
                <TableHeader title="Profile" />
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
                    {/* <FormInput
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
                    /> */}

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
                    <Button size={'small'}>
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
