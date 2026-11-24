import SectionHeading from './SectionHeading.jsx';

const certifications = [
  ['fa-shield-alt', 'Practical Cyber Security for Cyber Security Practitioners', 'NPTEL — IIT Kanpur', 'ELITE CERTIFICATE'],
  ['fa-chart-bar', 'Data Analytics with Python', 'NPTEL — IIT Roorkee', 'ELITE CERTIFICATE'],
  ['fa-database', 'MongoDB Basics for Students – Skill Completion Certificate', 'MongoDB — July 2026', 'SKILL COMPLETION CERTIFICATE']
];

export default function Certifications() {
  return (
    <section id="certifications">
      <SectionHeading tag="// CREDENTIALS" title="Certifications" />
      <div className="certs-grid">
        {certifications.map(([icon, title, issuer, type]) => (
          <div className="cert-card" key={title}>
            <div className="cert-badge"><i className={`fas ${icon}`} /></div>
            <div className="cert-info">
              <h4>{title}</h4>
              <p>{issuer}</p>
              <span className="cert-tag">{type}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
