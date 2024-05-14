"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaQuestion } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";

const Menu = () => {
  const pathName = usePathname();
  const menuList = [
    {
      name: "Free Play",
      icon: <IoLogoGameControllerB className="inline-block mr-2 h-6 w-6" />,
      href: "/discover",
      aria: "Link to discover page",
    },
    {
      name: "Levels",
      icon: <FaHeart className="inline-block mr-2 h-6 w-6" />,
      href: "/likes",
      aria: "Link to liked tracks",
    },
    {
      name: "Leaderboard",
      icon: <MdLeaderboard className="inline-block mr-2 h-6 w-6" />,
      href: "/create-music",
      aria: "Link to upload music",
    },
    {
      name: "How to Play",
      icon: <FaQuestion className="inline-block mr-2 h-6 w-6" />,
      href: "/leaderboards",
      aria: "Link to leaderboard page",
    },
  ];
  return (
    <>
      <div className="flex items-center mb-16"></div>
      <nav>
        <ul className="flex flex-col gap-4 ">
          {menuList.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={` ${pathName === item.href ? "bg-white text-black/100 shadow-sm" : ""} block p-3 text-2xl font-bold tracking-normal text-black/60 rounded-lg transition duration-150 ease-in-out w-full transform hover:text-black hover:bg-white`}
                aria-label={item.aria}
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mb-28"></footer>
    </>
  );
};

export default Menu;
