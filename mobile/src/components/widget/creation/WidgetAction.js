import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'Palanquin-SemiBold',
        fontWeight: 'normal',
        fontSize: 25,
        alignSelf: 'center'
    },
    confirmMessage: {
        color: 'green',
        fontWeight: 'normal',
        fontFamily: 'Palanquin'
    },
    text: {
        color: 'black',
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Bold',
        fontSize: 15
    },
    inputStyle: {
        color: 'black',
        fontFamily: 'Palanquin-Regular',
        fontWeight: 'normal',
        fontSize: 13,
        textAlign: 'center'
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 50,
        width: '70%'
    },
    errorMessage: {
        color: 'red'
    },
    button: {
        marginTop: '2%',
    },
    buttontitle: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-SemiBold'
    }
});

export default styles;