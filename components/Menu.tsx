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
      icon: <IoLogoGameControllerB className="inline-block mr-4 h-10 w-10" />,
      href: "protected/freeplay",
      aria: "Link to discover page",
    },
    {
      name: "Levels",
      icon: <FaHeart className="inline-block mr-4 h-10 w-10" />,
      href: "/protected/Levels",
      aria: "Link to liked tracks",
    },
    {
      name: "Leaderboard",
      icon: <MdLeaderboard className="inline-block mr-4 h-10 w-10" />,
      href: "/protected/Leaderboard",
      aria: "Link to upload music",
    },
    {
      name: "How to Play",
      icon: <FaQuestion className="inline-block mr-4 h-10 w-10" />,
      href: "/protected/HTP",
      aria: "Link to leaderboard page",
    },
  ];

  return (
    <>
      <div className="flex items-center mb-56 mx-auto"></div>
      <nav>
        <ul className="flex flex-col gap-10">
          {" "}
          {/* Increased gap size */}
          {menuList.map((item, index) => (
            <li key={item.name}>
              <Link
                href={item.href}
                aria-label={item.aria}
                className="relative"
              >
                <span className="absolute top-0 left-0 mt-2 ml-2 h-full w-full rounded bg-black"></span>
                <span
                  className={`relative inline-block h-full w-full rounded-lg border-4 border-black bg-white px-6 py-3 text-xl font-bold text-black transition duration-100 hover:bg-yellow-400 hover:text-gray-900 ${pathName === item.href ? "bg-yellow-400 text-gray-900" : ""}`}
                >
                  {item.icon} {item.name}
                </span>
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


