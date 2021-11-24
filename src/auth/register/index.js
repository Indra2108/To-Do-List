import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

// IMPORT LIBRARY
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT STYLE
import Style from "./Style";

// IMPORT PICTURE
import open from '../assets/eye.png';
import close from '../assets/hidden.png';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            teksUsername: '',
            hide: true,
            cekData: null
        }

        AsyncStorage.getItem('REGISTER', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    cekData: true,
                    teksUsername: resultParsed.username
                });
            }
        });
    }

    setItemStorage = async (key, value) => {
        try {
            let dataStringify = JSON.stringify(value)
            await AsyncStorage.setItem(key, dataStringify);
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    getItemStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== '') {
                return value
            } else {
                console.log('read data error')
            }
        } catch (error) {
            console.log('read data error')
        }
    }

    removeItemStorage = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            // remove error
            console.log(error)
        }

        console.log('Done.')
    }

    saveStorage = () => {
        let usrnm = this.state.username;
        let psswrd = this.state.password;
        let data = {
            username: usrnm,
            password: psswrd
        }
        this.setItemStorage('REGISTER', data).then(() => {
            alert('Berhasil Login dengan nama ' + data.username + ', silahkan Log In')
        }).catch((error) => {
            alert('Gagal membuat akun')
            console.log(error)
        })
    }

    readStorage = () => {
        this.getItemStorage('REGISTER').then(result => {
            alert('value' + result)
        })
    }

    removeStorage = () => {
        this.removeItemStorage('REGISTER')
            .then(() => {
                alert('Berhasil terhapus')
            })
    }

    render() {
        return (
            <View style={Style.container}>
                {this.state.cekData ? <Text>{`Hallo! anda sudah mempunyai akun dengan nama ${this.state.teksUsername}, silahkan Log in`}</Text> : null}
                <View style={Style.inputbackground}>
                    <TextInput
                        placeholder='Username'
                        style={Style.textinput}
                        onChangeText={(username) => this.setState({ username })}
                    />
                </View>

                <View style={Style.inputbackground}>
                    <TextInput
                        placeholder='Password'
                        style={Style.textinput}
                        secureTextEntry={this.state.hide}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <TouchableOpacity onPress={() => this.state.hide ? this.setState({ hide: false }) : this.setState({ hide: true })}>
                        <Image source={this.state.hide ? open : close} style={Style.eye} />
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity onPress={this.readStorage} style={Style.tombol}>
                    <Text style={Style.tulisantombol}>BACA</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={this.saveStorage} style={Style.tombol}>
                    <Text style={Style.tulisantombol}>REGISTER</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.removeStorage} style={Style.tombol}>
                    <Text style={Style.tulisantombol}>BATAL</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => alert(`${this.state.cekData}`)} style={Style.tombol}>
                    <Text style={Style.tulisantombol}>CEK</Text>
                </TouchableOpacity> */}

                <View style={Style.tekslogin}>
                    <Text>Sudah punya akun? </Text>
                    <Text onPress={() => this.props.navigation.navigate('Login')} style={Style.login}>LOGIN</Text>
                </View>
            </View>
        )
    }
}