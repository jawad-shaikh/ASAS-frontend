import Image from 'next/image'
import React from 'react'
import FormInput from '../common/FormInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserSchema } from '@/validations';
import Button from '../common/Button';
import { parentRegister } from '@/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store';

type FormValues = z.infer<typeof createUserSchema>;

const SignUpModal = () => {
    const router = useRouter();
    const {login} = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(createUserSchema),
    });

    const onSubmit = async (data: FormValues) => {
        const loadingToastId = toast.loading('Operation in progress...');

        try {
            const res = await parentRegister(data);
            
            if (res.data && res.data.data.token && res.data.data.jwtPayload) {
                login(res.data.data.token, res.data.data.jwtPayload);
                console.log('Login successful');
                toast.success('Registered successfully!', { id: loadingToastId });
                router.push('/user')
            } else {
                // Registration failed
                console.error('Registration failed:', res.data.message);
                console.error('Token or user data not found in response');
              }
        } catch (error: any) {
            // An error occurred during registration
            console.error('An error occurred during registration:', error);
            toast.error("There is an issue, please try again", { id: loadingToastId });

        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-6 max-w-[450px] rounded-2xl bg-white'>
            <div>
                <Image src="/logo.svg" width={120} height={46} alt='logo' className='mx-auto mb-4' />
                <p className='text-sm'>Discover After-School Activities in your neighbourhood.</p>
            </div>

            <div className='mt-3'>
                <FormInput
                    label={"Name"}
                    placeholder="Name"
                    register={register}
                    name={"fullName"}
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
                <p className='text-sm mt-4 text-left'>By clicking “Create Account”, you accept our Terms of Use and have read our Privacy Policy.</p>


            </div>
            <div className='mt-10'>
                <p className='text-sm mb-4'>Already have an account? Log In</p>
                <Button size={'large'}>
                    Create Account
                </Button>
            </div>
        </form>

    )
}

export default SignUpModal