import axios from 'axios';

const callApi = async (data, headers, url,method,params) => {
  try {
    console.log('==>');

    const response = await axios({
      method,
      baseURL: 'https://express-training.herokuapp.com',
      url,
      data,
      headers,
      params,
    });
    return response;
  } catch (err) {
    const error = {
      messageError: err.message,
      status: err.status,
    };
    return error;
  }
};

export default callApi;
