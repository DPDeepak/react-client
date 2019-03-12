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
