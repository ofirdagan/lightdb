import jwt from 'jsonwebtoken';
import wixData from 'wix-data';

const SECRET = `89d6e269-5623-4d29-b355-b7740d096e9290adee51-0962-4c5c-8de4-d338592a2588fef63f61-43e3-45ce-93f4-01133f2a47c640522c50-d104-4167-b95d-e835d3f942aa`;

export function sign(email) {
  const THIRTY_DAYS_IN_SEC = 30 * 24 * 60 * 60;
  const NOW_IN_SEC = Math.floor(Date.now() / 1000);
  return jwt.sign({
    exp: NOW_IN_SEC + THIRTY_DAYS_IN_SEC,
    email,
  }, SECRET);
}

export async function verifyToken(request) {
  const {authorization} = request.headers;
  try {
    const token = jwt.verify(authorization, SECRET);
    const isInvalidated = await wixData.get(`invalidated-users`, token.email, {suppressAuth: true});
    if (isInvalidated) {
      throw new Error('User has logged out');
    }
    return token;
  } catch (error) {
    console.log(`Error in verifying token - ${error}`);
    throw error;
  }
}