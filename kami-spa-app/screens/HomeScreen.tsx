import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.get('https://kami-backend-5rs0.onrender.com/services', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setServices(res.data);
            } catch (error) {
                console.log('Failed to load services', error);
            }
        };
        fetchServices();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>HUYỀN TRINH</Text>
                <TouchableOpacity>
                    <Text style={styles.avatar}>👤</Text>
                </TouchableOpacity>
            </View>

            {/* Logo */}
            {/* <Image src="../assets/kami_logo.png" style={styles.logo} /> */}
            <View style={styles.TitleAndButton}>
                <Text style={styles.sectionTitle}>Danh sách dịch vụ</Text>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => navigation.navigate('AddService')}
                >
                    <Text style={styles.floatingButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList data={services} renderItem={renderItem} keyExtractor={(item) => item._id} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ef476f',
        padding: 16,
        borderRadius: 10,
    },
    TitleAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        justifyContent: 'space-between'
    },
    name: { fontSize: 16 },
    price: { fontSize: 16, fontWeight: 'bold' },
    floatingButton: {
        backgroundColor: '#ef476f',
        borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    floatingButtonText: {
        color: '#fff',
        fontSize: 28,
        lineHeight: 30,
    },
});
