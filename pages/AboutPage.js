import React, {useEffect} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';

export default function AboutPage({navigation, route}){
  useEffect(() => {
    navigation.setOptions({
      title: "소개 페이지",
      headerStyle: {
        backgroundColor: "#1F266A",
        shadowColor: "#1F266A",
      },
      headerTintColor: "#fff"
    });
  },[])

return (
<View style={styles.container}>
  <StatusBar style="black" />
  <Text style={styles.title}>
    Hi! 나만의 꿀팁 앱에 오신 것을 환영합니다
  </Text>
  <View style={styles.middleContainer}>
    <Image style={styles.mainImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/sparta-image.appspot.com/o/lecture%2FaboutImage.png?alt=media&token=13e1c4f6-b802-4975-"}}/>
    <Text style={styles.middleText}>
      최대한의 많은 꿀팁들을 담아내려고 노력했습니다!
    </Text>
    <Text style={styles.middleDesc}>
      여러분들에게도 도움이 될 수 있는 일상 꿀팁이 되길 바랍니다 ☺️
    </Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>
        여러분의 인스타 계정
      </Text>
    </TouchableOpacity>
  </View>
</View>)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1F266A",
    alignItems: "center",
    flex: 1 // 화면 전체를 1의 비율만큼 차지
  },
  title: {
    marginTop: 30,
    marginBottom: 50,
    marginHorizontal: 40,
    color: "#fff",
    fontSize: 35
  },
  middleContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    width: 300,
    height: 470,
    borderRadius: 30
  },
  mainImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginTop: 50,
    marginBottom: 20
  },
  middleText: {
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 30
  },
  middleDesc: {
    fontSize: 15,
    fontWeight: "700",
    marginHorizontal: 15,
    textAlign: "center",
    marginBottom: 30
  },
  button: {
    backgroundColor: "rgb(243,177,62)",
    padding: 20,
    borderRadius: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700"
  }
})