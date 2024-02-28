'use client'
import Image from 'next/image'
import React from 'react'
import Button from './Button'
import { Icon } from './Icons'
import dynamic from 'next/dynamic'
const ModalWrapper = dynamic(() => import('./ModalWrapper'));
const SignUpModal = dynamic(() => import('../modals/SignUpModal'));
const LogInModal = dynamic(() => import('../modals/LogInModal'));
const LogOutModal = dynamic(() => import('../modals/LogOutModal'));
import useAuthStore, { useModalStore } from '@/store'
import Link from 'next/link'

const UserNavbar = () => {
  const { logout, user, isAuthenticated } = useAuthStore();
  const { signUpOpen, signInOpen, signOutOpen, setSignUpOpen, setSignInOpen, setSignOutOpen } = useModalStore();

  console.log(user)

  return (
    <>
      <header className='container flex items-center justify-between py-2'>
       <Link href="/">
        <Image src="/logo.svg" height={30} width={75} alt='ASAS Logo' className='h-[30px] w-auto' />
        </Link>
        {
          isAuthenticated ? <div className='flex items-center justify-end py-4 px-6 gap-4 bg-white'>
            {/* <ul className='flex items-center'>
              <li>
                <Link href="/" className='px-2 font-medium text-sm'>
                  Online
                </Link>
              </li>
              <li>
                <Link href="/" className='px-2 font-medium text-sm'>
                  In Person
                </Link>
              </li>
              <li>
                <Link href="/" className='px-2 font-medium text-sm'>
                  Blog
                </Link>
              </li>
            </ul> */}
            <button className='relative group border border-border rounded-2xl flex items-center gap-4 px-4 py-2'>
              <img src={user?.profilePicture || 'https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg'} height={30} width={30} alt='logo' className='rounded-full h-[30px] w-[30px] object-cover' />
              <span className='font-medium text-sm'>{user?.fullName}</span>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="black" />
              </svg>

              <ul className='border-border border w-full group-hover:flex hidden absolute top-12 right-0 bg-white p-4 text-left text-sm rounded-lg z-10  flex-col gap-2'>
                {user?.role === "PARENT" && <><li>
                  <Link className='flex justify-start w-full' href="/profile">Profile</Link>
                </li>
                  <li>
                    <Link className='flex justify-start w-full' href="/history">Booking History</Link>
                  </li></>}
                <li>
                  <button className='flex justify-start w-full' onClick={() => setSignOutOpen(true)}>Logout</button>
                </li>
              </ul>
            </button>
            <Link href="/cart">
              <Icon.cart className='h-[25px] w-[25px]' />
            </Link>
          </div> :
            <div className='flex items-center gap-6'>
              <Link href="/provider" className='text-sm hover:underline'>Activity Provider?</Link>
              <div className='flex items-center gap-3'>
                <Button onClick={() => setSignInOpen(true)} variant={"outline"}>Log In</Button>
                <Button onClick={() => setSignUpOpen(true)}>Sign Up</Button>
              </div>
              <button>
                <Icon.cart className='h-[25px] w-[25px]' />
              </button>
            </div>
        }
      </header>
      <ModalWrapper open={signOutOpen} setOpen={setSignOutOpen}>
        <LogOutModal close={() => setSignOutOpen(false)} logout={logout} />
      </ModalWrapper>
      <ModalWrapper open={signUpOpen} setOpen={setSignUpOpen}>
        <SignUpModal />
      </ModalWrapper>
      <ModalWrapper open={signInOpen} setOpen={setSignInOpen}>
        <LogInModal />
      </ModalWrapper>
    </>
  )
}

export default UserNavbar