import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


export default function Header({filterfun,showNavbar}) {
    const [showSearch, setshowSearch] = useState(false);
    
  return (
    <View className="flex-row items-center justify-between px-6 py-6 pt-12 bg-white" style={{height:'10%'}}>
        
        {showSearch&&<View className="absolute w-full bg-white flex-row items-center justify-between z-50 " style={{top:40, left:20}}>
            <TextInput onChangeText={(v)=>filterfun(v)} style={{padding:8, width:'95%'}} className="border rounded-md p-2" placeholder="Search Surah" />
            <TouchableOpacity onPress={()=>{setshowSearch(false);filterfun('')}} className="ml-2" style={{marginLeft:10}}>
                <FontAwesome name="close" size={24} color="#2C7A7B" />
            </TouchableOpacity>
        </View>}
      {/* Menu Icon */}
      <TouchableOpacity onPress={showNavbar}>
        <FontAwesome name="bars" size={28} color="#2C7A7B" />
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-2xl font-bold text-teal-700">QURAN MAZID</Text>

      

      {/* Search Icon */}
      <TouchableOpacity onPress={()=>setshowSearch(true)} >
        <FontAwesome name="search" size={24} color="#2C7A7B" />
      </TouchableOpacity>
    </View>
  );
}
