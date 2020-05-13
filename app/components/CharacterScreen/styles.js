import {StyleSheet} from 'react-native'
import { continueStatement } from '@babel/types';

export default StyleSheet.create({
    nameClassView :{
        width:'95%',
        height:'5%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
        backgroundColor:"rgba(255,255,255,0.4)",
        borderWidth:1,
        borderColor:'black'
    },
    nameClassText: {
        fontFamily:'serif',
        fontSize:25,
        color:'black'
    },
    skillNameText: {
        fontFamily:'serif',
        fontSize:20,
        paddingLeft:'5%',
        color:'black'
        
    },
    skillLevelText: {
        fontFamily:'serif',
        fontSize:20,
        paddingLeft:'80%',
        color:'black'
    },
    skillView : {
        height:'20%',
        width:'95%',
        backgroundColor:"rgba(255,255,255,0)",
        flexDirection:'row',
        borderRadius: 10,
        
    },
    skillNameView : {
        flex:1,
        //height:'80%',
        backgroundColor:"rgba(255,255,255,0.4)",
        //flexDirection:'column',
        //borderColor:'black',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        borderWidth:1,
        borderColor:'black'
        
    },
    skillLevelView : {
        flex:1,
        flexDirection:'column',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        backgroundColor:"rgba(255,255,255,0.4)",
        borderWidth:1,
        borderColor:'black'
    },
    buttonView:{
        height:'5%',
        width:'95%',
        borderRadius: 10,
        backgroundColor:"rgba(255,255,255,0.4)",
        borderWidth:1,
        borderColor:'black'
        
    },
    taskListView: {
        //flex:6.5,
        width:'95%',
        height:'65%',
        backgroundColor:"rgba(255,255,255,0.4)",
        borderRadius: 10,
        borderWidth:1,
        borderColor:'black'
    },
    addObjectiveView: {
        borderRadius:15, 
        backgroundColor:'#87CEEB',
        height:'95%',
        width:'95%',
        justifyContent:'space-evenly',
        alignItems:'stretch',
        borderWidth:1,
        borderColor:'black'
    }
    
})