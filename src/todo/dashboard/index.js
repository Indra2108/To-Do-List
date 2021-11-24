import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';

// IMPORT STYLES
import styles from './styles'

// IMPORT LIBRARY
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT GAMBAR
import edit from '../assets/edit.png';
import buang from '../assets/remove.png';
import tambah from '../assets/plus.png';
import refresh from '../assets/refresh.png';
import userprofile from '../assets/user.png';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            title: '',
            note: '',
            dataToDo: [
                { title: 'Indra Damar Jati', note: 'Indra Damar Jati' },
                { title: 'Indra', note: 'Indra' },
                { title: 'Indra Damar', note: 'Indra Damar' },
                { title: 'Indra D', note: 'Indra D' }
            ]
        }
    }

    componentDidUpdate() {
        console.log('==> componentDidUpdate()')
        let datastring = JSON.stringify(this.state.dataToDo)
        AsyncStorage.setItem('todo', datastring)
            .then(value => {
                console.log('==> Saved to AsyncStorage with value: ' + datastring)
            })
            .catch(e => console.log(e))
    }

    deleteToDoConfirmation = (index) => {
        console.log('==> Prompt konfirmasi untuk menghapus Todo')
        Alert.alert(
            "Perhatian!",
            "Apa anda yakin ingin menghapus todo yang ini?",
            [
                {
                    text: "Oke",
                    onPress: () => {
                        console.log('==> Pressed OKE => Menghapus Todo')
                        this.setState({ dataToDo: this.state.dataToDo.filter((value, id) => id !== index) })    
                    }
                },
                {
                    text: 'Batal',
                    style: "cancel",
                    onPress: () => console.log('==> Pressed Cancel Action => Cancel delete todo')
                }
            ],
            {
                cancelable: true
            }
        )
    }

    DaftarList = () => {
        return this.state.dataToDo.map((value, index) => {
            return (
                <TouchableOpacity style={styles.backgroundList} onPress={() => this.props.navigation.navigate('EditToDo', { title: value.title, note: value.note, id: value.id })}>
                    <View style={styles.backgroundtitle}>
                        <Text style={styles.tekstitle}>{value.title}</Text>

                        <TouchableOpacity onPress={() => this.deleteToDoConfirmation(index)}>
                            <Image source={buang} style={styles.buanglogo} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backgroundnote}>
                        <Text style={styles.teksnote}>{value.note}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <this.DaftarList />
                </ScrollView>

                <View style={styles.backgroundInput}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Userprofiles')}>
                        <Image source={userprofile} style={styles.logo} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddToDo')}>
                        <Image source={tambah} style={styles.logo} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.mengGetTodo()}>
                        <Image source={refresh} style={styles.logo} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}