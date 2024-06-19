import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { IoPerson } from 'react-icons/io5';
import Footer from '../components/Footer';

const EmployerProfile = ({userData}) => {
  console.log(userData);
  return (
    <div className="flex flex-col items-center justify-center relative  min-h-screen min-w-screen text-slate-800 dark:bg-slate-800 dark:text-slate-200">

      { userData.user ? (
        <div>
          {/* Personal Information Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Personal Information</h2>
            <div className="flex gap-10 items-center">
              <IoPerson className="border border-slate-500 p-2 text-5xl" />
              <div>
                <p className="text-xl">
                  <strong>Username:</strong> {userData.user.username}
                  <br />
                  <strong>Email:</strong> {userData.user.email}
                </p>
              </div>
            </div>
          </section>

          {/* Basic Information Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Basic Information</h2>
            <p>
              <strong>Company Name:</strong> {userData.userDetails.basicInformation.companyName}
              <br />
              <strong>Industry:</strong> {userData.userDetails.basicInformation.industry}
              <br />
              <strong>Year Founded:</strong> {userData.userDetails.basicInformation.yearFounded}
              <br />
              <strong>Company Size:</strong> {userData.userDetails.basicInformation.companySize}
              <br />
              <strong>Headquarters:</strong> {userData.userDetails.basicInformation.headquartersLocation}
              <br />
              <strong>Website:</strong>{' '}
              <a href={userData.userDetails.basicInformation.websiteURL} target="_blank" rel="noopener noreferrer">
                {userData.userDetails.basicInformation.websiteURL}
              </a>
            </p>
          </section>

          {/* Company Overview Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Company Overview</h2>
            <p>
              <strong>Mission Statement:</strong> {userData.userDetails.companyOverview.missionStatement}
              <br />
              <strong>Unique Selling Points:</strong> {userData.userDetails.companyOverview.uniqueSellingPoints}
              <br />
              {/* Add more fields from companyOverview as needed */}
            </p>
          </section>

          {/* Job Opportunities Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Job Opportunities</h2>
            {userData.userDetails.jobOpportunities.currentOpenings.map((opening, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{opening.jobTitle}</h3>
                <p>{opening.jobDescription}</p>
                <p>
                  <strong>Required Qualifications:</strong> {opening.requiredQualifications.education.join(', ')} (Min.{' '}
                  {opening.requiredQualifications.min_experience} years experience)
                </p>
                <p>
                  <strong>Skills Needed:</strong> Technical: {opening.skillsNeeded.technical.join(', ')}, Soft:{' '}
                  {opening.skillsNeeded.soft.join(', ')}
                </p>
                <p>
                  <strong>Salary Range:</strong> {opening.salaryRange}
                </p>
              </div>
            ))}
          </section>

          {/* Team and Culture Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Team and Culture</h2>
            {/* Display leadership team */}
            {userData.userDetails.teamAndCulture.leadershipTeam.map((member, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p>{member.title}</p>
                <p>{member.bio}</p>
              </div>
            ))}
            <p>
              <strong>Culture Description:</strong> {userData.userDetails.teamAndCulture.cultureDescription}
              <br />
              <strong>Core Values:</strong> {userData.userDetails.teamAndCulture.coreValues}
              <br />
              <strong>Employee Benefits:</strong> {userData.userDetails.teamAndCulture.employeeBenefits}
            </p>
          </section>

          {/* Contact Information Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Contact Information</h2>
            <p>
              <strong>Email:</strong> {userData.userDetails.contactInformation.email}
              <br />
              <strong>Phone:</strong> {userData.userDetails.contactInformation.phone}
              <br />
              <strong>Address:</strong> {userData.userDetails.contactInformation.address.street},{' '}
              {userData.userDetails.contactInformation.address.city}, {userData.userDetails.contactInformation.address.state},{' '}
              {userData.userDetails.contactInformation.address.country}, {userData.userDetails.contactInformation.address.zip}
              <br />
              <strong>LinkedIn:</strong>{' '}
              <a href={"https://www.linkedin.com/${userData.userDetails.contactInformation.linkedIn"} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <br />
              <strong>Twitter:</strong>{' '}
              <a href={"https://twitter.com/${userData.userDetails.contactInformation.twitter"} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </p>
          </section>
        </div>
      ) : (
        <Loading />
      ) }

    </div>
  );
};

export default EmployerProfile