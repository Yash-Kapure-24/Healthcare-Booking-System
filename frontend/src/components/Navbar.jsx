import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  }

  return (
    <div className='flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img
        onClick={() => navigate("/")}
        className='w-44 cursor-pointer'
        src={assets.logo}
        alt=''
      />

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {["/", "/doctors", "/about", "/contact"].map((path, index) => {
          const labels = ["HOME", "All DOCTORS", "ABOUT", "CONTACT"];
          return (
            <NavLink key={index} to={path} className='text-center'>
              {({ isActive }) => (
                <li className='py-1 relative'>
                  {labels[index]}
                  <hr
                    className={`border-none outline-none h-0.5 bg-[#1b1f49] rounded-full w-3/5 m-auto ${
                      isActive ? "block" : "hidden"
                    }`}
                  />
                </li>
              )}
            </NavLink>
          );
        })}
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-4 cursor-pointer relative group'>
            <img
              className='w-8 rounded-full'
              src={userData.image}
              alt='Profile'
            />
            <img
              className='w-2.5'
              src={assets.dropdown_icon}
              alt='Dropdown Icon'
            />

            <div className='absolute top-full right-0 pt-2 w-40 bg-white shadow-md rounded-md text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='flex flex-col space-y-2 p-1'>
                <p
                  onClick={() => navigate("/my-Profile")}
                  className='hover:bg-gray-100 p-2 rounded cursor-pointer'
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-Appointments")}
                  className='hover:bg-gray-100 p-2 rounded cursor-pointer'
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className='hover:bg-gray-100 p-2 rounded cursor-pointer'
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className='bg-[#5f6FFF] text-white py-3 px-8 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className='w-6 md:hidden '
          src={assets.menu_icon}
          alt=''
        />

        {/* modile menu */}

        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}
        >
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt='' />
            <img
              className='w-7'
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=''
            />
          </div>

          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className='px-4 py-2 rounded inline-block'>HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
