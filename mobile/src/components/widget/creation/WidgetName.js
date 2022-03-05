import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginLeft: '15%',
        marginTop: '-30%'
    },
    text: {
        color: 'black',
        fontWeight: 'normal',
        fontFamily: 'Palanquin',
        fontSize: 25,
        marginBottom: '5%'
    },
    input: {
        color: 'black',
        marginLeft: '5%',
        fontSize: 15,
        fontFamily: 'Palanquin-Light'
    },
    container: {
        borderWidth: 0.5,
        borderRadius: 50
    },
    errorMessage: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light'
    },
    confirmMessage: {
        color: 'green',
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light'
    },
    buttonText: {
        fontWeight: 'normal',
        fontFamily: 'Palanquin-Light'
    },
    butonStyle: {
        marginTop: '15%',
        marginBottom: '5%'
    }
});

export default styles