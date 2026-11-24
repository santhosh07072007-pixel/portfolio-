import { useState } from 'react';
import createContactMailto from '../utils/contactMailto.js';
import SectionHeading from './SectionHeading.jsx';

export default function Contact() {
  const [status, setStatus] = useState({ message: '', type: '' });

  function handleSubmit(event) {
    event.preventDefault();
    setStatus({ message: '', type: '' });

    try {
      const values = Object.fromEntries(new FormData(event.currentTarget).entries());
      const mailtoUrl = createContactMailto(values);
      setStatus({
        message: 'Your email app should open with your message addressed to us. Review and send it there to complete delivery.',
        type: 'info'
      });
      window.location.href = mailtoUrl;
    } catch (error) {
      setStatus({
        message: error instanceof Error ? error.message : 'Unable to prepare your email. Please try again.',
        type: 'error'
      });
    }
  }

  function clearStatus() {
    setStatus({ message: '', type: '' });
  }

  return (
    <section id="contact">
      <SectionHeading tag="// GET IN TOUCH" title="Contact Information" />
      <div className="contact-grid">
        <div className="contact-info-list">
          <div className="contact-info-item">
            <div className="contact-icon"><i className="fas fa-envelope" /></div>
            <div className="contact-details"><span>Email Me</span><a href="mailto:santhosh07072007@gmail.com">santhosh07072007@gmail.com</a></div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><i className="fas fa-phone-alt" /></div>
            <div className="contact-details"><span>Call Me</span><a href="tel:+918870399068">+91 8870399068</a></div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><i className="fas fa-university" /></div>
            <div className="contact-details"><span>Institution</span><p>KPR Institute of Engineering &amp; Technology, Coimbatore</p></div>
          </div>
          <div className="contact-info-item">
            <div className="contact-icon"><i className="fab fa-linkedin-in" /></div>
            <div className="contact-details">
              <span>LinkedIn Profile</span>
              <a href="https://www.linkedin.com/in/santhosh-g-453a9b328/" target="_blank" rel="noopener noreferrer">linkedin.com/in/santhosh-g-453a9b328</a>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit} onInput={clearStatus} onInvalid={() => setStatus({ message: 'Please complete each field with valid information.', type: 'error' })}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" className="form-input" placeholder="e.g. John Doe" maxLength="100" autoComplete="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" className="form-input" placeholder="e.g. john@example.com" maxLength="254" autoComplete="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" className="form-input" placeholder="Project Inquiry / Job Opportunity" maxLength="150" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" className="form-input" rows="5" maxLength="5000" placeholder="Write your message here..." required />
          </div>
          <button type="submit" className="btn-secondary contact-submit">Send Message <i className="fas fa-paper-plane" /></button>
          <p className={`contact-status${status.type ? ` is-${status.type}` : ''}`} role="status" aria-live="polite">{status.message}</p>
        </form>
      </div>
    </section>
  );
}
