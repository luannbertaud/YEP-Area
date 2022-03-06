import React from 'react';
import { Text, View, Switch, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { applet, header } from '../styles/AuthStyles.js';
import { navigateTo } from '../services/navigation';
import ToggleSwitch from 'toggle-switch-react-native'

export default class Applet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: this.props.route.params.active,
        }
    }

    render() {

        const { username } = this.props.route.params
        const { name } = this.props.route.params
        const { color } = this.props.route.params
        const { active } = this.props.route.params
        const { A } = this.props.route.params
        const { REA } = this.props.route.params

        return (
            <>
                <View style={[header.headerContainer, { backgroundColor: color }]}>
                    <View style={{ flex: 3 }}>
                        <TouchableOpacity onPress={() => navigateTo(this.props.navigation, "Homepage")}>
                            <Image resizeMode="contain" style={header.headerImage} source={require("../assets/images/logoWhite.png")}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3 }}>
                        <TouchableOpacity style={header.profile} onPress={() => navigateTo(this.props.navigation, "Profile")}>
                            <Text style={header.headerNameDetails}>{username}</Text>
                            <Icon name="account-circle" size={50} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[{ backgroundColor: color }, applet.topView]}>

                    <Icon style={{ textAlign: 'left' }} name='navigate-before' size={60} color="white" onPress={() => this.props.navigation.goBack()} />
                    <View style={{ flexDirection: "row", marginVertical: 25, alignItems: 'center' }}>
                        <View style={{ flex: 5, paddingLeft: 10 }}>
                            <Text style={applet.appletTitle}>{name}</Text>
                        </View>
                        <View style={{ flex: 2, paddingLeft: 10 }}>
                            <Text style={applet.appletEdit} onPress={() => {}}>Edit AREA</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", paddingLeft: 10, marginVertical: 20 }}>
                        <Icon type="fontisto" name={A} size={35} color="white" />
                        <Icon name='arrow-right' size={35} color="white" />
                        {REA.map((REAs, key) => {
                            return (
                                <Icon style={{ marginRight: 15 }} key={key} type="fontisto" name={REAs} size={35} color="white" />
                            )
                        })}
                    </View>
                </View>

                <View style={{ alignItems: 'center', marginTop: 60 }}>
                    <ToggleSwitch
                        isOn={this.state.isEnabled}
                        onColor="#9FCE2F"
                        offColor="#e5e5e5"
                        label="Activate"
                        labelStyle={{ color: "black", fontWeight: "900", fontSize: 20 }}
                        size="large"
                        onToggle={() => this.setState({ isEnabled: !this.state.isEnabled })}
                    />
                    <Button
                        title="Delete"
                        icon={{
                            name: 'delete',
                            size: 20,
                            color: 'white', 
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: '#E84D22',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            width: 150,
                            marginHorizontal: 50,
                            marginVertical: 40,
                        }}
                    />
                </View>
            </>
        )
    }
}