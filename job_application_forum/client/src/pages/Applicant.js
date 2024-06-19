import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Portfolio from './Portfolio';
import { useNavigate } from 'react-router-dom';

const Applicant = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/applicant');
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const renderSkills = (skills) => {
    return (
      <>
        <h3 className="font-bold mb-2">Skills:</h3>
        <ul className="list-disc list-inside mb-4">
          {skills.technical.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderEducation = (education) => {
    if (!education || !education.educationalBackground || education.educationalBackground.length === 0) {
      return null;
    }

    const latestEducation = education.educationalBackground[0]; // Assuming the first education entry is the latest
    return (
      <>
        <h3 className="font-bold mb-2">Education:</h3>
        <p>{`${latestEducation.degree}, ${latestEducation.institutionName}`}</p>
        <p>{`Major: ${latestEducation.majorFieldOfStudy}, Graduation Year: ${latestEducation.graduationYear}`}</p>
      </>
    );
  };

  const renderEmploymentHistory = (employmentHistory) => {
    if (!employmentHistory || employmentHistory.length === 0) {
      return null;
    }

    const latestEmployment = employmentHistory[0]; // Assuming the first entry is the latest
    return (
      <>
        <h3 className="font-bold mb-2">Employment History:</h3>
        <p>{`${latestEmployment.jobTitle} at ${latestEmployment.employer}`}</p>
        <p>{`Employment Dates: ${latestEmployment.startDate} - ${latestEmployment.endDate}`}</p>
        <p>{`Responsibilities: ${latestEmployment.responsibilities}`}</p>
        <p>{`Achievements: ${latestEmployment.achievements}`}</p>
      </>
    );
  };

  const renderApplicantData = () => {
    return (
      <div className="grid grid-cols-2 gap-8">
        {data.map((applicant) => (
          <div key={applicant._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-2">
              {applicant.personalInformation.fullName.firstname}{' '}
              {applicant.personalInformation.fullName.lastname}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {applicant.personalInformation.professionalHeadline}
            </p>
            <p className="mb-4">{applicant.personalInformation.locationDetails.currentLocation}</p>
            {renderSkills(applicant.professionalExperience.skills)}
            {renderEducation(applicant.education)}
            {renderEmploymentHistory(applicant.professionalExperience.employmentHistory)}
            <button
            className='text-yellow-600'
              onClick={() => {
                navigate(`/portfolio?userId=${applicant.userId}&userType=job_seeker`);
              }}
            >
              Portfolio
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center pt-36 justify-center relative min-h-screen min-w-screen text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <Header />
      <div className="py-8 px-4">
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.length > 0 ? (
              renderApplicantData()
            ) : (
              <p>No applicant data available.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Applicant;
