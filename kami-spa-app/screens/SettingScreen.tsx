import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function SettingScreen() {
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');

        } catch (error) {
            console.error(error);
            alert('Error Logout ');
        }
    };
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity> */}
            <Button title="Logout" onPress={handleLogout} color="#E91E63" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    button: {
        backgroundColor: '#ef476f',
        flex: 1, justifyContent: 'center', alignItems: 'center',
        width: 100
    },
    text: { color: '#fff' }
});
