import React, {Component} from "react";
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native';

// IMPORT STYLES
import styles from "./styles";

// IMPORT GAMBAR
import edit from './assets/edit.png';
import buang from './assets/remove.png';   

export default class Mengtodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['Boku no Hero Academia', 'Mob Psycho 100', 'One Punch Man', 'Aku no Hana', 'Uzumaki', 'Berserk', 'Gantz', 'JoJo Bizzare Adventure' ],
            teksinput: '',
            checklist: false
        }
    }

    DaftarList = () => {
        return this.state.list.map((value, index) => {
            return(
                <View style={styles.list}>
                    <View style={styles.backgroundValue}>
                        <Text style={styles.value}>{value}</Text>
                    </View>
                    <View style={styles.backgroundGambar}>
                        <TouchableOpacity>
                            <Image source={edit} style={styles.editlogo} />
                        </TouchableOpacity>
                        <View>
                            <Image source={buang} style={styles.buanglogo} />    
                        </View>
                    </View>
                </View>
            )
        })
    }
 
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <this.DaftarList />
                </ScrollView>
                <View style={styles.backgroundInput}>
                    <TextInput 
                        placeholder='Tambah Todo...' 
                        style={styles.textInput}
                        onChangeText={(teksinput) => this.setState({ teksinput })}
                    />
                </View>
            </View>
        )
    }
}