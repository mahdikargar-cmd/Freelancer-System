import aks from '../../public/assets/img/Workingremotely.png';
import background from '../../public/assets/img/Rectangle.svg';
import group from '../../public/assets/img/pngegg.svg';

import {LiaProjectDiagramSolid, LiaSearchSolid} from "react-icons/lia";
import {RiAccountPinBoxFill} from "react-icons/ri";
import {FaAirbnb} from "react-icons/fa";
import {VscActivateBreakpoints} from "react-icons/vsc";

export const Header = () => {
    return (
        <>
            {/* start main*/}
            <div
                className="relative w-full h-[700px]  overflow-hidden bg-no-repeat bg-cover bg-center "
                style={{
                    backgroundImage: `url(${background.src})`,

                }}
            >

                <div className="absolute top-0 left-0 right-0 h-full">

                </div>
                <div className="grid grid-cols-12 relative z-10 pt-16">
                    <div className="col-span-6 flex items-center justify-center ">
                        <img src={aks.src} alt="" className={'w-[400px] h-[400px] '}/>
                    </div>
                    <div className="col-span-6 flex items-center flex-col space-y-8 justify-center">
                        <h1 className="font-bold text-[35px]">
                            به دنبال فریلنسر مورد نظر <p>برای پروژه تون هستین؟ </p>
                        </h1>
                        <p className={'text-zinc-600 w-[300px]'}>
                            استخدام فریلنسر های بزرگ به شما کمک میکنند تا بتوانید پروژه خود را با بالاترین کیفیت تحویل
                            بگیرید
                        </p>

                        <div className={'flex justify-between '}>
                            <div className={'relative'}>
                                <input type="text" className={'drop-shadow m-1 p-2 '}/>
                                <button className={'absolute -ms-52 mt-2'}><LiaSearchSolid size={30}/></button>

                            </div>
                            <button className={'bg-blue-600 rounded text-white p-2 m-1 ps-3 pl-3'}>نمایش پروژه ها
                            </button>
                        </div>
                    </div>
                </div>


            </div>
            {/* end main*/}
            {/* start info*/}
            <div className={'flex justify-center -mt-40 z-50 relative'}>
                <div className={' bg-white w-[1000px]  p-8 shadow-2xl'}>
                    <div className={'grid grid-cols-12   '}>
                        <div className={'col-span-3 flex flex-col '}>
                            <div className={'flex justify-center'}><RiAccountPinBoxFill
                                className={'bg-blue-400 rounded-full p-2 text-amber-50'} size={70}/></div>
                            <div className={'p-2 text-zinc-600  '}><p>در ابتدا حسابی ایجاد کنید و پروفایل خود را
                                تکمیل کنید</p></div>
                        </div>
                        <div className={'col-span-3 flex flex-col '}>
                            <div className={'flex justify-center'}>
                                <LiaProjectDiagramSolid
                                    className={'bg-blue-400 rounded-full p-2 text-amber-50'} size={70}/></div>
                            <div className={'p-2 text-zinc-600  '}><p>مشخصات پروژه مدنظر خودرا در قسمت ایجاد پروژه
                                وارد کنید تا فریلنسر ها دست بکار شوند</p></div>
                        </div>
                        <div className={'col-span-3 flex flex-col '}>
                            <div className={'flex justify-center'}>
                                <FaAirbnb
                                    className={'bg-blue-400 rounded-full p-2 text-amber-50'} size={70}/></div>
                            <div className={'p-2 text-zinc-600  '}><p>سپس هوش مصنوعی ددلاین دست بکار میشود و بهترین
                                فریلنسرهای مناسب پروژه رو بهتون پیشنهاد میکنه</p></div>
                        </div>
                        <div className={'col-span-3 flex flex-col '}>
                            <div className={'flex justify-center'}>
                                <VscActivateBreakpoints
                                    className={'bg-blue-400 rounded-full p-2 text-amber-50'} size={70}/></div>
                            <div className={'p-2 text-zinc-600  '}><p>پنل کاربری براتون فعال میشه تا بتونین با
                                فریلنسر خودتون همکاری کنین تا پروژه به پایان برسه</p></div>
                        </div>
                    </div>
                </div>

            </div>
            {/* end info*/}
            {/* start caption*/}
            <div className={'flex justify-center'}>
                <div className={'grid grid-cols-12 mt-48 w-[1000px]'}>
                    <div className={'col-span-6 flex items-center flex flex-col'}>
                        <h1 className={'font-semibold text-[40px]'}>چگونه بهترین <p
                            className={'text-blue-500'}>فریلنسر</p> مناسب پروژه ام رو انتخاب کنم؟
                        </h1>
                        <div className={'flex  justify-start  '}>
                            <h1 className={''}> تعریف دقیق نیازهای پروژه: <p>نیازهای پروژه را به دقت مشخص کنید؛ مثل
                                مهارت‌ها، تجربه، سطح تخصص، و بودجه. این کمک می‌کند تا فریلنسرهایی که دقیقاً با نیازهای
                                شما تطابق دارند، بتوانند به پروژه‌تان پاسخ دهند.</p>
                            </h1>
                        </div>
                        <div className={'flex  justify-start  '}>
                            <h1 className={''}> بررسی پروفایل و نمونه‌کارهای فریلنسر: <p>پروفایل فریلنسرها را به دقت مطالعه کنید. به مهارت‌ها، توضیحات پروژه‌های قبلی، و سابقه کاری توجه کنید.
                                نمونه‌کارها: مشاهده نمونه‌کارهای گذشته کمک می‌کند تا از کیفیت کار و سبک کاری فریلنسر مطلع شوید.</p>
                            </h1>
                        </div>

                    </div>
                    <div className={'col-span-6 '}>
                        <img src={group.src} alt="" className={'w-[400px] h-[400px] '}/>
                        <div className={'flex flex-col justify-center relative -mt-52 bg-white drop-shadow w-[90px] rounded'}>
                            <p className={'text-blue-500 flex justify-center'}>300+</p>
                            <p className={' flex justify-center'}>فریلنسر</p>
                        </div>
                        <div className={'flex flex-col justify-center relative -mt-32 ms-20 bg-white drop-shadow w-[90px] rounded'}>
                            <p className={'text-blue-500 flex justify-center'}>500+</p>
                            <p className={' flex justify-center'}>پروژه</p>
                        </div>
                    </div>
                </div>

            </div>
            {/* end caption*/}
        </>
    );
};
