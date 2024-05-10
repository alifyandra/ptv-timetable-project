import { dev_id, api_key, api_link, api_ver } from './constants';
import { createHmac } from 'crypto';
import axios from 'axios';

const buildRequestUrl = (req_path: string) => {
  const req = `/v${api_ver}${req_path}${req_path.includes('?') ? '&' : '?'}devid=${dev_id}`;
  const signature = createHmac('sha1', api_key)
    .update(req)
    .digest('hex')
    .toUpperCase();

  return `https://${api_link}${req}&signature=${signature}`;
};

export const fetchTimetableApi = async (req_path: string, params?: any) => {
  const res = await axios.get(buildRequestUrl(req_path), params);
  return res;
};
