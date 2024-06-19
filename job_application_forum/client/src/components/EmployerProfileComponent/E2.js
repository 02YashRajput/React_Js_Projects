import React, { useEffect, useState } from 'react'

const E2 = ({ onNext, onPrev, employerDetails, setEmployerDetails }) => {
    const [companyOverview,setCompanyOverview] = useState(
      {
        missionStatement: employerDetails.companyOverview.missionStatement || '',
        uniqueSellingPoints:employerDetails.companyOverview.uniqueSellingPoints || '',
        productsOrServices:employerDetails.companyOverview.productsOrServices || '',
        hiringProcessAndExpectations: {
          hiringProcessOverview:employerDetails.companyOverview.hiringProcessAndExpectations.hiringProcessOverview || '',
          candidateCriteria:employerDetails.companyOverview.hiringProcessAndExpectations.candidateCriteria || ''
        },
      }
    )
    const handleInputChange = (e) => {
      const { value, name } = e.target;
      if(name.includes(".")){
        const [parent,child] = name.split(".");
        setCompanyOverview((prev)=>({
          ...prev,
          [parent]:{
            ...prev[parent],
            [child]:value,
          }

        }))  

      }
      else{

        
        setCompanyOverview((prev) =>( { ...prev, [name]: value }));
      }

    };
    const handleSubmit = () => {
      setEmployerDetails((prev)=>({
        ...prev,
       companyOverview : companyOverview
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
    <h2 className="self-center text-4xl ">Step 2: Company Overview :</h2>

    <label className="text-xl cursor-pointer  ">
      Mission Statement  :
      <input
        className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
        type="text"
        name="missionStatement"
        value={companyOverview.missionStatement}
        onChange={handleInputChange}
        placeholder="Enter your mission statement"
        required
      />
    </label>
    <label className="text-xl cursor-pointer  ">
     Unique Selling Point :
      <input
        className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
        type="text"
        name="uniqueSellingPoints"
        value={companyOverview.uniqueSellingPoints}
        onChange={handleInputChange}
        placeholder="Your Unique selling points "
        required
      />
    </label>


    <label className="text-xl cursor-pointer  ">
      Products Or Services :
      <input
        className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
        type="text"
        name="productsOrServices"
        value={companyOverview.productsOrServices}
        onChange={handleInputChange}
        placeholder="Company Name ABC Company "
        required
      />
    </label>
    <h3 className=" text-2xl mt-5 ">Hiring Process And Expectations</h3>
    <label className="text-xl ml-3 cursor-pointer  ">
      Hirirng Process Overview :
      <input
        className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
        type="text"
        name="hiringProcessAndExpectations.hiringProcessOverview"
        value={companyOverview.hiringProcessAndExpectations.hiringProcessOverview}
        onChange={handleInputChange}
        placeholder="Company Name ABC Company "
        required
      />
    </label>
    <label className="text-xl ml-3 cursor-pointer  ">
      Candidate Criteria :
      <input
        className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400"
        type="text"
        name="hiringProcessAndExpectations.candidateCriteria"
        value={companyOverview.hiringProcessAndExpectations.candidateCriteria}
        onChange={handleInputChange}
        placeholder="Company Name ABC Company "
        required
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
  )
}

export default E2