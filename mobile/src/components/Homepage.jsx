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
            card: [
                { name: 'Vendredi tout est permis avec Arthur', color: '#6AB4D9', active: true, A: 'twitch', REA: ['discord'] },
                { name: 'AREA applet name Marc', color: '#279BD6', active: false, A: 'github', REA: ['twitter', 'discord',] },
                { name: 'AREA applet name Franck', color: '#1354A4', active: false, A: 'github', REA: ['google', 'twitter'] },
                { name: 'AREA applet name Guillaume', color: '#6AB4D9', active: false, A: 'twitter', REA: ['twitch'] },
                { name: 'AREA applet name David', color: '#279BD6', active: true, A: 'discord', REA: ['github'] },
                { name: 'AREA applet name Luc', color: '#1354A4', active: false, A: 'github', REA: ['twitter'] },
            ],
        }
    }

    renderApplets() {
        return (
            <View style={[homepage.container, { padding: 30 }]}>
                {this.state.card.map((cards, key) => {
                    return (

                        <Card onpress={() => alert("Card Detail")} key={key} name={cards.name} color={cards.color} active={cards.active} A={cards.A} REA={cards.REA} />

                    )
                })}
            </View>
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
                                <Icon name="account-circle" size={50} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={homepage.container}>
                        <TouchableOpacity onPress={() => this.setState({ hasApplet: !this.state.hasApplet })} style={homepage.button}>
                            <Text style={homepage.buttonText}>Create an AREA</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.hasApplet === false ? this.renderNoneApplet() : this.renderApplets()}
                </ScrollView>
            </>
        )
    }
}