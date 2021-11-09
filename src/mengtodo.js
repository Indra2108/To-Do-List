import React, {Component} from "react";
import {View, Text, ScrollView, TextInput} from 'react-native';

// IMPORT STYLES
import styles from "./styles";

export default class Mengtodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['Boku no Hero Academia', 'Mob Psycho 100', 'One Punch Man', 'Aku no Hana', 'Uzumaki', 'Berserk', 'Gantz', 'JoJo Bizzare Adventure' ]
        }
    }

    DaftarList = () => {
        return this.state.list.map((value, index) => {
            return(
                <View style={styles.list}>
                    <View style={styles.backgroundIndex}>
                        <Text style={styles.textIndex}>{index + 1}</Text>
                    </View>
                    <View style={styles.backgroundValue}>
                            <Text style={styles.value}>{value}</Text>
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
                    <TextInput placeholder='Tambah Todo...' style={styles.textInput}/>
                </View>
            </View>
        )
    }
}