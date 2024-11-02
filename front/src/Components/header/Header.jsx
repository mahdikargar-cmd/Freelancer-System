export const Header = () => {
    return (
        <>
            <div className={'grid grid-cols-12 bg-amber-50 mt-6 h-[500px]'}>
                <div className={'col-span-6 flex justify-items-start  items-center'}>
                    <div>
                        <p className={'ms-6 text-3xl font-bold'}>اولین پروژه خود را ثبت کنید</p>

                    </div>
                    <div className={'mt-36'}>
                        <button className={'bg-[#3b82f6] p-2 text-white rounded ms-10'}>ثبت پروژه</button>

                    </div>
                </div>
                <div className={'col-span-6'}>picture</div>
            </div>

        </>
    );
};