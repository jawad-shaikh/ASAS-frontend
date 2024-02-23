import React from 'react'
import Button from '../common/Button';

const LogOutModal = ({ close, logout }: any) => {
    return (
        <div className='flex flex-col gap-4 p-6 w-[450px] rounded-2xl bg-white'>
            <p className='text-sm mb-4'>Dont have an account? Sign Up</p>
            <Button onClick={() => {
                logout();
                close();
            }} variant={'outline'} size={'large'}>
                Yes
            </Button>
            <Button onClick={close} size={'large'}>
                Cancel
            </Button>
        </div>

    )
}

export default LogOutModal