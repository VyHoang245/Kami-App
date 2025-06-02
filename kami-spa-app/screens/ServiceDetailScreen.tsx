import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { RootStackParamList } from '../types';

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const navigation = useNavigation<NavigationProp>();
export default function ServiceDetailScreen({ route }) {

    const { service } = route.params;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.toTimeString().slice(0, 8)}`;
    };

    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch(`https://kami-backend-5rs0.onrender.com/services/${service._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Service deleted successfully');
                // navigation.navigate("Home"); // go back to Home
            } else {
                alert('Failed to delete service');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting service');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Service detail</Text>
            <Text><Text style={styles.label}>Service name:</Text> {service.name}</Text>
            <Text><Text style={styles.label}>Price:</Text> {service.price.toLocaleString()} đ</Text>
            <Text><Text style={styles.label}>Creator:</Text> {service.createdBy === "640b291238c00f3b15f68375" ? "Hung" : service.createdBy}</Text>
            <Text><Text style={styles.label}>Time:</Text> {formatDate(service.createdAt)}</Text>
            <Text><Text style={styles.label}>Final update:</Text> {formatDate(service.updatedAt)}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <Button
                    title="Edit"
                    onPress={() => navigation.navigate('EditService', { service })}
                    color="#f57c00"
                />
                <Button
                    title="Delete"
                    onPress={handleDelete}
                    color="#d32f2f"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#E91E63' },
    label: { fontWeight: 'bold' }
});
