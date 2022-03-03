import React from 'react';
import { Button } from 'react-native-elements';
import WidgetInput from '../components/widget/WidgetInput.jsx';

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <WidgetInput/>
            </>
        );
    }
}