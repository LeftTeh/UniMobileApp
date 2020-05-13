import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    viewTitle: {
        justifyContent: 'space-between',
        alignItems:'center',
        flex:1,
        backgroundColor:"rgba(0,0,128,0.2)"
    },
    image: {
        height: 225,
        width: 225,
        resizeMode: "contain",
        borderWidth:1,
        borderColor:'black'
        
        
    },
    viewCharacter:{
        flex:1,
        backgroundColor: "rgba(0,0,128,0.2)",
        justifyContent:"center",
        alignItems:"center",
        
    },
    titleStyle: {
        paddingTop:'4%',
        fontFamily: "serif",
        fontSize: 30,
        color:'white',
        textShadowColor:'rgba(0,0,0,1.0)',
        textShadowRadius:15,
        textShadowOffset: {width:-1,height:1}

    },
    buttonStyle: {
        paddingBottom:"10%",
    },
    textStyle: {
        paddingBottom:"25%",
        fontSize:20,
        color:"white",
        fontFamily:"serif",
        textShadowColor:'rgba(0,0,0,1.0)',
        textShadowRadius:15,
        textShadowOffset: {width:-1,height:1}

    },
    textChar: {
        paddingBottom:"10%",
        fontSize:20,
        color:"white",
        fontFamily:"serif",
        textShadowColor:'rgba(0,0,0,1.0)',
        textShadowRadius:15,
        textShadowOffset: {width:-1,height:1}

    },
    profileImage:{
        height:100,
        width:100,
        borderRadius:5,
        shadowOffset:{width:-1,height:1},
        shadowColor:"rgba(0,0,0,1.0)",
        shadowRadius:15,
        borderWidth:1,
        borderColor:'black'
        
    }
})