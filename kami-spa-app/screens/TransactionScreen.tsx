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
    const formatDateTime = (date: string) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${d.getFullYear().toString().slice(2)} ${d
                .toTimeString()
                .slice(0, 5)}`;
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
            style={styles.card}
        >
            <View style={styles.maxWidth}>
                <Text style={styles.title}>{item.id} - {item.customer.createdAt == null ? 'Null Date' : formatDateTime(item.customer.createdAt)}</Text>
                {item.services.map((service, index) => (
                    <View key={index} >
                        <Text>- {service.name}</Text>
                    </View>
                ))}
                <Text>Customer: {item.customer.name}</Text>
            </View>

            <Text style={styles.amount}>{Number(item.customer.totalSpent).toLocaleString()} ₫</Text>
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
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => navigation.navigate('AddTransaction')}
            >
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
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
    maxWidth: { maxWidth: 250, },
    container: { padding: 16 },
    card: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleHeader: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
    title: { fontWeight: 'bold' },
    amount: { marginTop: 8, color: '#e91e63', fontWeight: 'bold' },
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
