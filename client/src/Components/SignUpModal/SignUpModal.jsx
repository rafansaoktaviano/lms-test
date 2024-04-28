import React, { useState } from "react";
import Modal from "react-modal";
import signupbg from "./../../assets/signupbg.avif";
import { toastError, toastSuccess } from "../../utils/toast";
import axios from "axios";
const SignUpModal = ({ isOpen, onRequestClose, onLoginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must contain at least 8 characters, 1 uppercase letter, and 1 symbol."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value.toLowerCase();
    if (!/^[a-z]+$/.test(newUsername)) {
      setUsernameError("Username must contain only lowercase letters");
    } else {
      setUsernameError("");
      setUsername(newUsername);
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Alamat email tidak valid.");
    } else {
      setEmailError("");
    }
  };

  const submitCreateUser = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password || !firstname || !lastname || !username) {
        return toastError("Fill all the details!!");
      }
      if (usernameError) {
        return toastError(usernameError);
      }
      if (emailError) {
        return toastError(emailError);
      }
      if (passwordError) {
        return toastError(passwordError);
      }

      const dataBody = {
        username,
        firstname,
        lastname,
        password,
        email,
      };

      const res = await axios.post(
        "http://localhost:7000/api/user/create",
        dataBody
      );

      toastSuccess(res.data.message);
    } catch (error) {
      if (error.response.data.isError === true)
        return toastError(error.response.data.data.debuginfo);
    }
  };

  const customStyles = {
    content: {
      width: "800px",
      height: "600px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      zIndex: "50",
      backgroundColor: "white",
      border: 0,
      padding: 0,
      margin: 0,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      zIndex: "40",
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className="w-full h-full flex">
        <div className="h-full w-[50%] ">
          <img
            src={signupbg}
            alt=""
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="w-[50%] px-[20px]  text-white">
          <h1 className="text-[34px] text-black font-bold text-center mt-[20px]">
            Sign Up
          </h1>
          <form
            // onSubmit={onSubmitSignUp}
            action="
          "
          >
            <div className="mt-[20px] flex gap-2">
              <div>
                <label
                  htmlFor="firstname"
                  className="cursor-pointer font-bold text-black "
                >
                  Firstname
                </label>
                <input
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  id="firstname"
                  required
                  className="w-full cursor-pointer  placeholder-slate-500  bg-opacity-60 bg-white border-black border  p-[10px] rounded-lg mt-[10px] text-black  "
                  placeholder="John"
                />
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="cursor-pointer font-bold text-black "
                >
                  Lastname
                </label>
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  id="lastname"
                  required
                  className="w-full cursor-pointer placeholder-slate-500  bg-opacity-60 bg-white border-black border  p-[10px] rounded-lg mt-[10px] text-black  "
                  placeholder="Gerguson"
                />
              </div>
            </div>
            <div className="mt-[20px]">
              <label
                htmlFor="password"
                className="cursor-pointer font-bold text-black"
              >
                Username
              </label>
              <input
                onChange={(e) => handleUsernameChange(e)}
                type="text"
                id="username"
                placeholder="John Gans"
                required
                className="w-full cursor-pointer placeholder-slate-500  bg-opacity-60 bg-white border-black border   p-[10px] rounded-lg mt-[10px] text-black  "
              />
            </div>
            <div className="mt-[20px]">
              <label
                htmlFor="email"
                className="cursor-pointer font-bold text-black"
              >
                Email
              </label>
              <input
                onChange={(e) => handleEmailChange(e)}
                type="email"
                id="email"
                placeholder="John@example.com"
                required
                className="w-full cursor-pointer placeholder-slate-500  bg-opacity-60 bg-white border-black border   p-[10px] rounded-lg mt-[10px] text-black  "
              />
            </div>
            <div className="mt-[20px]">
              <label
                htmlFor="password"
                className="cursor-pointer font-bold text-black"
              >
                Password
              </label>
              <input
                onChange={(e) => handlePasswordChange(e)}
                type="password"
                id="password"
                placeholder="*********"
                required
                className="w-full cursor-pointer placeholder-slate-500  bg-opacity-60 bg-white border-black border   p-[10px] rounded-lg mt-[10px] text-black  "
              />
            </div>
            <h1 className="text-center mt-[20px] text-secondary text-black">
              Have an account ?{" "}
              <span className="font-bold text-highlight cursor-pointer ">
                Login
              </span>
            </h1>
            <button
              onClick={(e) => submitCreateUser(e)}
              type="submit"
              className="font-bold flex justify-center items-center w-full rounded-xl bg-[#009EED] p-[10px] mt-[20px]"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
