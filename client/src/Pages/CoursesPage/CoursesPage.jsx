import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, redirect, useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const [courseData, setCourseData] = useState([]);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    const params = new URLSearchParams();

    navigate(
      `/courses?category=${category || ""}&search=${search}&sort=${sort}`
    );

    const filteredData = courseData.filter((value) => {
      return (
        (!category || value.categoryid == category) &&
        (!search || value.fullname.toLowerCase().includes(search.toLowerCase()))
      );
    });

    if (sort === "A-Z") {
      courseData.sort((a, b) => a.fullname.localeCompare(b.fullname));
    } else if (sort === "Z-A") {
      courseData.sort((a, b) => b.fullname.localeCompare(a.fullname));
    }

    setDataFiltered(filteredData);
  }, [category, search, sort]);

  return (
    <div className="px-[400px] py-[50px]">
      <h1 className="text-[32px] font-semibold mb-[50px]">Courses</h1>
      <div className="">
        <div className="flex gap-5 justify-between">
          <select
            onChange={(e) => setCategory(e.target.value)}
            defaultValue={""}
            className="relative  w-[25%] rounded-lg border-gray-200 border p-4  text-sm shadow-sm"
          >
            <option value={""}>All Categories</option>
            <option value={1}>Category 1</option>
            <option value={2}>Category 1 / test</option>
            <option value={3}>class</option>
          </select>
          <div className="relative w-full flex">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full rounded-lg border-gray-200 border p-4 pe-12 text-sm shadow-sm"
              placeholder="Search"
            />
            <button className="px-4 py-2 bg-blue-400 rounded-lg text-white font-bold ml-[-10%]">
              Search
            </button>
          </div>
          <select
            onChange={(e) => setSort(e.target.value)}
            defaultValue={""}
            className="relative  w-[25%] rounded-lg border-gray-200 border p-4 pe-12 text-sm shadow-sm"
          >
            <option value={""}>Sort</option>
            <option value={"A-Z"}>Sort A to Z</option>
            <option value={"Z-A"}>Sort Z to A</option>
          </select>
        </div>
        <div className="mt-[50px] flex flex-col gap-5">
          {search || sort || category
            ? dataFiltered.map((value, index) => {
                return (
                  <div className="w-full h-[200px] border rounded-xl flex">
                    <div className="w-[200px] h-full bg-slate-500 rounded-xl"></div>
                    <div className="p-4">
                      <h1 className="font-semibold text-18px text-blue-400">
                        {value.fullname}
                      </h1>
                      <h1 className="text-slate-600">{value.categoryname}</h1>
                      <p className="text-slate-500">{value.summary}</p>
                    </div>
                  </div>
                );
              })
            : courseData.map((value, index) => {
                return (
                  <div className="w-full h-[200px] border rounded-xl flex">
                    <div className="w-[200px] h-full bg-slate-500 rounded-xl"></div>
                    <div className="p-4">
                      <h1 className="font-semibold text-18px text-blue-400">
                        {value.fullname}
                      </h1>
                      <h1 className="text-slate-600">{value.categoryname}</h1>
                      <p className="text-slate-500">{value.summary}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
