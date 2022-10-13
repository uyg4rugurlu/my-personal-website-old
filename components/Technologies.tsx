import {technologies} from "../lib/technologies";
import {Heading} from "./Heading";
// React-Icons
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as DiIcons from "react-icons/di";
import * as ImIcons from "react-icons/im";
import * as IoIcons from "react-icons/io";
import * as TbIcons from "react-icons/tb";

// Next.js
import Link from "next/link";

export const Technologies = () => {
    return (
        <section className="flex flex-col mb-12 ">
            <Heading>Technologies 💻</Heading>
            <ul className="block text-center list-disc">
                {technologies.map((tech) => (
                    <Link key={tech.id} href={tech.link}>
                        <a target="_blank">
                            <li className="inline-flex justify-between items-center mr-4 hover:translate-y-1 text-sm inline-block rounded-full mb-4 duration-300 py-2 px-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-white">
                                {tech.icon === "FaReact" && <FaIcons.FaReact className="mr-1 text-lg"/>}
                                {tech.icon === "TbBrandNextjs" && <TbIcons.TbBrandNextjs className="mr-1 text-lg"/>}
                                {tech.icon === "FaNodeJs" && <FaIcons.FaNodeJs className="mr-1 text-lg"/>}
                                {tech.icon === "IoLogoJavascript" &&
                                    <IoIcons.IoLogoJavascript className="mr-1 text-lg"/>}
                                {tech.icon === "DiPhp" && <DiIcons.DiPhp className="mr-1 text-lg"/>}
                                {tech.icon === "SiTailwindcss" && <SiIcons.SiTailwindcss className="mr-1 text-lg"/>}
                                {tech.icon === "SiMysql" && <SiIcons.SiMysql className="mr-1 text-lg"/>}
                                {tech.icon === "ImGit" && <ImIcons.ImGit className="mr-1 text-lg"/>}
                                {tech.icon === "FaUbuntu" && <FaIcons.FaUbuntu className="mr-1 text-lg"/>}
                                {tech.icon === "FaCentos" && <FaIcons.FaCentos className="mr-1 text-lg"/>}
                                {tech.icon === "SiVisualstudiocode" &&
                                    <SiIcons.SiVisualstudiocode className="mr-1 text-lg"/>}
                                {tech.icon === "SiWebstorm" && <SiIcons.SiWebstorm className="mr-1 text-lg"/>}
                                {"• "} {tech.text}
                            </li>
                        </a>
                    </Link>
                ))}
            </ul>
        </section>
    );
};
