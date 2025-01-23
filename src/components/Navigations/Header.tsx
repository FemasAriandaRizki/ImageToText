import Link from "next/link";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const Header = () => {
    return <div className="text-white w-full flex justify-between items-center md:px-20 py-5 px-5 sticky top-0 left-0 backdrop-blur-xl">
        <div>
            <Link href={"/"} className="font-[800] text-3xl">
                Get Text
            </Link>
        </div>
        <div>
            <a href="">
                <span>Github</span>
                <span><GoArrowUpRight /></span>
            </a>
        </div>
    </div>;
};

export default Header;
