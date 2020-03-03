import { ok, serverError, notFound, forbidden } from 'wix-http-functions';
import { buildResponse, buildTextResponse} from 'backend/http-utils';
import { verifyToken } from 'backend/services/light-tokens';
import { createNewKey, getKeysForUser } from 'backend/dao/keys';
import { saveValue, SaveStatus, getValue } from 'backend/dao/values';


export async function newKey(request) {
  try {
    const {email} = await verifyToken(request);
    const {name} = await request.body.json();
    const key = await createNewKey(email, name);
    return ok(buildResponse({key}));
  } catch (e) {
    console.log(`Error in post_newKey ${e}`);
    return serverError(buildResponse({message: e.message}));
  }
}

export async function setValue(request) {
  try {
    const {email} = await verifyToken(request);
    const {value} = await request.body.json();
    const key = request.path[0];

    const status = await saveValue(key, value, email);
    switch (status) {
      case SaveStatus.SUCCESS:
        return ok(buildResponse({key, value}));
      case SaveStatus.NOT_FOUND:
        return notFound(buildTextResponse(`Key not found ${key}`));
      case SaveStatus.FORBIDDEN:
        return forbidden(buildTextResponse(`You don't have permissions to set key: ${key}`));
    }
  } catch (e) {
    console.log(`Error in post_setValue ${e}`);
    return serverError(buildResponse({message: e.message}));
  }
}

export async function getValueRequest(request) {
  const key = request.path[0];
  const results = await getValue(key);
  return results ? ok(buildResponse(results.value)) : notFound(buildTextResponse(`key: ${key} not found`));
}

export async function getList(request) {
  try {
    const {email} = await verifyToken(request);
    const list = await getKeysForUser(email);
    return ok(buildResponse(list));
  } catch (e) {
    console.log(`Error in get_list ${e}`);
    return serverError(buildResponse({message: e.message}));
  }
}