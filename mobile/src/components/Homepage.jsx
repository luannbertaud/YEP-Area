import React from 'react';
import { Text, View, ScrollView, Image, Switch, TouchableOpacity } from 'react-native';
import { Icon, ThemeConsumer } from 'react-native-elements';
import { homepage } from '../styles/Styles.js';
import Card from './Card.jsx';

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Jeff',
            hasApplet: true,
            cards: [
                { name: 'AREA applet name 1', color: '#6AB4D9', A: 'twitch', REA: ['discord'] },
                { name: 'AREA applet name 2', color: '#279BD6', A: 'github', REA: ['twitter', 'discord'] },
                { name: 'AREA applet name 3', color: '#1354A4', A: 'github', REA: ['google'] },
            ],
        }
    }

    renderApplets() {
        return (
            <>
                <View style={[homepage.container, { padding: 30 }]}>
                    {this.state.cards.map((cardid, key) => {
                        return (
                            <Card key={key} name={cardid.name} color={cardid.color} A={cardid.A} REA={cardid.REA}/>
                        )
                    })}
                </View>
            </>
        )
    }

    renderNoneApplet() {
        return (
            <>
                <View style={[homepage.container, { marginTop: 80 }]}>
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
                                <Text style={homepage.headerName}>{this.state.name}</Text>
                                <Icon style={homepage.headerIcon} name="face" size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={homepage.container}>
                        <TouchableOpacity onPress={() => alert("Create a new applet !")} style={homepage.button}>
                            <Text style={homepage.buttonText}>Create an AREA</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.hasApplet === false ? this.renderNoneApplet() : this.renderApplets()}
                </ScrollView>
            </>
        )
    }
}