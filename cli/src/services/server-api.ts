import axios from 'axios';
import fs from 'fs';
import {BASE_URL} from '../constants';

class ServerApi {
  private baseUrl: string;
  private token: string;

  constructor(debug: boolean, token?: string) {
    const suffix = debug ? `-dev`: ``;
    if (debug) console.log(`Running in debug mode: ${debug}`);
    this.baseUrl = `${BASE_URL}/_functions${suffix}`;
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  async register(email: string) {
    const res = await axios.post(`${this.baseUrl}/registerUser`, {email});
    return res.data;
  }

  async verify(email: string, code:string) {
    const res = await axios.post(`${this.baseUrl}/verifyCode`, {email, code});
    const token = res.data.token;
    this.token = token;
    fs.writeFileSync('.light-db', token);
    return token;
  }

  async generateNewKey(name: string) {
    const res = await axios.post(`${this.baseUrl}/newKey`, {name}, {
      headers: {
        authorization: this.token
      }
    });
    return res.data.key;
  }

  async setKey(key: string, value: any) {
    const res = await axios.post(`${this.baseUrl}/setValue/${key}`, {value}, {
      headers: {
        authorization: this.token
      }
    });
    return res.data;
  }

  async get(key: string) {
    const res = await axios.get(`${this.baseUrl}/key/${key}`);
    return res.data;
  }

  async list() {
    const res = await axios.get(`${this.baseUrl}/list`, {
      headers: {
        authorization: this.token
      }
    });
    return res.data;
  }
  async logout() {
    const res = await axios.get(`${this.baseUrl}/logout`, {
      headers: {
        authorization: this.token
      }
    });
    fs.unlinkSync('.light-db');
    return res.data;
  }
}

export default ServerApi;