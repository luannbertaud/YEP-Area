import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import axios from 'axios';

async function signin() {
    GoogleSignin.configure({webClientId: '839251961355-h2h85ulbdsnvngoic1ipl6oqrpfi69so.apps.googleusercontent.com'});

    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await axios.post(process.env.SERV_URL + '/auth/area/login/google',
        {user_name: userInfo.user.name, user_password: "undefined", idToken: userInfo.idToken, mobile: true});
        return (userInfo.idToken);
    } catch (error) {
        throw (error);
    } finally {
        GoogleSignin.signOut();
    }
}

async function signout() {
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        throw "Error";
    }
}

export {
    signin,
    signout
}