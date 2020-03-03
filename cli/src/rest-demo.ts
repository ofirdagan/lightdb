import axios from 'axios';

const baseUrl = `https://www.lightdb.org/_functions`;
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
  const res = await axios.get(`${baseUrl}/key/${key}`);
  console.log(`Result- `, res.data);
};

get(`49e52eb2-e1d7-4efe-a989-f70a7ebdaf60`);