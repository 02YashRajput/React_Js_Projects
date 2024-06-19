import React, { useState, useEffect } from "react";
import { GrAdd } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
const E3 = ({ onNext, onPrev, employerDetails, setEmployerDetails }) => {
  const initialCurrentOpenings =
    employerDetails.jobOpportunities.currentOpenings.length > 0
      ? employerDetails.jobOpportunities.currentOpenings.map((opening) => ({
          ...opening,
          requiredQualifications: {
            education: opening.requiredQualifications.education.join(",") || "",
            min_experience: opening.requiredQualifications.min_experience || "",
          },
          skillsNeeded: {
            technical: opening.skillsNeeded.technical.join(",") || "",
            soft: opening.skillsNeeded.soft.join(",") || "",
          },
        }))
      : [
          {
            jobTitle: "",
            jobDescription: "",
            requiredQualifications: {
              education: "",
              min_experience: "",
            },
            skillsNeeded: {
              technical: "",
              soft: "",
            },
            salaryRange: "",
          },
        ];

  const [currentOpenings, setCurrentOpenings] = useState(
    initialCurrentOpenings
  );

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOpenings = [...currentOpenings];
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      updatedOpenings[index][parent][child] = value;
    } else {
      updatedOpenings[index][name] = value;
    }
    setCurrentOpenings(updatedOpenings);
  };

  const handleSubmit = () => {
    const updatedCurrentOpenings = currentOpenings.map((opening) => ({
      ...opening,
      requiredQualifications: {
        education: opening.requiredQualifications.education.split(","),
        min_experience: opening.requiredQualifications.min_experience,
      },
      skillsNeeded: {
        technical: opening.skillsNeeded.technical.split(","),
        soft: opening.skillsNeeded.soft.split(","),
      },
    }));
    setEmployerDetails((prev) => ({
      ...prev,
      jobOpportunities: {
        ...prev.jobOpportunities,
        currentOpenings: updatedCurrentOpenings,
      },
    }));
  };

  const addNewJob = () => {
    setCurrentOpenings([
      ...currentOpenings,
      {
        jobTitle: "",
        jobDescription: "",
        requiredQualifications: {
          education: "",
          min_experience: "",
        },
        skillsNeeded: {
          technical: "",
          soft: "",
        },
        salaryRange: "",
      },
    ]);
  };
  const removeJob = (index) => {
    if (currentOpenings.length === 1) {
      toast.error("Please fill atleast one");
    } else {
      const updatedOpenings = currentOpenings.filter(
        (job, idx) => idx !== index
      );

      setCurrentOpenings(updatedOpenings);
    }
  };
  useEffect(() => {
    console.log(employerDetails);
  }, [employerDetails]);

  return (
    <form
      className="p-4 flex flex-col text-slate-700 gap-5 dark:text-slate-300"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        onNext();
      }}
    >
      <h2 className="self-center text-4xl">Step 3: Job Opportunities:</h2>

      {currentOpenings.map((job, index) => (
        <div
          className="flex flex-col relative text-slate-700 gap-5 dark:text-slate-300"
          key={index}
        >
          <h3 className="text-2xl">Employment {index + 1}:</h3>
          <div className="ml-3 flex flex-col  text-slate-700 gap-5 dark:text-slate-300">
            <label className="text-xl cursor-pointer">
              Job Title:
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="jobTitle"
                value={job.jobTitle}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Job Title"
                required
              />
            </label>
            <label className="text-xl cursor-pointer">
              Job Description:
              <input
                type="text"
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                name="jobDescription"
                value={job.jobDescription}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter Job Description"
                required
              />
            </label>
            <h3 className=" mt-5 text-2xl ">Required Qualifications :</h3>

            <label className="text-xl ml-4 cursor-pointer">
              Education (comma separated):
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="requiredQualifications.education"
                value={job.requiredQualifications.education}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Education"
                required
              />
            </label>
            <label className="text-xl ml-4 cursor-pointer">
              Min Experience (in years):
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="numbers"
                name="requiredQualifications.min_experience"
                value={job.requiredQualifications.min_experience}
                onChange={(e) => handleInputChange(index, e)}
                placeholder=""
                required
              />
            </label>
            <h3 className=" mt-5 text-2xl ">Skills Needed :</h3>

            <label className="text-xl ml-4 cursor-pointer">
              Technical Skills (comma separated):
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="skillsNeeded.technical"
                value={job.skillsNeeded.technical}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Technical Skills, Soft Skills"
                required
              />
            </label>
            <label className="text-xl ml-4 cursor-pointer">
              Soft Skills (comma separated):
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="skillsNeeded.soft"
                value={job.skillsNeeded.soft}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Technical Skills, Soft Skills"
                required
              />
            </label>
            <label className="text-xl ml-4 cursor-pointer">
              Salary Range (Min-Max):
              <input
                className="border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="salaryRange"
                value={job.salaryRange}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Min Salary - Max Salary"
                required
              />
            </label>
            <button
              className="absolute top-0 right-5 text-4xl hover:bg-[rgba(255,255,255,0.1)] p-1 rounded-full light:text-red-600 "
              type="button"
              onClick={() => {
                removeJob(index);
              }}
            >
              {" "}
              <IoIosClose />
            </button>
          </div>
        </div>
      ))}
      <button
        className="self-end flex items-center gap-2 bg-blue-300 rounded-md px-3 py-2 text-xl dark:text-slate-800"
        type="button"
        onClick={addNewJob}
      >
        Add New Job <GrAdd className=" text-xl text-red-600 font-bold" />
      </button>

      <div className="flex self-end gap-5">
        <button
          className="bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
            onPrev();
          }}
        >
          &lt;- Prev
        </button>
        <button
          className="bg-yellow-300 px-3 py-2 text-xl dark:text-slate-800"
          type="submit"
        >
          Next -&gt;
        </button>
      </div>
    </form>
  );
};

export default E3;
