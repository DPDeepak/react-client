import axios from 'axios';

const callApi = async (email, password) => {
  try {
    console.log('----------------5---------', email, password);

    const response = await axios({
      method: 'post',
      url: 'https://express-training.herokuapp.com/api/user/login',
      data: {
        email,
        password,
      },
    });
    console.log('--', response);
    return response;
  } catch (err) {
    console.log('------Error', err);
    const error = {
      messageError: err.message,
      status: err.status,

    };
    return error;
    // throw new Error(err);
  }
};

export default callApi;
