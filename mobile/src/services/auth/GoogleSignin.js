import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

async function signin() {
    GoogleSignin.configure();
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            return ("signin-cancelled");
        } else if (error.code == statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            return ("signin-impossible");
        }
    }
    //call api to signin
}

async function signout() {
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        console.error('error');
    }
}

export {
    signin,
    signout
}