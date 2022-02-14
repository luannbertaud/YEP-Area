import React from 'react';
import { Text, View, Switch } from 'react-native';
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
            <>
                <View style={[homepage.card, { backgroundColor: this.props.color }, homepage.shadowProp]}>
                    <View style={{ marginTop: -30 }}>
                        <Text style={homepage.cardHeading}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                        <View style={homepage.footerCard}>
                            <Switch
                                style={homepage.slider}
                                trackColor={{ false: "#767577", true: "#9EC336" }}
                                thumbColor={this.state.isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.setState({ isEnabled: !this.state.isEnabled })}
                                value={this.state.isEnabled}
                            />
                            <View style={{alignItems: 'flex-end'}}>
                                <View style={{ flexDirection: "row", backgroundColor: "" }}>
                                    <Icon type="fontisto" name={this.props.A} size={35} color="white" />
                                    <Icon name='arrow-right' size={35} color="white" />
                                    {this.props.REA.map((REAs, key) => {
                                        return (
                                            <Icon style={{marginRight: 15}} key={key} type="fontisto" name={REAs} size={35} color="white" />
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </>
        )
    }
}