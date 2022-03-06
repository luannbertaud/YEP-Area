import React from 'react';
import { View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './WidgetName.js';

export default class WidgetName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errorMessage: '',
            confirmMessage: '',
        };
    }

    checkChangesAndApply = () => {
        if (this.state.text == '') {
            this.setState({errorMessage: 'Error: Your name cannot be empty'});
            this.setState({text: ''});
            this.setState({confirmMessage: ''});
        } else {
            this.props.onConfirm(this.state.text);
            this.setState({errorMessage: ''});
            this.setState({confirmMessage: 'Your ARea name has been successfully updated !'});
            this.setState({text: ''});
        }
    }

    render() {
        return(
            <View style={styles.view}>
                <Text style={styles.text}>Choose your ARea name: </Text>
                <Input
                    inputStyle={styles.input}
                    disabled={false}
                    inputContainerStyle={styles.container}
                    value={this.state.text}
                    onChangeText={(text) => {this.setState({text: text, confirmMessage: '', errorMessage: ''})}}
                    placeholder='Enter your ARea name here...'
                    errorMessage={this.state.errorMessage}
                    errorStyle={styles.errorMessage}
                />
                <Text style={styles.confirmMessage}>{this.state.confirmMessage}</Text>
                <Button titleStyle={styles.buttonText} title='Apply changes' buttonStyle={styles.butonStyle} onPress={()=>{this.checkChangesAndApply()}}/>
                <Button titleStyle={styles.buttonText} title='Cancel' onPress={()=>this.props.navigation.goBack()}/>
            </View>
        )
    }
}