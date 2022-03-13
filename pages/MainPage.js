import React, { useEffect, useState } from 'react';
import main from '../assets/main.jpg';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
// import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import axios from 'axios';
import {firebase_db} from '../firebaseConfig';

export default function MainPage({navigation, route}) {
  console.disableYellowBox = true;

  // useState 사용법
  // [state, setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는
  // setState는 state를 변경시킬때 사용해야하는 함수

  // 모두 다 useState가 선물해줌
  // useState() 안에 전달되는 값은 state 초기값
  // tip을 관리하기 위한 상태
  const [state, setState] = useState([]);
  // state = [] 빈 리스트(초기값)

  // 카테고리에 따라 다른 꿀팁을 그때그때 저장 관리할 상태
  const [cateState, setCateState] = useState([]);

  // 날씨 데이터 상태 관리 상태 생성
  const [weather, setWeather] = useState({
    temp: 0,
    condition: ''
  })

  // 현재 준비 상태인지, 준비를 끝낸 상태인지의
  // 상태 데이터를 관리하기 위해 또 하나의 상태를 선언
  const [ready, setReady] = useState(true);

  // 하단의 return 문이 실행되어 화면이 그려진 다음 바로 실행되는 useEffect 함수
  // 내부에서 data.json으로부터 가져온 데이터를 state 상태에 담고 있음
  useEffect(()=>{
    // 헤더의 타이틀 변경
    navigation.setOptions({
      title: "나만의 꿀팁"
    })
    setTimeout(()=> { // 1500 ms 뒤에 함수 실행(지연 함수)
      // 상태 관리에 들어간다
      
      // 꿀팁 데이터로 모두 초기화 준비
      firebase_db.ref('/tip').once('value').then((snapshot) => {
        console.log("파이어베이스에서 데이터 가져옴")
        let tip = snapshot.val()
        getLocation()
        setState(tip) // 꿀팁 전체를 상태 관리 저장
        setCateState(tip)
        setReady(false) // 준비가 끝남 (상태가 변경되면 화면이 다시 그려짐)
      })      
    }, 1500)

  },[])

  const getLocation = async () => {
    // 수많은 로직 중에 에러가 발생하면
    // 해당 에러를 포착하여 로직을 멈추고, 에러를 해결하기 위한 catch 영역 로직이 실행
    try {
      // 자바스크립트 함수의 순차적 실행순서를 고정하기 위해 쓰는 async, await
      await Location.requestForegroundPermissionsAsync(); // 위치 허용 요청
      const locationData = await Location.getCurrentPositionAsync(); // 현재 위치 좌표 가져오기
      console.log(locationData);
      const latitude = locationData['coords']['latitude'];
      const longitude = locationData['coords']['longitude'];
      const API_KEY = "cfc258c75e1da2149c33daffd07a911d";
      const result = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      console.log(result);
      const temp = result.data.main.temp;
      const condition = result.data.weather[0].main;

      console.log(temp);
      console.log(condition);

      // 오랜만에 복습해보는 객체 리터럴 방식으로 딕셔너리 구성하기
      setWeather({
        temp, condition
      })

    } catch (error) {
      // 혹시나 위치를 못 가져올 경우를 대비해서 안내를 준비함
      Alert.alert("위치를 찾을 수가 없습니다.", "앱을 껐다 켜볼까요?");
    }
  }

  const category = (cate) => {
    if(cate == "전체 보기") {
      // "전체 보기"이면 전체 꿀팁 데이터를 담고 있는 상태값(state)로 다시 초기화
      setCateState(state)
    } else {
      setCateState(state.filter((d) => {
        // .filter의 역할: return 이 true인 애들만 골라서 리스트를 생성하여 넘겨줌
        return d.category == cate
      }))
    }
  }

  // data.json 데이터는 state에 담기므로 상태에서 꺼내옴
  // let tip = state.tip;
  // let todayWeather = 10 + 17;
  // let todayCondition = "맑음";

  // ready 상태가 true면 : 앞부분 실행 false면 : 뒷부분 실행
  return ready ? <Loading /> : (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      <Text style={styles.weather}>오늘의 날씨: {weather.temp + '°C ' + weather.condition}</Text>
      <TouchableOpacity style={styles.btnAbout} onPress={() => navigation.navigate("About Page")}>
        <Text style={styles.btnAboutText}>소개 페이지</Text>
      </TouchableOpacity>
      <Image style={styles.imageStyle} source={main} />
      <ScrollView style={styles.middleContainer} horizontal={true}>
        <TouchableOpacity style={styles.middleButtonAll} onPress={() => {category('전체 보기')}}>
          <Text style={styles.middleButtonText} onPress={() => {category('전체 보기')}}>전체 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton1} onPress={() => {category('생활')}}>
          <Text style={styles.middleButtonText} onPress={() => {category('생활')}}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton2} onPress={() => {category('재테크')}}>
          <Text style={styles.middleButtonText} onPress={() => {category('재테크')}}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton3} onPress={() => {category('반려견')}}>
          <Text style={styles.middleButtonText} onPress={() => {category('반려견')}}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton4} onPress={() => {navigation.navigate("Like Page")}}>
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */
          cateState.map((content, i)=>{ // 반복문
            return (<Card content={content} key={i} navigation={navigation} />)
          })
        }
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    // 앱의 배경 색
    backgroundColor: "#fff"
  },
  weather: {
    alignSelf: "flex-end",
    paddingRight: 20,
    marginBottom: 10
  },
  btnAbout: {
    width: 90,
    height: 30,
    backgroundColor: "pink",
    borderRadius: 15,
    marginRight: 20,
    marginBottom: 7,
    padding: 6,
    alignSelf: "flex-end"
  },
  btnAboutText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  imageStyle: {
    width: "90%", // 컨텐츠의 넓이 값
    height: 210, // 컨텐츠의 높이 값
    // 컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    alignSelf: "center",
    borderRadius: 20,
    borderColor: "rgb(255,231,167)",
    borderWidth: 3
  },
  middleContainer: {
    marginHorizontal: 7,
    height: 60,
    marginTop: 10
  },
  middleButtonAll: {
    width: 90,
    height: 47,
    padding: 15,
    backgroundColor: "#20b2aa",
    borderRadius: 15,
    margin: 7
  },
  middleButton1: {
    width: 90,
    height: 47,
    padding: 15,
    backgroundColor: "#fdc453",
    borderRadius: 15,
    margin: 7
  },
  middleButton2: {
    width: 90,
    height: 47,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7
  },
  middleButton3: {
    width: 90,
    height: 47,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7
  },
  middleButton4: {
    width: 90,
    height: 47,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7
  },
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center"
  },
  cardContainer: {
    marginTop: 15,
    marginLeft: 7
  }
});