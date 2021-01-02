/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React , {useState}from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';


const PendingView = () => (
  <View style={{flex:1, justifyContent:"center", alignItems:"center" }}>
    <Text style={{fontSize: 30,color:"red"}}> Loading...</Text>

  </View>
)

const App = () => {
  const[image,setImage] = useState(null) ;
  const takePicture = async (camera) => {
    try{
      const options = {quality: 0.7 , base64:false};
     const data = await camera.takePictureAsync(options);
     setImage(data.uri);
    }
    catch(error)
    {
      console.warn(error);
    }
  }
 return(
<>
<StatusBar />
<View style={styles.container}>
  {image ? (<Text>Image is present</Text>) : 
  (<RNCamera style={styles.preview} 
    type={RNCamera.Constants.Type.front}
     captureAudio={false} 
     flashMode={RNCamera.Constants.FlashMode.on} 
     androidCameraPermissionOptions={{
      title:"Permission to use camera",
      message:"longer text to display msg",
      buttonPositive: "Hola",
      buttonNegative: "Nopa",     }}
  >
    {({camera,status})=>{
      if(status !=="READY") return <PendingView/>
      return(
        <View style={{flex:0,flexDirection:"row",justifyContent:"center"}}>
          <TouchableOpacity style={styles.capture} onPress={()=>(takePicture(camera))}><Text>Capture</Text></TouchableOpacity>
        </View>
      )

    }}
  </RNCamera>)}  
</View>

</>
 );
}

const styles = StyleSheet.create({
   container:{
     flex:1,
     flexDirection:"column",
     backgroundColor: "#0A79DF"
   },
   preview:{
     flex:1,
     justifyContent:"space-around",
     alignItems: "center",
   },
   capture:{
    flex: 0,
    backgroundColor:"white",
    padding:20,
    backgroundColor: "#FFF",
    alignItems:"center",
    alignSelf:"center",
   },
   camText:{
     backgroundColor: "#3498DB",
     color: "#fff",
     marginBottom: 10,
     width: '100%',
     textAlign: "center",
     paddingVertical: 20,
     fontSize: 25
   }
});

export default App;
