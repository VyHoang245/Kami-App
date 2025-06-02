import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const navigation = useNavigation<NavigationProp>();
export default function AddServiceScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const addService = async (name, price) => {
        try {
            const token = await AsyncStorage.getItem('token'); // get login token from storage

            const response = await fetch('https://kami-backend-5rs0.onrender.com/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // token must be added to headers
                },
                body: JSON.stringify({
                    name: name,
                    price: price,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Service added successfully!');
                // navigation.navigate("Home");
                console.log(data);
            } else {
                alert(`Error: ${data.message || 'Failed to add service.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong.');
        }

    };
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Service Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Add Service" onPress={() => addService(name, Number(price))} />
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
