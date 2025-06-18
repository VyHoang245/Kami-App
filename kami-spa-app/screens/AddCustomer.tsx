import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function AddCUstomerScreen() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const addService = async (name, phone) => {
        try {
            const token = await AsyncStorage.getItem('token'); // get login token from storage

            const response = await fetch('https://kami-backend-5rs0.onrender.com/customers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // token must be added to headers
                },
                body: JSON.stringify({
                    name: name,
                    phone: phone,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Customer added successfully!');
                // navigation.navigate("Home");
                console.log(data);
            } else {
                alert(`Error: ${data.message || 'Failed to add customer.'}`);
            }
        } catch (error) {
            console.error('Error to add customer:', error);
            alert('Something went wrong.');
        }

    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Input Customer Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Input Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add Service" onPress={() => addService(name, phone)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
    },
});
