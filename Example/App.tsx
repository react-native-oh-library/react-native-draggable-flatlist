// import './shims'

import React from 'react';
import "react-native-gesture-handler";
import { Platform, UIManager } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Swipeable from "./screens/Swipeable";
import Basic from "./screens/Basic";
import Nested from "./screens/Nested";
import Horizontal from "./screens/Horizontal";


if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

import { View, Text, Button } from 'react-native';

const Stack = createStackNavigator();

class Home extends React.Component {
    onPress1 = () => {
        this.props.navigation.navigate('Basic');
    }
    onPress2 = () => {
        this.props.navigation.navigate('Swipeable');
    }
    onPress3 = () => {
        this.props.navigation.navigate('Nested');
    }
    onPress4 = () => {
        this.props.navigation.navigate('Horizontal');
    }

    render() {
        return (
            <View style={{padding:14}}>
                <View style={{height:50}}>
                    <Button title="Basic"  onPress={this.onPress1}></Button>
                </View>
                <View style={{height:50,marginTop:12}}>
                    <Button title="Swipeable"  onPress={this.onPress2}></Button>
                </View>
                <View style={{height:50,marginTop:12}}>
                    <Button title="Nested"  onPress={this.onPress3}></Button>
                </View>
                <View style={{height:50,marginTop:12}}>
                    <Button title="Horizontal"  onPress={this.onPress4}></Button>
                </View>
                
            </View>
        );
    }
};

class App extends React.Component {
    render() {
        return (
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'seashell' }}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="draggleList">
                            <Stack.Screen name="draggleList" component={Home} />
                            <Stack.Screen name="Basic" component={Basic} />
                            <Stack.Screen name="Swipeable" component={Swipeable} />
                            <Stack.Screen name="Nested" component={Nested} />
                            <Stack.Screen name="Horizontal" component={Horizontal} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        );
    }
}


// export default App;

export default {
    displayName: 'react-native-draggable-flatlist',
    framework: 'React',
    category: 'UI',
    title: 'react-native-draggable-flatlist',
    documentationURL: 'react-native-draggable-flatlist',
    description: '',
    examples: [
        {
            title: 'react-native-draggable-flatlist',
            render: function (): any {
                return <App />;
            },
        },
    ],
};