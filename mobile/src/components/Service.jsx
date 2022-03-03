import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { service } from '../styles/AuthStyles'

export default class Service extends React.Component {

    constructor(props) {
        super(props);
    }

    renderConnect(connected) {
        connected = !connected
        return (
            <>
                <Button
                    title="Connect"
                    buttonStyle={{
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'black',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}
                />
            </>
        );  
    }

    renderDisconnect(connected) {
        connected = !connected
        return (
            <>
                <Button
                    title="Disconnect"
                    buttonStyle={{
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: 'black',
                        borderRadius: 30,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    titleStyle={{ fontWeight: 'bold', color: 'black', fontSize: 20 }}
                />
            </>
        );
    }

    render() {

        const { name, logo, color, connected } = this.props.route.params

        return (
            <View style={{ backgroundColor: color, height: "100%" }}>
                <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 10 }}>
                    <Icon name='close' size={60} color="white" onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Icon type="fontisto" style={service.avatar} name={logo} size={150} color='white' />
                    <Text style={service.text}>Connect to {name} in order to use their services</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    {connected === false ? this.renderDisconnect(connected) : this.renderConnect(connected)}
                </View>
            </View>
        );
    }
}