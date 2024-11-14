"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/img/logo.png';
import { FiLogIn } from 'react-icons/fi';
import { FaRegMessage } from 'react-icons/fa6';
import { HiMenuAlt3, HiX } from "react-icons/hi"; // برای آیکون منو
import { useAuth } from '@/app/context/AuthContext';

function Navbar() {
    const [isClient, setIsClient] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();

    useEffect(() => {
        setIsClient(true); // فقط در سمت کلاینت true می‌شود
    }, []);

    if (!isClient) return null;

    // تابع برای بستن منو
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="flex items-center justify-between text-lg md:text-xl text-black shadow-xl mt-4 bg-bgbackground p-4 md:p-0 relative">
            {/* لوگو و لینک‌های ایجاد پروژه و پروژه‌ها */}
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link href={'/'}>
                    <Image src={logo} alt="لوگو" width={50} height={50} className="md:w-[100px] md:h-[50px]" />
                </Link>
                {/* لینک‌های ایجاد پروژه و پروژه‌ها */}
                <div className="flex space-x-4 ml-4">
                    <Link href={'/createProject'} className="p-4" onClick={handleCloseMenu}>ایجاد پروژه</Link>
                    <Link href={'/projects'} className="p-4" onClick={handleCloseMenu}>پروژه‌ها</Link>
                </div>
            </div>

            {/* دکمه همبرگر برای دستگاه‌های کوچک */}
            <div className="md:hidden z-50">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-black focus:outline-none">
                    {isMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
                </button>
            </div>

            {/* منو */}
            <div className={`fixed inset-0 bg-gray-100 bg-opacity-90 z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:flex md:items-center md:justify-between md:bg-transparent`}>
                <div className="flex flex-col md:flex-row-reverse md:space-x-8 md:ml-auto items-center h-full">
                    {/* لینک‌های سمت چپ */}
                    <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                        <Link href={'/message'} className="p-4 flex items-center" onClick={handleCloseMenu}>
                            <FaRegMessage />
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <span className="p-4">پنل من</span>
                                <button onClick={() => { logout(); handleCloseMenu(); }} className="p-4 text-red-500">خروج</button>
                            </>
                        ) : (
                            <Link href={'/login'} className="p-4 flex items-center" onClick={handleCloseMenu}>
                                ورود<FiLogIn className="ml-2" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
