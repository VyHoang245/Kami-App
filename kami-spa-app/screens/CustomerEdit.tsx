import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCustomer() {
    const params = useLocalSearchParams();
    const [name, setName] = useState(params.name);
    const [phone, setPhone] = useState(params.phone);
    const router = useRouter();

    const handleUpdate = async () => {
        if (!name || !phone) {
            Alert.alert('Validation', 'Name and phone are required.');
            return;
        }

        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`https://kami-backend-5rs0.onrender.com/Customers/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, phone }),
        });

        if (res.ok) {
            Alert.alert('Success', 'Customer updated.');
            router.back();
        } else {
            Alert.alert('Error', 'Update failed.');
        }
    };

    return (
        <View style={{ padding: 16 }}>
            <TextInput value={name} onChangeText={setName} placeholder="Customer name" style={{ borderBottomWidth: 1 }} />
            <TextInput value={phone} onChangeText={setPhone} placeholder="Phone" style={{ borderBottomWidth: 1, marginTop: 12 }} />
            <Button title="Update" onPress={handleUpdate} />
        </View>
    );
}
