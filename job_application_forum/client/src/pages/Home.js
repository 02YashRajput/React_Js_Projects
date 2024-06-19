import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Use boolean `true` instead of string `"true"`
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [userType, setUserType] = useState(searchParams.get('userType') || 'job_seeker'); // Default userType

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Assuming the API response contains jobs and applicants arrays
        setData(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Redirect to an error page or handle appropriately
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  const renderJobOpenings = (company) => {
    return company.jobOpportunities.currentOpenings.map((opening) => (
      <div key={opening._id} className="border p-4 rounded shadow mb-4">
        <h4 className="text-lg font-bold mb-2">{opening.jobTitle}</h4>
        <p className="mb-2">{opening.jobDescription}</p>
        <p className="text-sm mb-2">
          <strong>Required Qualifications:</strong> {opening.requiredQualifications.education.join(', ')}, Min. Experience: {opening.requiredQualifications.min_experience}
        </p>
        <p className="text-sm mb-2">
          <strong>Skills Needed:</strong> Technical: {opening.skillsNeeded.technical.join(', ')}, Soft: {opening.skillsNeeded.soft.join(', ')}
        </p>
        <p className="text-sm mb-2">
          <strong>Salary Range:</strong> {opening.salaryRange}
        </p>
        <button
          className="text-yellow-600"
          onClick={() => navigate(`/view-details?userId=${company.userId}&userType=employer`)}
        >
          View Details
        </button>
      </div>
    ));
  };

  const renderCompanyData = () => {
    return (
      <div>
        {data.slice(0, 10).map((company) => (
          <div key={company._id} className="border p-4 rounded shadow mb-4">
            <h2 className="text-2xl font-bold mb-4">{company.basicInformation.companyName}</h2>
            <p className="mb-4">{company.companyOverview.missionStatement}</p>
            {company.jobOpportunities.currentOpenings.length > 0 ? (
              <div>
                <h3 className="font-bold mb-2">Job Openings:</h3>
                {renderJobOpenings(company)}
              </div>
            ) : (
              <p>No job openings available for {company.basicInformation.companyName}.</p>
            )}
          </div>
        ))}
      </div>
    );
  };

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
    <div className="dark:bg-slate-800 min-h-screen min-w-screen text-slate-800 dark:text-slate-200 pt-36">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {userType === 'employer' ? (
              renderApplicantData()

          ) : (
            renderCompanyData()
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
