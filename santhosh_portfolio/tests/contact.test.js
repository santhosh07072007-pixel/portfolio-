const assert = require('node:assert/strict');
const { afterEach, beforeEach, test } = require('node:test');
const contactHandler = require('../api/contact');

const submission = {
  name: 'Taylor Example',
  email: 'taylor@example.com',
  subject: 'Project inquiry',
  message: 'I would like to discuss a project.'
};

let originalFetch;
let originalApiKey;
let originalFromEmail;

function createResponse() {
  return {
    headers: {},
    writeHead(statusCode, headers) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(body) {
      this.body = body;
    }
  };
}

function createRequest({ method = 'POST', body = submission, contentType = 'application/json' } = {}) {
  return {
    method,
    headers: { 'content-type': contentType },
    body
  };
}

beforeEach(() => {
  originalFetch = global.fetch;
  originalApiKey = process.env.RESEND_API_KEY;
  originalFromEmail = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_API_KEY = 'test-api-key';
  process.env.RESEND_FROM_EMAIL = 'Portfolio <contact@example.com>';
});

afterEach(() => {
  global.fetch = originalFetch;
  if (originalApiKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalApiKey;
  if (originalFromEmail === undefined) delete process.env.RESEND_FROM_EMAIL;
  else process.env.RESEND_FROM_EMAIL = originalFromEmail;
});

test('sends validated contact details to the configured email service', async () => {
  let request;
  global.fetch = async (url, options) => {
    request = { url, options };
    return { ok: true };
  };

  const response = createResponse();
  await contactHandler(createRequest(), response);

  assert.equal(response.statusCode, 200);
  assert.equal(request.url, 'https://api.resend.com/emails');
  assert.equal(request.options.headers.Authorization, 'Bearer test-api-key');
  assert.deepEqual(JSON.parse(request.options.body), {
    from: 'Portfolio <contact@example.com>',
    to: ['santhosh07072007@gmail.com'],
    reply_to: submission.email,
    subject: 'Portfolio contact: Project inquiry',
    text: 'Name: Taylor Example\nEmail: taylor@example.com\nSubject: Project inquiry\n\nI would like to discuss a project.'
  });
});

test('rejects invalid input without calling the email service', async () => {
  global.fetch = async () => {
    assert.fail('Email service must not be called for invalid input.');
  };

  const response = createResponse();
  await contactHandler(createRequest({
    body: { ...submission, email: 'not-an-email' }
  }), response);

  assert.equal(response.statusCode, 400);
});

test('rejects unsupported methods', async () => {
  const response = createResponse();
  await contactHandler(createRequest({ method: 'GET' }), response);

  assert.equal(response.statusCode, 405);
  assert.equal(response.headers.Allow, 'POST');
});

test('reports provider failures without exposing provider details', async () => {
  global.fetch = async () => ({ ok: false, status: 401 });

  const response = createResponse();
  await contactHandler(createRequest(), response);

  assert.equal(response.statusCode, 502);
  assert.match(JSON.parse(response.body).error, /Unable to send/);
});

test('reports missing email configuration', async () => {
  delete process.env.RESEND_API_KEY;
  const response = createResponse();
  await contactHandler(createRequest(), response);

  assert.equal(response.statusCode, 503);
});
