import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    list: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'pink',
        borderRadius: 10,
        marginTop: '3%'
    },
    backgroundIndex: {
        width: '13%',
        padding: 10,
        backgroundColor: 'blue',
        marginRight: 10,
        alignItems:'center',
        borderRadius: 10
    },
    textIndex: {
        color: 'white'
    },
    backgroundValue: {
        padding: 10,
        backgroundColor: 'blue',
        marginRight: 10,
        borderRadius: 10
    }, 
    value: {
        color: 'white'
    },
    backgroundInput: {
        padding: 7,
        backgroundColor: 'yellow',
        borderRadius: 10
    },
    textInput: {

    }
})