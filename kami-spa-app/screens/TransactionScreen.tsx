// screens/TransactionsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TransactionScreen({ navigation }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get('/transactions');
                setTransactions(response.data);
            } catch (err) {
                console.error('Failed to load transactions:', err);
            }
        };

        fetchTransactions();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
            style={styles.card}
        >
            <View>
                <Text style={styles.title}>{item.id} - {new Date(item.createdAt).toLocaleString()}</Text>
                {item.services.map((service, index) => (
                    <View key={index} >
                        <Text>- {service.name}</Text>
                    </View>
                ))}
                <Text>Customer: {item.customer.name}</Text>
            </View>

            <Text style={styles.amount}>{item.price.toLocaleString()} ₫</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.cover}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Transaction</Text>
            </View>
            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.container}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    cover: { flex: 1, justifyContent: 'center', textAlign: 'left', alignItems: 'flex-end' },
    header: {
        width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        backgroundColor: '#ef476f',
        padding: 16,
    },
    container: { padding: 16 },
    card: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
    },
    titleHeader: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    title: { fontWeight: 'bold' },
    amount: { marginTop: 8, color: '#e91e63', fontWeight: 'bold' },
});
