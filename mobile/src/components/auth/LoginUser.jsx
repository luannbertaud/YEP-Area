import React from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { View, Image, Text } from 'react-native';
import { login, common } from '../../styles/Styles';

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
            <View style={login.view}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={common.image}
                />
                <Input
                    label='Enter your email'
                    placeholder='email@address.com'
                    leftIcon={<Icon name='mail' size={20}/>}
                    value={this.state.email}
                    onChangeText={(newValue) => {this.setState({email: newValue})}}
                    errorMessage={this.state.emailError}
                    labelStyle={this.state.emailFocused ? common.labelFocus : common.labelBlur}
                    inputContainerStyle={this.state.emailFocused ? common.input : {}}
                    inputStyle={common.text}
                    onFocus={()=>{this.setState({emailFocused: true})}}
                    onBlur={()=>{this.setState({emailFocused: false})}}

                />
                <Input
                    label='Enter your password'
                    placeholder='********'
                    leftIcon={<Icon name='lock' size={20}/>}
                    value={this.state.password}
                    onChangeText={(newValue) => {this.setState({password: newValue})}}
                    errorMessage={this.state.passwordError}
                    inputStyle={common.text}
                    labelStyle={this.state.passwordFocused ? common.labelFocus : common.labelBlur}
                    inputContainerStyle={this.state.passwordFocused ? common.input : {}}
                    onFocus={()=>{this.setState({passwordFocused: true})}}
                    onBlur={()=>{this.setState({passwordFocused: false})}}
                />
                <View style={common.linkView}>
                    <Text style={common.coloredText}>New to ARea ? </Text>
                    <Text onPress={()=>{this.props.changeFade()}} style={common.linkText}>Create an account</Text>
                </View>
                <Button
                    title='Login'
                    titleStyle={common.buttonText}
                    onPress={()=>{this.props.changeFade()}}
                />
            </View>
        )
    }
}