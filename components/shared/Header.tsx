import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='w-full py-4 px-3 flex items-center justify-between'>
      <Link href='/' className='flex items-center gap-1'>
        <Image src='/logo.png' alt='logo' width={50} height={50}
        className='object-contain'
        /> 
        <h2 className='text-text text-3xl font-extrabold'>Pyzon</h2>
      </Link>

      <nav className='flex items-center gap-2 text-xl text-text '>
        <i className='far fa-heart'></i>
        <i className='fas fa-magnifying-glass'></i>
        <i className='fas fa-shopping-bag'></i>
      </nav>
    </header>
  )
}
