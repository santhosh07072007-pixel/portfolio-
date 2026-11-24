import SectionHeading from './SectionHeading.jsx';

const achievements = [
  <>Engineered secure user authentication and authorization flows using <strong>JWT and OAuth 2.0</strong>, implementing role-based access control (RBAC).</>,
  <>Designed RESTful APIs with <strong>Express.js</strong>, leveraging asynchronous JavaScript (Promises, Async/Await) for real-time React-Node.js communication.</>,
  <>Deployed full-stack applications to <strong>Vercel and Render</strong>, setting up automated CI/CD pipelines to reduce deployment overhead.</>,
  <>Optimized frontend rendering performance and tuned backend query performance, enhancing overall responsiveness.</>
];

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeading tag="// WORK HISTORY" title="Professional Experience" />
      <div className="timeline">
        <div className="timeline-item">
          <div className="timeline-dot" />
          <div className="timeline-card">
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">Full Stack Developer Intern</h3>
                <div className="timeline-company">OneDot Communications</div>
              </div>
              <span className="timeline-date"><i className="far fa-calendar-alt" /> Nov 2025 – Dec 2025</span>
            </div>
            <ul className="timeline-ul">
              {achievements.map((achievement, index) => <li key={index}>{achievement}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
