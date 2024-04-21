// J2.js (or any other child component)
import React, { useState } from "react";

const J2 = ({ onNext, onPrev, userDetails, setUserDetails }) => {
  const initialEmploymentHistory =
    userDetails.professionalExperience.employmentHistory.length > 0
      ? userDetails.professionalExperience.employmentHistory
      : [
          {
            employer: "",
            jobTitle: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
            achievements: "",
          },
        ];
  const [employmentHistory, setEmploymentHistory] = useState(
    initialEmploymentHistory
  );

  const [skills, setSkills] = useState({
    technical:
      userDetails.professionalExperience.skills.technical.join(",") || "",
    soft: userDetails.professionalExperience.skills.soft.join(",") || "",
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHistory = [...employmentHistory];
    updatedHistory[index][name] = value;
    setEmploymentHistory(updatedHistory);
  };

  const handleSkillsChange = (e) => {
    const { value, name } = e.target;
    setSkills({ ...skills, [name]: value });
  };

  const addNewEmployment = () => {
    setEmploymentHistory([
      ...employmentHistory,
      {
        employer: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
      },
    ]);
  };

  const handleSubmit = () => {
    // Update userDetails with employment history, technicalSkills, and softSkills
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      professionalExperience: {
        ...prevUserDetails.professionalExperience,
        employmentHistory: employmentHistory,
        skills: {
          technical: skills.technical.split(","),
          soft: skills.soft.split(","),
        },
      },
    }));
    // Proceed to the next step
    onNext();
  };

  return (
    <div className="flex flex-col text-slate-700 gap-5">
      <h2 className='className="self-center text-4xl '>
        Step 2: Employment History
      </h2>
      <form
        className=" flex flex-col text-slate-700 gap-5"
        onSubmit={(e) => {
          handleSubmit();
          onNext();
        }}
      >
        {employmentHistory.map((job, index) => (
          <div className=" flex flex-col text-slate-700 gap-5" key={index}>
            <h3 className="text-2xl">Employment {index + 1}:</h3>
            <label className="text-xl cursor-pointer  ">
              Employer:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                type="text"
                name="employer"
                value={job.employer}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="XYZ Company"
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Job Title:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                type="text"
                name="jobTitle"
                value={job.jobTitle}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Ex Director"
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Start Date:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                type="date"
                name="startDate"
                value={job.startDate}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              End Date:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                type="date"
                name="endDate"
                value={job.endDate}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Responsibilities:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                type="text"
                name="responsibilities"
                placeholder="Enter your Responsibilities here..."
                value={job.responsibilities}
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Achievements:
              <input
              placeholder="Enter your Achievements here..."
                type="text"
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
                name="achievements"
                value={job.achievements}
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
          </div>
        ))}
        <button
          className="self-end bg-blue-300 rounded-md px-3 py-2 text-xl"
          type="button"
          onClick={addNewEmployment}
        >
          Add Another Job <span className="text-2xl text-red-600">+</span>
        </button>
        <label className="text-xl cursor-pointer  ">
          Technical Skills (comma-separated):
          <br />
          <input
          placeholder="Enter your technical skills..."
            className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
            type="text"
            name="technical"
            value={skills.technical}
            onChange={handleSkillsChange}
          />
        </label>
        <label className="text-xl cursor-pointer  ">
          Soft Skills (comma-separated):
          <br />
          <input
          placeholder="Enter you soft skills here..."
            className="cursor-pointer mt-3  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900"
            type="text"
            name="soft"
            value={skills.soft}
            onChange={handleSkillsChange}
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
            Next-&gt;
          </button>
        </div>
      </form>
    </div>
  );
};

export default J2;
