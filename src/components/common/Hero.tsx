'use client'
import React from 'react'
import BannerSearch from '../BannerSearch'
import Button from './Button'
import Image from 'next/image'
import art from "@/assets/art.svg"
import cooking from "@/assets/cooking.svg"
import robots from "@/assets/robots.svg"
import language from "@/assets/language.svg"
import music from "@/assets/music.svg"
import sports from "@/assets/sports.svg"
import { useModalStore } from '@/store'
import Link from 'next/link'

const Hero = () => {
  const {setSignUpOpen} = useModalStore()
  return (
    <section className="bg-[#FBF7F0] relative overflow-y-hidden">
    <div className="container pb-[150px] pt-[100px]">
      <h1 className="text-3xl md:text-[40px] max-w-[932px] text-center mx-auto md:leading-normal">Discover <span className="text-green">After-School</span> Activities
        in your neighbourhood.</h1>
      <div className="flex items-center justify-center gap-6 mt-8">
        <Button onClick={() => setSignUpOpen(true)} size={"medium"}>Get Started</Button>
      </div>
      <BannerSearch />
      <div className="mt-14 text-center flex flex-wrap items-start justify-center gap-20">
        <Link className="block" href={`/search?category=Music`}>
          <Image src={music} height={64} width={64} alt="Music Icon" />
          <h2 className="mt-4">
            Music
          </h2>
        </Link>
        <Link className="block" href={`/search?category=Art`}>
          <Image src={art} height={64} width={64} alt="Art Icon" />
          <h2 className="mt-4">
            Art
          </h2>
        </Link>

        <Link className="block" href={`/search?category=Cooking`}>
          <Image src={cooking} height={64} width={64} alt="Cooking Icon" />
          <h2 className="mt-4">
            Cooking
          </h2>
        </Link>

        <Link className="block" href={`/search?category=Robots`}>
          <Image src={robots} height={64} width={64} alt="Robots Icon" />
          <h2 className="mt-4">
            Robots
          </h2>
        </Link>

        <Link className="block" href={`/search?category=Language`}>
          <Image src={language} height={64} width={64} alt="Language Icon" />
          <h2 className="mt-4">
            Language
          </h2>
        </Link>



        <Link className="block" href={`/search?category=Sports`}>
          <Image src={sports} height={64} width={64} alt="Sports Icon" />
          <h2 className="mt-4">
            Sports
          </h2>
        </Link>
      </div>
    </div>
    <Image src="/banner.svg" height={800} width={800} quality={100} alt="Banner Image" className="absolute inset-0 w-full pointer-events-none" />
  </section>
  )
}

export default Hero