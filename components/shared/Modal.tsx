"use client"
import { FormEvent, Fragment, useState } from "react"
import { Dialog, Transition  } from '@headlessui/react'
import Image from "next/image"
import toast from "react-hot-toast"
import { addUserEmail } from "@/lib/actions"

export const Modal = ({productId}: {productId: string}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(!email) return toast.error("Please provide your email address")
    try{
      setLoader(true);      

      const {success} = await addUserEmail(productId, email);
      if(!success) return toast.error("Something went wrong");
      return toast.success("Email sent successfuly")
    }catch(error){
      console.log(error)
    }finally{
      setLoader(false);      
      setIsOpen(false);
      setEmail("");
    }
    
  }

  return (
    <>
      <button className='bg-primary text-bg rounded-full w-full py-2 text-xl cursor-pointer' onClick={() => setIsOpen(true)}>Track</button>

    <Transition
    show={isOpen}
    as={Fragment}
    >

      <Dialog onClose={() => setIsOpen(false)}
      className="relative z-50"
      >
        <Transition.Child 
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">

        <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="mx-auto max-w-sm bg-white p-3 rounded-md">
            <div className="flex items-center justify-between gap-2 mb-3 md:px-5 px-2">
              <Image src="/logo.png" alt="logo" width={40} height={40}
              className="object-cover"
              />
              <button onClick={() => setIsOpen(false)}> <i className="fas fa-times text-xl text-neutral-600"></i> </button>

            </div>
            <Dialog.Title className="text-xl font-semibold">Stay updated with product pricing alerts right in your inbox</Dialog.Title>
            <Dialog.Description className="max-md:text-sm text-neutral-500 mt-2 mb-4">
              Track prices for the product through email
            </Dialog.Description>

            <form onSubmit={handleSubmit} className="mb-3">
              <label htmlFor="email" className="text-sm font-bold text-neutral-700">Email Address</label>
              <input type="email" placeholder="Email Address"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
              className="block rounded-md py-2 px-2 border-2 border-neutral-400 bg-neutral-300 w-full outline-none"
              autoComplete="off"
              />

            <button type="submit" disabled={loader}
            className="bg-primary mt-3 text-white md:text-lg w-full py-2 rounded-md"
            >{loader ? "Submitting...": "Track"}</button>
            </form>
          </Dialog.Panel>
        </Transition.Child>
        </div>
    </Dialog>
    </Transition>
    </>
  )
}
