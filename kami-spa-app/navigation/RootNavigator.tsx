import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
                <Stack.Screen name="App" component={AppNavigator} />
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
}
