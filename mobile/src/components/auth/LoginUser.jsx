import { Input, Button, Icon }      from 'react-native-elements';
import { login, common }            from '../../styles/AuthStyles';
import { loginUser }                from '../../services/auth/Auth';
import { navigateWithParameters }   from '../../services/navigation';
import { signin }                   from '../../services/auth/GoogleSignin';
import { View, Image, Text }        from 'react-native';
import React                        from 'react';

export default class LoginUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameFocused: false,
            password: '',
            passwordFocused: false,
            errorMessage: '',
        }
    }

    login = async() => {
        await loginUser(this.state.name, this.state.password)
            .then((access_token) => {global.access_token = access_token, navigateWithParameters(this.props.navigation, "Homepage", {access_token: access_token})})
            .catch((error) => {this.setState({errorMessage: "An errror occured. Please try again.", name: '', password: ''})});
    }

    loginWithGoogle = async() => {
        await signin()
            .then((id) => {navigateWithParameters(this.props.navigation, "Homepage", {access_token: id})})
            .catch(()=>{});
    }

    render() {
        return (
            <View style={login.view}>
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
                    secureTextEntry={true}
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
                    <Text style={common.coloredText}>New to ARea ? </Text>
                    <Text onPress={()=>{this.props.changeFade()}} style={common.linkText}>Create an account</Text>
                </View>
                <Button
                    title='Login'
                    titleStyle={common.buttonText}
                    onPress={()=>{this.login()}}
                />
                <Button
                    icon={common.googleIcon}
                    buttonStyle={common.googleButton}
                    titleStyle={common.googleText}
                    title='Signin with Google'
                    onPress={()=>this.loginWithGoogle()}
                />
            </View>
        )
    }
}