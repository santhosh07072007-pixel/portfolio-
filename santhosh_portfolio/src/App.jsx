import { useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Certifications from './components/Certifications.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeReturnFocus = useRef(null);

  function openResume() {
    resumeReturnFocus.current = document.activeElement;
    setResumeOpen(true);
  }

  return (
    <>
      <Navbar />
      <Home onViewResume={openResume} />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Resume onViewResume={openResume} />
      <Contact />
      <Footer />
      {resumeOpen && <Resume.Dialog onClose={() => setResumeOpen(false)} returnFocusRef={resumeReturnFocus} />}
    </>
  );
}
