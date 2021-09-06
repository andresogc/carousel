import { StyleSheet,Dimensions } from "react-native";


const MAX_WIDTH = Dimensions.get('screen').width;

const {width} = Dimensions.get('window');
const height = width * 0.9 //90%

export const carouselStyle = StyleSheet.create({

    container:{
        width,
        height,
    },
    img:{
        resizeMode:'cover',
        width,
        height
    },
    slideText:{
        backgroundColor:"rgba(0,0,0,.5)",
        color:"#fff",
        width:"100%",
        paddingVertical:10,
        paddingHorizontal:60,
        fontSize:24,
        textAlign:"center",
        position:"absolute",
        bottom:0
    },
    containerSlide:{
        flexDirection:"row",
    },
    controls:{
        flexDirection:"row",
        position:"absolute",
        top:0,
        width:MAX_WIDTH,
        bottom:10,
        zIndex:2,
        justifyContent:"space-between"
    },
    button:{
        marginHorizontal:10,
        marginBottom:10,
        justifyContent:"center"
    },
    next:{
        alignSelf:"center"
    }
   
    
});

