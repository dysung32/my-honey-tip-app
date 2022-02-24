import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Share} from 'react-native';
import * as Linking from 'expo-linking';

export default function DetailPage({navigation, route}) {
  const [tip, setTip] = useState({
    "idx": 9,
    "category": "재테크",
    "title": "렌탈 서비스 금액 비교해보기",
    "image": "https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2Frental.png?alt=media&token=97a55844-f077-4aeb-8402-e0a27221570b",
    "desc": "요즘은 정수기, 공기 청정기, 자동차나 장난감 등 다양한 대여서비스가 활발합니다. 사는 것보다 경제적이라고 생각해 렌탈 서비스를 이용하는 분들이 늘어나고 있는데요. 다만, 이런 렌탈 서비스 이용이 하나둘 늘어나다 보면 그 금액은 겉잡을 수 없이 불어나게 됩니다. 특히, 렌탈 서비스는 빌려주는 물건의 관리비용까지 포함된 것이기에 생각만큼 저렴하지 않습니다. 직접 관리하며 사용할 수 있는 물건이 있는지 살펴보고, 렌탈 서비스 항목에서 제외해보세요. 렌탈 비용과 구매 비용, 관리 비용을 여러모로 비교해보고 고민해보는 것이 좋습니다. ",
    "date": "2020.09.09"
  });

  useEffect(() => {
    console.log(route)

    // Card.js에서 navigation.navigate 함수를 쓸 때 두번째 인자로 content를 넘겨줬음
    // content는 딕셔너리 그 자체였으므로 route.params에 고대로 남겨옵니다.
    // 즉, route.params는 content죠!
    navigation.setOptions({
      // setOptions로 페이지 타이틀도 지정 가능하고
      title: route.params.title,
      //  작성했던 옵션을 다시 수정할 수도 있습니다.
      headerStyle: {
        backgroundColor: "#000",
        shadowColor: "#000",
      },
      headerTintColor: "#fff"
    });
    setTip(route.params)
  },[])
  
  const popup = () => {
    Alert.alert("팝업!!")
  }

  const share = () => {
    Share.share({
      message: `${tip.title} \n\n ${tip.desc} \n\n ${tip.image}` // 문자열
    });
  }

  const link = () => {
    Linking.openURL("https://mylifework.tistory.com/")
  }
  
  return (
  <ScrollView style={styles.container}>
    <Image style={styles.image} source={{uri:tip.image}} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{tip.title}</Text>
      <Text style={styles.desc}>{tip.desc}</Text>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={styles.btn} onPress={() => popup()}>
          <Text style={styles.btnText}>팁 찜하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => share()}>
          <Text style={styles.btnText}>팁 공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => link()}>
          <Text style={styles.btnText}>외부 링크</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  </ScrollView>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  },
  image: {
    height: 400,
    margin: 10,
    marginTop: 40,
    borderRadius: 20
  },
  textContainer: {
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700"
  },
  desc: {
    color: "#fff",
    marginTop: 20
  },
  btnGroup: {
    flexDirection: "row"
  },
  btn: {
    borderColor: "deeppink",
    backgroundColor: "deeppink",
    borderRadius: 7,
    marginTop: 30,
    marginHorizontal: 10,
    width: 100,
    padding: 10
  },
  btnText: {
    color: "#fff",
    textAlign: "center"
  }
})