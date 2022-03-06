import axios from 'axios';

async function registerUser(name, email, password) {
    var access_token;

    await axios.post(
        process.env.REACT_APP_SERV_URL + '/auth/area/register', 
        {user_name: name, user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

async function loginUser(name, password) {
    var access_token;

    await axios.post(
        process.env.REACT_APP_SERV_URL + '/auth/area/login',
        {user_name: name, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch(() => {throw "Error"});
    return (access_token);
}

export {
    registerUser,
    loginUser
}