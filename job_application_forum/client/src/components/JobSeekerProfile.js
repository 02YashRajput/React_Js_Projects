import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Loading from '../components/Loading';
import { IoPerson } from "react-icons/io5"
import Footer from '../components/Footer';

const JobSeekerProfile = ({userData}) => {
  

 
  return (
    <div className='flex flex-col items-center justify-center relative min-h-screen min-w-screen text-slate-800 dark:bg-slate-800 dark:text-slate-200'> 
    
      {
       
           userData.user ? ( <div>
            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Personal Information</h2>

              <div className='flex gap-10'>
                <IoPerson className='border border-slate-500 p-2 text-[15rem] '/>
              <p className='text-xl'>

                <strong>Name:</strong> {userData.userDetails.personalInformation.fullName.firstname}{' '}
                {userData.userDetails.personalInformation.fullName.lastname}
                <br />
                <strong>Date of Birth:</strong> {userData.userDetails.personalInformation.dateOfBirth}
                <br />
                <strong>Gender:</strong> {userData.userDetails.personalInformation.gender}
                <br />
                <strong>Email:</strong> {userData.userDetails.personalInformation.contactInformation.email}
                <br />
                <strong>Phone:</strong> {userData.userDetails.personalInformation.contactInformation.phone}
                <br />
                <strong>Location:</strong> {userData.userDetails.personalInformation.locationDetails.currentLocation}
                <br />
                <strong>Preferred Job Locations:</strong> {userData.userDetails.personalInformation.locationDetails.preferredJobLocations.join(', ')}
                <br />
                <strong>Professional Headline:</strong> {userData.userDetails.personalInformation.professionalHeadline}
              </p>
              </div>

            </section>

            <section className="mb-8">
              <h2 className=" font-semibold mb-2 text-3xl">Professional Experience</h2>
              {userData.userDetails.professionalExperience.employmentHistory.map((job, index) => (
                <div key={index} className="mb-4 text-xl">
                  <p className="font-semibold">{index+1}:-  {job.jobTitle} at {job.employer}</p>
                  <p>{job.startDate} - {job.endDate}</p>
                  <p>{job.responsibilities}</p>
                  <p>Achievements: {job.achievements}</p>
                </div>
              ))}
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Education</h2>
              {userData.userDetails.education.educationalBackground.map((education, index) => (
                <div key={index} className="mb-4 text-xl">
                  <p className="font-semibold">{index+1}:- {education.degree} in {education.majorFieldOfStudy}</p>
                  <p>{education.institutionName}, {education.graduationYear}</p>
                  <p>{education.grade}</p>
                </div>
              ))}
            </section>

            <section className="mb-8">
              <h2 className="font-semibold mb-2 text-3xl">Skills</h2>
              <div className='text-xl'>
                <p className="font-semibold">Technical Skills:</p>
                <ul>
                  {userData.userDetails.professionalExperience.skills.technical.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div className='text-xl'>
                <p className="font-semibold">Soft Skills:</p>
                <ul>
                  {userData.userDetails.professionalExperience.skills.soft.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Job Preferences</h2>
              <p className='text-xl'>
                <strong>Desired Job Titles:</strong> {userData.userDetails.jobPreferences.desiredJobTitles.join(', ')}
                <br />
                <strong>Industry Preferences:</strong> {userData.userDetails.jobPreferences.industryPreferences.join(', ')}
                <br />
                <strong>Employment Type:</strong> {userData.userDetails.jobPreferences.employmentType}
                <br />
                <strong>Salary Expectations:</strong> {userData.userDetails.jobPreferences.salaryExpectations}
                <br />
                <strong>Work Authorization:</strong> {userData.userDetails.jobPreferences.workAuthorization}
              </p>
            </section>

            <section className="mb-8 text-xl">
              <h2 className="text-3xl font-semibold mb-2">Additional Information</h2>
              <p>
                <strong>Portfolio or Work Samples:</strong> <a href={userData.userDetails.additionalInformation.portfolioOrWorkSamples} target="_blank" rel="noopener noreferrer">{userData.userDetails.additionalInformation.portfolioOrWorkSamples}</a>
                <br />
                <strong>Languages:</strong> {userData.userDetails.additionalInformation.languages.join(', ')}
                <br />
                <strong>Additional Comments:</strong> {userData.userDetails.additionalInformation.additionalComments}
              </p>
            </section>
          </div>):<Loading/>  
        
      }
      
    </div>
  )
}

export default JobSeekerProfile