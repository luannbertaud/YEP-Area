import React from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { homepage } from '../styles/Styles.js';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEnabled: this.props.active,
        }
    }

    render() {
        return (
            <TouchableOpacity style={{ width: '100%' }}>
                <View style={[homepage.card, { backgroundColor: this.props.color }, homepage.shadowProp]}>
                    <View style={{ marginTop: -30 }}>
                        <Text style={homepage.cardHeading}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={homepage.footerCard}>
                        <Switch
                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], }}
                            trackColor={{ false: "#767577", true: "#e5e5e5" }}
                            thumbColor={this.state.isEnabled ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({ isEnabled: !this.state.isEnabled })}
                            value={this.state.isEnabled}
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