import { ok, serverError, notFound, forbidden } from 'wix-http-functions';
import { buildResponse, buildTextResponse} from 'backend/http-utils';
import { verifyToken } from 'backend/services/light-tokens';
import { logout, saveUser, registerPendingVerification } from 'backend/services/users';
import { PendingStatus, verifyCode } from 'backend/dao/pending-verifications';



export async function logoutRequest(request) {
  const {email} = await verifyToken(request);
  await logout(email);
  return ok(buildTextResponse(`${email} has logged out successfully`));
}

export async function verifyCodeRequest(request) {
  try {
    const {code, email} = await request.body.json();
    const pendingStatus = await verifyCode(code, email);
    switch (pendingStatus) {
      case PendingStatus.NOT_FOUND:
        return notFound(buildTextResponse(`Verification code not found for ${email}`));
      case PendingStatus.INVALID:
        return ok(buildResponse({error: `wrong verification code supplied ${code} for email ${email}`}));
      case PendingStatus.EXPIRED:
        return forbidden(buildTextResponse(`Verification code expired`));
      case PendingStatus.VALID:
        const token = await saveUser(email);
        return ok(buildResponse({token}));
    }
  } catch (e) {
    console.log(`Error in verify - ${e}`);
    return serverError(buildResponse({message: e.message}));
  }
}

export async function registerUserRequest(request) {
  try {
    const {email} = await request.body.json();
    await registerPendingVerification(email);
    return ok(buildResponse({message: `email sent to ${email}`}));
  } catch (e) {
    console.log(`Error registering user - ${e}`);
    return serverError(buildResponse({message: e.message}));
  }
}
