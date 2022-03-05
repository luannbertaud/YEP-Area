import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'Palanquin',
        fontWeight: 'normal',
        fontSize: 25
    },
    confirmMessage: {
        color: 'green',
        fontWeight: 'normal',
        fontFamily: 'Palanquin'
    },
    text: {
        color: 'black'
    },
    inputStyle: {
        color: 'black',
        fontFamily: 'Palanquin-Light',
        fontWeight: 'normal',
        fontSize: 13
    },
    inputContainerStyle: {
        borderBottomWidth: 0.5,
        borderWidth: 0.5,
        borderRadius: 50,
        width: '70%'
    },
    errorMessage: {
        color: 'red'
    },
    button: {
        marginTop: '2%'
    }
});

export default styles;