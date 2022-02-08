import React from 'react';
import { Text, View, Animated, Button, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { homepage } from '../styles/Styles.js';

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    hasApplet = false

    renderApplets() {
        return (
            <>
                <Text style={homepage.headerName}>Yes</Text>
            </>
        )
    }

    renderNoneApplet() {
        return (
            <>
                <View style={{ marginTop: 80 }}>
                    <Text style={homepage.noAppletText}>You don't have any AREA yet</Text>
                </View>
            </>
        )
    }


    render() {
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
                                <Text style={homepage.headerName}>Jeff</Text>
                                <Icon style={homepage.headerIcon} name="person" size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={homepage.container}>
                        <TouchableOpacity onPress={() => alert("Create a new applet !")} style={homepage.button}>
                            <Text style={homepage.buttonText}>Create an AREA</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={homepage.container}>
                        {this.hasApplet === false ? this.renderNoneApplet() : this.renderApplets()}
                    </View>
                </ScrollView>
            </>
        )
    }
}