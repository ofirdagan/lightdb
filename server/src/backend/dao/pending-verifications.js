import wixData from 'wix-data';

export const PendingStatus = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID: 'INVALID',
  VALID: 'VALID',
  EXPIRED: 'EXPIRED'
};

export async function verifyCode(code, email) {
  const pendingVerification = await wixData.get('pendingVerifications', email, {suppressAuth: true});
  if (!pendingVerification) {
    return PendingStatus.NOT_FOUND;
  }
  if (pendingVerification.exp < Date.now()) {
    return PendingStatus.EXPIRED
  }
  return pendingVerification.code === code ? PendingStatus.VALID : PendingStatus.INVALID
}