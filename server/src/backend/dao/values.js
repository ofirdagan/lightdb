import {getKey} from 'backend/dao/keys';
import wixData from 'wix-data';


export const SaveStatus = {
  SUCCESS: 'SUCCESS',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND'
};

export async function saveValue(key, value, email) {
  const results = await getKey(key);
  if (results.items.length === 1) {
    const item = results.items[0];
    if (item.email === email) {
      await wixData.save(`values`, {_id: key, value}, {suppressAuth: true});
      return SaveStatus.SUCCESS;
    } else {
      return SaveStatus.FORBIDDEN;
    }
  } else {
    return SaveStatus.NOT_FOUND;
  }
}

export async function getValue(key) {
  return await wixData.get(`values`, key, {suppressAuth: true});
}