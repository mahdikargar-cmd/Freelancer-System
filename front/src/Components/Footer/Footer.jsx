import React from 'react'
import logo from '../../public/assets/img/logo.png';
import Image from "next/image";
import {FaInstagram, FaTelegramPlane, FaTwitter} from "react-icons/fa";

function Footer() {
    return (
        <div className="mt-20 bg-bgbackground flex justify-center items-center">
            <div className="grid grid-cols-4 gap-x-8 w-full max-w-6xl p-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <Image src={logo} alt="" width={50} height={50} className="md:w-[100px] md:h-[50px]"/>
                    <p >سیستم قدرتمند بازار آزاد با قابلیت تغییر کاربران (فریلنسرها و مشتریان)</p>
                    <div className={'flex gap-8'}>
                        <FaTwitter size={25} />

                        <FaTelegramPlane size={25}/>

                        <FaInstagram size={25}/>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center space-y-8">
                    <p className="font-bold">برای کارفرماها</p>
                    <p>پیداکردن فریلنسر ها</p>
                    <p>ثبت پروژه </p>
                </div>
                <div className="flex flex-col items-center text-center space-y-8">
                    <p className="font-bold">برای فریلنسرها</p>
                    <p>یافتن پروژه</p>
                    <p> ارتقای پنل</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-8">
                    <p className="font-bold">تماس با ما</p>
                    <p>توضیحات کوتاه</p>
                    <p>شبکه‌های اجتماعی</p>
                </div>
            </div>
        </div>
    )
}

export default Footer
