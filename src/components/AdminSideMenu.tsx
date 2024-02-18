'use client'
import React from 'react'
import { Icon } from './common/Icons'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import useAuthStore from '@/store'

const AdminSideMenu = () => {
  const pathname = usePathname()
  const { logout } = useAuthStore()
  return (
    <div className="min-w-[250px] max-w-[250px] flex h-screen flex-col border-e bg-white">
      <Image src="/logo.svg" height={30} width={75} alt='ASAS Logo' className='h-auto w-[73px] py-2 my-4 mx-6' />
      <div className="px-4 py-6">

        <ul className="space-y-4">
          <li>
            <Link href='/admin' className="flex items-center gap-4 px-4 py-2 text-[#4B5563]">
              <Icon.home />
              <span className="font-medium"> Dashboard </span>
            </Link>
          </li>

          <li className="flex items-center p-4 text-[#4B5563] font-medium text-sm">Activity </li>

          <li>
            <Link
              href="/admin/manage"
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/manage" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.chart />

              <span className="font-medium"> Manage Provider  </span>
            </Link>
          </li>

          {/* <li>
            <Link
              href="/admin/request"
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/request" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.request />

              <span className="font-medium"> List of Request </span>
            </Link>
          </li> */}

          <li>
            <Link
              href="/admin/costumers"
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/costumers" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.user />

              <span className="font-medium"> List of Customer </span>
            </Link>
          </li>

          <li>
            <Link
              href="/admin/paid"
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/paid" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.paid />

              <span className="font-medium"> Customer Paid </span>
            </Link>
          </li>

          <li className="flex items-center p-4 text-[#4B5563] font-medium text-sm">Account</li>

          <li>
            <Link
              href="/admin/account"
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/account" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.profile />

              <span className="font-medium"> Profile </span>
            </Link>
          </li>

          <li>
            <button
              onClick={logout}
              className={`flex items-center gap-4 px-4 py-2 text-[#4B5563] ${pathname === "/admin/manage" ? "bg-light-gray" : "hover:bg-light-gray"} rounded-lg`}
            >
              <Icon.logout />

              <span className="font-medium"> Log out </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSideMenu