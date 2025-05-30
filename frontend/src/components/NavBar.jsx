import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      className={`w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] bg-blue-400 mx-auto`}
    >
      <div className="text-white py-5 flex gap-3 justify-between items-center">
        <div className="text-lg font-semibold cursor-pointer z-50">
          <Link to={"/"} className="flex items-center gap-1.5 cursor-pointer">
            <img src={logo} className="w-7 pb-1 rounded-full" />
            <p className="font-bold text-2xl text-white pb-1">HoopScores</p>
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            to={'/'}
            className="group relative hover:text-blue-900 transition cursor-pointer duration-200 text-lg font-semibold"
          >
            Home
            <div className="h-[2px] bg-blue-900 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full"></div>
          </Link>
          <Link
            to={'/matches'}
            className="group relative hover:text-blue-900 transition cursor-pointer duration-200 text-lg font-semibold"
          >
            Matches
            <div className="h-[2px] bg-blue-900 absolute bottom-[-1] left-0 w-0 transition-all duration-300 group-hover:w-full"></div>
          </Link>
        </div>

        {/* Social Media Icons  */}
        <div className="hidden sm:flex space-x-4">
          <a
            href="https://github.com/amit-prajapati-ap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-[#8245ec] transition duration-200"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://x.com/Prajapatiamitap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-[#8245ec] transition duration-200"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/amit-prajapati-0544882b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-[#8245ec] transition duration-200"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
