import axios from 'axios';

const callApi = async (data, headers, url,method) => {
  try {
    const response = await axios({
      method,
      baseURL: 'https://express-training.herokuapp.com',
      url,
      data,
      headers,
    });
    console.log('--res=>', response);
    return response;
  } catch (err) {
    console.log('------Error', err.response);
    const error = {
      messageError: err.message,
      status: err.status,
    };
    return error;
  }
};

export default callApi;
