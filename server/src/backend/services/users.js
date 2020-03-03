import wixData from 'wix-data';
import { sendEmailVerification } from 'backend/services/sendGrid';
import { sign } from 'backend/services/light-tokens';
import {v4 as uuid}  from 'uuid';

const TEN_MIN = 10 * 60 * 1000;

export async function registerPendingVerification(email) {
  const code = uuid().substring(0, 6);
  await wixData.save('pendingVerifications', {_id: email, code, email, exp: Date.now() + TEN_MIN}, {suppressAuth: true});
  return sendEmailVerification(email, code);
}

export async function saveUser(email) {
  const token = sign(email);
  await wixData.save(`users`, {_id: email, email, lastTokenCreated: Date.now()}, {suppressAuth: true});
  await wixData.remove(`invalidated-users`, email, {suppressAuth: true});
  return token;
}

export async function logout(email) {
  await wixData.save('invalidated-users', {_id: email, email}, {suppressAuth: true});
}