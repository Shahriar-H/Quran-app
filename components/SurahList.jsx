import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';


const surahs = [
    { id: 1, title: 'Al-Faatiha', arabic: 'الفاتحة', ayahs: 7 },
    { id: 2, title: 'Al-Baqara', arabic: 'البقرة', ayahs: 286 },
    { id: 3, title: 'Aal-i-Imraan', arabic: 'آل عمران', ayahs: 200 },
    { id: 4, title: 'An-Nisaa', arabic: 'النساء', ayahs: 176 },
    { id: 5, title: 'Al-Maida', arabic: 'المائدة', ayahs: 120 },
    { id: 6, title: 'Al-An’aam', arabic: 'الأنعام', ayahs: 165 },
    { id: 7, title: 'Al-A’raaf', arabic: 'الأعراف', ayahs: 206 },
    { id: 8, title: 'Al-Anfaal', arabic: 'الأنفال', ayahs: 75 },
    { id: 9, title: 'At-Tawba', arabic: 'التوبة', ayahs: 129 },
    { id: 10, title: 'Yunus', arabic: 'يونس', ayahs: 109 },
    { id: 11, title: 'Hud', arabic: 'هود', ayahs: 123 },
    { id: 12, title: 'Yusuf', arabic: 'يوسف', ayahs: 111 },
    { id: 13, title: 'Ar-Ra’d', arabic: 'الرعد', ayahs: 43 },
    { id: 14, title: 'Ibrahim', arabic: 'إبراهيم', ayahs: 52 },
    { id: 15, title: 'Al-Hijr', arabic: 'الحجر', ayahs: 99 },
    { id: 16, title: 'An-Nahl', arabic: 'النحل', ayahs: 128 },
    { id: 17, title: 'Al-Isra', arabic: 'الإسراء', ayahs: 111 },
    { id: 18, title: 'Al-Kahf', arabic: 'الكهف', ayahs: 110 },
    { id: 19, title: 'Maryam', arabic: 'مريم', ayahs: 98 },
    { id: 20, title: 'Taa-Haa', arabic: 'طه', ayahs: 135 },
    { id: 21, title: 'Al-Anbiyaa', arabic: 'الأنبياء', ayahs: 112 },
    { id: 22, title: 'Al-Hajj', arabic: 'الحج', ayahs: 78 },
    { id: 23, title: 'Al-Muminoon', arabic: 'المؤمنون', ayahs: 118 },
    { id: 24, title: 'An-Noor', arabic: 'النور', ayahs: 64 },
    { id: 25, title: 'Al-Furqan', arabic: 'الفرقان', ayahs: 77 },
    { id: 26, title: 'Ash-Shu’araa', arabic: 'الشعراء', ayahs: 227 },
    { id: 27, title: 'An-Naml', arabic: 'النمل', ayahs: 93 },
    { id: 28, title: 'Al-Qasas', arabic: 'القصص', ayahs: 88 },
    { id: 29, title: 'Al-Ankaboot', arabic: 'العنكبوت', ayahs: 69 },
    { id: 30, title: 'Ar-Room', arabic: 'الروم', ayahs: 60 },
    { id: 31, title: 'Luqman', arabic: 'لقمان', ayahs: 34 },
    { id: 32, title: 'As-Sajda', arabic: 'السجدة', ayahs: 30 },
    { id: 33, title: 'Al-Ahzaab', arabic: 'الأحزاب', ayahs: 73 },
    { id: 34, title: 'Saba', arabic: 'سبأ', ayahs: 54 },
    { id: 35, title: 'Faatir', arabic: 'فاطر', ayahs: 45 },
    { id: 36, title: 'Yaseen', arabic: 'يس', ayahs: 83 },
    { id: 37, title: 'As-Saaffaat', arabic: 'الصافات', ayahs: 182 },
    { id: 38, title: 'Saad', arabic: 'ص', ayahs: 88 },
    { id: 39, title: 'Az-Zumar', arabic: 'الزمر', ayahs: 75 },
    { id: 40, title: 'Ghaafir', arabic: 'غافر', ayahs: 85 },
    { id: 41, title: 'Fussilat', arabic: 'فصلت', ayahs: 54 },
    { id: 42, title: 'Ash-Shoora', arabic: 'الشورى', ayahs: 53 },
    { id: 43, title: 'Az-Zukhruf', arabic: 'الزخرف', ayahs: 89 },
    { id: 44, title: 'Ad-Dukhaan', arabic: 'الدخان', ayahs: 59 },
    { id: 45, title: 'Al-Jaathiya', arabic: 'الجاثية', ayahs: 37 },
    { id: 46, title: 'Al-Ahqaaf', arabic: 'الأحقاف', ayahs: 35 },
    { id: 47, title: 'Muhammad', arabic: 'محمد', ayahs: 38 },
    { id: 48, title: 'Al-Fath', arabic: 'الفتح', ayahs: 29 },
    { id: 49, title: 'Al-Hujuraat', arabic: 'الحجرات', ayahs: 18 },
    { id: 50, title: 'Qaaf', arabic: 'ق', ayahs: 45 },
    { id: 51, title: 'Adh-Dhaariyat', arabic: 'الذاريات', ayahs: 60 },
    { id: 52, title: 'At-Toor', arabic: 'الطور', ayahs: 49 },
    { id: 53, title: 'An-Najm', arabic: 'النجم', ayahs: 62 },
    { id: 54, title: 'Al-Qamar', arabic: 'القمر', ayahs: 55 },
    { id: 55, title: 'Ar-Rahmaan', arabic: 'الرحمن', ayahs: 78 },
    { id: 56, title: 'Al-Waaqia', arabic: 'الواقعة', ayahs: 96 },
    { id: 57, title: 'Al-Hadid', arabic: 'الحديد', ayahs: 29 },
    { id: 58, title: 'Al-Mujaadila', arabic: 'المجادلة', ayahs: 22 },
    { id: 59, title: 'Al-Hashr', arabic: 'الحشر', ayahs: 24 },
    { id: 60, title: 'Al-Mumtahina', arabic: 'الممتحنة', ayahs: 13 },
    { id: 61, title: 'As-Saff', arabic: 'الصف', ayahs: 14 },
    { id: 62, title: 'Al-Jumu’a', arabic: 'الجمعة', ayahs: 11 },
    { id: 63, title: 'Al-Munaafiqoon', arabic: 'المنافقون', ayahs: 11 },
    { id: 64, title: 'At-Taghaabun', arabic: 'التغابن', ayahs: 18 },
    { id: 65, title: 'At-Talaaq', arabic: 'الطلاق', ayahs: 12 },
    { id: 66, title: 'At-Tahrim', arabic: 'التحريم', ayahs: 12 },
    { id: 67, title: 'Al-Mulk', arabic: 'الملك', ayahs: 30 },
    { id: 68, title: 'Al-Qalam', arabic: 'القلم', ayahs: 52 },
    { id: 69, title: 'Al-Haaqqa', arabic: 'الحاقة', ayahs: 52 },
    { id: 70, title: 'Al-Ma’aarij', arabic: 'المعارج', ayahs: 44 },
    { id: 71, title: 'Nuh', arabic: 'نوح', ayahs: 28 },
    { id: 72, title: 'Al-Jinn', arabic: 'الجن', ayahs: 28 },
    { id: 73, title: 'Al-Muzzammil', arabic: 'المزمل', ayahs: 20 },
    { id: 74, title: 'Al-Muddaththir', arabic: 'المدثر', ayahs: 56 },
    { id: 75, title: 'Al-Qiyama', arabic: 'القيامة', ayahs: 40 },
    { id: 76, title: 'Al-Insan', arabic: 'الإنسان', ayahs: 31 },
    { id: 77, title: 'Al-Mursalat', arabic: 'المرسلات', ayahs: 50 },
    { id: 78, title: 'An-Naba', arabic: 'النبأ', ayahs: 40 },
    { id: 79, title: 'An-Nazi’at', arabic: 'النازعات', ayahs: 46 },
    { id: 80, title: 'Abasa', arabic: 'عبس', ayahs: 42 },
    { id: 81, title: 'At-Takwir', arabic: 'التكوير', ayahs: 29 },
    { id: 82, title: 'Al-Infitar', arabic: 'الإنفطار', ayahs: 19 },
    { id: 83, title: 'Al-Mutaffifin', arabic: 'المطففين', ayahs: 36 },
    { id: 84, title: 'Al-Inshiqaq', arabic: 'الإنشقاق', ayahs: 25 },
    { id: 85, title: 'Al-Buruj', arabic: 'البروج', ayahs: 22 },
    { id: 86, title: 'At-Tariq', arabic: 'الطارق', ayahs: 17 },
    { id: 87, title: 'Al-A’la', arabic: 'الأعلى', ayahs: 19 },
    { id: 88, title: 'Al-Ghashiyah', arabic: 'الغاشية', ayahs: 26 },
    { id: 89, title: 'Al-Fajr', arabic: 'الفجر', ayahs: 30 },
    { id: 90, title: 'Al-Balad', arabic: 'البلد', ayahs: 20 },
    { id: 91, title: 'Ash-Shams', arabic: 'الشمس', ayahs: 15 },
    { id: 92, title: 'Al-Lail', arabic: 'الليل', ayahs: 21 },
    { id: 93, title: 'Adh-Dhuha', arabic: 'الضحى', ayahs: 11 },
    { id: 94, title: 'Al-Inshirah', arabic: 'الشرح', ayahs: 8 },
    { id: 95, title: 'At-Tin', arabic: 'التين', ayahs: 8 },
    { id: 96, title: 'Al-Alaq', arabic: 'العلق', ayahs: 19 },
    { id: 97, title: 'Al-Qadr', arabic: 'القدر', ayahs: 5 },
    { id: 98, title: 'Al-Bayyina', arabic: 'البينة', ayahs: 8 },
    { id: 99, title: 'Az-Zalzalah', arabic: 'الزلزلة', ayahs: 8 },
    { id: 100, title: 'Al-Adiyat', arabic: 'العاديات', ayahs: 11 },
    { id: 101, title: 'Al-Qari’ah', arabic: 'القارعة', ayahs: 11 },
    { id: 102, title: 'At-Takathur', arabic: 'التكاثر', ayahs: 8 },
    { id: 103, title: 'Al-Asr', arabic: 'العصر', ayahs: 3 },
    { id: 104, title: 'Al-Humazah', arabic: 'الهمزة', ayahs: 9 },
    { id: 105, title: 'Al-Fil', arabic: 'الفيل', ayahs: 5 },
    { id: 106, title: 'Quraish', arabic: 'قريش', ayahs: 4 },
    { id: 107, title: 'Al-Ma’un', arabic: 'الماعون', ayahs: 7 },
    { id: 108, title: 'Al-Kawthar', arabic: 'الكوثر', ayahs: 3 },
    { id: 109, title: 'Al-Kafirun', arabic: 'الكافرون', ayahs: 6 },
    { id: 110, title: 'An-Nasr', arabic: 'النصر', ayahs: 3 },
    { id: 111, title: 'Al-Masad', arabic: 'المسد', ayahs: 5 },
    { id: 112, title: 'Al-Ikhlas', arabic: 'الإخلاص', ayahs: 4 },
    { id: 113, title: 'Al-Falaq', arabic: 'الفلق', ayahs: 5 },
    { id: 114, title: 'An-Nas', arabic: 'الناس', ayahs: 6 }
    
];

