'use client'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '@/validations';
import { adminLogin } from '@/api';
import useAuthStore from '@/store';
import toast from 'react-hot-toast';
import FormInput from '@/components/common/FormInput';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

type FormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
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
        const loadingToastId = toast.loading('Operation in progress...');
        try {
            const res = await adminLogin(data);
            console.log(res)
            if (res.data && res.data.data.token && res.data.data.userData) {
                console.table(res.data.data.token, res.data.data.userData)
                login(res.data.data.token, res.data.data.userData);
                console.log('Login successful');
                router.push('/admin')
                toast.success('Login successful!', { id: loadingToastId });
            }
            else {
                console.error('Token or user data not found in response');
            }

        } catch (error: any) {
            toast.error(error.response.data.error, { id: loadingToastId });
            console.log(error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-6 max-w-[450px] rounded-2xl bg-white'>
                <div>
                    <Image src="/logo.svg" width={120} height={46} alt='logo' className='mx-auto mb-4' />
                    <p className='text-sm'>Discover After-School Activities in your neighbourhood.</p>
                </div>

                <div className='mt-3'>
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
                <div className='mt-10'>
                    <Button size={'large'}>
                        Login
                    </Button>
                </div>
            </form>
        </div>


    )
}

export default LoginPage