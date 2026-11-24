const RECIPIENT = 'santhosh07072007@gmail.com';

export default function createContactMailto(values) {
  if (!values || typeof values !== 'object') {
    throw new TypeError('Please provide your name, email, subject, and message.');
  }

  const name = typeof values.name === 'string' ? values.name.trim() : '';
  const email = typeof values.email === 'string' ? values.email.trim() : '';
  const subject = typeof values.subject === 'string' ? values.subject.trim() : '';
  const message = typeof values.message === 'string' ? values.message.trim() : '';

  if (!name || name.length > 100) {
    throw new Error('Please enter a name of 1 to 100 characters.');
  }
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }
  if (!subject || subject.length > 150 || /[\r\n]/.test(subject)) {
    throw new Error('Please enter a subject of 1 to 150 characters.');
  }
  if (!message || message.length > 5000) {
    throw new Error('Please enter a message of 1 to 5000 characters.');
  }

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '',
    message
  ].join('\r\n');

  return `mailto:${RECIPIENT}?subject=${encodeURIComponent(`Portfolio contact: ${subject}`)}&body=${encodeURIComponent(body)}`;
}
