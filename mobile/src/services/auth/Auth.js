import axios from 'axios';

function validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false)
        throw "invalid-email";
}

function validatePassword(password) {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (reg.test(password) === false)
        throw "invalid-password";
}

async function registerUser(name, email, password) {
    var access_token;

    try {
        validateEmail(email);
        validatePassword(password);
    } catch(error) {
        throw error;
    }
    await axios.post(
        process.env.SERV_URL + '/auth/area/register', 
        {user_name: name, user_email: email, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

async function loginUser(name, password) {
    var access_token;

    await axios.post(
        process.env.SERV_URL + '/auth/area/login',
        {user_name: name, user_password: password}
    ).then((result) => {access_token = result.data.access_token})
    .catch((error) => {throw "Error"});
    return (access_token);
}

export {
    registerUser,
    loginUser
}