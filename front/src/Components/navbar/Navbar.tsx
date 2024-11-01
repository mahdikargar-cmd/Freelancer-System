"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/assets/img/logo.png';
import { FiLogIn } from 'react-icons/fi';
import { FaRegMessage } from 'react-icons/fa6';
import { loginSuccess, logout } from "@/app/redux/authSlice";

function Navbar() {
    const dispatch = useDispatch();
    const [isClient, setIsClient] = useState(false); // اطمینان از رندر فقط در سمت کلاینت
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // توکن را در خروج حذف کن
        dispatch(logout());
    };

    useEffect(() => {
        setIsClient(true); // فقط در سمت کلاینت true می‌شود
        const token = localStorage.getItem("authToken");
        if (token) {
            dispatch(loginSuccess());
        }
    }, [dispatch]);

    // نمایش محتوا پس از بارگذاری سمت کلاینت
    if (!isClient) return null;

    return (
        <div className={'grid grid-cols-12 text-xl text-black shadow-xl mt-4 bg-amber-50'}>
            <div className={'col-span-2 flex items-center'}>
                <Link href={'/'}>
                    <Image src={logo} alt="لوگو" width={100} height={100} />
                </Link>
            </div>
            <div className={'col-span-1 flex items-center justify-center'}>
                <Link href={'/createProject'}>ایجاد پروژه</Link>
            </div>
            <div className={'col-span-1 flex items-center justify-center'}>
                <Link href={'/projects'}>پروژه‌ها</Link>
            </div>

            <div className={'col-span-8 flex justify-end items-center'}>
                <Link href={'/message'} className={'ml-11 flex '}>
                    <FaRegMessage />
                </Link>
                {isLoggedIn ? (
                    <>
                        <span className={'ml-5 flex items-center'}>پنل من</span>
                        <button
                            onClick={handleLogout}
                            className={'ml-5 flex items-center text-red-500'}
                        >
                            خروج
                        </button>
                    </>
                ) : (
                    <Link href={'/login'} className={'ml-5 flex items-center'}>
                        ورود<FiLogIn className={'ml-5 ms-2'} />
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;
