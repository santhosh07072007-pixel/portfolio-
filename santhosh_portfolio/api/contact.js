const RECIPIENT = 'santhosh07072007@gmail.com';
const MAX_BODY_BYTES = 10 * 1024;

function respond(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(JSON.stringify(body));
}

function parseJson(value) {
  if (Buffer.isBuffer(value)) {
    value = value.toString('utf8');
  }
  return typeof value === 'string' ? JSON.parse(value) : value;
}

function readBody(req) {
  if (req.body !== undefined) {
    return Promise.resolve(parseJson(req.body));
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let length = 0;
    let tooLarge = false;

    req.on('data', chunk => {
      length += chunk.length;
      if (length > MAX_BODY_BYTES) {
        tooLarge = true;
      } else if (!tooLarge) {
        chunks.push(chunk);
      }
    });
    req.on('end', () => {
      if (tooLarge) {
        const error = new Error('Request body is too large.');
        error.statusCode = 413;
        reject(error);
        return;
      }
      try {
        resolve(parseJson(Buffer.concat(chunks)));
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });
    req.on('error', reject);
  });
}

function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return null;
  }

  const { name, email, subject, message } = body;
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string'
  ) {
    return null;
  }

  const submission = {
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim()
  };

  if (
    !submission.name ||
    submission.name.length > 100 ||
    !submission.email ||
    submission.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) ||
    !submission.subject ||
    submission.subject.length > 150 ||
    !submission.message ||
    submission.message.length > 5000
  ) {
    return null;
  }

  return submission;
}

module.exports = async function contactHandler(req, res) {
  if (req.method !== 'POST') {
    respond(res, 405, { error: 'Method not allowed.' }, { Allow: 'POST' });
    return;
  }

  if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
    respond(res, 415, { error: 'Content-Type must be application/json.' });
    return;
  }

  const contentLength = Number(req.headers['content-length']);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    respond(res, 413, { error: 'Request body is too large.' });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    respond(res, error.statusCode || 400, {
      error: error.statusCode === 413 ? error.message : 'Invalid request body.'
    });
    return;
  }

  const submission = validateSubmission(body);
  if (!submission) {
    respond(res, 400, { error: 'Please provide a valid name, email, subject, and message.' });
    return;
  }

  const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    console.error('Contact form email is not configured.');
    respond(res, 503, { error: 'Email delivery is temporarily unavailable. Please try again later.' });
    return;
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [RECIPIENT],
        reply_to: submission.email,
        subject: `Portfolio contact: ${submission.subject}`,
        text: [
          `Name: ${submission.name}`,
          `Email: ${submission.email}`,
          `Subject: ${submission.subject}`,
          '',
          submission.message
        ].join('\n')
      })
    });

    if (!emailResponse.ok) {
      console.error(`Resend rejected the contact message with status ${emailResponse.status}.`);
      respond(res, 502, { error: 'Unable to send your message right now. Please try again later.' });
      return;
    }

    respond(res, 200, { message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form email request failed.', error);
    respond(res, 502, { error: 'Unable to send your message right now. Please try again later.' });
  }
};
