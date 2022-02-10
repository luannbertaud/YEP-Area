import React from 'react';
import { Text, View, Switch } from 'react-native';
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
            <>
                <View style={[homepage.card, { backgroundColor: this.props.color }, homepage.shadowProp]}>
                    <View style={{ marginTop: -30 }}>
                        <Text style={homepage.cardHeading}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Switch
                            style={homepage.slider}
                            trackColor={{ false: "#767577", true: "#9EC336" }}
                            thumbColor={this.state.isEnabled ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => this.setState({ isEnabled: !this.state.isEnabled })}
                            value={this.state.isEnabled}
                        />
                    </View>
                </View>
            </>
        )
    }
}