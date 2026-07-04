import React from 'react'

const Home = () => {
  return (
    <main>
        <div>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea name="jobDescription" id="jobDescription" placeholder='Enter Your Job Desccription'></textarea>
        </div>
        <div>
            <label htmlFor="resume">Upload Resume</label>
            <input type="file" name="resume" id="resume" accept='.pdf' />
        </div>
        <div>
            <label htmlFor="selfDescription">Self Description</label>
            <textarea name="selfDescription" id="selfDescription" placeholder='Describe your Skills'></textarea>
        </div>
        <button>Generate</button>
    </main>
  )
}

export default Home
