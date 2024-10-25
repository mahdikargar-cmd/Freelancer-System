import React, {useEffect} from "react";
import axios from "axios";

export const FreelancerM = () => {
    useEffect(()=>{

    })
    const getData=async (data)=>{
        const response=axios.get('http://')
    }
    return (
        <>
            <div className={'bg-gray-300 p-2 mt-4 m-2 '}>
                <div className={'grid grid-cols-12'}>
                    <div className={'col-span-12 flex justify-between'}>
                        <p>پروژه فریلنسر</p>
                        <p>تاریخ 30 اردیبهشت</p>
                    </div>
                </div>
                <div className={'grid grid-cols-12'}>
                    <div className={'col-span-12 flex'}>اخرین پیام ارسالی در چت</div>
                </div>
            </div>
        </>
    );
};