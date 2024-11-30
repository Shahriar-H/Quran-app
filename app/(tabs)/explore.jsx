import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Slider from '@react-native-community/slider'; // Progress bar slider
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import TrackPlayer from 'react-native-track-player';

const Explore = () => {
  const router = useRouter();
  const query = useLocalSearchParams();
  const [fullsurah, setFullSurah] = useState([]);
  const [fullSurahIn2Lang, setFullSurahIn2Lang] = useState([]);
  const [fullInOne, setFullInOne] = useState('');
  const focused = useIsFocused();
  const [viewSetting, setViewSetting] = useState(true);
  const [audioSource, setAudioSource] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0); // Total audio duration
  const [currentTime, setCurrentTime] = useState(0); // Current playback position
  const [isLoading, setIsLoading] = useState(false);
  const [languageTranslation, setLanguageTranslation] = useState('eng-ajarberry');
  const [sound, setSound] = useState(null); // Audio instance
  const [isLoadingplaybtn, setisLoadingplaybtn] = useState(false);
  const [showplayer, setshowplayer] = useState(true);

  const [scrollPosition, setScrollPosition] = useState(0); // To track and save position
  const flatListRef = useRef(null); // Reference to FlatList
  const [storeddata, setstoreddata] = useState(null);

  const getstoreddata = async ()=>{
    const savedPosition = await AsyncStorage.getItem("lastread");
    setstoreddata(JSON.parse(savedPosition))
  }



  const loadScrollPosition = async (pageposition) => {
    
    console.log('query',query);
    
    
    if (pageposition) {
      console.log(storeddata, typeof parseFloat(storeddata?.pageposition));
      
      setScrollPosition(parseFloat(pageposition));
      flatListRef.current?.scrollToOffset({ offset: parseFloat(pageposition), animated: true });
    }
  };

  useEffect(() => {
    // console.log("useEffect",scrollPosition);
    
    if (scrollPosition > 0) {
      flatListRef.current?.scrollToOffset({ offset: scrollPosition, animated: true });

    }
  }, [scrollPosition]);


  let timeset;

  // Store data in AsyncStorage
  const storeData = async (value) => {
    // console.log(value);
    let runtime = 4000
    if(timeset){
      
      return 0;
    }

    timeset = setTimeout(async () => {
      console.log(value);
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('lastread', jsonValue);
      } catch (e) {
        console.log(e);
      }
      timeset=null
      
    }, runtime);

    
  };
