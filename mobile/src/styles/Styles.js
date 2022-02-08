import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    text: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light',
        alignContent: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontFamily: 'Palanquin-Light',
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
    }
});

const register = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '75%',
        padding: '5%',
        backgroundColor: 'white',
        marginTop: '25%',
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
        marginTop: '40%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 12 },
        shadowOpacity: 1,
        shadowRadius: 10.00,
        elevation: 24
    }
});

const homepage = StyleSheet.create({
    headerContainer: {
        flex: 1,
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
    button: {
        backgroundColor: "#2B357F",
        padding: 20,
        paddingHorizontal: 60,
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
});

export {
    common,
    login,
    register,
    homepage
};