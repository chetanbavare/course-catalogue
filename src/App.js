import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards"
import {apiUrl, filterData } from "./data";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";

const App = () => {

  const [courses,setCourses] = useState("")
  const [loading,setLoading] = useState(false)
  const [category,setCategory] = useState(filterData[0].title)
  
  const fetchData = async() => 
    {
      setLoading(true) //before rendering data
      try
      {
        const res = await fetch(apiUrl)
        const output = await res.json(res)
        setCourses(output.data)
        // console.log("from app.js")
        // console.log(output.data)
        // output has data json inside so access it by using . 
      }
      catch(error)
      {
        toast.error("something went wrong")
      }
      setLoading(false) //after rendering data
    }

  useEffect( () => 
  {
    fetchData();
  },[])

  return (
  <div className="min-h-screen flex flex-col bg-bgDark2">
    <div>
      <Navbar/>
    </div>

    <div className="">
      <div>
        <Filter filterData = {filterData} setCategory = {setCategory} />
      </div>
      <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
        {loading ? <Spinner/> : <Cards courses = {courses} category = {category} setCategory = {setCategory} />}
      </div>
    </div>
    
  </div>
  )
};

export default App;
