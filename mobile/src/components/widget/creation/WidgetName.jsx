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
                <Input placeholder='Enter name' value={this.state.text}/>
                <Text style={styles.confirmMessage}>{this.state.confirmMessage}</Text>
                <Button titleStyle={styles.buttonText} title='Apply changes' buttonStyle={styles.butonStyle} onPressIn={()=>{this.checkChangesAndApply()}}/>
                <Button titleStyle={styles.buttonText} title='Cancel' onPressIn={()=>this.props.navigation.goBack()}/>
            </View>
        )
    }
}