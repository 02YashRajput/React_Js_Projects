import * as React from "react";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
const J3 = ({ onNext, userDetails, onPrev, setUserDetails }) => {
  const initialEducationalBackground =
    userDetails.education.educationalBackground.length > 0
      ? userDetails.education.educationalBackground
      : [
          {
            institutionName: "",
            degree:"",
            majorFieldOfStudy: "",
            graduationYear: "",
            grade: "",
          },
        ];
  const [educationalBackground, setEducationalBackground] = useState(
    initialEducationalBackground
  );

  const [certificationsAndCourse, setCertificationsAndCourses] = useState({
    certifications:
      userDetails.education.certificationsAndCourses.certifications.join(",") ||
      "",
    professionalDevelopmentCourses:
      userDetails.education.certificationsAndCourses.professionalDevelopmentCourses.join(
        ","
      ) || "",
  });

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBackground = [...educationalBackground];
    updatedBackground[index][name] = value;
    setEducationalBackground(updatedBackground);
  };

  const handleCertificationsAndCourseChange = (e) => {
    const { value, name } = e.target;
    setCertificationsAndCourses({ ...certificationsAndCourse, [name]: value });
  };

  const addNewEducation = () => {
    setEducationalBackground([
      ...educationalBackground,
      {
        institutionName: "",
        degree:"",
        majorFieldOfStudy: "",
        graduationYear: "",
        grade: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    // Update userDetails with educational background, certifications, and courses
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      education: {
        educationalBackground: educationalBackground,
        certificationsAndCourses: {
          certifications: certificationsAndCourse.certifications.split(","),
          professionalDevelopmentCourses:
            certificationsAndCourse.professionalDevelopmentCourses.split(","),
        },
      },
    }));
    // Proceed to the next step
  };
  const removeEducationfield = (index)=>{
    if(educationalBackground.length === 1  ){
      toast.error("Please fill atleast one")

    }
else{
  const updatedEducationalBackground = educationalBackground.filter((field,idx)=>idx!==index);
  setEducationalBackground(updatedEducationalBackground)
}
  }

  return (
    <div className="flex flex-col text-slate-700 gap-5 dark:text-slate-300">
      <h2 className='className="self-center text-4xl dark:text-slate-300 '>
        Step 3: Educational Background
      </h2>
      <form
        className=" flex flex-col text-slate-700 gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          onNext();
        }}
      >
        {educationalBackground.map((education, index) => (
          <div className=" flex relative flex-col text-slate-700 gap-5 dark:text-slate-300" key={index}>
            <h3 className="text-2xl">Employment {index + 1}:</h3>
          <div className="ml-3 flex flex-col text-slate-700 gap-5 dark:text-slate-300">

            <label className="text-xl cursor-pointer   ">
              Institution Name:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="institutionName"
                value={education.institutionName}
                placeholder="Enter institution name ABC University"
                onChange={(e) => handleInputChange(index, e)}
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Degree:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="degree"
                value={education.degree}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter the name of degree"
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Major Field of Study:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="majorFieldOfStudy"
                value={education.majorFieldOfStudy}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter major field of study Computer Science "
                required
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Graduation Year:
              <input
                type="number"
                name="graduationYear"
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                min="1900"
                max="2024"
                value={education.graduationYear}
                onChange={(e) => handleInputChange(index, e)}
                placeholder="Enter graduation year 2024"
              />
            </label>
            <label className="text-xl cursor-pointer  ">
              Grade Obtained:
              <input
                className="cursor-pointer  border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
                type="text"
                name="grade"
                value={education.grade}
                placeholder="Enter grade obtained - A"
                onChange={(e) => handleInputChange(index, e)}
              />
            </label>
            </div>
            <button className="absolute top-0 right-5 text-4xl hover:bg-[rgba(255,255,255,0.1)] p-1 rounded-full light:text-red-600 "
          type="button"
          onClick={()=>{removeEducationfield(index)}}
          > <IoIosClose />
            
          </button>
          </div>
        ))}
        <button
          className="self-end bg-blue-300 rounded-md px-3 py-2 text-xl"
          type="button"
          onClick={addNewEducation}
        >
          Add Another Education <span className="text-2xl text-red-600">+</span>
        </button>
        <label className="text-xl cursor-pointer dark:text-slate-300 ">
          Certifications (comma-separated):
          <br />
          <input
            className="cursor-pointer border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
            type="text"
            name="certifications"
            placeholder="Enter certifications"
            value={certificationsAndCourse.certifications}
            onChange={handleCertificationsAndCourseChange}
          />
        </label>
        <label className="text-xl cursor-pointer dark:text-slate-300 ">
          Professional Development Courses (comma-separated):
          <br />
          <input
            className="cursor-pointer border ml-3 rounded-md outline-none py-1 px-2 border-slate-900 bg-transparent dark:border-slate-400 mt-3"
            type="text"
            name="professionalDevelopmentCourses"
            placeholder="Enter professional development courses"
            value={certificationsAndCourse.professionalDevelopmentCourses}
            onChange={handleCertificationsAndCourseChange}
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
    </div>
  );
};

export default J3;
