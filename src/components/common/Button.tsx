import React, { ButtonHTMLAttributes, FC } from 'react'
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils';


const buttonVariants = cva(
    "rounded-full font-semibold disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-white",
                outline: "border border-black text-black",
            },
            size: {
                small: "px-6 py-3",
                medium: "w-[144px] h-[48px] flex items-center justify-center",
                large: "py-4 w-full",
            }

        },
        defaultVariants: {
            variant: 'default',
            size: 'small',
        }
    },

)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }


const Button: FC<ButtonProps> = ({ className, size, variant, ...props }) => {
    return (
        <button className={cn(buttonVariants({ variant, className, size }))} {...props} />
    )
}

export default Button
export { buttonVariants }