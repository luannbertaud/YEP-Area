import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { navigateTo } from '../services/navigation';
import { homepage, header } from '../styles/AuthStyles.js';
import Card from './Card.jsx';
import axios from 'axios';

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Jeff',
            hasApplets: false,
            colors: ['#6AB4D9', '#279BD6', '#1354A4'],
            card: []
        }
    }

    getWidget(target, type) {
        target += type
        service_mapper = {
            "github": ["GithubWebhookAction", "GithubCreateIssueReaction", "GithubWorkflowFailedAction", "GithubNewPullRequestAction"],
            "google": ["GmailWebhookAction", "GmailSendEmailReaction"],
            "spotify": ["SpotifyNextReaction", "SpotifyPlayReaction", "SpotifyTrackChangeWebhookAction", "SpotifyMonthArtistChangeWebhookAction"],
            "twitter": ["TwitterTweetReaction"],
            "discord": ["DiscordMessageReaction", "DiscordMessageReceivedAction"],
            "desktop": ["EpitechNotifWebhookAction"],
            "at": ["CustomPostReaction"]
        }
        let obj
        for (const [key, value] of Object.entries(service_mapper)) {
            value.map((values, i) => {
                if (values === target) {
                    obj = key
                    return (null)
                }
            })
        }
        return (obj)

    }

    getReaction(data, uuids) {
        let reactions = []
        if (!uuids)
            return [];
        uuids.map((uuid) => {
            data.map((widget) => {
                if (widget["uuid"] == uuid) {
                    reactions.push(this.getWidget(widget['type'], "Reaction"))
                }
            });
        });
        return reactions;
    }

    async getApplets() {
        var access_token = global.access_token;
        let data = null;
        let result = []

        await axios.get(
            process.env.REACT_APP_SERV_URL + '/widgets/get', {
                headers: {
                  'Authorization': access_token
                }
        }).then((result) => { data = result.data.widgets })
        .catch((error) => { throw "Error while fetching widgets: " + error });
        data.map((widget, key) => {
            let action = null;

            if (widget.family === "action") {
                action = this.getWidget(widget.type, 'Action')

                result.push({
                    name: widget.title,
                    active: widget.enabled,
                    color: this.state.colors[Math.floor(Math.random() * 3)],
                    uuid: widget.uuid,
                    A: action,
                    REA: this.getReaction(data, widget['children']['uuids']),
                });
            }
        });
        this.setState({...this.state, card: result, hasApplets: true})
        return result
    }

    renderApplets() {
        if (!this.state.card || this.state.card.length <= 0)
            return this.renderNoneApplet();
        return (
            <View style={[homepage.container, { padding: 30 }]}>
                {this.state.card.map((cards, key) => {
                    return (
                        <Card navigation={this.props.navigation} username={this.state.name} key={key} name={cards.name} color={cards.color} active={cards.active} A={cards.A} REA={cards.REA} />
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

        if (this.state.hasApplets === false) {
            this.getApplets();
        }
        return (
            <>
                <ScrollView>
                    <View style={header.headerContainer}>
                        <View style={{ flex: 3 }}>
                            <TouchableOpacity onPress={(null)}>
                                <Image resizeMode="contain" style={header.headerImage} source={require("../assets/images/logo.png")}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 3 }}>
                            <TouchableOpacity style={header.profile} onPress={() => navigateTo(this.props.navigation, "Profile")}>
                                {/* <Text style={header.headerName}>{this.state.name}</Text> */}
                                <Icon name="account-circle" size={100} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={homepage.container}>
                        <TouchableOpacity onPress={() => {navigateTo(this.props.navigation, "WidgetCreator")} } style={homepage.button}>
                            <Text style={homepage.buttonText}>Create an AREA</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.hasApplets !== true ? this.renderNoneApplet() : this.renderApplets()}
                </ScrollView>
            </>
        )
    }
}