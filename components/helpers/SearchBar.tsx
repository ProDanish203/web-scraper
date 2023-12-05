"use client"
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { scrapeAndStore } from '@/lib/actions';

const checkValidLink = (url: string) => {
  try{    
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    
    if(hostname.includes('amazon.com') || 
    hostname.includes('amazon.') || 
    hostname.endsWith('amazon')){
      return true;
    }

  }catch(error){
    return false;
  }
  return false;
}

export const SearchBar = () => {

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!search) return toast.error("Field cannot be empty")

    const isValid = checkValidLink(search);
    if(!isValid) return toast.error("Not a valid Amazon url");

    try{
      setLoading(true);

      const product = await scrapeAndStore(search);
      console.log(product)
    }catch(error){  
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-3 flex items-center gap-2 mt-5'>
      <input type="url" 
      placeholder='Enter Link of the product'
      className=' outline-none w-full bg-transparent bg-gray-200 p-2 rounded-md shadow-sm max-w-[400px] border-2 border-primary'
      value={search}
      onChange={(e:any) => setSearch(e.target.value)}
      // required
      />

      <button type='submit' 
      className='flex items-center justify-center gap-2 bg-accent py-2 px-4 rounded-md text-white'
      disabled={loading || search === ''}
      >
        <p className='text-lg'>{loading ? "Searching...": "Search"}</p>
      </button>
    </form>
  )
}
