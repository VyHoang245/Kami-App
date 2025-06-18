import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabs from './BottomTabs';
import ServiceDetailScreen from '../screens/ServiceDetailScreen'; // Your detail page
import AddServiceScreen from '../screens/AddService';
import { RootStackParamList } from '../types';
import AddCUstomerScreen from '../screens/AddCustomer';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import CustomerDetail from '../screens/CustomerDetail';
import EditCustomer from '../screens/CustomerEdit';
import EditServiceScreen from '../screens/EditService';
import AddTransactionScreen from '../screens/AddTransaction';

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
            <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
                options={{ title: 'Add Transaction' }}
            />
            <Stack.Screen
                name="TransactionDetail"
                component={TransactionDetailScreen}
                options={{ title: 'Transction Detail' }}
            />
            <Stack.Screen
                name="CustomerDetail"
                component={CustomerDetail}
                options={{ title: 'Customer Detail' }}
            />
            <Stack.Screen
                name="CustomerEdit"
                component={EditCustomer}
                options={{ title: 'Customer Edit' }}
            />
            <Stack.Screen
                name="EditService"
                component={EditServiceScreen}
                options={{ title: 'Service Edit' }}
            />
        </Stack.Navigator>
        // </NavigationContainer>
    );
}
