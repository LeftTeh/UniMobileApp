import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    viewTitle: {
        justifyContent:'space-evenly',
        backgroundColor:"#000080",
        backgroundColor:"rgba(255,255,255,0.4)",
        height:'60%',
        width:'90%',
        borderRadius:10,
        borderWidth:1,
        borderColor:'black'
    },
    backgroundStyle: {
        justifyContent: 'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    },
    textStyle: {
        fontFamily:'serif',
        fontSize:18
    },
    scrollViewStyle: {
        flex:0,
        //paddingTop:'40%',
        //justifyContent:'center',
        //justifyContent:'flex-start',
        height:'100%',
        width:"100%",
    },
    scrollViewTextStyle: {
        fontFamily:'serif',
        fontSize:19,
        justifyContent:'center'
    }
})