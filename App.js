
import React from 'react';
import { SafeAreaView,Text, View} from 'react-native';
import { CarouselComponent } from "./app/components/Carousel.component";
import { images } from "./app/data/data";
import { appStyle } from "./app.style";

const App = () => {
  return (
    <SafeAreaView style={appStyle.container}>
      <Text style={appStyle.title} >Carousel</Text>
      <View style={appStyle.carouselContent}>
        <CarouselComponent images={images}/>
      </View>
    </SafeAreaView>
  );
};

export default App;