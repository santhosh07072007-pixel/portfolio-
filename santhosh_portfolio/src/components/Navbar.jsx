import { useEffect, useState } from 'react';

const links = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['Experience', 'experience'],
  ['Resume', 'resume'],
  ['Contact', 'contact']
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setScrolled(window.scrollY > 50);
      let current = 'home';
      document.querySelectorAll('header[id], section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) current = section.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#home" className="nav-brand">Santhosh G<span>.</span></a>
      <ul id="primary-navigation" className={`nav-links${menuOpen ? ' active' : ''}`}>
        {links.map(([label, id]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeSection === id ? 'active' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-btn">Let&apos;s Talk</a>
      <button
        className="mobile-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls="primary-navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(open => !open)}
      >
        <i className={`fas ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
      </button>
    </nav>
  );
}
