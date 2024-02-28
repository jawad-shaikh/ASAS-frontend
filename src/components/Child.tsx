import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from './common/FormInput';
import { z } from 'zod';
import Button from './common/Button';
import { myChildren, updateChildren } from '@/api';
import toast from 'react-hot-toast';


export const childSchema = z.object({
    children: z.array(
        z.object({
            fullName: z.string().min(2).max(50).optional(),
            birthDay: z.string().optional()
        })
    )
});
type FormValues = z.infer<typeof childSchema>;


const Child = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(childSchema),

    });

    const { fields, append } = useFieldArray({
        control,
        name: "children",
    });

    const onSubmit = async (formData: FormValues) => {
        const loadingToastId = toast.loading('Updating children...');

        const childrenData = formData.children.map((child) => ({
            ...child,
            birthDay: child.birthDay ? new Date(child.birthDay).toISOString() : null
        }));
        try {
            const { data } = await updateChildren(childrenData);
            getData()
            toast.success("Children updated", { id: loadingToastId });
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.error, { id: loadingToastId });
        }
    };

    const getData = async () => {
        try {
            const { data } = await myChildren();
            console.log(data.data)
            // Iterate over each child in the response
            data.data.forEach((child: any, index: number) => {
                append({ fullName: child.fullName, birthDay: child.birthDay });
            });
        } catch (error: any) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []); // Add getData to dependency array


    return (
        <main className="bg-light-gray relative px-4 py-12">
            <div className="container bg-white py-20">
                <form className=" max-w-2xl mx-auto px-6" onSubmit={handleSubmit(onSubmit)}>

                    <h2 className='mb-6 mt-16 text-3xl font-medium text-center'>Child Details</h2>

                    <div className="flex flex-col gap-y-8">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-y-4">
                                <FormInput
                                    label={"Child Full Name"}
                                    placeholder="Child Full Name"
                                    register={register}
                                    name={`children[${index}].fullName`} // Updated name with index
                                    errors={errors}
                                />

                                <FormInput
                                    type="date"
                                    label={"Child Birthday"}
                                    placeholder="Child Birthday"
                                    register={register}
                                    name={`children[${index}].birthDay`} // Updated name with index
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 mt-6">
                        <button type="button" className="text-primary font-medium" onClick={() => {
                            append({ fullName: "", birthDay: "" });
                        }}>Add more Children</button>

                        <Button size={"large"}>Submit</Button>
                    </div>

                </form>
            </div>

        </main>
    )
}

export default Child