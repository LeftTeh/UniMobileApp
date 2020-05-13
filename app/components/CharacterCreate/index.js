import React, {Component} from 'react'
import {View,Text,Image,ImageBackground,TextInput,TouchableOpacity,Alert,Button, ScrollView, Keyboard} from 'react-native'
import styles from "./styles"
import { Provider as PaperProvider } from 'react-native-paper';
import {Divider} from 'react-native-paper'
var ImagePicker = require('react-native-image-picker');
var RNFS = require('react-native-fs');

class CharacterCreate extends Component{

    constructor() {
        super()
        let imgUrl = require("@assets/tinycam.jpg");
        this.state = {
            name:"",
            class:"",
            skills:[],
            filePath:null,
            tasks:[],
            level:1
        }
        this.check = {
            imageProp:null,
            skillText:"",
            skillView:[],
            skillPlaceholder:''
        }
    }
    static navigationOptions = {
        header: null
    }

    
    choosePicture() {
        const options = {
            title: 'Select avatar',
            mediaType: 'photo',
            // maxHeight:200,
            // maxWidth:200,
        }
        ImagePicker.showImagePicker(options, (response) => {
            //console.warn(response)
            if (response.didCancel){
                
            } else if (response.error) {
                console.warn("Error with this")
            } else {
                let source = response.uri
                //console.warn(source)
                this.setState({
                    filePath: source, 
                })
            }
        })
    }

    processData() {
        if (this.state.name == "" || this.state.class == "" || this.state.skills == [] || this.state.filePath == null) {
            Alert.alert("Complete all details","Please fill all details before continuing")
        }
        else if (this.state.name.length >= 20){
            Alert.alert("Name Too Long", "Maximum length of your name is 20 characters")
        }
        else if (this.state.class.length >= 20){
            Alert.alert("Class Too Long", "Maximum length of your class is 20 characters")
        }
        else { 
            var path=RNFS.DocumentDirectoryPath+'/character.json'
            RNFS.writeFile(path,JSON.stringify(this.state),'utf8')
            .then((success) => {
                this.props.navigation.goBack()
            })
            .catch((err) => {
                console.warn(err.message)
            })
        }
    }

    addSkill(){
        var newList = this.state.skills
        var newSkill = this.check.skillText
        var newSkillView = this.check.skillView
        Keyboard.dismiss()
        if (this.check.skillText == ""){
            Alert.alert("No Skill", "Please type in a skill to be added to your profile")
        }
        else if (newList.length == 5){
            Alert.alert("Maximum Skills","You have reached the max amount of skills allowed")
        }
        else if(this.check.skillText.length >= 20){
            Alert.alert("Reduce length of skill name","Please limit each of your skill names to 20 characters or less.")
        }
        else {
            var isInList = false;
            for (i = 0; i < newList.length; i++){
                if (newList[i].indexOf(newSkill.trim()) != -1){
                    isInList = true
                    break
                }
            }
            if (!isInList){
                newList.push([this.check.skillText,1])
                //console.warn(newList)
                newSkillView.push(<TouchableOpacity onPress={()=>this.removeSkill(newSkill)}><Divider/><Text style={styles.scrollViewTextStyle}>{this.check.skillText}</Text><Divider/></TouchableOpacity>)
                this.check.skillView=newSkillView
                this.setState({
                    skills:newList
                })
                //console.warn(this.state.skills)
            }
            if (isInList) {
                Alert.alert("Skill Exists", "This skill already exists")
            }
        }
        
        
    }

    removeSkill(skillToRemove) {
        var skillArray = this.state.skills
        var index = skillArray.indexOf(skillToRemove)
        skillArray.splice(index,1)

        var skillViewArray = this.check.skillView
        var viewIndex = skillViewArray.indexOf(<TouchableOpacity onPress={()=>this.removeSkill(skillToRemove)}><Divider/><Text style={styles.scrollViewTextStyle}>{skillToRemove}</Text><Divider/></TouchableOpacity>)
        skillViewArray.splice(viewIndex,1)
        this.setState({
            skills:skillArray
        })
    }

    checkImage(){
        this.check.skillText==""
        if (this.state.filePath == null){
            this.check.imageProp = <Image style={{width:75,height:75,resizeMode:'cover',borderRadius:5}} source={require("@assets/tinycam.jpg")} ></Image>
        }
        else {
            this.check.imageProp = <Image style={{width:75,height:75,resizeMode:'cover',borderRadius:5}} source={{uri:this.state.filePath}} ></Image>
        }
    }
    render() {
        this.checkImage()
        //console.warn(this.check.skillText)
        return(
            <PaperProvider>
                <ImageBackground source={require("@assets/background.jpg")} style={styles.backgroundStyle}>
                    <View style={styles.viewTitle}>
                        <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={() => this.choosePicture()}>
                            {this.check.imageProp}
                        </TouchableOpacity>
                        <TextInput style={styles.textStyle} placeholder="Name" underlineColorAndroid="black" onChangeText = {(text) => this.setState({name:text})}></TextInput>
                        <TextInput style={styles.textStyle} placeholder="Class" underlineColorAndroid="black" onChangeText = {(text) => this.setState({class:text})}></TextInput>
                        <TextInput style={styles.textStyle} placeholder="Add a skill" clearTextOnFocus={true} underlineColorAndroid="black" onChangeText = {(text) => this.check.skillText = text}/>
                        <Button title="Add Skill" onPress={() => this.addSkill()}/>
                        <ScrollView contentContainerStyle={styles.scrollViewStyle} placeholder="Skills will be displayed here, tap to remove">
                            {this.check.skillView}
                        </ScrollView>
                        <Button style={{}}title="Done" onPress={() => this.processData()}/>
                    </View>
                </ImageBackground>
            </PaperProvider>
        )
    }
}

export default CharacterCreate