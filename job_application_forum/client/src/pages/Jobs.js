import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setCompanyData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const renderJobOpenings = (company) => {
    return company.jobOpportunities.currentOpenings.map((opening) => (
      <div key={opening._id} className="border p-4 rounded shadow mb-4">
        <h4 className="text-lg font-bold mb-2">{opening.jobTitle}</h4>
        <p className="mb-2">{opening.jobDescription}</p>
        <p className="text-sm mb-2">
          <strong>Company Name:</strong> {company.basicInformation.companyName}
        </p>
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
          className='text-yellow-600'
          onClick={() => navigate(`/view-details?userId=${company.userId}&userType=employer`)}
        >
          View Details
        </button>
      </div>
    ));
  };

  const renderCompanyData = () => {
    if (loading) {
      return <Loading />;
    }

    if (companyData.length === 0) {
      return <p>No company data available.</p>;
    }

    return (
      <>
        {companyData.map((company) => (
          <div key={company._id}>
            <h2 className="text-2xl font-bold mb-4">{company.basicInformation.companyName}</h2>
            <p className="mb-4">{company.companyOverview.missionStatement}</p>
            {company.jobOpportunities.currentOpenings.length > 0 ? (
              renderJobOpenings(company)
            ) : (
              <p>No job openings available for {company.basicInformation.companyName}.</p>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center pt-36 justify-center relative min-h-screen min-w-screen text-slate-800 dark:bg-slate-800 dark:text-slate-200">
      <Header />
      <div className="py-8 px-4">
        {renderCompanyData()}
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
