import React from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { View, Image, Text } from 'react-native';
import { common, register } from './Styles';

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            emailFocused: false,
            password: '',
            passwordError: '',
            passwordFocused: false,
            confirm: '',
            confirmError: '',
            confirmFocused: false,
        }
    }

    render() {
        return (
            <View style={register.view}>
                <Image
                    source={require('../../../../../assets/images/logo.png')}
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
                <Input
                    label='Confirm your password'
                    placeholder='********'
                    leftIcon={<Icon name='lock' size={20}/>}
                    value={this.state.confirm}
                    onChangeText={(newValue) => {this.setState({confirm: newValue})}}
                    errorMessage={this.state.confirmError}
                    inputStyle={common.text}
                    labelStyle={this.state.confirmFocused ? common.labelFocus : common.labelBlur}
                    inputContainerStyle={this.state.confirmFocused ? common.input : {}}
                    onFocus={()=>{this.setState({confirmFocused: true})}}
                    onBlur={()=>{this.setState({confirmFocused: false})}}
                />
                <View style={common.linkView}>
                    <Text style={common.coloredText}>Already got an account ? </Text>
                    <Text onPress={()=>{this.props.changeFade()}} style={common.linkText}>Log in</Text>
                </View>
                <Button
                    title='Register'
                    titleStyle={common.text}
                    onPress={()=>{this.props.changeFade()}}
                />
            </View>
        )
    }
}