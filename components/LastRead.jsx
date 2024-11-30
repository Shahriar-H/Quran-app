import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";


export default function LastReadCard() {
    const focused = useIsFocused()
    const [lastread, setlastread] = useState(null);
    const router = useRouter()
    
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('lastread');
        setlastread(jsonValue != null ? JSON.parse(jsonValue) : null)
        console.log(jsonValue);
        
      } catch (e) {
        // error reading value
      }
    };
  
    useEffect(() => {
        getData()
    }, [focused]);


  return (
    <LinearGradient  colors={['#006754', '#87D1A4']} start={{ x: 0, y: 2 }} end={{ x: 1, y: 0 }}  className="mx-4 my-4 p-6 py-8 bg-green-700 rounded-2xl shadow-md" style={{borderRadius:20, height:"21%"}}>
      <View className="flex-row justify-between">
        {/* Left Section */}
        {lastread&&<View>
          <Text className="text-gray-100 font-medium text-sm">Last Read</Text>
          <Text className="text-2xl font-bold text-gray-100 mt-1">{lastread?.arabic}</Text>
          <Text className="text-gray-100 text-sm mt-1">{lastread?.name} - {lastread?.surah}</Text>
        </View>}
        {!lastread&&<View>
          <Text className="text-gray-100 font-medium text-sm">Last Read</Text>
          {/* <Text className="text-2xl font-bold text-gray-100 mt-1">الفاتحة</Text> */}
          <Text className="text-gray-100 text-sm mt-1">No History Found</Text>
        </View>}


        {/* Right Section: Quran Icon */}
        <Image resizeMode='contain' className='h-[200px] w-[160px] absolute right-0 -top-12' source={require("../assets/images/quran.png")} />

        
      </View>

      {/* Continue Button */}
      {lastread&&<TouchableOpacity onPress={()=>router.push(`/explore?surah=${lastread?.surah}&name=${lastread?.name}&arabic=${lastread.arabic}&pposition=${lastread.pageposition}`)} className="mt-4 z-10 bg-gray-100 py-2 px-6 rounded-full self-start">
        <Text className="text-black font-medium">Continue</Text>
      </TouchableOpacity>}
      <Image className="absolute bottom-0 -left-10 w-[140%] z-0" source={require("../assets/images/tillt.png")} />
    </LinearGradient>
  );
}
