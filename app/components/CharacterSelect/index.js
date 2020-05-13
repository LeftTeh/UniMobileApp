import React, {Component} from 'react'
import {View,Text,Image,Button,ImageBackground,Alert,TouchableOpacity} from 'react-native'
import styles from "./styles"
import { Provider as PaperProvider } from 'react-native-paper';
var RNFS = require('react-native-fs');


class CharacterSelect extends Component{
    
    static navigationOptions = {
        header: null
    }

    constructor() {
        super()
        this.state = {
            displayView:null
        }
    }

    readInChar(){
        RNFS.readFile(RNFS.DocumentDirectoryPath+'/character.json','utf8')
        .then((contents) => {
            var jsonObj = JSON.parse(contents)
            this.setState({
                displayView:<View style={styles.viewCharacter}><Text style={styles.textChar}>Select your image to view your profile</Text><TouchableOpacity  onPress = {() => this.props.navigation.navigate("charScreen")} onLongPress={() => this.deleteQuestion()}><Image source={{uri: jsonObj.filePath}} style={styles.profileImage}></Image></TouchableOpacity></View>
            })
        })
        .catch((err => {
            console.log(err.message)
        }))
    }

    deleteQuestion() {
        Alert.alert('Delete Character?',
              'Are you sure you would like to delete this character?',
              [
                  {text: 'No'},
                  {text: 'Yes', onPress:()=>this.doDelChar()}
              ])
    }

    async doDelChar() {
        await RNFS.unlink(RNFS.DocumentDirectoryPath+'/character.json')
        .then()
        .catch()


        await RNFS.exists(RNFS.DocumentDirectoryPath+'/completedTasks.json')
        .then((exists) => {
            if (exists){
                RNFS.unlink(RNFS.DocumentDirectoryPath+'/completedTasks.json')
                .then()
                .catch()
            } 
        })
        .catch((err => {
            console.warn(err.message)
        }))

        this.checkForExistence()
        
        
    }

    checkForExistence() {
        RNFS.exists(RNFS.DocumentDirectoryPath+'/character.json')
        .then((exists) => {
            if (exists){
                this.readInChar()
            } else {
                this.setState({
                    displayView: <View style={styles.viewCharacter}><Text style={styles.textStyle}>Looks like you have no characters!</Text><Button title="Create your character" style={styles.buttonStyle} onPress={() => this.props.navigation.navigate("charCreate")}></Button></View>
                })
            }
        })
        .catch((err => {
            console.warn(err.message)
        }))
    }
    
    render() {
        this.checkForExistence()
        
        const {} = styles
        return(
            <PaperProvider>
                <ImageBackground source={require("@assets/background.jpg")} style={{width:'100%',height:'100%'}}>
                    <View style={styles.viewTitle}>
                            <Text style={styles.titleStyle}>Welcome to RpgDoIt!</Text>
                            <Image style={styles.image} source={require('@assets/titlelogo.png')}/>
                    </View>
                    {this.state.displayView}
                </ImageBackground>
            </PaperProvider>
        )
    }
}

export default CharacterSelect