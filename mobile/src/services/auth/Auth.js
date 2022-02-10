import axios from 'axios';

async function registerUser(name, email, password) {
    console.log("Starting task");
    await axios.post(
        'http://172.20.0.1:8080/auth/area/register', 
        {user_name: name, user_email: email, user_password: password
    }).then((result) => {console.log(result)})
    .catch((error) => {console.log(error)})
    .finally(()=>{console.log("Task successfully done.")});
}

async function loginUser(email, password) {
}

export {
    registerUser,
    loginUser
}