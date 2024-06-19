import React, { useEffect, useState } from "react";

const E1 = ({ onNext, onPrev, employerDetails, setEmployerDetails }) => {
  const [basicInformation, setBasicInformation] = useState({
    companyName: employerDetails.basicInformation.companyName || "",
    industry: employerDetails.basicInformation.industry || "",
    yearFounded: employerDetails.basicInformation.yearFounded || "",
    companySize: employerDetails.basicInformation.companySize || "",
    headquartersLocation:
      employerDetails.basicInformation.headquartersLocation || "",
    websiteURL: employerDetails.basicInformation.websiteURL || "",
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setBasicInformation({ ...basicInformation, [name]: value });
  };

  const handleSubmit = () => {
    setEmployerDetails((prev)=>({
      ...prev,
     basicInformation : basicInformation
    }))
  };


  return (
    <form
      className="p-4 flex flex-col text-slate-700 gap-5 dark:text-slate-300"
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
        onNext();
      }}
    >
      <h2 className="self-center text-4xl ">Step 1: Basic Information:</h2>

      <label className="text-xl cursor-pointer  ">
        Company Name :
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="companyName"
          value={basicInformation.companyName}
          onChange={handleInputChange}
          placeholder="Company Name ABC Company "
          required
        />
      </label>
      <label className="text-xl cursor-pointer  ">
        Industry :
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="industry"
          value={basicInformation.industry}
          onChange={handleInputChange}
          placeholder="Company Name ABC Company "
          required
        />
      </label>

      <label className="text-xl cursor-pointer  ">
        Foundation Year:
        <input
          type="number"
          name="yearFounded"
          className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
          min="1900"
          max="2024"
          value={basicInformation.yearFounded}
          onChange={handleInputChange}
        />
      </label>
      <label className="text-xl cursor-pointer  ">
        Company Size :
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="companySize"
          value={basicInformation.companySize}
          onChange={handleInputChange}
          placeholder="Company Name ABC Company "
          required
        />
      </label>
      <label className="text-xl cursor-pointer  ">
        HeadQuater Location (only City Name) :
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="headquartersLocation"
          value={basicInformation.headquartersLocation}
          onChange={handleInputChange}
          placeholder="Company Name ABC Company "
          required
        />
      </label>
      <label className="text-xl cursor-pointer  ">
        Company Website URL :
        <input
          className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
          type="text"
          name="websiteURL"
          value={basicInformation.websiteURL}
          onChange={handleInputChange}
          placeholder="Company Name ABC Company "
          required
        />
      </label>

      <button
        className="self-end bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
        type="submit"
      >
        Next-&gt;
      </button>
    </form>
  );
};

export default E1;
