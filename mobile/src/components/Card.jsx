import React from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { homepage } from '../styles/AuthStyles.js';
import { navigateWithParameters } from '../services/navigation';
import ToggleSwitch from 'toggle-switch-react-native'


export default class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnabled: this.props.active,
        }
        this.onPressDetails = this.onPressDetails.bind(this)
    }

    onPressDetails() {
        navigateWithParameters(this.props.navigation, 'Applet', {
            username: this.props.username,
            name: this.props.name,
            color: this.props.color,
            active: this.props.active,
            A: this.props.A,
            REA: this.props.REA,
        });
    }

    render() {
        return (
            <TouchableOpacity style={{ width: '100%' }} onPress={() => this.onPressDetails()}>
                <View style={[homepage.card, { backgroundColor: this.props.color }, homepage.shadowProp]}>
                    <View style={{ marginTop: -30 }}>
                        <Text style={homepage.cardHeading}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={homepage.footerCard}>
                        <ToggleSwitch
                            isOn={this.state.isEnabled}
                            onColor="#e5e5e5"
                            offColor="#767577"
                            size="large"
                            onToggle={() => this.setState({ isEnabled: !this.state.isEnabled })}
                        />

                        <View style={{ flexDirection: "row", marginLeft: 60 }}>
                            <Icon type="fontisto" name={this.props.A} size={35} color="white" />
                            <Icon name='arrow-right' size={35} color="white" />
                            {this.props.REA.map((REAs, key) => {
                                return (
                                    <Icon style={{ marginRight: 15 }} key={key} type="fontisto" name={REAs} size={35} color="white" />
                                )
                            })}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}