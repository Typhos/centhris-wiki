import axios from 'axios';

export default {
  getAll: async () => {
    let res = await axios.get(`/api/entry`);
    return res.data || [];
  }
}