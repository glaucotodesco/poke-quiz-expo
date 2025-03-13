import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';


interface Pokemon {
  name: string;
  image: string;
}


const Index = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      // Escolhe um ID aleatório entre 1 e 151 (Geração 1)
      const randomId = Math.floor(Math.random() * 151) + 1;
      let id = randomId.toString().padStart(3,"0")

      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const fullImage = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
                         
      const correctName = response.data.name;

      // Gera 3 nomes errados aleatórios
      const wrongOptions = await fetchWrongOptions(correctName);

      // Mistura as opções
      const choices = shuffleArray([correctName, ...wrongOptions]);

      setPokemon({ name: correctName, image: fullImage});

      

      setOptions(choices);
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
    }
    setLoading(false);
  };

  const fetchWrongOptions = async (correctName:string) => {
    let wrongNames = new Set();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }
    return Array.from(wrongNames);
  };

  const shuffleArray = (array:any) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selected: any) => {
    
    if (selected === pokemon?.name) {
      Alert.alert('🎉 Correto!', 'Você acertou!', [{ text: 'Próximo', onPress: fetchPokemon }]);
    } else {
      Alert.alert('❌ Errado!', `O nome correto era ${pokemon?.name}`, [{ text: 'Tentar novamente' }]);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ffcc00" />
      ) : (
        <>
          <Image source={{ uri: pokemon?.image }} style={styles.pokemonImage} />
          <Text style={styles.questionText}>Qual é esse Pokémon?</Text>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleAnswer(option)}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}

          <Link href="/about" style={styles.about}>
              Sobre
          </Link>

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  about: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40
  },
  button: {
    backgroundColor: '#ffcc00',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;