export default function SurahList({searchword}) {
  const router = useRouter()
  

  const renderSurah = ({item,index}) => (
    <TouchableOpacity onPress={()=>router.push(`/explore?surah=${item?.id}&name=${item?.title}&arabic=${item.arabic}`)} key={item?.id} className="flex-row justify-between items-center p-6 py-3 border-b border-gray-200">
      <View className="flex-row">
        <View className="bg-green-300 h-12 w-12 justify-center items-center rounded-md mr-3">
            <Text className="text-lg font-bold text-gray-600">{item?.id}</Text>
        </View>
        <View>
            <Text className="text-teal-900 font-bold">{item.title}</Text>
            <Text style={{textAlign:'left'}} className="text-gray-500">{item.arabic}</Text>
        </View>
      </View>
      <Text className="text-teal-700">{item.ayahs} Ayahs</Text>
    </TouchableOpacity>
  );

  return (
    <View className="mt-6" showsVerticalScrollIndicator={false}>
      
      <FlatList
        data={surahs}
        renderItem={({ item,index }) => searchword!==''?item?.title.includes(searchword)&& renderSurah({item,index}):renderSurah({item,index})}
        keyExtractor={(item, index) => index.toString()}
        style={{height:'65%'}}
      />
     
    </View>
  );
}
