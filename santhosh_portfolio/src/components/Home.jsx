import { useEffect, useState } from 'react';

const roles = [
  "I'M AN AI & FULL STACK DEVELOPER",
  'GENAI & RAG SPECIALIST',
  'B.TECH AD & DS UNDERGRADUATE',
  'JAVA & PYTHON DEVELOPER'
];

const stats = [
  ['2', '+', 'AI & Full-Stack Projects'],
  ['1', '', 'Internship (OneDot)'],
  ['2', 'x', 'NPTEL Elite Certs'],
  ['7.0', '', 'CGPA (AD&DS)']
];

export default function Home({ onViewResume }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    if (!deleting && typedText === role) {
      const timer = window.setTimeout(() => setDeleting(true), 2000);
      return () => window.clearTimeout(timer);
    }

    if (deleting && !typedText) {
      const timer = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }, 500);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setTypedText(role.substring(0, typedText.length + (deleting ? -1 : 1)));
    }, deleting ? 40 : 100);
    return () => window.clearTimeout(timer);
  }, [deleting, roleIndex, typedText]);

  return (
    <header id="home" className="hero">
      <div className="hero-left">
        <div className="hero-subtitle-tag">
          <i className="fas fa-circle highlight-lime" /> Pre-Final Year • KPR Institute of Engineering and Technology
        </div>
        <h1 className="hero-title">I&apos;m Santhosh</h1>
        <div className="hero-role-box"><span>{typedText}|</span></div>
        <p className="hero-desc">
          B.Tech undergraduate in <strong>Artificial Intelligence and Data Science (AD &amp; DS)</strong> building production-ready applications with Java, Python, GenAI (RAG, LLMs), React, and Node.js.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">Get in touch <i className="fas fa-arrow-right" /></a>
          <a href="#resume" className="btn-secondary" onClick={event => {
            event.preventDefault();
            onViewResume();
          }}>
            <i className="fas fa-file-pdf" /> View Resume
          </a>
        </div>
        <div className="hero-stats">
          {stats.map(([value, suffix, label]) => (
            <div className="stat-item" key={label}>
              <div className="stat-number">{value}<span>{suffix}</span></div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-image-wrapper">
          <img src="/assets/profilePic.jpg" alt="Santhosh G Portrait" className="hero-portrait" />
        </div>
        <div className="edge-social-bar">
          <span className="edge-label">MY CONNECTS</span>
          <a href="https://github.com/santhosh07072007-pixel" target="_blank" rel="noopener noreferrer" className="edge-icon" title="GitHub">
            <i className="fab fa-github" />
          </a>
          <a href="https://www.linkedin.com/in/santhosh-g-453a9b328/" target="_blank" rel="noopener noreferrer" className="edge-icon" title="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="mailto:santhosh07072007@gmail.com" className="edge-icon" title="Email"><i className="fas fa-envelope" /></a>
          <a href="tel:+918870399068" className="edge-icon" title="Phone"><i className="fas fa-phone" /></a>
        </div>
      </div>
    </header>
  );
}
