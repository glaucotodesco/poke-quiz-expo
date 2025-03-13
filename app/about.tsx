import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones do Expo

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/about.png')} style={styles.logo} />
      <Text style={styles.title}>Pokemon Quiz</Text>
      <Text style={styles.subtitle}>Explorando o universo dos jogos</Text>

      <View style={styles.infoContainer}>
        <Ionicons name="game-controller" size={24} color="#FFD700" />
        <Text style={styles.infoText}>Versão: 1.0.0</Text>
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="people" size={24} color="#FFD700" />
        <Text style={styles.infoText}>Desenvolvido por: Game Dev Team</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
  },
});

export default AboutScreen;
