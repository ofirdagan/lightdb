import {fetch} from 'wix-fetch';

const key = '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';
const sender = 'ofirdagan@gmail.com';
const subject = 'Welcome to Light-DB';

export function sendEmailVerification(recipient, code) {
  const url = 'https://api.sendgrid.com/api/mail.send.json';
  const text = `Your almost there...\nYour verification code is: ${code}`;
  const data = `from=${sender}&to=${recipient}&subject=${subject}&text=${text}`;
  const request = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  };
  return fetch(url, request)
   .then(response => response.json());
}