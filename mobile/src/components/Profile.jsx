import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { profile } from '../styles/AuthStyles'

export default class Profile extends Component {

  render() {
    return (
      <View>
        <View style={profile.header}>
          <Icon style={profile.avatar} name="account-circle" size={150} color='white' />
        </View>
        <View style={profile.body}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 40 }}>
            <Icon style={{ textAlign: 'left'}} name='navigate-before' size={60} color="black" onPress={() => this.props.navigation.goBack()} />
            <Text style={profile.title}>Services disponibles</Text>
          </View>
          <View style={profile.logoView}>
            <Image style={profile.logo} source={require('../assets/services/spotify.png')} />
            <Text style={profile.name}>Spotify</Text>
            <Image style={profile.logo} source={require('../assets/services/github.png')} />
            <Text style={profile.name}>Github</Text>
          </View>
          <View style={profile.logoView}>
            <Image style={profile.logo} source={require('../assets/services/discord.png')} />
            <Text style={profile.name}>Discord</Text>
            <Image style={profile.logo} source={require('../assets/services/twitter.png')} />
            <Text style={profile.name}>Twitter</Text>
          </View>
          <View style={profile.logoView}>
            <Image style={profile.logo} source={require('../assets/services/intra.png')} />
            <Text style={profile.name}>Epitech</Text>
            <Image style={profile.logo} source={require('../assets/services/google.png')} />
            <Text style={profile.name}>Google</Text>
          </View>
          <View style={profile.bodyButton}>
            <TouchableOpacity style={profile.buttonContainer}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}