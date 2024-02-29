'use client'
import React, { useState } from 'react'
import { Icon } from './common/Icons'
import { useRouter } from 'next/navigation'

const BannerSearch = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Prevent default form submission behavior
    router.push('/search?search='+search); // Log the value to the console
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center rounded-full p-4 bg-white w-full md:w-[588px] gap-4 mx-auto mt-12'>
        <Icon.search />
        <input type="text" value={search} onChange={(e:any) => setSearch(e.target.value)} placeholder='Explore Activities' className='w-full outline-none' />
    </form>
  )
}

export default BannerSearch