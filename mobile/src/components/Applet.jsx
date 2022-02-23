import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { homepage } from '../styles/Styles.js';

export default class Applet extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const { name } = this.props.route.params

        return (
            <>
                <ScrollView>
                    <View style={homepage.headerContainer}>
                        <View style={{ flex: 3 }}>
                            <TouchableOpacity onPress={() => alert("Return to home")}>
                                <Image resizeMode="contain" style={homepage.headerImage} source={require("../assets/images/logo.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3 }}>
                            <TouchableOpacity style={homepage.profile} onPress={() => alert("Account settings")}>
                                <Text style={homepage.headerName}>{ name }</Text>
                                <Icon name="account-circle" size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </>
        )
    }
}