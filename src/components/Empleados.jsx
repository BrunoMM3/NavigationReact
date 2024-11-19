import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet ,ActivityIndicator} from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { getDocs } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../utils/firebase';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Agregar" component={HomeScreen} />
      <Stack.Screen name="Lista Empleados" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [edad, setEdad] = useState('');
  const [puesto, setPuesto] = useState('');

  async function addDocument() {
    try {
      const docRef = await addDoc(collection(db, "empleados"), {
        nombre: nombre,
        apellidos: apellidos,
        edad: parseInt(edad), // Convertir a número si es necesario
        puesto: puesto
      });
      console.log("Documento agregado con ID:", docRef.id);
      alert("Empleado agregado correctamente");
    } catch (e) {
      console.error("Error al agregar el documento: ", e);
      alert("Error al agregar el empleado");
    }
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title2} >Agregar Empleado</Text>
      <TextInput 
      placeholder='Nombre' 
      placeholderTextColor='#969696'
      onChangeText={setNombre} 
      style={styles.input}
      />
      <TextInput 
      placeholder='Apellidos' 
      placeholderTextColor='#969696'
      onChangeText={setApellidos}
      style={styles.input}
      />
      
      <TextInput 
      placeholder='Edad' 
      placeholderTextColor='#969696'
      onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input} 
      />
      <TextInput 
      placeholder='Puesto' 
      placeholderTextColor='#969696' 
      onChangeText={setPuesto} // Actualizar el estado
      style={styles.input}
      />
      <Button 
      onPress={addDocument} style={styles.btnText} 
      >agregar empleado</Button>
      <Button 
      onPress={() => navigation.navigate('Lista Empleados')}
      style={styles.btnText}
        >
        Lista de empleados
      </Button>
      
      
    </View>
  );
}

function ProfileScreen() {
  const [empleados, setEmpleados] = useState([]); // Estado para los datos
  const [loading, setLoading] = useState(true); // Estado de carga

  // Obtener datos de Firestore
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "empleados"));// obtener los datos de la coleccion
        const empleadosData = querySnapshot.docs.map(doc => ({ //crea un arreglo con los datos de cada documento
          id: doc.id, // ID del documento
          ...doc.data(), // Datos del documento
        }));
        setEmpleados(empleadosData); // Guardar datos en el estado
        setLoading(false); // Finalizar carga
      } catch (e) {
        console.error("Error al obtener los empleados: ", e);
      }
    };

    fetchEmpleados();
  }, []);

  // Renderizar cada fila
  const renderEmpleado = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.nombre}</Text>
      <Text style={styles.cell}>{item.apellidos}</Text>
      <Text style={styles.cell}>{item.edad}</Text>
      <Text style={styles.cell}>{item.puesto}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Empleados</Text>
      <View style={styles.table}>
        {/* Encabezados */}
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerText]}>Nombre</Text>
          <Text style={[styles.cell, styles.headerText]}>Apellidos</Text>
          <Text style={[styles.cell, styles.headerText]}>Edad</Text>
          <Text style={[styles.cell, styles.headerText]}>Puesto</Text>
        </View>
        {/* Datos */}
        <FlatList
          data={empleados}
          renderItem={renderEmpleado}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default function Empleados() {
    
  return (
    <>
        <MyStack/>
        
            
       
    </>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1d1d42',
  },
  btnText:{
    color:'#ffffff',
    fontSize:20,
    marginBottom:10,
    backgroundColor:'#4e2ecf',
    width:'100%',
    height:40,
    textAlign:'center',
    textAlignVertical:'center',
    borderRadius:20
      
  },
  title2:{
    fontSize:35,
    fontFamily:'serif',
    marginVertical:20,
    textAlign:'center',
    color: "#739AFF",
    textShadowColor: "#0044AA",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:10,
    backgroundColor:'#4e2ecf',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 8,
    
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    backgroundColor: '#f1f1f1',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
  },
});