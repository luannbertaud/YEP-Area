import React from 'react';
import { Text } from 'react-native';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Text style={{marginTop: '45%'}}>Welcome to the board</Text>
        )
    }
}