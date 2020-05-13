import React, {Component} from 'react'
import {View,Text,Image,ImageBackground,Picker,TextInput,ScrollView,TouchableOpacity,Alert} from 'react-native'
import styles from "./styles"
import {Provider as PaperProvider} from 'react-native-paper';
import {Divider,Button,Portal,Modal} from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
var RNFS = require('react-native-fs');


class CharacterScreen extends Component{

    constructor() {
        super()
        this.state = {
            name:"",
            class:"",
            skills:[],
            filePath:null,
            tasks:[],
            level:1,
            visible:false,
        }

        this.viewSetup = {
            nameClassView:null,
            skillView:null,
            taskListView:null,
            pickerOptions:[],
            completedTasks:[],
            levelUp:false
        }

        this.newObjective = {
            objectiveName:'',
            objectiveDescription:'',
            skillIncrease:'placeholder',
            completionDate:''
        }

    }
    static navigationOptions = {
        header: null,
    };


    readInChar(){
        RNFS.readFile(RNFS.DocumentDirectoryPath+'/character.json','utf8')
        .then((contents) => {
            var jsonObj = JSON.parse(contents)
            var level = jsonObj.level

            if (this.viewSetup.levelUp ==true){
                Alert.alert("Level Up!","You have completed 5 tasks, you have levelled up!")
                level = level + 1
                levelUp=false

                this.setState({
                    level:level
                })

                var path=RNFS.DocumentDirectoryPath+'/character.json'
                RNFS.writeFile(path,JSON.stringify(this.state),'utf8')
                .then((success) => {
                    this.setState({
                        visible: false,
                    })
                })
                .catch((err) => {
                    console.warn(err.message)
                })
            }
            
            this.setState({
                name:jsonObj.name,
                class:jsonObj.class,
                skills:jsonObj.skills,
                filePath:jsonObj.filePath,
                tasks:jsonObj.tasks,
                level:jsonObj.level
            })
            this.setView()
        })
        .catch((err => {
            console.log(err.message)
        }))

        // RNFS.unlink(RNFS.DocumentDirectoryPath+'/completedTasks.json')

        RNFS.exists(RNFS.DocumentDirectoryPath+'/completedTasks.json')
        .then((exists) => {
            if (exists){
            } else {
                var completedTaskList = {
                    completedTasks:[]
                }
                RNFS.writeFile(RNFS.DocumentDirectoryPath+'/completedTasks.json',JSON.stringify(completedTaskList),'utf8')
                .then((success) => {
                })
                .catch((err) => {
                    console.warn(err.message)
                })
            }

        })
        .catch((err) => {
            console.warn(err.message)
        })
    }

