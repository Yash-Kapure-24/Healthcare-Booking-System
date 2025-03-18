import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* left side */}

        <div>
          <img className="mb-5 w-40 " src={assets.logo} alt='' />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            doloribus, quidem, quod, voluptatem odio quas dicta quibusdam
            repudiandae autem voluptates
          </p>
        </div>

        {/* center side */}

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* right side */}

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Address: 123, XYZ, ABC</li>
            <li>Email: 6p9F3@example.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center ">© 2023 by XYZ. Proudly created with Wix.com</p>
      </div>
    </div>
  );
};

export default Footer;
