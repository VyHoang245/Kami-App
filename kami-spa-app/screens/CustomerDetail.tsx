import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export default function CustomerDetail({ route }) {
    const navigation = useRouter();
    const { customerId } = route.params;
    const [customer, setCustomer] = useState();
    // console.log(customer);
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get(`/Customers/${customerId}`);
                setCustomer(response.data);
                console.log(customer);
            } catch (err) {
                console.error('Failed to load customer:', err);
            }
        };

        fetchTransactions();
    }, []);

    const handleDelete = () => {
        Alert.alert('Alert', 'Are you sure you want to remove this client?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    const token = await AsyncStorage.getItem('token');
                    await fetch(`https://kami-backend-5rs0.onrender.com/Customers/${customer.id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    navigation.back();
                },
            },
        ]);
    };

    if (!customer) return <Text>Loading...</Text>;

    return (
        <View>
            <View style={styles.card}>
                <Text style={{ fontWeight: 'bold', color: '#e91e63' }}>General information</Text>
                <Text><Text style={styles.title}>Name:</Text> {customer.name}</Text>
                <Text><Text style={styles.title}>Phone: </Text>{customer.phone}</Text>
                <Text><Text style={styles.title}>Total spend:</Text> {customer.totalSpent.toLocaleString()} ₫</Text>
            </View>

            <View style={styles.card}>
                <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Transaction history</Text>
                <FlatList
                    data={customer.transactions}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.smallItem}>
                            <Text style={styles.title}>{item.id} - {new Date(item.createdAt).toLocaleString()}</Text>
                            {item.services.map((s) => (
                                <Text key={s._id}>- {s.name} {s.price.toLocaleString()} ₫</Text>
                            ))}
                        </View>
                    )}
                />
            </View>


            <TouchableOpacity onPress={() => navigation.push(
                {
                    pathname: '/CustomerEdit',
                    params: customer
                }
            )}>
                <Text style={{ color: 'blue', marginTop: 20 }}>✏️ Edit</Text>
            </TouchableOpacity>

            <Pressable onPress={handleDelete}>
                <Text style={{ color: 'red', marginTop: 10 }}>🗑 Delete</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({

    card: {
        padding: 16,
        margin: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    smallItem: {
        marginTop: 12,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    title: { fontWeight: 'bold' },
});