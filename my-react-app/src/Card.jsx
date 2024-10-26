import React from 'react';

function Card({ formData, picture, isDarkMode }) {
  return (
    <div className={`border p-6 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-5xl text-center font-serif mb-2">{formData.name}</h2>
          <hr className=' border-y-black'></hr>
          <div className="flex space-x-4 justify-evenly">
            <p>{formData.email}</p>
            <p>{formData.phone}</p>
            <p>{formData.address}</p>
          </div>
          <h3 className=" mt-3 text-xl font-bold mb-1">Profile</h3>
          <hr className='border-black mb-2'></hr>
            <p>{formData.summary}</p>
        </div>
        {picture && (
          <img 
            src={picture} 
            alt={formData.name} 
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}
      </div>

      

      {formData.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">Education</h3>
          <hr className='border-black mb-2'></hr>
          {formData.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold">{edu.school}</p>
              <p>{edu.degree}</p>
              <p className="text-sm">{edu.year}</p>
            </div>
          ))}
        </div>
      )}

      {formData.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-1">Work Experience</h3>
          <hr className='border-black mb-2'></hr>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{exp.company}</p>
              <p className="italic">{exp.position}</p>
              <p className="text-sm">{exp.duration}</p>
              <p className="mt-1">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {formData.skills.length > 0 && formData.skills[0] && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              skill && (
                <span 
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  {skill}
                </span>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;