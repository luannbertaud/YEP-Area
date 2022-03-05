import React from 'react';
import { TouchableOpacity, Text, TextInput } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

export default class WidgetReaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            name: '',
            firstArgPlaceholder: '',
            secondArgPlaceholder: '',
            firstArg: '',
            secondArg: '',
            isEditable: true,
            errorMessage: '',
            confirmMessage: ''
        }
    }

    checkReactionAndUpdate(name, parameters) {
        switch (this.state.name) {
            case 'GmailSendEmail':
                if (this.state.firstArg == '' || this.state.secondArg == '') {
                    this.setState({errorMessage: 'Error: Arguments invalid', confirmMessage: '', firstArg: '', secondArg: ''});
                } else {
                    this.props.onConfirm(this.state.name, {receiver: this.state.firstArg, subject: this.state.secondArg});
                    this.setState({confirmMessage: 'Reactions successfully updated', firstArg: '', secondArg: '', isVisible: false, isEditable: true, errorMessage: ''});
                }
                break;
            
            case 'GithubCreateIssue':
                if (this.state.firstArg == '' || this.state.secondArg == '') {
                    this.setState({errorMessage: 'Error: Arguments invalid', confirmMessage: '', firstArg: '', secondArg: ''});
                } else {
                    this.props.onConfirm(this.state.name, {owner: this.state.firstArg, repository: this.state.secondArg});
                    this.setState({confirmMessage: 'Reactions successfully updated', firstArg: '', secondArg: '', isVisible: false, isEditable: true, errorMessage: ''});
                }
                break;
        
            case 'DiscordMessage':
                if (this.state.firstArg == '') {
                    this.setState({errorMessage: 'Error: Arguments invalid', confirmMessage: '', firstArg: ''});
                } else {
                    this.props.onConfirm(this.state.name, {chennel_id: this.state.firstArg});
                    this.setState({confirmMessage: 'Reactions successfully updated', firstArg: '', secondArg: '', isVisible: false, isEditable: true, errorMessage: ''});
                }
            default:
                this.props.onConfirm(name, {});
                this.setState({confirmMessage: 'Reaction successfully updated'});
                break;
        }
    }

    render() {
        return (
            <>
                <Text style={{color: 'black', fontSize: 25, marginBottom: '5%'}}>Choose your ARea reaction</Text>
                <TouchableOpacity style={{borderTopWidth: 1}} onPress={()=>{this.setState({isVisible: true, firstArgPlaceholder: 'Enter email receiver', secondArgPlaceholder: 'Enter email subject', name: 'GmailSendEmail'})}}>
                    <Text style={{color: 'black'}}>Gmail   -{'>'} Send email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderTopWidth: 1}} onPress={()=>{this.setState({isVisible: true, firstArgPlaceholder: 'Owner of repository', secondArgPlaceholder: 'Name of repository', name: 'GithubCreateIssue'})}}>
                    <Text style={{color: 'black'}}>Github  -{'>'} Create new issue on repository</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderTopWidth: 1}} onPress={()=>{this.setState({isVisible: true, firstArgPlaceholder: 'Channel id', secondArgPlaceholder: '', name: 'DiscordMessage', isEditable: false})}}>
                    <Text style={{color: 'black'}}>Discord -{'>'} Send message in channel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderTopWidth: 1}} onPress={()=>{this.checkReactionAndUpdate('TwitterTweet', {})}}>
                    <Text style={{color: 'black'}}>Twitter -{'>'} Post tweet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderTopWidth: 1}} onPress={()=>{this.checkReactionAndUpdate('SpotifyNext', {})}}>
                    <Text style={{color: 'black'}}>Spotify -{'>'} Skip to the next song</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{borderTopWidth: 1, borderBottomWidth: 1}} onPress={()=>{this.checkReactionAndUpdate('SpotifyPlay', {})}}>
                    <Text style={{color: 'black'}}>Spotify -{'>'} Play song</Text>
                </TouchableOpacity>
                <Button title='Create ARea' onPress={this.props.onCreate}/>
                <Overlay isVisible={this.state.isVisible} onBackdropPress={()=>this.setState({isVisible: false})}>
                    <TextInput style={{color: 'black', borderWidth: 1, marginBottom: '1%'}} placeholderTextColor='grey' placeholder={this.state.firstArgPlaceholder}/>
                    <TextInput style={{color: 'black', borderWidth: 1}} placeholderTextColor='grey' placeholder={this.state.secondArgPlaceholder} editable={this.state.isEditable}/>
                    <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
                    <Button title='Confirm' onPress={()=>{this.checkReactionAndUpdate('', {})}}/>
                    <Button title='Cancel' onPress={()=>{this.setState({isVisible: false, isEditable: true})}}/>
                </Overlay>
            </>
        )
    }
}