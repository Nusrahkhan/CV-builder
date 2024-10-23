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
  const inputClassName = `w-full border-2 p-2 rounded-md ${isDarkMode ? 'bg-gray-700 text-white shadow-2xl border-gray-600' : 'text-gray-700 bg-white shadow-2xl'}`;
  const buttonClassName = `bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors`;
  const sectionClassName = `mb-12 p-6 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`;
  const titleClassName = `text-2xl font-bold text-center mb-8 ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
  const titlesClassName = `font-serif font-semibold block mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`;
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-800">
        <div className="container mx-auto p-4 max-w-4xl">
          {/* Header */}
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
  
          {/* Personal Information Section */}
          <section className={sectionClassName}>
            <h2 className={titleClassName}>Personal Information</h2>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={titlesClassName}>Name:</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className={titlesClassName}>Email:</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
              </div>
  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className={titlesClassName}>Phone Number:</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
  
                <div>
                  <label htmlFor="address" className={titlesClassName}>Address:</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
              </div>
  
              <div>
                <label htmlFor="file" className={titlesClassName}>Profile Picture:</label>
                <input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className={inputClassName}
                />
              </div>
            </div>
          </section>
  
          {/* Education Section */}
          <section className={sectionClassName}>
            <h2 className={titleClassName}>Education</h2>
            <div className="space-y-8">
              {formData.education.map((edu, index) => (
                <div key={index} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`school-${index}`} className={titlesClassName}>School:</label>
                      <input
                        id={`school-${index}`}
                        type="text"
                        placeholder="School/University"
                        name="school"
                        value={edu.school}
                        onChange={(e) => handleEducationChange(index, e)}
                        className={inputClassName}
                      />
                    </div>
  
                    <div>
                      <label htmlFor={`degree-${index}`} className={titlesClassName}>Qualification:</label>
                      <input
                        id={`degree-${index}`}
                        type="text"
                        placeholder="Degree"
                        name="degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, e)}
                        className={inputClassName}
                      />
                    </div>
                  </div>
  
                  <div>
                    <label htmlFor={`year-${index}`} className={titlesClassName}>Year:</label>
                    <input
                      id={`year-${index}`}
                      type="text"
                      placeholder="Year"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, e)}
                      className={inputClassName}
                    />
                  </div>
                </div>
              ))}
  
              <div className="flex justify-center mt-6">
                <button onClick={addEducation} className={buttonClassName}>
                  Add Education
                </button>
              </div>
            </div>
          </section>
  
          {/* Work Experience Section */}
          <section className={sectionClassName}>
            <h2 className={titleClassName}>Work Experience</h2>
            <div className="space-y-8">
              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor={`company-${index}`} className={titlesClassName}>Company:</label>
                      <input
                        id={`company-${index}`}
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className={inputClassName}
                      />
                    </div>
  
                    <div>
                      <label htmlFor={`position-${index}`} className={titlesClassName}>Position:</label>
                      <input
                        id={`position-${index}`}
                        type="text"
                        placeholder="Position"
                        name="position"
                        value={exp.position}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className={inputClassName}
                      />
                    </div>
                  </div>
  
                  <div>
                    <label htmlFor={`duration-${index}`} className={titlesClassName}>Duration:</label>
                    <input
                      id={`duration-${index}`}
                      type="text"
                      placeholder="Duration"
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={inputClassName}
                    />
                  </div>
  
                  <div>
                    <label htmlFor={`description-${index}`} className={titlesClassName}>Description:</label>
                    <textarea
                      id={`description-${index}`}
                      placeholder="Job Description"
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className={`${inputClassName} h-32`}
                    />
                  </div>
                </div>
              ))}
  
              <div className="flex justify-center mt-6">
                <button onClick={addExperience} className={buttonClassName}>
                  Add Experience
                </button>
              </div>
            </div>
          </section>
  
          {/* Skills Section */}
          <section className={sectionClassName}>
            <h2 className={titleClassName}>Skills</h2>
            <div className="space-y-6">
              {formData.skills.map((skill, index) => (
                <div key={index}>
                  <label htmlFor={`skill-${index}`} className={titlesClassName}>Skill {index + 1}:</label>
                  <input
                    id={`skill-${index}`}
                    type="text"
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                    className={inputClassName}
                  />
                </div>
              ))}
  
              <div className="flex justify-center mt-6">
                <button onClick={addSkill} className={buttonClassName}>
                  Add Skill
                </button>
              </div>
            </div>
          </section>
  
          {/* Preview Card */}
          <Card formData={formData} picture={formData.picture} isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}
  export default App;