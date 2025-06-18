import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

// const servicesData = [
//     { id: 1, name: 'Lột mụn đầu đen', price: 40000 },
//     { id: 2, name: 'Gội đầu', price: 20000 },
//     { id: 3, name: 'Dịch vụ đánh răng', price: 30000 },
//     { id: 4, name: 'demo3', price: 50000 },
//     { id: 5, name: 'Trị mụn', price: 45000 },
//     { id: 6, name: 'tắm trắng', price: 60000 },
// ];

const executors = [{ id: 1, name: 'Executor A' }];

const AddTransactionScreen = () => {
    const [selectedCustomer, setSelectedCustomer] = useState({});
    const [selectedServices, setSelectedServices] = useState<{ [key: string]: { quantity: number; executor: string } }>({});

    const [servicesData, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);

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
        const fetchCustomers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await axios.get('https://kami-backend-5rs0.onrender.com/customers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCustomers(res.data); console.log(res.data);
            } catch (error) {
                console.log('Failed to load services', error);
            }
        };
        fetchCustomers();
    }, []);
    const toggleService = (serviceId: string) => {
        console.log(selectedCustomer);
        setSelectedServices(prev => {
            const updated = { ...prev };
            if (updated[serviceId]) {
                delete updated[serviceId]; // ✅ properly remove the key
            } else {
                updated[serviceId] = { quantity: 1, executor: '' };
            }
            return updated;
        });
    };


    const updateQuantity = (serviceId: string, delta: number) => {
        setSelectedServices(prev => {
            const current = prev[serviceId];
            if (!current) return prev;
            const newQuantity = Math.max(1, current.quantity + delta);
            return {
                ...prev,
                [serviceId]: { ...current, quantity: newQuantity },
            };
        });
    };

    const updateExecutor = (serviceId: string, executor: string) => {
        setSelectedServices(prev => ({
            ...prev,
            [serviceId]: { ...prev[serviceId], executor },
        }));
    };

    const calculateTotal = () => {
        return Object.entries(selectedServices).reduce((sum, [id, config]) => {
            const service = servicesData.find(s => s._id === id);
            return service ? sum + service.price * config.quantity : sum;
        }, 0);
    };
    const handleAddTransaction = async () => {
        if (!selectedCustomer?._id) {
            alert('Please select a customer');
            return;
        }

        const servicesPayload = Object.entries(selectedServices).map(([serviceId, config]) => ({
            _id: serviceId,
            quantity: config.quantity,
            userID: config.executor,
        }));

        if (servicesPayload.length === 0) {
            alert('Please select at least one service');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const payload = {
                customerId: selectedCustomer._id,
                services: servicesPayload,
            };

            const response = await axios.post(
                'https://kami-backend-5rs0.onrender.com/transactions',
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert('Transaction added successfully!');
            console.log('Transaction response:', response.data);

            // Optionally, reset state here
            setSelectedServices({});
            setSelectedCustomer({});
        } catch (error) {
            console.error('Failed to add transaction:', error.response?.data || error.message);
            alert('Failed to add transaction');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Add transaction</Text>

                    <Text style={styles.label}>Customer *</Text>
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={selectedCustomer}
                            onValueChange={setSelectedCustomer}
                        >
                            <Picker.Item label="Select customer" value="" />
                            {customers.map(customer => (
                                <Picker.Item label={customer.name} value={customer} key={customer._id} />
                            ))}

                        </Picker>
                    </View>

                    {servicesData.map(service => {
                        const selected = selectedServices[service._id];
                        return (

                            <View key={service._id} style={styles.serviceItem}>
                                <TouchableOpacity
                                    onPress={() => toggleService(service._id)}
                                    style={styles.checkboxRow}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            selected && { backgroundColor: '#FFB085' },
                                        ]}
                                    />
                                    <Text style={styles.serviceName}>{service.name}</Text>
                                </TouchableOpacity>

                                {selected && (
                                    <View style={styles.detailsRow}>
                                        <View style={styles.quantityControl}>
                                            <TouchableOpacity onPress={() => updateQuantity(service._id, -1)}>
                                                <Text style={styles.quantityBtn}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{selected.quantity}</Text>
                                            <TouchableOpacity onPress={() => updateQuantity(service._id, 1)}>
                                                <Text style={styles.quantityBtn}>+</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.executorPicker}>
                                            <Picker
                                                selectedValue={selected.executor}
                                                onValueChange={val => updateExecutor(service._id, val)}
                                                style={{ height: 40, width: 240 }}
                                            >
                                                <Picker.Item label="Executor" value="" />
                                                {executors.map((exec, idx) => (
                                                    <Picker.Item key={exec.id} label={exec.name} value={exec.name} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </View>
                                )}

                                {selected && (
                                    <Text style={styles.price}>
                                        Price: {(service.price * selected.quantity).toLocaleString()} đ
                                    </Text>
                                )}
                            </View>

                        );
                    })}

                    <TouchableOpacity style={styles.summaryBtn} onPress={handleAddTransaction}>
                        <Text style={styles.summaryText}>
                            See summary: ({calculateTotal().toLocaleString()} đ)
                        </Text>
                    </TouchableOpacity>
                </View >
            </ScrollView>
        </SafeAreaView>

    );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 20,
    },
    innerContainer: {
        padding: 16,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#E91E63',
    },
    label: {
        fontWeight: '600',
        marginTop: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginVertical: 8,
    },
    serviceItem: {
        // flex: 1,
        marginVertical: 10,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 10,
    },
    serviceName: {
        fontSize: 16,
    },
    detailsRow: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    quantityBtn: {
        fontSize: 20,
        paddingHorizontal: 8,
        color: '#E91E63',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginLeft: 8,
        marginRight: 8
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 4,
    },
    executorPicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    price: {
        color: '#E91E63',
        marginTop: 4,
        fontWeight: 'bold',
    },
    summaryBtn: {
        marginTop: 20,
        backgroundColor: '#E91E63',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    summaryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
