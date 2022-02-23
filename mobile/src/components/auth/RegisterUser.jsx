import React from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { View, Image, Text } from 'react-native';
import { common, register } from '../../styles/AuthStyles';
import { signin } from '../../services/auth/GoogleSignin';
import { registerUser } from '../../services/auth/Auth';
import { navigateWithParameters } from '../../services/navigation';

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameFocused: false,
            email: '',
            emailFocused: false,
            password: '',
            passwordFocused: false,
            errorMessage: ''
        }
    }

    register = async () => {
        await registerUser(this.state.name, this.state.email, this.state.password)
        .then((accesToken) => {navigateWithParameters(this.props.navigation, "Board", {accesToken: accesToken})})
        .catch((error) => {
            this.setState({errorMessage: "An errror occured. Please try again."});
        });
        this.setState({name: '', email: '', password: ''});
    }

    registerWithGoogle = async() => {
        await signin()
        .then((id) => {navigateWithParameters(this.props.navigation, "Board", {id: id})})
        .catch(()=>{});
    }

    render() {
        return (
            <View style={register.view}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={common.image}
                />
                <Input
                    label='Enter your name'
                    placeholder='Jeff'
                    leftIcon={<Icon name='person' size={20}/>}
                    value={this.state.name}
                    onChangeText={(newValue) => {this.setState({name: newValue})}}
                    errorMessage={this.state.nameError}
                    labelStyle={this.state.nameFocused ? common.labelFocus : common.labelBlur}
                    inputContainerStyle={this.state.nameFocused ? common.input : {}}
                    inputStyle={common.text}
                    onFocus={()=>{this.setState({nameFocused: true})}}
                    onBlur={()=>{this.setState({nameFocused: false})}}
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
                <Text style={common.error}>{this.state.errorMessage}</Text>
                <View style={common.linkView}>
                    <Text style={common.coloredText}>Already got an account ? </Text>
                    <Text onPress={()=>{this.props.changeFade()}} style={common.linkText}>Log in</Text>
                </View>
                <Button
                    title='Register'
                    titleStyle={common.buttonText}
                    onPress={()=>{this.register()}}
                    disabled={this.state.signinGoogle}
                />
                <Button
                    icon={common.googleIcon}
                    buttonStyle={common.googleButton}
                    titleStyle={common.googleText}
                    title='Signin with Google'
                    onPress={()=>this.registerWithGoogle()}
                />
            </View>
        )
    }
}