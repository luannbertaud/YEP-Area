import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { navigateWithParameters, navigateTo } from '../services/navigation';
import { profile } from '../styles/AuthStyles'

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      service: [
        { name: 'Discord', logo: 'discord', route: 'discord', connected: 'false', color: '#4763ED' },
        { name: 'Github', logo: 'github', route: 'github', connected: 'false', color: '#1A1D21' },
        { name: 'Spotify', logo: 'spotify', route: 'spotify', connected: 'false', color: '#62CD5C' },
        { name: 'Twitter', logo: 'twitter', route: 'twitter', connected: 'false', color: '#1d9bf0' },
        { name: 'Epitech', logo: 'desktop', route: 'epitech', connected: 'false', color: '#015BA1' },
        { name: 'Google', logo: 'google', route: 'google', connected: 'false', color: '#EA4335' },
      ],
    }
    this.onPressDetails = this.onPressDetails.bind(this)
  }

  onPressDetails(name, logo, color, connected, route) {
    navigateWithParameters(this.props.navigation, 'Service', {
      name: name,
      logo: logo,
      color: color,
      connected: connected,
      route: route,
    });
  }

  render() {
    return (
      <View>
        <View style={profile.header}>
          <Icon style={profile.avatar} name="account-circle" size={150} color='white' />
        </View>
        <View style={profile.body}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20 }}>
            <Icon style={{ textAlign: 'left' }} name='navigate-before' size={60} color="black" onPress={() => this.props.navigation.goBack()} />
            <Text style={profile.title}>Services disponibles</Text>
          </View>
          <View style={profile.serviceView}>
            {this.state.service.map((services, key) => {
              return (
                <Button
                  key={key}
                  title={services.name}
                  icon={{
                    type: 'fontisto',
                    name: services.logo,
                    size: 40,
                    color: 'white',
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                  iconPosition='top'
                  titleStyle={{ fontWeight: '600' }}
                  buttonStyle={{
                    backgroundColor: services.color,
                    borderRadius: 5,
                  }}
                  containerStyle={{
                    width: 150,
                    marginHorizontal: 15,
                    marginVertical: 15,
                    alignSelf: 'center'
                  }}
                  onPress={() => this.onPressDetails(services.name, services.logo, services.color, services.connected, services.route)}
                />
              )
            })}
          </View>
          <View style={profile.bodyButton}>
            <TouchableOpacity style={profile.buttonContainer} onPress={() => [navigateTo(this.props.navigation, "LoginUser"), global.access_token = ""]}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}