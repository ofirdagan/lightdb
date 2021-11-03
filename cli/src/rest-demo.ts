import axios from 'axios';
import { BASE_URL } from './constants';

const baseUrl = `${BASE_URL}/_functions`;
const set = async (key:string, value: any) => {
  const token = ``;
  const res = await axios.post(`${baseUrl}/setValue/${key}`, {value}, {
    headers: {
      authorization: this.token
    }
  });
  console.log(`Result- `, res.data);
};

const get = async (key: string) => {
  console.time('get');
  const res = await axios.get(`${baseUrl}/key/${key}`);
  console.timeEnd('get');
  console.log(`Result- `, res.data);
};

get(``);