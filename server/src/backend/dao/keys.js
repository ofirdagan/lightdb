import wixData from 'wix-data';
import {v4 as uuid}  from 'uuid';

export async function createNewKey(email, name) {
  const key = uuid();
  await wixData.save(`keys`, {email, key, name}, {suppressAuth: true});
  return key;
}

export async function getKey(key) {
  return await wixData.query(`keys`)
    .eq(`key`, key)
    .find({suppressAuth: true});
}

export async function getKeysForUser(email) {
  const results = await wixData.query(`keys`)
    .eq(`email`, email)
    .find({suppressAuth: true});
  return results.items.map(item => {
    return {
      key: item.key,
      name: item.name,
      createDate: item._createdDate
    }
  });
}