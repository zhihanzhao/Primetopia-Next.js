
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
    const isUserLoggedIn = false;


  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href='/' className="flex gap-2 flex-center">
            <Image 
            src='/assets/images/logo.svg'
            alt = 'logo'
            width = {30}
            height = {30}
            className="object-contain"
            ></Image>
            <p className='logo_text'>PrimeTopia</p>
        </Link>
        <div className="sm:flex">
            {isUserLoggedIn ? 
            (<div className="flex gap-3 md:gap-5">
                <Link href='/create-prompt' className="black_btn">Create Post</Link>
                <button onClick={signOut} className="outline_btn">Sign Out</button>
                <Link href='/profile'>
                    <Image  src='/assets/images/logo.svg'
                            alt = 'profile'
                            width = {37}
                            height = {37}
                            className="rounded-full"/>
                </Link>
            </div>) 
            : (<div>
                <button onClick={signIn}className="black_btn">Sign In</button>
            </div>)}
        </div>
    </nav>
  )
}

export default Nav