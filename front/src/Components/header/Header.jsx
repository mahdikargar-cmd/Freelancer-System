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
            {/* start main */}
            <div
                className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: `url(${background.src})`,
                }}
            >
                <div className="absolute top-0 left-0 right-0 h-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-12 relative z-10 pt-8 md:pt-16">
                    <div className="col-span-6 flex items-center justify-center">
                        <img src={aks.src} alt="Moving Image"
                             className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] animate-bounce-vertical"/>
                    </div>
                    <div
                        className="col-span-6 flex items-center flex-col space-y-4 md:space-y-8 justify-center text-center md:text-right">
                        <h1 className="font-bold text-[24px] md:text-[35px]">
                            به دنبال فریلنسر مورد نظر <p>برای پروژه تون هستین؟</p>
                        </h1>
                        <p className="text-zinc-600 w-[250px] md:w-[300px]">
                            استخدام فریلنسر های بزرگ به شما کمک میکنند تا بتوانید پروژه خود را با بالاترین کیفیت تحویل
                            بگیرید
                        </p>
                        <div className="flex justify-center md:justify-between space-x-2">
                            <div className="relative">
                                <input type="text" className="drop-shadow m-1 p-2"/>
                                <button className="absolute left-0 top-1/2 transform -translate-y-1/2"><LiaSearchSolid
                                    size={30}/></button>
                            </div>
                            <button className="bg-blue-600 rounded text-white p-2 m-1 px-4">نمایش پروژه ها</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* end main */}

            {/* start info */}
            <div className="flex justify-center  md:-mt-40 z-50 relative px-4">
                <div className="bg-white w-full max-w-4xl p-6 md:p-8 shadow-2xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center text-center space-y-2">
                            <RiAccountPinBoxFill className="bg-blue-400 rounded-full p-2 text-amber-50" size={70}/>
                            <p className="text-zinc-600">در ابتدا حسابی ایجاد کنید و پروفایل خود را تکمیل کنید</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <LiaProjectDiagramSolid className="bg-blue-400 rounded-full p-2 text-amber-50" size={70}/>
                            <p className="text-zinc-600">مشخصات پروژه مدنظر خودرا در قسمت ایجاد پروژه وارد کنید تا
                                فریلنسر ها دست بکار شوند</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <FaAirbnb className="bg-blue-400 rounded-full p-2 text-amber-50" size={70}/>
                            <p className="text-zinc-600">سپس هوش مصنوعی ددلاین دست بکار میشود و بهترین فریلنسرهای مناسب
                                پروژه رو بهتون پیشنهاد میکنه</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-2">
                            <VscActivateBreakpoints className="bg-blue-400 rounded-full p-2 text-amber-50" size={70}/>
                            <p className="text-zinc-600">پنل کاربری براتون فعال میشه تا بتونین با فریلنسر خودتون همکاری
                                کنین تا پروژه به پایان برسه</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* end info */}

            {/* start caption */}
            <div className="flex justify-center px-4 mt-20 md:mt-48">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full max-w-6xl">
                    <div
                        className="col-span-12 md:col-span-6 flex items-center flex-col text-center md:text-right space-y-4">
                        <h1 className="font-semibold text-[28px] md:text-[40px]">
                            چگونه بهترین <p className="text-blue-500">فریلنسر</p> مناسب پروژه ام رو انتخاب کنم؟
                        </h1>
                        <div className="text-zinc-600">
                            <p className="font-semibold">تعریف دقیق نیازهای پروژه:</p>
                            <p>نیازهای پروژه را به دقت مشخص کنید؛ مثل مهارت‌ها، تجربه، سطح تخصص، و بودجه. این کمک می‌کند
                                تا فریلنسرهایی که دقیقاً با نیازهای شما تطابق دارند، بتوانند به پروژه‌تان پاسخ دهند.</p>
                        </div>
                        <div className="text-zinc-600">
                            <p className="font-semibold">بررسی پروفایل و نمونه‌کارهای فریلنسر:</p>
                            <p>پروفایل فریلنسرها را به دقت مطالعه کنید. به مهارت‌ها، توضیحات پروژه‌های قبلی، و سابقه
                                کاری توجه کنید. مشاهده نمونه‌کارهای گذشته کمک می‌کند تا از کیفیت کار و سبک کاری فریلنسر
                                مطلع شوید.</p>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 flex flex-col items-center">
                        <img src={group.src} alt="" className="w-[200px] h-[200px] md:w-[400px] md:h-[400px]"/>
                        <div
                            className="relative ml-80 animate-bounce-vertical  -mt-40 md:-mt-52 bg-white shadow-lg w-[70px] md:w-[90px] rounded-lg text-center p-2">
                            <p className="text-blue-500 ">300+</p>
                            <p>فریلنسر</p>
                        </div>
                        <div
                            className="relative -mt-10 animate-bounce-vertical md:-mt-32 ml-32  bg-white shadow-lg w-[70px] md:w-[90px] rounded-lg text-center p-2">
                            <p className="text-blue-500">500+</p>
                            <p>پروژه</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* end caption */}
        </>
    );
};
