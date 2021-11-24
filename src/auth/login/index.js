import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

// IMPORT LIBRARY
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORT STYLE
import Style from "./Style";

// IMPORT PICTURE
import open from '../assets/eye.png';
import close from '../assets/hidden.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            teksUsername: '',
            hide: true,
            dataRegister: null
        }

        AsyncStorage.getItem('REGISTER', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    dataRegister: true,
                    teksUsername: resultParsed.username
                });
            }
        });
    }

    MengcekData = () => {
        return AsyncStorage.getItem('REGISTER')
            .then(value => {
                let resultParsed = JSON.parse(value)
                if (this.state.username === resultParsed.username && this.state.password === resultParsed.password) {
                    // alert('Login Berhasil!')
                    return this.props.navigation.replace('Dashboard')
                } else if (this.state.username === '' && this.state.password === '') {
                    alert('Username dan Password tidak boleh kosong!')
                } else if (this.state.password === '') {
                    alert('Password tidak boleh kosong!')
                } else if (this.state.username === '') {
                    alert('Username tidak boleh kosong!')
                } else if (this.state.username !== resultParsed.username) {
                    alert('Username salah!')
                } else if (this.state.password !== resultParsed.password) {
                    alert('Password Salah!')
                } else {
                    alert('dahlah males')
                }
            })
    }

    render() {
        return (
            <View style={Style.container}>
                {this.state.dataRegister ? <Text>{`Hallo ${this.state.teksUsername}! silahkan Log In`}</Text> : null}
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

                <TouchableOpacity style={Style.tombol} onPress={this.MengcekData}>
                    <Text style={Style.tulisantombol}>LOGIN</Text>
                </TouchableOpacity>

                <View style={Style.teksregister}>
                    <Text>Belum punya akun? </Text>
                    <Text onPress={() => this.props.navigation.navigate('Register')} style={Style.register}>REGISTER</Text>
                </View>
            </View>
        )
    }
}