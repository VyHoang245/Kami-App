// screens/TransactionDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import api from '../api';
import { useLocalSearchParams } from 'expo-router';

export default function TransactionDetailScreen({ route }) {

    const { transaction } = route.params;

    if (!transaction) return <Text>Loading...</Text>;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Transaction Code: {transaction.id}</Text>
                <Text>Customer: {transaction.customer.name}</Text>
                <Text>Created: {new Date(transaction.createdAt).toLocaleString()}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.subheader}>Services List</Text>
                {transaction.services.map((service, index) => (
                    <View key={index} style={styles.service}>
                        <Text>{service.name}</Text>
                        <Text>x{service.quantity}</Text>
                        <Text>{(service.price).toLocaleString()} ₫</Text>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.subheader}>Cost</Text>
                <Text>Amount: {transaction.priceBeforePromotion.toLocaleString()} ₫</Text>
                <Text>Discount: {(transaction.priceBeforePromotion - transaction.price).toLocaleString()} ₫</Text>
                <Text style={styles.total}>Total Payment: {transaction.price.toLocaleString()} ₫</Text>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    card: {
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    header: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#e91e63' },
    subheader: { fontSize: 16, fontWeight: 'bold', color: '#e91e63' },
    service: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    total: { marginTop: 10, fontWeight: 'bold', color: '#e91e63' },
});
