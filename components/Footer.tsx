import React, {useEffect, useState} from "react";

export const Footer = (props: { children?: React.ReactNode }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setAnimation(true);
            setTimeout(() => {
                setAnimation(false);
            }, 500);
        }, 1000);
        setIsMounted(true);
        return () => clearInterval(interval);
    }, [time]);

    return (
        <footer className="flex flex-col border-t mt-6 border-teal-100 dark:border-teal-900 pt-10">
            <div className="flex justify-between mb-[-2rem]">
                <h2 className="text-xl opacity-80 font-bold dark:text-white">
                    Uygar Uğurlu
                </h2>
                <p className={`text-gray-500 opacity-80 text-xs mb-12 transition duration-500 ease-in-out ${animation ? 'text-teal-500' : ''}`}>
                    {isMounted ? time : null}
                </p>
            </div>
            <p className="text-gray-500 opacity-80 text-xs mb-12">
                &copy; {new Date().getFullYear()} | All rights reserved
            </p>
        </footer>
    );
};