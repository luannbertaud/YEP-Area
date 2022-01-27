import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';

export default class Main extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            view: 0
        }
    }

    render() {
        if (this.state.view == 0) {
            return (
                <>
                    <Text style={{fontFamily: 'Palanquin'}}>Signin</Text>
                    <Button onPress={()=>{this.setState({view: 1})}}/>
                </>
            )
        } else {
            return (
                <>
                    <Text style={{fontFamily: 'Palanquin'}}>Register</Text>
                    <Button onPress={()=>{this.setState({view: 0})}} />
                </>
            )
        }
    }
}