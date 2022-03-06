import React from 'react';
import { TabView, Tab } from 'react-native-elements';
import WidgetName from '../components/widget/creation/WidgetName.jsx';
import WidgetAction from '../components/widget/creation/WidgetAction.jsx';
import WidgetReaction from '../components/widget/creation/WidgetReaction.jsx';
import { createARea } from '../services/area';
import jwt from 'jwt-decode';
import { navigateTo } from '../services/navigation.js';

export default class WidgetCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area: {
                token: global.access_token,
                name: '',
                action: {
                    name: '',
                    parameters: {}
                },
                reaction: {
                    name: '',
                    parameters: {}
                }
            },
            index: 0,
        }
        this.updateAreaAction = this.updateAreaAction.bind(this);
        this.updateAreaReaction = this.updateAreaReaction.bind(this);
        this.updateAreaName = this.updateAreaName.bind(this);
        this.createNewARea = this.createNewARea.bind(this);
    }

    updateAreaName = (name) => {
        var areaCpy = this.state.area;
        areaCpy.name = name;
        this.setState({area: areaCpy});
    }

    updateAreaAction = (name, parameters) => {
        var areaCpy = this.state.area;
        areaCpy.action.name = name;
        areaCpy.action.parameters = parameters;
        this.setState({area: areaCpy});
        console.log(this.state.area.action);
    }

    updateAreaReaction = (name, parameters) => {
        var areaCpy = this.state.area;
        areaCpy.reaction.name = name;
        areaCpy.reaction.parameters = parameters;
        this.setState({area: areaCpy});
    }

    createNewARea = () => {
        const reaction = {
            "uuid": (Math.floor(Math.random()*9999) + 1).toString(),
            "type": this.state.area.reaction.name.toString(),
            "user_uuid": (jwt(this.state.area.token).user_uuid).toString(),
            "enabled": true,
            "family": "reaction",
            "content": this.state.area.reaction.parameters,
        }
        const action = {
            "uuid": (Math.floor(Math.random()*9999) + 1).toString(),
            "type": this.state.area.action.name.toString(),
            "user_uuid": (jwt(this.state.area.token).user_uuid).toString(),
            "enabled": true,
            "family": "action",
            "content": this.state.area.action.parameters,
            "children": {"uuids":[reaction.uuid]}
        }
        createARea(action, reaction)
        .catch((e) => {});
        navigateTo(this.props.navigation, "Homepage")
    }

    render() {
        return (
            <>
                <Tab value={this.state.index} onChange={(e)=>{this.setState({index: e})}} variant='default'>
                    <Tab.Item title='Name' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin-SemiBold', fontSize: 15}}/>
                    <Tab.Item title='Action' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin-SemiBold', fontSize: 15}}/>
                    <Tab.Item title='Reaction' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin-SemiBold', fontSize: 15}}/>
                </Tab>
                <TabView value={this.state.index} animationType='spring'>
                    <TabView.Item>
                        <WidgetName
                            onConfirm={this.updateAreaName}
                            navigation={this.props.navigation}
                        />
                    </TabView.Item>
                    <TabView.Item>
                        <WidgetAction
                            onConfirm={this.updateAreaAction}
                        />
                    </TabView.Item>
                    <TabView.Item>
                        <WidgetReaction
                            onConfirm={this.updateAreaReaction}
                            onCreate={this.createNewARea}
                        />
                    </TabView.Item>
                </TabView>
            </>
        );
    }
}