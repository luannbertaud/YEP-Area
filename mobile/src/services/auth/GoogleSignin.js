import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

async function signin() {
    GoogleSignin.configure();

    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo.user.id);
        GoogleSignin.signOut();
    } catch (error) {
        throw (error);
    }
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