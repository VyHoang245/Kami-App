import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabs from './BottomTabs';
import ServiceDetailScreen from '../screens/ServiceDetailScreen'; // Your detail page
import AddServiceScreen from '../screens/AddService';
import { RootStackParamList } from '../types';
import AddCUstomerScreen from '../screens/AddCustomer';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        // <NavigationContainer>
        <Stack.Navigator>
            {/* Main app with tabs */}
            <Stack.Screen
                name="MainTabs"
                component={BottomTabs}
                options={{ headerShown: false }}
            />

            {/* Detail screen not shown in tabs */}
            <Stack.Screen
                name="ServiceDetail"
                component={ServiceDetailScreen}
                options={{ title: 'Service detail' }}
            />
            <Stack.Screen
                name="AddService"
                component={AddServiceScreen}
                options={{ title: 'Add Service' }}
            />
            <Stack.Screen
                name="AddCustomer"
                component={AddCUstomerScreen}
                options={{ title: 'Add Customer' }}
            />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}
