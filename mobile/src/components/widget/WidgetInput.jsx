import React from 'react';
import { Overlay, Button, CheckBox } from 'react-native-elements';
import { Text, View, ScrollView } from 'react-native';

export default class WidgetInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            overlay: 0,
            actionState: [false, false],
            reactionState: [false, false, false, false],
        }
    }

    update_value = (index) => {
        var updatedState = [false, false];
        updatedState[index] = true;
        this.setState({actionState: updatedState});
    }

    update_reaction_value = (index) => {
        var updatedState = [false, false, false, false];
        updatedState[index] = true;
        this.setState({reactionState: updatedState});
    }

    render() {
        return (
            <>
                <Button title='Create Widget' onPress={()=>this.setState({isVisible: true, fakeUpdate: false})}/>
                <Overlay isVisible={this.state.isVisible} onBackdropPress={()=>this.setState({isVisible: false})} overlayStyle={{height: '50%', width: '85%'}}>
                        <View style={{top: this.state.overlay}}>
                            <Text style={{fontWeight: 'normal', fontFamily: 'Palanquin-Light', color: 'black', fontSize: 30, alignSelf: 'center'}}>Choose your Action</Text>
                            <ScrollView style={{height: '60%'}}>
                                <View>
                                    <CheckBox title='Github -> New push on repository' checked={this.state.actionState[0]} onPress={()=>this.update_value(0)}/>
                                    <CheckBox title='Gmail  -> New mail on address' checked={this.state.actionState[1]} onPress={()=>this.update_value(1)}/>
                                </View>
                            </ScrollView>
                            <Button title='Next' onPress={()=>this.setState({overlay: this.state.overlay - 1000})}/>
                            <Button title='Cancel' buttonStyle={{marginTop: '1%'}} onPress={()=>{this.setState({isVisible: false})}}/>
                        </View>
                        <View style={{top: this.state.overlay + 669}}>
                            <Text style={{fontWeight: 'normal', fontFamily: 'Palanquin-Light', color: 'black', fontSize: 30, alignSelf: 'center', top: -7}}>Choose your Reaction</Text>
                            <ScrollView style={{height: '60%'}}>
                                <View>
                                    <CheckBox title='Gmail   -> Send mail' checked={this.state.reactionState[0]} onPress={()=>this.update_reaction_value(0)}/>
                                    <CheckBox title='Spotify -> Skip to next song' checked={this.state.reactionState[1]} onPress={()=>this.update_reaction_value(1)}/>
                                    <CheckBox title='Twitter -> Post tweet' checked={this.state.reactionState[2]} onPress={()=>this.update_reaction_value(2)}/>
                                    <CheckBox title='Discord -> Post message on channel' checked={this.state.reactionState[3]} onPress={()=>this.update_reaction_value(3)}/>
                                </View>
                            </ScrollView>
                            <Button title='Previous' onPress={()=>this.setState({overlay: this.state.overlay + 1000})}/>
                            <Button title='Confirm' buttonStyle={{marginTop: '1%'}} onPress={()=>{this.setState({isVisible: false})}}/>
                        </View>
                </Overlay>
            </>
        );
    }
}

/*
                    <View style={{position='absolute'}}>
                        <Button onPress={()=>alert('First button')}/>
                    </View>
                    <View style={{position='absolute'}}>
                        <Button onPress={()=>alert('First button')}/>
                    </View>
*/

/*
<Tab value={0} variant='primary' style={{width: '50%', height: '50%'}}>
                        <Tab.Item/>
                    </Tab>
                    <TabView value={0}>
                        <TabView.Item style={{width: '50%', height: '50%'}}>
                            <Text style={{color: 'black'}}>Hello world !</Text>
                        </TabView.Item>
                    </TabView>
*/