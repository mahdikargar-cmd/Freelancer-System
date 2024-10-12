"use client"
import React, { useState } from 'react'

function ProjectCheckout() {
    const [modal, setModal] = useState(false);

    const changeModal = () => {
        setModal(!modal);
    }

    const closeModal = (e) => {
        // بستن مدال با کلیک بیرون از آن
        if (e.target.id === 'modalBackground') {
            setModal(false);
        }
    }

    return (
        <>
            <div className={'flex justify-center mt-4 items-center'}>
                <div className={'w-[900px] bg-amber-50 p-3 rounded'}>
                    <div className={'grid grid-cols-12'}>
                        <div className={'col-span-12 flex justify-between items-center'}>
                            <p className={'font-bold text-[20px]'}>ربات رزرو بلیط قطار با کیفیت و سرعت</p>
                            <button onClick={changeModal} className={'bg-blue-500 text-white p-2 rounded-md'}>پیشنهاد روی پروژه</button>
                        </div>
                    </div>
                    <div className={'grid grid-cols-12 mt-8'}>
                        <div className={'col-span-12 flex justify-start leading-8 text-[18px]'}>
                            <p>
                                سلام و وقت بخیر، به یک فرد خلاق و وقت‌شناس برای طراحی سایت نیاز داریم که بتواند یک پلتفرم
                                ساخت منوی کافه و رستوران با قابلیت اسکن QR کد ایجاد کند. سایت مورد نظر باید تمامی امکانات
                                سایت‌های زیر را داشته باشد (و حتی بیشتر):

                                - https://menew.pw/
                                - https://livemenu.click/
                                - https://qrbama.com/
                                - https://menusaz.com/

                                طراحی باید کاملاً کاربرپسند، خلاقانه و به‌روز باشد. پس از انتخاب، توضیحات دقیق‌تری درباره
                                ویژگی‌ها و انتظارات ارائه خواهد شد. اولویت ما در این پروژه، داشتن خلاقیت بالا و تحویل به موقع است.
                                لطفاً اگر توانایی‌های لازم را دارید و می‌توانید کیفیت مورد نظر را ارائه دهید، به ما پیام دهید.

                                با تشکر از شما.
                            </p>
                        </div>
                    </div>
                    <div className={'grid grid-cols-12 mt-8'}>
                        <div className={'col-span-12 flex justify-between'}>
                            <p className={'font-bold'}>مهارت های مورد نیاز :</p>
                            <p className={'border-b-blue-500 border-2 pl-2 ps-2 rounded-full'}>الگوریتم</p>
                            <p className={'border-b-blue-500 border-2 pl-2 ps-2 rounded-full'}>برنامه نویسی سی پلاس پلاس (C++)</p>
                            <p className={'border-b-blue-500 border-2 pl-2 ps-2 rounded-full'}>جاوا (Java)</p>
                            <p className={'border-b-blue-500 border-2 pl-2 ps-2 rounded-full'}>جاوا اسکریپت (JavaScript)</p>
                        </div>
                    </div>
                </div>
            </div>

            {modal && (
                <div
                    id="modalBackground"
                    onClick={closeModal}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                >
                    <div className="bg-amber-50 w-[600px] p-6 rounded-lg text-center relative">
                        <button
                            onClick={changeModal}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                        >
                            ×
                        </button>
                        <h2 className="text-xl font-bold mb-4">فرم پیشنهاد</h2>
                        <p>متن خود را وارد کنید:</p>
                        <input type="text" className="w-full p-2 mt-2 border rounded" />
                    </div>
                </div>
            )}
        </>
    );
}

export default ProjectCheckout;
