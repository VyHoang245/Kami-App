import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CustomerScreen({ navigation }) {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.get('https://kami-backend-5rs0.onrender.com/customers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCustomers(res.data);
            } catch (error) {
                console.log('Failed to load services', error);
            }
        };
        fetchCustomers();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('CustomerDetail', { customerId: item._id })}
        >
            <View>
                <Text style={styles.smallTitle}>Customer: {item.name}</Text>
                <Text style={styles.smallTitle}>Phone: {item.phone}</Text>
                <Text style={styles.smallTitle}>Total money: {item.totalSpent}</Text>
            </View>
            <View style={styles.cover}>
                <FontAwesome5 name="crown" size={24} color="#ef476f" />
                <Text style={styles.guest}>{item.loyalty === 'normal' ? 'Guest' : 'Member'}</Text>
            </View>

        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.cover}>
            <View style={styles.header}>
                <Text style={styles.title}>Customer</Text>
            </View>
            <View style={styles.container}>
                <FlatList data={customers} renderItem={renderItem} keyExtractor={(item) => item._id} />
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => navigation.navigate('AddCustomer')}
                >
                    <Text style={styles.floatingButtonText}>+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: {
        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: '#ef476f',
        padding: 16,
    },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    title: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    avatar: { fontSize: 24, color: '#fff' },
    item: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    smallTitle: { fontSize: 16, color: '#aaa' },
    guest: { fontSize: 16, fontWeight: 'bold', color: 'red' },

    cover: { gap: 2, alignItems: 'center' },
    floatingButton: {
        backgroundColor: '#ef476f',
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        position: 'absolute',
        bottom: 110,
        right: 10,
        zIndex: 9999,
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
    },
});