    setView(){
        var listy = this.state.skills
        var pickerNameList=[]
        var viewNameList = []
        var viewLevelList=[]
        if (pickerNameList.indexOf(<Picker.Item key="placeholder" label="Please select a skill to increase..." value="placeholder"/>) == -1){
            pickerNameList.push(<Picker.Item key="placeholder" label="Please select a skill to increase..." value="placeholder"/>)
        }
        for (i = 0 ; i < listy.length ; i++){
            var skill = listy[i][0]
            var level = listy[i][1]
            viewNameList.push(<View key={i} style={styles.skillNameView}><Divider><Text adjustsFontSizeToFit={true} textBreakStrategy='highQuality' style={styles.skillNameText}>{skill}</Text></Divider></View>)
            viewLevelList.push(<View key={i} style={styles.skillLevelView}><Divider><Text adjustsFontSizeToFit={true} textBreakStrategy='highQuality' style={styles.skillLevelText}>{level}</Text></Divider></View>)
            pickerNameList.push(<Picker.Item key={i} label={skill} value={skill} />)
        }

        var taskList = this.state.tasks
        let tasksToDisplay = []
        if (taskList.length > 0) {
            for (let i = 0; i < taskList.length ; i++){
                tasksToDisplay.push(<View key={i} style={{flexDirection:'row',height:'30%',width:'100%',borderRadius:20}}>
                                        <View style={{width:'80%',height:'100%'}}>
                                            <View style={{height:'20%',borderTopLeftRadius:20,borderWidth:1,borderColor:'black', alignItems:'center',justifyContent:'center'}}>
                                                <Text style={{fontFamily:'serif',color:'black'}}adjustsFontSizeToFit={true}>{taskList[i][0]}</Text>
                                            </View>
                                            <View style={{height:'60%',borderWidth:1,borderColor:'black'}}>
                                                <Text style={{fontFamily:'serif',color:'black'}} adjustsFontSizeToFit={true}>{taskList[i][1]}</Text>
                                            </View>
                                            <View style={{height:'20%',flexDirection:'row'}}>
                                                <View style={{flex:1,borderBottomLeftRadius:20,borderWidth:1,borderColor:'black', alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={{fontFamily:'serif',color:'black',fontSize:12}} adjustsFontSizeToFit={true}>Gives: {taskList[i][2]} +1</Text>
                                                </View>
                                                <View style={{flex:1,borderWidth:1,borderColor:'black', alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={{fontFamily:'serif',color:'black'}} adjustsFontSizeToFit={true}>{taskList[i][3]}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{width:'20%',height:'100%'}}>
                                            <TouchableOpacity onPress={() => this.taskComplete(taskList[i][0])} style={{alignItems:'center',justifyContent:'center',flex:1, borderTopRightRadius:20,borderWidth:1,borderColor:'black'}}>
                                                <Image source={require('@assets/tick.png')} style={{height:'80%',width:'80%'}}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.taskIncomplete(taskList[i][0])} style={{alignItems:'center',justifyContent:'center',flex:1,borderBottomRightRadius:20,borderWidth:1,borderColor:'black'}}>
                                                <Image source={require('@assets/cross.png')} style={{height:'80%',width:'80%'}}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )

            }
        }
        this.viewSetup = {
            nameClassView:<View style={styles.nameClassView}><Text adjustsFontSizeToFit={true} textBreakStrategy='highQuality' style={styles.nameClassText}>{this.state.name} - {this.state.class} - Level: {this.state.level}</Text></View>,
            skillView:<View style={styles.skillView}><View style={{flex:1}}>{viewNameList}</View><View style={{flex:1}}>{viewLevelList}</View></View>,
            taskListView:<View style={styles.taskListView}>
                            <ScrollView scrollEnabled={true} contentContainerStyle={{flexGrow:1}}>
                                {tasksToDisplay}
                            </ScrollView>
                        </View>,
            pickerOptions:pickerNameList
        }
    }

    showModal() {
        this.setState({
            visible:true
        })
    }

    hideModal() {
        this.setState({
            visible: false,
        })
    }
    
    addNewObjective() {
        var objectiveName= this.newObjective.objectiveName
        var objectiveDescription = this.newObjective.objectiveDescription
        var skillIncrease = this.newObjective.skillIncrease
        var completionDate = this.newObjective.completionDate

        if ((objectiveName == '')||(objectiveDescription == '')||(skillIncrease == '')||(completionDate == '')){
            Alert.alert("Enter all details","Please fill out all the details of the new objective.")
        }

        else if(skillIncrease == 'placeholder'){
            Alert.alert("Choose a skill", "Please select a skill to increase")
        }
        else if(objectiveName.length > 20){
            Alert.alert("Objective name too long","Objective names should be 20 characters or less")
        }
        else {
            var newTask = [objectiveName,objectiveDescription,skillIncrease,completionDate]

            this.setState({ 
                tasks: this.state.tasks.push(newTask)
            })
            
            var path=RNFS.DocumentDirectoryPath+'/character.json'
                RNFS.writeFile(path,JSON.stringify(this.state),'utf8')
                .then((success) => {
                    this.setState({
                        visible: false,
                    })
                })
                .catch((err) => {
                    console.warn(err.message)
                })
            }
        
    }

    taskIncomplete(taskName) {
        let taskList = this.state.tasks
        for (let i = 0; i < taskList.length ; i++){
            if (taskName == taskList[i][0]){
                taskList.splice(i,1)
                this.setState({
                    tasks:taskList
                })
                var path=RNFS.DocumentDirectoryPath+'/character.json'
                RNFS.writeFile(path,JSON.stringify(this.state),'utf8')
                .then((success) => {
                    this.setState({
                        visible: false,
                    })
                })
                .catch((err) => {
                    console.warn(err.message)
                })
                break
            }
        }
    }

    async taskComplete(taskName) {
        let taskList = this.state.tasks
        let skillList = this.state.skills


        await RNFS.readFile(RNFS.DocumentDirectoryPath+'/completedTasks.json','utf8')
        .then((tasks) => {
            this.viewSetup.completedTasks=JSON.parse(tasks).completedTasks
        })
        .catch((err) => {
            console.warn("first read: "+err.message)
        })

        let completedTaskList = await this.viewSetup.completedTasks

        for (let i = 0; i < taskList.length ; i++){
            if (taskName == taskList[i][0]){

                completedTaskList.push(taskList[i])

                var skillToIncrease = taskList[i][2] 
                taskList.splice(i,1)
                this.setState({
                    tasks:taskList
                })
                for (let m = 0 ; m < skillList.length ; m++){
                    if (skillToIncrease == skillList[m][0]){
                        skillList[m][1] = skillList[m][1] + 1
                    }
                    this.setState({
                        skills:skillList
                    })
                }
                if ((completedTaskList.length % 5) == 0){
                    this.viewSetup.levelUp=true
                    completedTaskList=[]
                }
                var path=RNFS.DocumentDirectoryPath+'/character.json'
                await RNFS.writeFile(path,JSON.stringify(this.state),'utf8')
                .then((success) => {
                })
                .catch((err) => {
                    console.warn("writing skill: "+err.message)
                })

                jsonToWrite={
                    completedTasks:completedTaskList
                }

                await RNFS.writeFile(RNFS.DocumentDirectoryPath+'/completedTasks.json',JSON.stringify(jsonToWrite),'utf8')
                .then((success) => {
                })
                .catch((err) => {
                    console.warn("last commit: "+err.message)
                })
                break
            }
        }
    }
    
 
    render() {
        this.readInChar()
        const { visible } = this.state;
        return(
            <PaperProvider>
                <Portal>
                    <Modal visible={visible} onDismiss={()=>this.hideModal()} dismissable={true} contentContainerStyle={{alignItems:'center'}}>
                        <View style={styles.addObjectiveView}>
                            <View style={{alignItems:'center'}}>
                                <Text style={{textDecorationLine:'underline',fontFamily:'serif',color:'black',fontSize:30}}>Add Objective</Text>
                            </View>
                            <TextInput placeholder="Objective Name" underlineColorAndroid="black" onChangeText={(text)=>this.newObjective.objectiveName=text}></TextInput>
                            <TextInput placeholder="Objective Description" underlineColorAndroid="black" onChangeText={(text)=>this.newObjective.objectiveDescription=text}></TextInput>
                            <Picker selectedValue={this.newObjective.skillIncrease} onValueChange={(value) => this.newObjective.skillIncrease=value}>
                                {this.viewSetup.pickerOptions}
                            </Picker>
                            <View style={{alignItems:'center',backgroundColor:'#87CEEB'}}>
                                <DatePicker style={{width:'100%'}} date={this.newObjective.completionDate} onDateChange={(date) => this.newObjective.completionDate=date}placeholder="When does this need to be completed by?" minDate={moment().format("DD/MM/YYYY")} format="DD/MM/YYYY"></DatePicker>
                            </View>
                            <Button mode='contained' onPress={()=>this.addNewObjective()}>Add Objective</Button>
                        </View>

                    </Modal>
                </Portal>
                
                <ImageBackground style={{flex:1,alignItems:'center',justifyContent:'space-evenly'}} source={require("@assets/charBackground.jpg")}>
                    {this.viewSetup.nameClassView}
                    {this.viewSetup.skillView}
                    <View style={styles.buttonView}>
                        <Button icon="add-circle-outline" color="black"mode="text" onPress={() => this.showModal()}>Add an objective</Button>
                    </View>
                    {this.viewSetup.taskListView}
                </ImageBackground>
                
            </PaperProvider>
        )
    }
}

export default CharacterScreen