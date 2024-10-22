import React, { useState } from 'react';
import Card from './card';
import { SunIcon, MoonIcon } from './Icons';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    picture: '',
    email: '',
    phone: '',
    address: '',
    education: [{ school: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    skills: [''],
    languages: [''],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (index, e) => {
    const {name, value} = e.target;
    const newEducation = [...formData.education];
    newEducation[index][name] = value;
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: '', degree: '', year: '' }]
    }));
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperience = [...formData.experience];
    newExperience[index][name] = value;
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
    }));
  };

  const handleSkillsChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        alert('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          picture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const inputClassName = `border-2 p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white shadow-2xl border-gray-600' : 'text-gray-700 bg-white shadow-2xl'}`;
  const buttonClassName = `bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors`;

  
  return (
  <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white">
            CV GENERATOR
          </h1>
          <button
            onClick={toggleDarkMode}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <h2 className={`mb-4 text-3xl text-center whitespace-pre font-arial font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Personal Information
            </h2>            
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`border-2 p-2 mr-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white shadow-2xl border-gray-600' : 'text-gray-700 bg-slate-80 shadow-2xl'}`}
            />
            <input
              type="email"
              placeholder='Email'
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClassName}
            />
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={inputClassName}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputClassName}
            />
            <input
              type="file"
              accept='image/*'
              onChange={handlePictureChange}
              className={inputClassName}
            />
          </div>

          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Education
            </h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  placeholder="School/University"
                  name="school"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, e)}
                  className={inputClassName}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, e)}
                  className={inputClassName}
                />
                <input
                  type="text"
                  placeholder="Year"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, e)}
                  className={inputClassName}
                />
              </div>
            ))}

            <button onClick={addEducation} className={buttonClassName}>
              Add Education
            </button>
          </div>

          <div className='space-y-4'>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Work Experience
            </h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className='space-y-2'>
                <input
                    type="text"
                    placeholder='Company'
                    name='company'
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className={inputClassName}
                />
                <input
                type="text"
                placeholder="Position"
                name="position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, e)}
                className={inputClassName}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  name="duration"
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className={inputClassName}
                />
                <textarea
                  placeholder="Job Description"
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, e)}
                  className={`${inputClassName} h-24`}
                />
              </div>
            ))}
            <button onClick={addExperience} className={buttonClassName}>
              Add Experience
            </button>
          </div>

          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Skills
            </h2>
            {formData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillsChange(index, e.target.value)}
                className={inputClassName}
              />
            ))}
            <button onClick={addSkill} className={buttonClassName}>
              Add Skill
            </button>
          </div>
        </div>

        {/*preview card*/}    
        <Card formData={formData} picture={formData.picture} isDarkMode={isDarkMode} />

      </div>
    </div>  
  </div>
  );
}

export default App
