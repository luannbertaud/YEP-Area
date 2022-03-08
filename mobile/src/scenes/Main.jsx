import { View, Animated }   from 'react-native';
import LoginUser            from '../components/auth/LoginUser';
import React                from 'react';
import RegisterUser         from '../components/auth/RegisterUser';
import styles               from './Main.js';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: new Animated.Value(0),
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
            <View style={styles.view}>
                <Animated.View style={{ transform: [{ translateX: this.state.position }], flexDirection: 'row' }}>
                    <View style={styles.login}>
                        <LoginUser
                            navigation={this.props.navigation}
                            changeFade={() => { this.moveLeft(this.state.position) }}
                        />
                    </View>
                    <View style={styles.register}>
                        <RegisterUser
                            navigation={this.props.navigation}
                            changeFade={() => { this.resetMove(this.state.position) }}
                        />
                    </View>
                </Animated.View>
            </View>
        );
    }
}