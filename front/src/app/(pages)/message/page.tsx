"use client";

import React, { useState } from 'react';
import { FreelancerM } from "@/Components/Messages/FreelancerM";
import { KarfarmaM } from "@/Components/Messages/KarfarmaM";

function Message() {
    const [freelancerM, setFreelancerM] = useState(false);
    const [karfarmaM, setKarfarmaM] = useState(false);

    const FreelancerMessage = () => {
        setFreelancerM(true);
        setKarfarmaM(false);
    };

    const KarfarmaMessageToggle = () => {
        setKarfarmaM(true);
        setFreelancerM(false);
    };

    return (
        <div className={'mt-4 pb-5 flex justify-center'}>
            <div className={'bg-amber-50 w-[1000px]'}>
                <div className={'grid grid-cols-12'}>
                    <div className={'col-span-12 flex justify-center mt-4'}>
                        <p className={'text-2xl font-bold'}>پیام های من</p>
                    </div>
                </div>
                <div className={'grid grid-cols-12 h-[500px] m-4'}>
                    <div className={'col-span-4 flex flex-col'}>
                        <div className={'flex justify-evenly ml-2'}>
                            <button onClick={FreelancerMessage}
                                    className={'bg-gray-600 p-2 rounded-full text-white'}>
                                پیام های فریلنسری
                            </button>
                            <button onClick={KarfarmaMessageToggle}
                                    className={'bg-gray-600 p-2 rounded-full text-white'}>
                                پیام های کارفرمایی
                            </button>
                        </div>

                        {freelancerM && <FreelancerM />}
                        {karfarmaM && <KarfarmaM />}
                    </div>
                    <div className={'col-span-8 bg-gray-200 flex items-center justify-center'}>
                        <p>برای شروع به گفتگو لطفا یکی از مکالمه هارو انتخاب کنید</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
