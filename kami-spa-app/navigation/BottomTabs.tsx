import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import TransactionScreen from '../screens/TransactionScreen';
import CustomerScreen from '../screens/CustomerScreen';
import SettingScreen from '../screens/SettingScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Transaction') {
                        return <FontAwesome5 name="money-bill-alt" size={size} color={color} />;
                    } else if (route.name === 'Customer') {
                        return <Ionicons name="people" size={size} color={color} />;
                    } else if (route.name === 'Setting') {
                        return <Ionicons name="settings" size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: '#f25287',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: { fontSize: 12 },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Transaction" component={TransactionScreen} />
            <Tab.Screen name="Customer" component={CustomerScreen} />
            <Tab.Screen name="Setting" component={SettingScreen} />
        </Tab.Navigator>
    );
}
