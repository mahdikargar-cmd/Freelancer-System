import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import logo from '../../public/assets/img/logo.png';
import {FiLogIn} from "react-icons/fi";

function Navbar() {
    return (
        <div className={'grid grid-cols-12 text-xl text-black  shadow-xl mt-4 bg-amber-50'}>
            <div className={'col-span-2 flex items-center'}>
             <Link href={'/'}>   <Image src={logo} alt="Logo" width={100} height={100}/></Link>
            </div>
            <div className={'col-span-1 flex items-center justify-center'}>
                <Link href={'/createProject'}>ایجاد پروژه</Link>
            </div>
            <div className={'col-span-1 flex items-center justify-center'}>
                <Link  href={'/projects'}>پروژه ها</Link>
            </div>

            <div className={'col-span-8 flex justify-end items-center '}>

                <Link href={'/login'} className={'ml-5 flex'}>
                    ورود<FiLogIn className={'ml-5'}/></Link>
            </div>
        </div>
    )
}

export default Navbar;
