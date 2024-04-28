import React, { useEffect, useRef, useState } from "react";
import background from "./../../assets/background.jpeg";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Homepage = () => {
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const containerRef = useRef(null);

  const fetch = async () => {
    try {
      const res = await axios.post("http://localhost:7000/api/course/data");
      setCourseData(res.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courseData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    containerRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    containerRef.current.scrollIntoView({ behavior: "smooth", inline: "end" });
  };

  return (
    <>
      <div className="text-black">
        <img
          className="h-[400px] w-full object-cover"
          src={background}
          alt=""
        />
        <div className="py-[50px] px-[100px] ">
          <div className="flex justify-between items-center mb-[20px]">
            <h1 className="text-[24px] font-bold">Available Courses</h1>
            <Link to={"/courses"}>
              <button className="bg-[#009EED] p-2 rounded-sm text-[14px] text-white">
                View all courses
              </button>
            </Link>
          </div>
          <div ref={containerRef} className="flex gap-4 overflow-auto">
            {currentItems.map((value, index) => (
              <div key={index} className="min-w-[300px] h-[270px] border">
                <img className="w-full bg-slate-400 h-[150px]" src="" alt="" />
                <h1 className="mt-[10px] mx-[10px]">{value.categoryname}</h1>
                <h1 className="text-[#62A8EB]  mx-[10px]">{value.fullname}</h1>
                <p className="mx-[10px] text-[14px] mb-[10px]">
                  {value.summary}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextPage}
              disabled={indexOfLastItem >= courseData.length}
              className="mx-1 px-3 py-1 rounded-lg bg-blue-500 text-white"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
