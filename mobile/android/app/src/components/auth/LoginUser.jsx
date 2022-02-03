import React from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { View, ActivityIndicator, Image, Text } from 'react-native';
import { styles } from './LoginUser.js';

export default class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            emailFocused: false,
            password: '',
            passwordError: '',
            passwordFocused: false,
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <Image
                    source={require('../../../../../assets/images/logo.png')}
                    style={styles.image}
                />
                <Input
                    label='Enter your email'
                    placeholder='email@address.com'
                    leftIcon={<Icon name='email' size={24}/>}
                    value={this.state.email}
                    onChangeText={(newValue) => {this.setState({email: newValue})}}
                    errorMessage={this.state.emailError}
                    labelStyle={this.state.emailFocused ? styles.labelFocus : styles.labelBlur}
                    inputContainerStyle={this.state.emailFocused ? styles.input : {}}
                    inputStyle={styles.text}
                    onFocus={()=>{this.setState({emailFocused: true})}}
                    onBlur={()=>{this.setState({emailFocused: false})}}

                />
                <Input
                    label='Enter your password'
                    placeholder='********'
                    leftIcon={<Icon name='lock' size={24}/>}
                    value={this.state.password}
                    onChangeText={(newValue) => {this.setState({password: newValue})}}
                    errorMessage={this.state.passwordError}
                    inputStyle={styles.text}
                    labelStyle={this.state.passwordFocused ? styles.labelFocus : styles.labelBlur}
                    inputContainerStyle={this.state.passwordFocused ? styles.input : {}}
                    onFocus={()=>{this.setState({passwordFocused: true})}}
                    onBlur={()=>{this.setState({passwordFocused: false})}}
                />
                <Button
                    title='Login'
                    titleStyle={styles.text}
                />
            </View>
        )
    }
}