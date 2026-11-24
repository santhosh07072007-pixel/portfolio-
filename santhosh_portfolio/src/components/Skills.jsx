import SectionHeading from './SectionHeading.jsx';

const categories = [
  {
    icon: 'fa-laptop-code',
    title: 'Frontend Development',
    skills: ['React.js', 'TypeScript', 'HTML5', 'CSS3 / Bootstrap', 'Tailwind CSS']
  },
  {
    icon: 'fa-server',
    title: 'Backend Development',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'FastAPI', 'JWT & OAuth 2.0']
  },
  {
    icon: 'fa-code',
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript (ES6+)']
  },
  {
    icon: 'fa-database',
    title: 'Databases & DevOps',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Git / GitHub', 'Vercel & Render']
  }
];

export default function Skills() {
  return (
    <section id="skills">
      <SectionHeading tag="// TECH STACK & TOOLS" title="Skills & Expertise" />
      <div className="skills-grid">
        {categories.map(category => (
          <div className="skill-category-card" key={category.title}>
            <div className="category-header">
              <div className="category-icon"><i className={`fas ${category.icon}`} /></div>
              <h3 className="category-title">{category.title}</h3>
            </div>
            <div className="skill-tags">
              {category.skills.map(skill => <span className="skill-pill" key={skill}>{skill}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
