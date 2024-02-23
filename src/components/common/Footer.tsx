import { site } from '@/constant/siteInfo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary relative pb-20'>
      <div className='container py-[70px] grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='flex flex-col gap-5'>
          <Image src="/footer-logo.svg" alt="footer logo" height={36} width={89} />
          <p className='text-white font-medium'>Empower Your Child&apos;s Education with Local Learning Experiences</p>
          <div className='flex items-center gap-5'>
            <Link href={site.social.facebook} target='_blank'>
              <Image src={'/facebook.svg'} height={35} width={35} alt="Facebook Icon" />
            </Link>
            <Link href={site.social.twitter} target='_blank'>
              <Image src={'/twitter.svg'} height={35} width={35} alt="Twitter Icon" />
            </Link>
            <Link href={site.social.instagram} target='_blank'>
              <Image src={'/instagram.svg'} height={35} width={35} alt="Instagram Icon" />
            </Link>
            <Link href={site.social.youtube} target='_blank'>
              <Image src={'/youtube.svg'} height={35} width={35} alt="Youtube Icon" />
            </Link>
          </div>
        </div>

        <div>
          <div>
            <h2 className='mb-2 font-medium text-white'>Quick link</h2>
            <Image src={'/border.svg'} height={7} width={38} alt='Border' />
          </div>

          <ul className='mt-4 flex flex-col gap-2'>
            <li>
              <Link href='/provider' className='flex items-center text-white gap-2'>
                <Image src="/arrow.svg" height={13} width={13} alt='arrow icon' />
                Activity Provider?
              </Link>
            </li>

            <li>
              <Link href='/' className='flex items-center text-white gap-2'>
                <Image src="/arrow.svg" height={13} width={13} alt='arrow icon' />
                Homepage
              </Link>
            </li>
          </ul>

        </div>

        <div>
          <div>
            <h2 className='mb-2 font-medium text-white'>Contact</h2>
            <Image src={'/border.svg'} height={7} width={38} alt='Border' />
          </div>

          <ul className='mt-4 flex flex-col gap-3'>
            <li>
              <Link href='/' className='flex items-center text-white gap-2'>
                <Image src="/address.svg" height={20} width={20} alt='address icon' />
                Mekkah
              </Link>
            </li>

            <li>
              <Link href={`mailto:${site.email}`} className='flex items-center text-white gap-2'>
                <Image src="/email.svg" height={20} width={20} alt='email icon' />
                {site.email}
              </Link>
            </li>

            <li>
              <Link href={`tel:${site.phone}`} className='flex items-center text-white gap-2'>
                <Image src="/phone.svg" height={20} width={20} alt='phone icon' />
                {site.phone}
              </Link>
            </li>
          </ul>

        </div>

        {/* <form className='md:col-span-2 z-10'>
          <div className=' flex items-center justify-between bg-[#F38D5B] rounded-md py-2 px-4 min-w-full'>
          <input type='email' required placeholder='Enter your email' className='bg-transparent w-[12rem] outline-none placeholder:text-black' />
          <button className='bg-primary rounded-full px-6 py-3 text-white'>Subcribe Now</button>
          </div>
          
        </form> */}

      </div>
      
      <Image src={'/footer-bottom.png'} height={80} width={1000} alt='footer bottom image' className='absolute h-[80px] -bottom-0 left-0 w-full' />
      <Image src={'/footer-right.svg'} height={150} width={150} alt='footer right image' className='absolute -bottom-0 right-0' />
      <p className='absolute w-full bottom-4 text-center text-white'>©ASAS 2023 All rights reserved</p>
    </footer>
  )
}

export default Footer