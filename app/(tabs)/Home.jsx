import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar, Image } from 'react-native';
import LastReadCard from '../../components/LastRead';
import SurahList from '../../components/SurahList';
import Header from '../../components/Header';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';


export default function Home() {
  const [searchsurah, setsearchsurah] = useState('');
  const [allJusz, setallJusz] = useState([]);
  const [showjuzs, setshowjuzs] = useState(false);
  const router = useRouter()


  const filterfun = (value)=>{
    setsearchsurah(value)
    // console.log(value);
    
  }

  const translateX = useSharedValue(-1000);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const moveBox = () => {
    translateX.value = withTiming(translateX.value === -1000 ? 0 : -1000);
  };

  const listofJuzs = ()=>{
    let alllist = []
    for (let index = 0; index < 30; index++) {
      const num = index+1;
      alllist.push("Juz - "+num)
    }
    setallJusz(alllist)
  }

  useEffect(() => {
    listofJuzs()
  }, []);
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle={'dark-content'} />
      <Animated.View 
      style={[{zIndex:9999, height:'100%', elevation:5 }, animatedStyle]}
      className="flex-1 w-[80%] bg-gray-100 absolute py-10 px-4">
        <TouchableOpacity onPress={moveBox} className="absolute -right-10 top-10">
          <FontAwesome name='close' size={30} color={'red'} />
        </TouchableOpacity>
        <ScrollView className="p-3">
          <View className="flex justify-center items-center py-3">
            <Image resizeMode='contain' className="h-[70px] w-[70px] rounded" source={require("../../assets/images/mainlogo.png")} />
          </View>
        <View>
          <TouchableOpacity onPress={()=>setshowjuzs((prev)=>!prev)} className="flex-row justify-between items-center p-1 py-3 border-b border-gray-300">
            <Text className='text-xl font-bold'>
              <FontAwesome name='book' size={22} color={'#000'} /> All Juzs</Text>
            <FontAwesome name={showjuzs?"chevron-up":'chevron-down'} size={16} />
          </TouchableOpacity>
          {showjuzs&&<View className="ml-3">
            {allJusz&&allJusz.map((item,index)=>{
              return <Link key={index} className='text-xl p-1 py-3 border-b border-gray-300' href={'/juz?juz='+index}>{item}</Link>
            })}
          </View>}

          <Link Link href={"mailto:shakisk23@gmail.com"} className="flex-row justify-between items-center p-1 py-3 border-b border-gray-300">
            <Text className='text-xl font-bold'>
              <FontAwesome name='feed' size={22} color={'#000'} /> Feedback
            </Text>
          </Link>

          <Link href={"mailto:shakisk23@gmail.com"} className="flex-row justify-between items-center p-1 py-3 border-b border-gray-300">
            <Text className='text-xl font-bold'>
              <FontAwesome name='hand-pointer-o' size={22} color={'#000'} /> Hire Us
            </Text>
          </Link>



        </View>
        <View className="h-[100px]"></View>
        </ScrollView>


         <Text className="absolute bottom-8 text-gray-400 text-center w-full">1.0.05</Text>
         <Text className="absolute bottom-4 text-xs text-gray-400 text-center w-full">By Shahriar</Text>
      </Animated.View>
      <View>
        {/* Header */}
        <Header filterfun={filterfun} showNavbar={moveBox}/>

        {/* Last Read Card */}
        <LastReadCard />

        {/* Surah List */}
        <SurahList searchword={searchsurah} />
      </View>
    </SafeAreaView>
  );
}
