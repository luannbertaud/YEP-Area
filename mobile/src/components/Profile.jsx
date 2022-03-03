import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { profile } from '../styles/AuthStyles'

export default class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      service: [
        {name: 'Discord', logo: 'discord', connected: 'false', color: '#4763ED'},
        {name: 'Github', logo: 'github', connected: 'false', color: '#1A1D21'},
        {name: 'Spotify', logo: 'spotify', connected: 'false', color: '#62CD5C'},
        {name: 'Twitter', logo: 'twitter', connected: 'false', color: '#1d9bf0'},
        {name: 'Epitech', logo: 'desktop', connected: 'false', color: '#015BA1'},
        {name: 'Google', logo: 'google', connected: 'false', color: '#EA4335'},
      ],
    }
  }

  render() {
    return (
      <View>
        <View style={profile.header}>
          <Icon style={profile.avatar} name="account-circle" size={150} color='white' />
        </View>
        <View style={profile.body}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: -20 }}>
            <Icon style={{ textAlign: 'left' }} name='navigate-before' size={60} color="black" onPress={() => this.props.navigation.goBack()} />
            <Text style={profile.title}>Services disponibles</Text>
          </View>
          <View style={profile.serviceView}>
            <Button
              title="Discord"
              icon={{
                type: 'fontisto',
                name: 'discord',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#4763ED',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('discord')}
            />
            <Button
              title="Github"
              icon={{
                type: 'fontisto',
                name: 'github',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#1A1D21',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('github')}
            />
          </View>
          <View style={profile.serviceView}>
            <Button
              title="Spotify"
              icon={{
                type: 'fontisto',
                name: 'spotify',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#62CD5C',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('spotify')}
            />

            <Button
              title="Twitter"
              icon={{
                type: 'fontisto',
                name: 'twitter',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#1d9bf0',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('twitter')}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title="Epitech"
              icon={{
                type: 'fontisto',
                name: 'desktop',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#015BA1',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('epitech')}
            />
            <Button
              title="Google"
              icon={{
                type: 'fontisto',
                name: 'google',
                size: 40,
                color: 'white',
                marginBottom: 5,
                marginTop: 5,
              }}
              iconPosition='top'
              titleStyle={{ fontWeight: '600' }}
              buttonStyle={{
                backgroundColor: '#EA4335',
                borderRadius: 5,
              }}
              containerStyle={{
                width: 150,
                marginHorizontal: 15,
              }}
              onPress={() => alert('google')}
            />
          </View>
          <View style={profile.bodyButton}>
            <TouchableOpacity style={profile.buttonContainer} onPress={() => alert('logout')}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}