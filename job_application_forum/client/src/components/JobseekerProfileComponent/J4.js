// J4.js (or any other child component)
import React, { useState } from 'react';
import {toast} from "react-toastify"
const J4 = ({ onNext,onPrev,userDetails ,setUserDetails }) => {
  const [jobPreferences, setJobPreferences] = useState({
    desiredJobTitles: userDetails.jobPreferences.desiredJobTitles.join(",") || "",
    industryPreferences: userDetails.jobPreferences.industryPreferences || [],
    employmentType: userDetails.jobPreferences.employmentType || "",
    salaryExpectations: userDetails.jobPreferences.salaryExpectations || "",
    workAuthorization: userDetails.jobPreferences.workAuthorization || "",
  });

  const jobsArray = [
    "Machine Learning",
    "Artificial Intelligence",
    "Data Science",
    "Big Data Analytics",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Robotics",
    "Deep Learning",
    "Reinforcement Learning",
    "Predictive Analytics",
    "Data Engineering",
    "Quantum Computing",
    "Autonomous Vehicles",
    "Internet of Things (IoT)",
    "Healthcare Technology",
    "Financial Technology (FinTech)",
    "E-commerce",
    "Cybersecurity",
    "Cloud Computing",
    "Augmented Reality (AR)",
    "Virtual Reality (VR)",
    "Blockchain Technology",
    "Smart Cities",
    "Renewable Energy",
    "Agricultural Technology (AgTech)",
    "EdTech (Education Technology)",
    "Gaming and Entertainment",
    "Telecommunications",
    "Space Technology",
    "Environmental Sustainability"
];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobPreferences((prevJobPreferences) => ({
      ...prevJobPreferences,
      [name]: value
    }));
  };

  const handleJobSelect = (option) => {
    const { industryPreferences } = jobPreferences;

    if (industryPreferences.includes(option)) {
      const updatedIndustryPreferences = industryPreferences.filter(item => item !== option);
      setJobPreferences({ ...jobPreferences, industryPreferences: updatedIndustryPreferences });
    } else {
      const updatedIndustryPreferences = [...industryPreferences, option];
      setJobPreferences({ ...jobPreferences, industryPreferences: updatedIndustryPreferences });
    }
  };

  const handleSubmit = () => {
      const  updatedjobPreferences= {
        desiredJobTitles: jobPreferences.desiredJobTitles.split(","),
        industryPreferences: jobPreferences.industryPreferences,
        employmentType: jobPreferences.employmentType,
        salaryExpectations: jobPreferences.salaryExpectations,
        workAuthorization: jobPreferences.workAuthorization,
      }
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,

      jobPreferences: updatedjobPreferences
    }));
  };

  return (

   
    <form
    className="p-4 flex flex-col text-slate-700 gap-5 max-w-[50%] dark:text-slate-300"

     onSubmit={(e)=>{
      e.preventDefault();
      handleSubmit();
      if(jobPreferences.industryPreferences.length<5){
        toast.error("please select atleast 5 industry")
      }
      else{

        onNext();
      }
    }}>
      <h2 className="self-center text-4xl ">Step 4: Job Preferences</h2>
        <label  className="text-xl cursor-pointer  ">
          Desired Job Titles (comma-separated):
          <input
          className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"

          placeholder='Your desired jobs here..'
            type="text"
            name="desiredJobTitles"
            value={jobPreferences.desiredJobTitles}
            onChange={handleInputChange}
          />
        </label>
       <label className="text-xl cursor-pointer  ">
          Industry Preferences (select multiple):

          <ul className='flex flex-wrap gap-5 mt-10 mb-10 justify-around'>
            
          {
            jobsArray.map(option=>{
              return <li key={option}>
                <label className={`border border-blue-300 px-2 py-2 dark:text-slate-800 rounded-xl cursor-pointer ${jobPreferences.industryPreferences.includes(option) ? 'bg-blue-400':'bg-blue-300'} `}>
                  <input  
                  className='outline-none hidden'
                  type='checkbox'
                  checked={jobPreferences.industryPreferences.includes(option)}
                  onChange={()=>handleJobSelect(option)}
                  />
                  {option}
                </label>
              </li>
            } )
          }

          </ul>

        </label> 


        <label className="text-xl cursor-pointer  ">
          Employment Type:
          <input
          className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"

            type="text"
            name="employmentType"
            value={jobPreferences.employmentType}
            onChange={handleInputChange}
            placeholder='Regular,PartTime'
          />
        </label>
        <label className="text-xl cursor-pointer  ">
          Salary Expectations:
          <input
          className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"

            type="text"
            name="salaryExpectations"
            value={jobPreferences.salaryExpectations}
            onChange={handleInputChange}
            placeholder='100000-200000'
          />
        </label>
        <label className="text-xl cursor-pointer  ">
          Work Authorization:
          <input
          className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"

            type="text"
            name="workAuthorization"
            value={jobPreferences.workAuthorization}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex self-end gap-5">
          <button
            className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
              onPrev();
            }}
          >
            &lt;-Prev
          </button>
          <button
            className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
            type="submit"
          >
            Next-&gt;
          </button>
        </div>
      </form>
  );
};

export default J4;
