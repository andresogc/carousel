import React, { useRef, useState, useEffect } from 'react'
import { Text, View, Image, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useInterval from '../helpers/useinterval';
import { carouselStyle } from "./carousel.style";


export const CarouselComponent = (props) => {
    const animation = useRef(new Animated.Value(0));
    const [currentImage, setCurrentImage] = useState(0);
    useInterval(() => handleAnimation('automatic'), 8000);

    useEffect(async() => { 
        let value = await getStoredSlide();
        goToSlide(value.num);
    }, []);

    //Obtain position stored in the local storage.
    const getStoredSlide = async ()=>{
        try {
            const storedSlide = await AsyncStorage.getItem("newCurrentImage");
            if (storedSlide) {
                return JSON.parse(storedSlide);
            } 
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleAnimation = async(direction) => {
        
        var count = 1;
        if (direction === 'next') {
            count = 1;
        } else if (direction === 'prev') {
            count = -1
        }
        //assign the new position
        let newCurrentImage = currentImage + count;
        //check if you can scroll to the right or left when the user presses a button (left or right).
       // In the event that it cannot be displaced, a return is made without making displacements. Only in automatic mode does it move.
        if (newCurrentImage >= props.images.length && direction !== 'automatic') {
            return;
        } else if (newCurrentImage >= props.images.length && direction === 'automatic') {
            newCurrentImage = 0;
        }
        if (newCurrentImage < 0 && direction !== 'automatic') {
            return;
        }
        //Animation to move slider.
        Animated.spring(animation.current, {
            toValue: -(Dimensions.get('screen').width * newCurrentImage),
            useNativeDriver: true
        }).start();

        setCurrentImage(newCurrentImage);
        try {
            await AsyncStorage.setItem('newCurrentImage', JSON.stringify({num:newCurrentImage}))
        } catch (error) {
            console.log('error: ', error)
        }
    }

    //go a specific slide
    const goToSlide = (slide) => {
       
        Animated.spring(animation.current, {
            toValue: -(Dimensions.get('screen').width * slide),
            useNativeDriver: true
        }).start();

        setCurrentImage(slide)
    }

    return (
        <SafeAreaView style={carouselStyle.container} >
            <Text>dd</Text>
            <Animated.View style={[
                carouselStyle.containerSlide,
                {
                    transform: [{ translateX: animation.current }],
                }
            ]} >

                {props.images.map((item, i) => (
                    <View style={carouselStyle.slide} key={i}>
                        <Image
                            source={{ uri: item.image }}
                            style={carouselStyle.img}

                        />
                        <Text style={carouselStyle.slideText} >{item.title}</Text>
                    </View>

                ))
                }

            </Animated.View>

            <View style={carouselStyle.controls}>
                <View style={carouselStyle.button}>
                    <TouchableOpacity onPress={() => handleAnimation('prev')}>
                        <Icon
                            name='navigate-before'
                            color='red'
                            size={64}
                            style={carouselStyle.prev}
                        />
                    </TouchableOpacity>
                </View>

                <View style={carouselStyle.button}>
                    <TouchableOpacity onPress={() => handleAnimation('next')}>
                        <Icon
                            name='navigate-next'
                            color='red'
                            size={64}
                            style={carouselStyle.next}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView >

    )

}
