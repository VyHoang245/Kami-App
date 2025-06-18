import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditServiceScreen({ route }) {
    // const router = useRouter();
    // const { service } = useLocalSearchParams();
    const { service } = route.params;
    // const service = JSON.parse(service as string); // parse the string

    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price.toString());

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://kami-backend-5rs0.onrender.com/services/${service._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name, price: parseFloat(price) }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Service updated successfully');
                // router.back();
            } else {
                Alert.alert('Error', 'Failed to update service');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'Something went wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Service</Text>
            <Text style={styles.label}>Service name *</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <Button title="Update" color="#E91E63" onPress={handleUpdate} />
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
