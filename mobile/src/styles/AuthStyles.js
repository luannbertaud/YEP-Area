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
        marginTop: '17%',
        marginLeft: '15%',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 12},
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
        shadowOffset: {width: 10, height: 12},
        shadowOpacity: 1,
        shadowRadius: 10.00,
        elevation: 24
    }
});

export {
    common,
    login,
    register
};