import React from 'react';
import { Text, View, Animated, Button } from 'react-native';
import LoginUser from '../components/auth/LoginUser';
import RegisterUser from '../components/auth/RegisterUser';
import Homepage from '../components/Homepage';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginPos: new Animated.Value(0),
        }
    }

    moveLeft = (pos) => {
        Animated.timing(pos, {
            toValue: -400,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    resetMove = (pos) => {
        Animated.timing(pos, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    render() {
        return (
            /* <>
                <View style={{backgroundColor: '#e5e5e5', height: '100%'}}>
                    <Homepage navigation={this.props.navigation}/>
                </View>
            </> */
            <View style={{ backgroundColor: '#e5e5e5', height: '100%' }}>
                <Animated.View style={{ transform: [{ translateX: this.state.loginPos }], flexDirection: 'row' }}>
                    <View style={{ width: '100%' }}>
                        <LoginUser
                            navigation={this.props.navigation}
                            changeFade={() => { this.moveLeft(this.state.loginPos) }}
                        />
                    </View>
                    <View style={{ width: '100%', marginLeft: '4%' }}>
                        <RegisterUser
                            navigation={this.props.navigation}
                            changeFade={() => { this.resetMove(this.state.loginPos) }}
                        />
                    </View>
                </Animated.View>
            </View>
        );
    }
}

/* <View style={{backgroundColor: '#1454A4', height: '100%'}}>
                <Animated.View style={{transform: [{translateX: this.state.loginPos}], flexDirection: 'row'}}>
                    <View style={{width: '100%'}}>
                        <Homepage/>
                        <LoginUser 
                            changeFade={()=>{this.moveLeft(this.state.loginPos)}}
                        />
                    </View>
                    <View style={{width: '100%', marginLeft: '4%'}}>
                        <RegisterUser
                            changeFade={()=> {this.resetMove(this.state.loginPos)}}
                        />
                    </View>
                </Animated.View>
            </View> */


{/* <Animated.View style={[{ opacity: this.state.registerFade, position: 'absolute', width: '100%' }]}>
    <LoginUser
        changeFade={() => {
            this.fadeOut(this.state.registerFade);
            this.fadeIn(this.state.loginFade);
        }}
    />
</Animated.View> */}




fadeIn = (fade) => {
    Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
    }).start();
};

fadeOut = (fade) => {
    Animated.timing(fade, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
    }).start();
}

