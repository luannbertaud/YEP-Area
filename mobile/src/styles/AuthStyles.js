import { StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';

const common = StyleSheet.create({
    text: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light',
        alignContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-SemiBold',
        alignContent: 'center',
        alignSelf: 'center',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: '5%'
    },
    labelFocus: {
        color: 'black'
    },
    input: {
        borderBottomColor: 'black'
    },
    labelFocus: {
        fontFamily: 'Palanquin-Bold',
        fontWeight: 'normal',
        color: 'black'
    },
    labelBlur: {
        fontFamily: 'Palanquin-Bold',
        fontWeight: 'normal'
    },
    linkView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '5%'
    },
    coloredText: {
        color: 'black',
        fontFamily: 'Palanquin',
        fontWeight: 'normal'
    },
    linkText: {
        color: 'blue',
        fontFamily: 'Palanquin',
        fontWeight: 'normal'
    },
    error: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin',
        color: 'red',
        alignSelf: 'center'
    },
    googleIcon: {
        name: 'google',
        type: 'font-awesome',
        size: 15,
        color: 'black',
    },
    googleButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: '2%'
    },
    googleText: {
        color: 'black',
        fontWeight: 'normal',
        fontFamily: 'Palanquin-SemiBold'
    }
});

const register = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '75%',
        padding: '5%',
        backgroundColor: 'white',
        marginTop: '17%',
        marginLeft: '15%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 10.00,
        elevation: 24
    }
});

const login = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '75%',
        padding: '5%',
        backgroundColor: 'white',
        marginTop: '30%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 10.00,
        elevation: 24
    }
});

const header = StyleSheet.create({
    headerContainer: {
        padding: 20,
        flexDirection: "row",
    },
    headerImage: {
        width: '90%',
        marginTop: -20,
        paddingLeft: '2%',
    },
    profile: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        flexDirection: "row",
    },
    headerName: {
        paddingLeft: '5%',
        paddingRight: '5%',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 28,
    },
    headerNameDetails: {
        paddingLeft: '5%',
        paddingRight: '5%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
    },
});

const homepage = StyleSheet.create({
    button: {
        backgroundColor: "#2B357F",
        padding: 20,
        paddingHorizontal: 60,
        marginTop: -20,
        borderRadius: 50
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white"
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    noAppletText: {
        color: 'grey',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardHeading: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 50,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '600',
        color: "white",
    },
    card: {
        borderRadius: 25,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 20,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    footerCard: {
        flex: 2,
        flexDirection: "row",
        marginBottom: -20,
    },
});

const applet = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    topView: {
        //height: '25%',
        width: '100%',
        textAlign: 'left',
        alignItems: 'flex-start'
    },
    BottomView: {
        height: '50px',
    },
    appletTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "white",
    },
    appletEdit: {
        fontSize: 18,
        color: "white",
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

const profile = StyleSheet.create({
    header: {
        backgroundColor: "#1354A4",
        height: 155,
    },
    avatar: {
        alignSelf: 'center',
        position: 'relative',
    },
    body: {
        marginTop: 40,
    },
    bodyButton: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 24,
        color: "black",
        fontWeight: "600",
        flex: 3,
    },
    title: {
        fontSize: 28,
        color: "black",
        fontWeight: "bold",
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#1354A4",
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    serviceView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    logoView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        marginBottom: 30,
    },
    serviceName: {
        fontSize: 24,
        color: "black",
        fontWeight: "600",
        textAlign: 'center',
    },
});

export {
    common,
    login,
    register,
    homepage,
    applet,
    header,
    profile,
};