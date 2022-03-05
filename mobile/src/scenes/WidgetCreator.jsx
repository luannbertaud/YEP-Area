import React from 'react';
import { TabView, Tab } from 'react-native-elements';
import { Text } from 'react-native';
import WidgetName from '../components/widget/creation/WidgetName.jsx';
import WidgetAction from '../components/widget/creation/WidgetAction.jsx';
import WidgetReaction from '../components/widget/creation/WidgetReaction.jsx';

export default class WidgetCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area: {
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
        console.log('I confirm the creation of');
        console.log(this.state.area);
    }

    render() {
        return (
            <>
                <Tab value={this.state.index} onChange={(e)=>{this.setState({index: e})}} variant='default'>
                    <Tab.Item title='Name' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin'}}/>
                    <Tab.Item title='Action' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin'}}/>
                    <Tab.Item title='Reaction' titleStyle={{fontWeight: 'normal', fontFamily: 'Palanquin'}}/>
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