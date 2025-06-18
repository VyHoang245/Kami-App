import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCustomer({ route }) {
    const { customer } = route.params;
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    // const router = useRouter();

    const handleUpdate = async () => {
        if (!name || !phone) {
            Alert.alert('Validation', 'Name and phone are required.');
            return;
        }
        // console.log(name);
        // console.log(phone);
        const token = await AsyncStorage.getItem('token');
        const res = await fetch(`https://kami-backend-5rs0.onrender.com/Customers/${customer._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, phone }),
        });

        if (res.ok) {
            Alert.alert('Success', 'Customer updated.');
        } else {
            Alert.alert('Error', 'Update failed.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer name *</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Customer name" />
            <Text style={styles.label}>Customer phone number *</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
            <Button title="Update" onPress={handleUpdate} color="#E91E63" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#E91E63' },
    label: { fontWeight: 'bold', marginTop: 10 },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
    },
});
