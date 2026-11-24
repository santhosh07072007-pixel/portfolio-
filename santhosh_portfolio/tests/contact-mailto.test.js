import assert from 'node:assert/strict';
import { test } from 'node:test';
import createContactMailto from '../src/utils/contactMailto.js';

const submission = {
  name: 'Taylor Example',
  email: 'taylor@example.com',
  subject: 'Project inquiry',
  message: 'I would like to discuss a project.'
};

test('creates an addressed email containing all validated form details', () => {
  const mailto = createContactMailto(submission);
  const [recipient, query] = mailto.slice('mailto:'.length).split('?');
  const parameters = new URLSearchParams(query);

  assert.equal(recipient, 'santhosh07072007@gmail.com');
  assert.equal(parameters.get('subject'), 'Portfolio contact: Project inquiry');
  assert.equal(
    parameters.get('body'),
    'Name: Taylor Example\r\nEmail: taylor@example.com\r\nSubject: Project inquiry\r\n\r\nI would like to discuss a project.'
  );
});

test('encodes message content for a mailto URL', () => {
  const mailto = createContactMailto({
    ...submission,
    message: 'Please review & reply? Thanks!'
  });

  assert.match(mailto, /%26/);
  assert.match(mailto, /%3F/);
  assert.equal(new URLSearchParams(mailto.split('?')[1]).get('body').endsWith('Please review & reply? Thanks!'), true);
});

test('rejects invalid addresses and blank required fields', () => {
  assert.throws(() => createContactMailto({ ...submission, email: 'not-an-email' }), /valid email/);
  assert.throws(() => createContactMailto({ ...submission, name: '   ' }), /name/);
  assert.throws(() => createContactMailto({ ...submission, subject: 'Subject\r\nBcc: other@example.com' }), /subject/);
  assert.throws(() => createContactMailto({ ...submission, message: '  ' }), /message/);
});

test('enforces the form field size limits', () => {
  assert.throws(() => createContactMailto({ ...submission, name: 'n'.repeat(101) }), /name/);
  assert.throws(() => createContactMailto({ ...submission, email: `${'a'.repeat(250)}@x.com` }), /email/);
  assert.throws(() => createContactMailto({ ...submission, subject: 's'.repeat(151) }), /subject/);
  assert.throws(() => createContactMailto({ ...submission, message: 'm'.repeat(5001) }), /message/);
});
