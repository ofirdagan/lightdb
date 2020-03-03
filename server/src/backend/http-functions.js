import * as users from 'backend/controllers/users.ctrl';
import * as keyValueStore from 'backend/controllers/key-value-store.ctrl';

//https://ofird11.wixsite.com/light-db/_functions/registerUser
export async function post_registerUser(request) {
  return users.registerUserRequest(request);
}

//https://ofird11.wixsite.com/light-db/_functions-dev/verifyCode
export async function post_verifyCode(request) {
  return users.verifyCodeRequest(request);
}

export async function get_logout(request) {
  return users.logoutRequest(request);
}

export async function post_newKey(request) {
  return keyValueStore.newKey(request);
}

export async function post_setValue(request) {
  return keyValueStore.setValue(request);
}

export async function get_key(request) {
  return keyValueStore.getValueRequest(request);
}

export async function get_list(request) {
  return keyValueStore.getList(request);
}


