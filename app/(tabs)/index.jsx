import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect } from 'react';
import { Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {FontAwesome} from "@expo/vector-icons"
import { Link, useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Index = () => {
  const router = useRouter()
  const translateY = useSharedValue(150);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const moveBox = () => {
    translateY.value = withSpring(0);
  };
  
  useEffect(() => {
    moveBox()
  }, []);

  return (
    <View className='bg-[#004B40] flex-1 justify-center items-center'>
      
      <View className='w-full justify-center items-center'>
        
        <Animated.View
        className="p-3 bg-[#003c33] w-[90%]'"
          style={[ animatedStyle]}
        >
          <Image resizeMode='contain' className='h-[300px] w-[360px]' source={require("../../assets/images/quran.png")} />
        </Animated.View>
       
        

        <Animated.View
        className=""
          style={[ animatedStyle]}
        >
          <Text className='text-center text-4xl my-5 font-bold text-green-500'>QURAN MAZID</Text>
          <Text className='text-center text-2xl font-semibold text-gray-300'>Learn Quran and</Text>
          <Text className='text-center text-2xl font-semibold text-gray-300'>Recite Everyday</Text>

          <TouchableOpacity onPress={()=>router.push("/Home")} className='bg-white py-3 rounded-md mt-9 px-6 '>
            <Text className='text-center'>Get Started <FontAwesome name='arrow-right' /></Text>
          </TouchableOpacity>

          <Text className='text-center text-xs font-semibold text-gray-300 opacity-50 mt-8'>Version - 1.0.05</Text>
          <Text className='text-center text-xs font-semibold text-gray-300 opacity-50'>A Product By Logroom</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({})

export default Index;
