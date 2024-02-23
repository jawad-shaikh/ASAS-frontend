'use client'
import { providerFormSchema } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';
import FormInput from './common/FormInput';
import Button from './common/Button';
import { z } from 'zod';
import { providerRegister } from '@/api';
import toast from 'react-hot-toast';

type FormValues = z.infer<typeof providerFormSchema>;


const ProviderSignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(providerFormSchema),
    });

    const onSubmit = async (data: FormValues) => {
        const loadingToastId = toast.loading('Operation in progress...');
        try {
            const response = await providerRegister(data);
            toast.success(response.data.message, { id: loadingToastId });
            reset();
        } catch (error: any) {
            // An error occurred during registration
            console.error('An error occurred during registration:', error);
            toast.error(error.response.data.error, { id: loadingToastId });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-6 max-w-[450px] rounded-2xl bg-white'>
            <div>
                <Image src="/logo.svg" width={120} height={46} alt='logo' className='mx-auto mb-4' />
                <p className='text-sm text-center'>Join With Us</p>
            </div>

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
                <p className='text-sm mt-4 text-left'>By clicking “Create Account”, you accept our Terms of Use and have read our Privacy Policy.</p>


            </div>
            <div className='mt-10'>
                <Button size={'large'}>
                Get Started
                </Button>
            </div>
        </form>
    )
}

export default ProviderSignUpForm