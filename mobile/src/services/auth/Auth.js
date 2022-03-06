import axios from 'axios';

async function registerUser(name, email, password) {
    var access_token;

    await axios.post(
        'https://api.yep-area.cf/auth/area/register', 
        {user_name: name, user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

async function loginUser(email, password) {
    var access_token;

    await axios.post(
        'https://api.yep-area.cf/auth/area/login',
        {user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch(() => {throw "Error"});
    return (access_token);
}

export {
    registerUser,
    loginUser
}