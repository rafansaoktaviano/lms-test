import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

import { FaLocationDot } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { BsFillTelephoneFill } from "react-icons/bs";
import { SiHomebridge } from "react-icons/si";

const Footer = () => {
  return (
    <div className="bg-black/80 h-[250px] px-[100px]">
      <div className="py-[20px] text-white">
        <div className="flex justify-between items-center">
          <h1>PT Dataquest Leverage. All Rights Reserved.</h1>
          <div className="flex items-center gap-5">
            <div className="w-[50px] h-[50px] bg-[#3B5998] flex justify-center items-center rounded-full cursor-pointer">
              <FaFacebook />
            </div>
            <div className="bg-[#00ACED] w-[50px] h-[50px] flex justify-center items-center rounded-full cursor-pointer">
              <FaTwitter />
            </div>
            <div className="bg-[#E4405F]  w-[50px] h-[50px] flex justify-center items-center rounded-full cursor-pointer">
              <FaInstagram />
            </div>
          </div>
        </div>
        <div className="mt-[20px] flex ">
          <div className="mr-[100px] text-white/80">
            <div className="flex items-center gap-4 text-">
              <FaLocationDot />
              <h1>
                Surapati Core Blok K-3, Jl. PHH. Mustofa No. 39, Bandung, 40192
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <IoIosMail />
              <h1>info@dataquest.co.id</h1>
            </div>
            <div className="flex items-center gap-4">
              <BsFillTelephoneFill />
              <h1>0821 2093 3939</h1>
            </div>
            <div className="flex items-center gap-4">
              <SiHomebridge />
              <h1>022 - 87500496</h1>
            </div>
          </div>
          <div>
            <div className="">Bantuan</div>
            <div className="text-white/80 mt-[10px]">
              <h1>Syarat & Ketentuan</h1>
              <h1>Kebijakan Privasi</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
