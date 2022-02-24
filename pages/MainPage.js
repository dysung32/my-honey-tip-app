import React, { useEffect, useState } from 'react';
import main from '../assets/main.jpg';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from '../data.json';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { StatusBar } from 'expo-status-bar';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

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

  // 현재 준비 상태인지, 준비를 끝낸 상태인지의
  // 상태 데이터를 관리하기 위해 또 하나의 상태를 선언
  const [ready, setReady] = useState(true);

  // 하단의 return 문이 실행되어 화면이 그려진 다음 실행되는 useEffect 함수
  // 내부에서 data.json으로부터 가져온 데이터를 state 상태에 담고 있음.
  useEffect(()=>{

    setTimeout(()=> { // 1000 ms 뒤에 함수 실행(지연 함수)
      // 상태 관리에 들어간다
      // 헤더의 타이틀 변경
      navigation.setOptions({
        title: "나만의 꿀팁"
      })
      // 꿀팁 데이터로 모두 초기화 준비
      let tip = data.tip;
      setState(tip) // 꿀팁 전체를 상태 관리 저장
      setCateState(tip)
      setReady(false) // 준비가 끝남 (상태가 변경되면 화면이 다시 그려짐)
    }, 1500)

  },[])

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
  let tip = state.tip;
  let todayWeather = 10 + 17;
  let todayCondition = "맑음";

  // ready 상태가 true면 : 앞부분 실행 false면 : 뒷부분 실행
  return ready ? <Loading /> : (
    <ScrollView style={styles.container}>
      <StatusBar style="black" />
      <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition}</Text>
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