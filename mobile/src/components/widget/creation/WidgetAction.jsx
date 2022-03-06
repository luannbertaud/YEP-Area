import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Overlay, Button, Input } from 'react-native-elements';
import styles from './WidgetAction.js';

export default class WidgetAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            owner: '',
            repository: '',
            type: '',
            errorMessage: '',
            confirmMessage: '',
        }
    }

    checkActionAndUpdate(service, name, parameters) {
        console.log("ping");
        if (service == 'Github1') {
            if (parameters.owner == '' || parameters.repository == '') {
                this.setState({errorMessage: 'Error: Arguments not valid'});
                this.setState({owner: ''});
                this.setState({repository: ''});
            } else {
                this.props.onConfirm('GithubWebhook', parameters);
                this.setState({isVisible: false, confirmMessage: 'Action successfully updated'});
            }
        } else if (service == 'Github2') {
            if (parameters?.owner == '' || parameters?.repository == '') {
                this.setState({errorMessage: 'Error: Arguments not valid'});
                this.setState({owner: ''});
                this.setState({repository: ''});
            } else {
                this.props.onConfirm('GithubWorkflowFailed', parameters);
                this.setState({isVisible: false, confirmMessage: 'Action successfully updated'});
            }
        } else {
            console.log('pong');
            this.props.onConfirm(name, parameters);
            this.setState({confirmMessage: 'Action successfully updated'});
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', marginTop: '-30%'}}>
                <Text style={styles.title}>Choose your ARea action</Text>
                <Text style={styles.confirmMessage}>{this.state.confirmMessage}</Text>
                <TouchableOpacity onPressIn={()=>{this.checkActionAndUpdate('Epitech', 'EpitechNotifWebhook', {})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1}}>
                    <Text style={styles.text}>Epitech -{'>'} New notification on Intranet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.checkActionAndUpdate('Gmail', 'GmailWebhook', {})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Gmail   -{'>'} New email on address</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.checkActionAndUpdate('Spotify', 'SpotifyTrackChangeWebhook', {})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Spotify -{'>'} Music changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.checkActionAndUpdate('Spotify', 'SpotifyMonthArtistChangeWebhook', {})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Spotify -{'>'} Artist of the month changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.checkActionAndUpdate('Discord', 'DiscordMessageReceived', {})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Discord -{'>'} A message is post on a common server with the bot</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.setState({isVisible: true, type: 'Github1'})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Github  -{'>'} New push on repository</Text>
                </TouchableOpacity>
                <TouchableOpacity onPressIn={()=>{this.setState({isVisible: true, type: 'Github2'})}} style={{paddingLeft: '5%', paddingTop: '2%', paddingBottom: '2%', borderTopWidth: 1, borderBottomWidth: 1, marginBottom: '1%', marginTop: '1%'}}>
                    <Text style={styles.text}>Github  -{'>'} Workflow failed on repository</Text>
                </TouchableOpacity>
                <Overlay isVisible={this.state.isVisible} onBackdropPress={()=>{this.setState({isVisible: false, owner: '', repository: ''})}}>
                    <Input onChangeText={(text)=>{this.setState({owner: text})}} inputStyle={styles.inputStyle} placeholderTextColor={'black'} placeholder="Enter the repository's owner name" inputContainerStyle={styles.inputContainerStyle}/>
                    <Input onChangeText={(text)=>{this.setState({repository: text})}} inputStyle={styles.inputStyle} placeholderTextColor={'black'} placeholder="Enter the repository's name" inputContainerStyle={styles.inputContainerStyle}/>
                    <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                    <Button titleStyle={styles.buttontitle} title='Confirm' onPressIn={()=>{this.checkActionAndUpdate(this.state.type, '', {owner: this.state.owner, repository: this.state.repository})}}/>
                    <Button titleStyle={styles.buttontitle} buttonStyle={styles.button} title='Cancel' onPressIn={()=>{this.setState({isVisible: false})}}/>
                </Overlay>
            </View>
        )
    }
}