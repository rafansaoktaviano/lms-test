import React, { useState } from "react";

import { FaUserGraduate } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import SignUpModal from "../SignUpModal/SignUpModal";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="h-[100px]  z-1000 w-full bg-[#0076BD] px-[200px] flex justify-between">
      <div className="flex items-center text-white gap-5">
        <div className="h-full flex items-center text-white gap-3 font-bold ">
          <FaUserGraduate className="text-[32px]" />
          LMS
        </div>
        <div className="font-bold cursor-pointer hover:scale-105">
          My Courses
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/create-course")}
            className={`nav-btn  px-4 py-2 bg-blue-400 rounded-lg   font-semibold text-white flex items-center gap-3 text-[18px]`}
          >
            Create Course
          </button>
        </div>
        <button
          onClick={() => setIsOpenModal(!isOpenModal)}
          className={`nav-btn    font-semibold text-white flex items-center gap-3 text-[18px]`}
        >
          <BsFillPersonFill />
          Login
        </button>
      </div>

      <SignUpModal
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default Nav;
