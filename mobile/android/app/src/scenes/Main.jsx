import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import LoginUser from '../components/auth/LoginUser';

export default class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            view: 0
        }
    }
    //<Button onPress={()=>{this.setState({view: 1})}} title='Change view'/>

    render() {
        if (this.state.view == 0) {
            return (
                <View style={{backgroundColor: '#1454A4', height: '100%'}}>
                    <LoginUser />
                </View>
            )
        } else {
            return (
                <>
                    <Button onPress={()=>{this.setState({view: 1})}} title='Change view'/>
                </>
            )
        }
    }
}