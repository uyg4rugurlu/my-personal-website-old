import {Dropdown} from "./Dropdown";
import {Toggle} from "./Toggle";

// Next.js
import Link from "next/link";
import React from "react";

export const Nav = () => {
    const ITEMS = [
        {id: 1, text: "Home", to: "/"}
    ];

    return (
        <nav
            className="flex px-6 top-8 fixed border dark:bg-[#10161a]/50 z-10 w-[90%] md:w-[40rem] border-teal-100 dark:border-teal-900 backdrop-blur-md mb-12 rounded-lg justify-between h-14 items-center">
            <div className="flex lg:hidden">
                <Dropdown items={ITEMS}/>
            </div>
            <div className="hidden lg:flex">
                {ITEMS.map((nav) => (
                    <LinkTag key={nav.id} to={nav.to}>
                        {nav.text}
                    </LinkTag>
                ))}
            </div>
            <Toggle/>
        </nav>
    );
};

const LinkTag = ({
                     children,
                     to,
                 }: {
    children: React.ReactNode;
    to: string;
}) => {
    return (
        <Link href={to}>
            <a className="mr-8 text-gray-600 focus:ring-2 ring-pink-500 outline-none dark:text-gray-300 text-sm duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg">
                {children}
            </a>
        </Link>
    );
};
