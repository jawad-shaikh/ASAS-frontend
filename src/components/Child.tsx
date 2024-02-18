import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import FormInput from './common/FormInput';
import { childSchema, profileSchema } from '@/validations';
import { z } from 'zod';
import Button from './common/Button';
import { myChildren, updateChildren } from '@/api';

type FormValues = z.infer<typeof childSchema>;


const Child = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setValue, // Import setValue from react-hook-form
    } = useForm<FormValues>({
        resolver: zodResolver(childSchema),
       
    });

    const { fields, append } = useFieldArray({
        control,
        name: "children",
    });

    console.log(errors)
    const onSubmit = async (formData: FormValues) => {
        console.log(formData.children)
        try {
            const { data } = await updateChildren(formData.children);
            console.log(formData, data);
        } catch (error: any) {
            console.log(error);
        }
    };

    const getData = async () => {
        try {
            const { data } = await myChildren();
            console.log(data)
            Object.keys(data.data).forEach((key: any) => {
                console.log(key, data.data[key]);
                // Check if setValue is defined before using it
                setValue(key, data.data[key]);
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
                                    name={`children[${index}].childName`} // Updated name with index
                                    errors={errors}
                                />

                                <FormInput
                                    type="date"
                                    label={"Child Birthday"}
                                    placeholder="Child Birthday"
                                    register={register}
                                    name={`children[${index}].childBirthDate`} // Updated name with index
                                    errors={errors}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-6 mt-6">
                        <button type="button" className="text-primary font-medium" onClick={() => {
                            append({ childName: "", childBirthDate: "" });
                        }}>Add more Children</button>

                        <Button size={"large"}>Submit</Button>
                    </div>

                </form>
            </div>

        </main>
    )
}

export default Child