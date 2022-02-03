import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light'
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
    view: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '75%',
        padding: '5%',
        backgroundColor: 'white',
        marginTop: '40%',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 7},
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14
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
    }
});

export {
    styles,
};