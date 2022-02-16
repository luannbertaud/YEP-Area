import axios from 'axios';

async function registerUser(name, email, password) {
    var access_token;

    await axios.post(
        'http://127.0.0.2:8080/auth/area/register', 
        {user_name: name, user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

async function loginUser(email, password) {
    var access_token;

    await axios.post(
        'http://127.0.0.2:8080/auth/area/login',
        {user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

export {
    registerUser,
    loginUser
}