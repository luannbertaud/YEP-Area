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
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
            <Text style={{ color: 'black', flex: 3 }}>Hello There</Text>
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