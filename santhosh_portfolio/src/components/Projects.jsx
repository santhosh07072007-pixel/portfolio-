import { useEffect, useRef, useState } from 'react';
import SectionHeading from './SectionHeading.jsx';

const projects = [
  {
    id: 'spot4notes',
    category: 'ai',
    type: 'AI-Powered Platform',
    title: 'Spot4Notes',
    bullets: [
      'Engineered an AI-powered academic resource-sharing platform enabling students to upload, manage, and access notes, assignments, and study materials through a centralized hub.',
      'Implemented AI-driven content categorization, intelligent search, duplicate file detection algorithms, and an admin approval quality control workflow.',
      'Built scalable full-stack web services with React.js, Node.js, Flask, PostgreSQL, REST APIs, and Tailwind CSS.'
    ],
    tech: ['React.js', 'Node.js', 'Flask', 'PostgreSQL', 'GenAI', 'Tailwind CSS']
  },
  {
    id: 'time4medi',
    category: 'fullstack',
    type: 'Progressive Web App',
    title: 'Time4medi',
    bullets: [
      'Developed a responsive Progressive Web Application (PWA) assisting users in managing medication schedules with timely reminders and dose tracking.',
      'Features medicine management, customizable reminder schedules, and medication adherence history logs.',
      'Delivered a user-friendly cross-device interface across desktop, tablet, and mobile devices.'
    ],
    tech: ['PWA', 'JavaScript', 'HTML5/CSS3', 'Service Workers', 'Local Storage']
  }
];

const filters = [
  ['all', 'All Projects'],
  ['ai', 'AI / GenAI'],
  ['fullstack', 'Full Stack & PWA']
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hiddenProjects, setHiddenProjects] = useState([]);
  const [shownProjects, setShownProjects] = useState(projects.map(project => project.id));
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function applyFilter(filter) {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setActiveFilter(filter);

    const matching = projects.filter(project => filter === 'all' || project.category === filter);
    const matchingIds = matching.map(project => project.id);
    setHiddenProjects(current => current.filter(id => matchingIds.includes(id)));
    setShownProjects(current => current.filter(id => matchingIds.includes(id)));

    const hideIds = projects.filter(project => !matchingIds.includes(project.id)).map(project => project.id);
    timers.current.push(window.setTimeout(() => {
      setHiddenProjects(current => [...new Set([...current, ...hideIds])]);
    }, 300));
    timers.current.push(window.setTimeout(() => {
      setHiddenProjects(current => current.filter(id => matchingIds.includes(id)));
      setShownProjects(matchingIds);
    }, 50));
  }

  return (
    <section id="projects">
      <SectionHeading tag="// RECENT WORKS" title="Featured Projects" />
      <div className="project-filters">
        {filters.map(([value, label]) => (
          <button
            className={`filter-btn${activeFilter === value ? ' active' : ''}`}
            data-filter={value}
            type="button"
            key={value}
            onClick={() => applyFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="projects-grid">
        {projects.map(project => {
          const matches = activeFilter === 'all' || activeFilter === project.category;
          const isHidden = hiddenProjects.includes(project.id) && !matches;
          return (
            <article
              className="project-card"
              data-category={project.category}
              key={project.id}
              style={{
                display: isHidden ? 'none' : 'flex',
                opacity: !matches || !shownProjects.includes(project.id) ? 0 : 1,
                transform: !matches || !shownProjects.includes(project.id) ? 'translateY(20px)' : 'translateY(0)'
              }}
            >
              <div className="project-top">
                <span className="project-type">{project.type}</span>
                <div className="project-links">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="project-link-icon" title="GitHub Repository">
                    <i className="fab fa-github" />
                  </a>
                  <span className="project-link-icon" title="Live preview unavailable" aria-hidden="true">
                    <i className="fas fa-external-link-alt" />
                  </span>
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <ul className="project-bullets">
                {project.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}
              </ul>
              <div className="project-tech">
                {project.tech.map(technology => <span className="tech-tag" key={technology}>{technology}</span>)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
