import React from 'react'
import { Icon } from './common/Icons'

const BannerSearch = () => {
  return (
    <div className='flex items-center rounded-full p-4 bg-white w-[588px] gap-4 mx-auto mt-12'>
        <Icon.search />
        <input type="text" placeholder='Explore Activities' className='w-full outline-none' />
    </div>
  )
}

export default BannerSearch