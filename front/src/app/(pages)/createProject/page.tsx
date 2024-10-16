import React from 'react'

function CreateProject() {
    return (
        <div className={'p-2 bg-amber-50 mt-4'}>
            <div className={'grid grid-cols-12 mt-4 '}>
                <div className={'col-span-4 flex justify-evenly'}>
                    <p>ثبت موضوع</p>
                    <input type="text" placeholder={'موضوع دلخواه را وارد کنید'}
                           className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'}/>
                </div>
                <div className={'col-span-4 flex justify-evenly placeholder:text-white text-white'}>
                    <p>انتخاب دسته بندی</p>
                    <select name="انتخاب دسته بندی" id=""
                            className={'w-[200px] bg-gray-400 rounded placeholder:text-white placeholder:p-2'}>
                        <option value="">برنامه نویسی</option>
                        <option value="">طراحی اپلیکیشن</option>

                    </select>
                </div>
                <div className={'col-span-4 flex justify-evenly'}>
                    <p>زمان پیشنهادی تحویل پروژه </p>
                    <input type="text"
                           className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'}/>
                </div>
            </div>
            <div className={'grid grid-cols-12 mt-8'}>
                <div className={'col-span-12 flex justify-evenly items-center m-8'}>
                    <p className={'text-[20px]'}> توضیحات راجب پروژه</p>
                    <textarea
                        className={'min-w-[1000px] min-h-64 bg-gray-400 rounded placeholder:text-white placeholder:p-2 '}/>
                </div>
            </div>
            <div className={'grid grid-cols-12 mt-4 mb-5'}>
                <div className={'col-span-6 flex justify-evenly'}>
                    <p>آپلود فایل (اختیاری)</p>
                    <input type="file"/>
                </div>
                <div className={'col-span-6 flex justify-evenly'}>
                    <p>مهارت های مورد نیاز</p>
                    <input className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2'} type="text"/>
                </div>
            </div>
            <div className={'grid grid-cols-12 mt-8 '}>
                <div className={'col-span-12 flex justify-evenly'}>
                    <p>میزان بودجه شما چقدر است؟</p>
                    <div className={'flex justify-between'}>
                        <input type="text"
                               className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2 ml-5'}/>
                        <p>تا</p>
                        <input type="text"
                               className={'bg-gray-400 rounded placeholder:text-white placeholder:p-2 ms-5'}/>
                    </div>
                </div>

            </div>
            <div className={'grid grid-cols-12 mt-8 m-2'}>
                <div className={'col-span-12 flex justify-end'}>
                    <button className={'bg-blue-500 text-white p-2 rounded '}>ثبت پروژه و انتشار</button>

                </div>
            </div>
        </div>
    )
}

export default CreateProject
