import React from 'react'
import {MdOutlineSearch} from "react-icons/md";
import Link from "next/link";

function Page() {
    return (
        <>

            <div className={' bg-amber-50  rounded'}>
                {/*filter begin*/}
                <div className={'grid grid-cols-12 font-bold mt-5 '}>
                    <div className={'flex justify-center text-center col-span-12 text-3xl '}>
                        <p className={'underline underline-offset-8 mt-4'}> لیست پروژه ها</p>
                    </div>
                </div>
                <div className={'grid grid-cols-12 mt-12 mb-5'}>
                    <div className={'col-span-12 flex justify-center p-2 items-center text-2xl '}>
                        <p className={' '}>جستجوی پروژه</p>
                        <input type="search" className={'shadow-md rounded-2xl ms-11 ml-5'}/>
                        <MdOutlineSearch/>
                    </div>
                </div>
                <div className={'grid grid-cols-12 text-xl mt-10'}>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>فیلتر دسته بندی</p>
                        <select name="نوع پروژه" id="c">
                            <option value="  ">توسعه نرم افزار</option>
                            <option value="  ">طراحی وب</option>
                            <option value="  ">بازاریابی و فروش</option>
                        </select>
                    </div>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>مهارت ها</p>
                        <select name="مهارت ها " id="c">
                            <option value="  ">photoshop</option>
                            <option value="  ">html</option>
                            <option value="  ">react</option>
                        </select>
                    </div>
                    <div className={'col-span-4 flex justify-center items-center'}>
                        <p className={'ml-5'}>نوع پیشرفت پروژه</p>
                        <select name=" نوع  " id="c">
                            <option value="  ">تمام وقت</option>
                            <option value="  ">پاره وقت</option>
                            <option value="  ">دورکاری</option>
                        </select>
                    </div>

                </div>

                <div className={'grid grid-cols-12 mt-24 p-2 text-[15px]'}>
                    <div className={'col-span-2 flex justify-center items-center'}>
                        <p className={'ml-5'}>مرتب سازی براساس</p>
                        <select name=" نوع  " id="c">
                            <option value="  "> جدیدترین</option>
                            <option value="  ">گرانترین</option>
                            <option value="  ">ارزانترین</option>
                        </select>
                    </div>
                    <div className={'col-span-2 flex justify-center items-center'}>
                        <p className={'ml-5'}>
                            تعداد پروژه های یافت شده
                        </p>
                        <p>20</p>
                    </div>
                </div>

                {/*filter end*/}


            </div>
            {/*start card*/}
            <div className={'  mt-4 p-2 flex justify-center  w-full mb-1'}>
                <div className={'w-[900px] bg-amber-50  p-5 rounded-lg shadow-inner'}>
                    <div className={'grid grid-cols-6'}>
                        <div className={'col-span-6 flex justify-between'}>
                            <p className={'text-xl font-bold'}>نیاز به بر طرف کردن یک ارور در C++</p>
                            <p>قیمت پیشنهادی کارفرما بین 10 تا 20 میلیون</p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-6 mt-4'}>
                        <div className={'col-span-6 flex justify-between'}>
                            <p>زمان اتمام اگهی 30 روز</p>
                            <Link href={'/projectCheckout'}>
                                <button className={'text-2xl bg-blue-500 text-white rounded p-2 ms-14'}>بررسی پروژه
                                </button>
                            </Link>
                            <p>مهارت های مورد نیاز : c++ , .net, برنامه نویسی</p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-6 mt-4'}>
                        <div className={'col-span-12 flex justify-between '}>
                            <p> تعداد پیشنهادات تا به الان 30 تا</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className={'  mt-4 p-2 flex justify-center  w-full mb-2'}>
                <div className={'w-[900px] bg-amber-50  p-5 rounded-lg shadow-inner'}>
                    <div className={'grid grid-cols-6'}>
                        <div className={'col-span-6 flex justify-between'}>
                            <p className={'text-xl font-bold'}>نیاز به بر طرف کردن یک ارور در C++</p>
                            <p>قیمت پیشنهادی کارفرما بین 10 تا 20 میلیون</p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-6 mt-4'}>
                        <div className={'col-span-6 flex justify-between'}>
                            <p>زمان اتمام اگهی 30 روز</p>
                            <Link href={'/projectCheckout'}>
                                <button className={'text-2xl bg-blue-500 text-white rounded p-2 ms-14'}>بررسی پروژه
                                </button>
                            </Link>
                            <p>مهارت های مورد نیاز : c++ , .net, برنامه نویسی</p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-6 mt-4'}>
                        <div className={'col-span-12 flex justify-between '}>
                            <p> تعداد پیشنهادات تا به الان 30 تا</p>

                        </div>
                    </div>
                </div>
            </div>

            {/*end card */}
        </>
    )
}

export default Page