//https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/${surahNo}.min.json
  // Fetch full Surah details
  const getTheFullSurah = (surahNo) => {
    setisLoadingplaybtn(true)
    setIsLoading(true);
    fetch(`https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${surahNo}`)
      .then((res) => res.json())
      .then((res) => {
        
        
        setFullSurah(res?.verses);
        let fullSurahInOne = '';
        res?.verses?.forEach((item) => {
          fullSurahInOne += ` (${item?.verse_key}) ${item?.text_indopak}`;
        });
        setFullInOne(fullSurahInOne);
        setIsLoading(false);
        setisLoadingplaybtn(false)
      });
  };

  const getTheFullSurahAudio = (surahNo) => {
    setisLoadingplaybtn(true)
    setIsLoading(true);
    fetch(`https://api.quran.com/api/v4/chapter_recitations/10/${surahNo}`)
      .then((res) => res.json())
      .then((res) => {
        setAudioSource(res?.audio_file?.audio_url);
        setIsLoading(false);
        setisLoadingplaybtn(false)
      });
  };

  const getTheFullSurahBN = (surahNo) => {
    setIsLoading(true);
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/${languageTranslation}/${surahNo}.min.json`)
      .then((res) => res.json())
      .then((res) => {
        setFullSurahIn2Lang(res?.chapter);
        setIsLoading(false);
      });
  };

  // Load and play audio
  const loadAudio = async () => {
    setisLoadingplaybtn(true)
    if (sound) {
      await sound.unloadAsync();
    }
    console.log(audioSource);
    
    const { sound: newSound, status } = await Audio.Sound.createAsync(
      { uri: audioSource },
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
    setDuration(status.durationMillis / 1000); // Convert to seconds
    // setIsPlaying(true);
    setisLoadingplaybtn(false)
  };

  // Playback status updates
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis / 1000); // Convert to seconds
      setDuration(status.durationMillis / 1000); // Convert to seconds
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    }
  };

  // Play or pause the audio
  const togglePlayPause = async () => {
    setisLoadingplaybtn(true)
    // if (!sound) {
    //   await loadAudio();
    //   setisLoadingplaybtn(false)
    // } else 
    if (isPlaying) {
      setIsPlaying(false);
      await sound.pauseAsync()
      setisLoadingplaybtn(false)
    } else {
      setIsPlaying(true);
      await sound.playAsync();
      setisLoadingplaybtn(false)
    }
  };

  // Stop audio playback
  const stopAudio = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Seek audio
  const seekAudio = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000); // Convert seconds to milliseconds
    }
  };

  useEffect(() => {
    console.log(query,storeddata);
    
    if (query?.surah) {
      getTheFullSurah(query?.surah);
      getTheFullSurahBN(query?.surah);
      getTheFullSurahAudio(query?.surah);
      getstoreddata()
    }

    if(query?.surah===storeddata?.surah){
      console.log(query?.pageposition);
      
      loadScrollPosition(query?.pposition)
    }

    

    return () => {
      sound && sound.unloadAsync();
      setSound(null)
    };
  }, [query?.surah, focused, languageTranslation]);

  useEffect(() => {
    if(audioSource){
      console.log(audioSource);
      loadAudio()
    }
  }, [audioSource]);

  useEffect(() => {
    const backAction = async () => {
      ToastAndroid.show("Press the Back button", ToastAndroid.LONG)
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [router]);


    //download and Store file
    const downloadAudio = async (url, fileName) => {
      try {
        // Define the local path where the audio file will be saved
        const fileUri = FileSystem.documentDirectory + fileName;
    
        // Download the audio file
        const downloadResumable = FileSystem.createDownloadResumable(
          url,
          fileUri,
          {},
          (downloadProgress) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            console.log(`Download progress: ${progress * 100}%`);
          }
        );
    
        const { uri } = await downloadResumable.downloadAsync();
        console.log('Downloaded audio file to:', uri);
        return uri; // Return the URI of the saved audio file
      } catch (error) {
        console.error('Error downloading audio file:', error);
      }
    };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View>
        <View className="flex-row items-center justify-between px-6 py-3 pt-12 bg-white">
          <TouchableOpacity
            className="w-1/4 flex items-center flex-row space-x-2"
            style={{ width: '25%' }}
            onPress={() => {
              stopAudio();
              setSound(null)
              router.push('Home');
            }}
          >
            <Text><FontAwesome name="chevron-left" size={20} color="#2c7b4a" /></Text>
            <Text className='ml-2 -mt-1'>Back</Text>
          </TouchableOpacity>
          <View className='w-1/2' style={{width:'50%'}}>
            <Text className="text-lg text-center font-bold text-green-500">{query?.name}</Text>
            <Text className="text-xs text-center text-green-500">{fullsurah?.length} - {query?.arabic}</Text>
          </View>
          <View className="flex-row justify-center items-center space-x-2 w-1/4" style={{width:'25%'}}>
            {
            <TouchableOpacity onPress={()=>{setshowplayer((prev) => !prev)}}>
              <FontAwesome name="play-circle" size={25} color={showplayer?"#2C7A7B":"#a6d7d8"} />
            </TouchableOpacity>}

            {/* <TouchableOpacity className='bg-gray-50 p-1 rounded-sm border border-gray-100' 
            onPress={() => downloadAudio(audioSource,query?.name+'.mp3')} style={{ marginLeft: 10 }}>
              <FontAwesome name="download" size={20} color="#2C7A7B" />
            </TouchableOpacity> */}

            <TouchableOpacity className='bg-gray-50 p-1 rounded-sm border border-gray-100' onPress={() => setViewSetting((prev) => !prev)} style={{ marginLeft: 10 }}>
              <FontAwesome name="exchange" size={20} color={!viewSetting?"#2C7A7B":"#a6d7d8"} />
            </TouchableOpacity>

            <TouchableOpacity className='bg-gray-50 p-1 rounded-sm border border-gray-100' onPress={() => setLanguageTranslation((prev) => prev==="eng-ajarberry"?"ben-abubakrzakaria":"eng-ajarberry")} style={{ marginLeft: 10 }}>
              <Text className='font-bold'>{languageTranslation==="ben-abubakrzakaria"?'BN':"EN"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    

      {/* Audio Controls */}
      {(showplayer&&sound)&&<View className="p-3 absolute bottom-0 z-50 w-full overflow-hidden">
          <TouchableOpacity onPress={()=>setshowplayer((prev)=>!prev)} className='-mt-2' style={{elevation:4}}>
            <FontAwesome name='close' size={18} />
          </TouchableOpacity>
        <View className="bg-white p-3 rounded-md" style={{ elevation: 5 }}>
          
          <TouchableOpacity onPress={() => seekAudio(currentTime)} className="mt-1">
            <Slider
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={(value) => setCurrentTime(value)}
              minimumTrackTintColor="#2C7A7B"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#2C7A7B"
            />
            <View className="flex-row justify-between px-2">
              <Text style={{ fontSize: 12 }}>{formatTime(currentTime)}</Text>
              <Text style={{ fontSize: 12 }}>{formatTime(duration)}</Text>
            </View>
          </TouchableOpacity>
          {<View className="flex-row justify-between items-center w-full border-t border-gray-200 pt-2 mt-2 pb-2">
            <TouchableOpacity className="w-1/3 bg-gray-50 p-1 rounded-sm border border-gray-100" onPress={stopAudio}>
              <Text className="text-center">
                <FontAwesome name="stop" size={20} color="#2C7A7B" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/3 bg-gray-50 p-1 rounded-sm border border-gray-100" onPress={togglePlayPause}>
              {!isLoadingplaybtn?<Text className="text-center">
                {isPlaying ? (
                  <FontAwesome name="pause" size={20} color="#2C7A7B" />
                ) : (
                  <FontAwesome name="play" size={20} color="#2C7A7B" />
                )}
              </Text>:<ActivityIndicator/>}
            </TouchableOpacity>
          </View>}
        </View>
      </View>}

      {viewSetting && <View className="py-5 h-[90%]">
        <FlatList
          ref={flatListRef}
          data={fullsurah}
          renderItem={({ item,index }) => (
            <View key={index} className='px-6' style={{ paddingBottom: 36 }}>
              <Text style={{ textAlign: 'right', lineHeight: 50, fontSize: 30 }}>
                <Text className="text-[#2C7A7B]">{item?.verse_key}</Text>. {item?.text_indopak}
              </Text>
              <Text className="text-lg">{fullSurahIn2Lang[index]?.text}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          onScroll={(event) => {
            const position = event.nativeEvent.contentOffset.y;
            storeData({...query,pageposition:position}); // Save position during scrolling
          }}
          scrollEventThrottle={16}
        />
      </View>}

      {/* Surah View */}
      <ScrollView className="p-6">
        {
          (isLoading || fullsurah?.length<1)&&<View>
            <Image resizeMode='contain' className='w-full h-auto' source={require("../../assets/images/skaleton.gif")} />
            <Image resizeMode='contain' className='w-full h-auto' source={require("../../assets/images/skaleton.gif")} />
            <Image resizeMode='contain' className='w-full h-auto' source={require("../../assets/images/skaleton.gif")} />
          </View>
        }

        

        {/* {!isLoading && viewSetting && fullsurah && fullsurah?.map((chapter, index) => (
          <View key={index} style={{ paddingBottom: 36 }}>
            <Text style={{ textAlign: 'right', lineHeight: 50, fontSize: 30 }}>
              <Text className="text-green-500">{chapter?.verse}</Text>. {chapter?.text}
            </Text>
            <Text className="text-lg">{fullSurahIn2Lang[index]?.text}</Text>
          </View>
        ))} */}
        {!viewSetting && <Text style={{ fontSize: 30, textAlign: 'justify', lineHeight: 50 }}>{fullInOne}</Text>}
        <View className="h-40" />
      </ScrollView>
    </View>
  );
};

// Helper function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default Explore;
