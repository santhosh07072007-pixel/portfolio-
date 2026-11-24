import { useEffect, useRef } from 'react';

function ResumeDialog({ onClose, returnFocusRef }) {
  const closeButton = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();

    function onKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [onClose, returnFocusRef]);

  return (
    <div className="modal active" role="dialog" aria-modal="true" aria-labelledby="resumeModalTitle" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="resumeModalTitle"><i className="fas fa-file-alt highlight-lime" /> Santhosh G — Resume Preview</h3>
          <button ref={closeButton} className="close-modal" type="button" aria-label="Close resume preview" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <iframe src="/assets/Santhosh_G_Resume.pdf" title="Santhosh G resume" />
        </div>
      </div>
    </div>
  );
}

export default function Resume({ onViewResume }) {
  return (
    <section id="resume" className="resume-section">
      <div className="resume-box">
        <i className="fas fa-file-invoice highlight-lime resume-icon" />
        <h3>Curriculum Vitae</h3>
        <p>Interested in exploring my complete academic credentials, detailed project summaries, and technical qualifications?</p>
        <div className="resume-actions">
          <button type="button" className="btn-primary" onClick={onViewResume}>
            <i className="fas fa-eye" /> Quick Preview Resume
          </button>
          <a href="/assets/Santhosh_G_Resume.pdf" download="Santhosh_G_Resume.pdf" className="btn-secondary">
            <i className="fas fa-download" /> Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

Resume.Dialog = ResumeDialog;
