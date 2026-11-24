import Education from './Education.jsx';
import SectionHeading from './SectionHeading.jsx';

const highlights = [
  ['Department', 'Artificial Intelligence & Data Science (AD&DS)'],
  ['Current Status', 'Pre-Final Year Undergraduate'],
  ['Focus Areas', 'Generative AI, RAG Systems, Full Stack Web'],
  ['Location', 'Coimbatore, Tamil Nadu, India']
];

export default function About() {
  return (
    <section id="about">
      <SectionHeading tag="// BIOGRAPHY & ACADEMICS" title="About Me" />
      <div className="about-grid">
        <div className="about-card">
          <p>
            I am an Artificial Intelligence &amp; Data Science undergraduate at <strong>KPR Institute of Engineering and Technology, Coimbatore</strong> (Batch 2024–2028).
          </p>
          <p>
            My passion lies in bridging cutting-edge Generative AI models (RAG, LangChain, Claude, Gemini API) with robust, scalable web applications. I have proven hands-on experience designing secure APIs, deploying web applications, and engineering AI workflows from concept to production.
          </p>
          <div className="about-highlights">
            {highlights.map(([title, detail]) => (
              <div className="highlight-box" key={title}>
                <h4>{title}</h4>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </div>
        <Education />
      </div>
    </section>
  );
}
