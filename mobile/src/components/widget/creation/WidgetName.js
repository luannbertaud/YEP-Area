import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        marginTop: '40%',
        marginLeft: '13%'
    },
    text: {
        color: 'black',
        fontWeight: 'normal',
        fontFamily: 'Palanquin-SemiBold',
        fontSize: 25,
        marginBottom: '5%'
    },
    input: {
        color: 'black',
        marginLeft: '5%',
        fontSize: 15,
        fontFamily: 'Palanquin-Regular',
        textAlign: 'center'
    },
    container: {
        borderWidth: 1,
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
        marginBottom: '5%',
        shadowColor: 'black',
    }
});

export default styles