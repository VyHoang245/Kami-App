import React, { useContext, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://kami-backend-5rs0.onrender.com/auth', { phone, password });
            // await AsyncStorage.setItem('token', res.data.token);
            login(res.data.token);
            navigation.replace('Home');
        } catch (error) {
            Alert.alert('Login failed', 'Invalid phone or password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.input} placeholder="Phone" onChangeText={setPhone} value={phone} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
            <Button title="Login" onPress={handleLogin} color="#E91E63" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 32, textAlign: 'center', marginBottom: 20, color: '#E91E63' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 8 }
});
