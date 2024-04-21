// J5.js (or any other child component)
import React, { useState } from 'react';

const J5 = ({ onNext,onPrev,userDetails, setUserDetails }) => {
  const [additionalInfo, setAdditionalInfo] = useState({
    portfolioOrWorkSamples: userDetails.additionalInformation.portfolioOrWorkSamples || "",
    languages: userDetails.additionalInformation.languages.join(",") || "",
    additionalComments: userDetails.additionalInformation.additionalComments || "" 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prevAdditionalInfo) => ({
      ...prevAdditionalInfo,
      [name]: value
    }));
  };


  const handleSubmit = () => {
    // Update userDetails with additional information
    additionalInfo.languages = additionalInfo.languages.split(",");
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      additionalInformation: additionalInfo
    }));
    // Proceed to the next step
  };

  return (
    <form
    className="p-4 flex flex-col text-slate-700 gap-5"
    
    onSubmit={(e)=>{
      e.preventDefault();
      handleSubmit();
      onNext();
    }}>
        <h2 className="self-center text-4xl ">Step 5: Additional Information</h2>
        <label className="text-xl cursor-pointer  ">
          Portfolio or Work Samples:
          <input
            type="text"
            className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"

            name="portfolioOrWorkSamples"
            value={additionalInfo.portfolioOrWorkSamples}
            onChange={handleInputChange}
          />
        </label>
        <label className="text-xl cursor-pointer  ">
          Languages Known (comma-separated):
          <input

            type="text"
            className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"

            name='languages'
            value={additionalInfo.languages}
            onChange={handleInputChange}
          />
        </label>
        <label className="text-xl cursor-pointer  ">
          Additional Comments:
          <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
            type='text'
            name="additionalComments"
            value={additionalInfo.additionalComments}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex self-end gap-5">
          <button
            className="self-end bg-yellow-300 px-3 py-2 text-xl"
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
            className="self-end bg-yellow-300 px-3 py-2 text-xl"
            type="submit"
          >
            Submit
          </button>
          </div>
      </form>
  );
};

export default J5;
