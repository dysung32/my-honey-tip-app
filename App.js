import React from 'react';
import main from './assets/main.png';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import data from './data.json';

export default function App() {
  let tip = data.tip;
  let todayWeather = 10 + 17;
  let todayCondition = "흐림";
  console.disableYellowBox = true;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>나만의 꿀팁</Text>
      <Text style={styles.weather}>오늘의 날씨: {todayWeather + '°C ' + todayCondition}</Text>
      <Image style={styles.imageStyle} source={main} />
      <ScrollView style={styles.middleContainer} horizontal={true}>
        <TouchableOpacity style={styles.middleButton1}>
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton2}>
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton3}>
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleButton4}>
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
      { 
          tip.map((content,i)=>{ // 반복문
            return (<View style={styles.card} key={i}>
              <Image style={styles.cardImage} source={{uri:content.image}}/>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{content.desc}</Text>
                <Text style={styles.cardDate}>{content.date}</Text>
              </View>
            </View>)
          })
         }
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#212121",
    marginTop: 40,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "rgb(255,231,167)",
    borderRadius: 30
  },
  weather:{
    alignSelf:"flex-end",
    paddingRight:20
  },
  imageStyle: {
    width: "100%",
    height: 210,
  },
  middleContainer: {
    paddingLeft: 7,
    height: 60,
  },
  middleButton1: {
    width: 100,
    height: 47,
    padding: 15,
    backgroundColor: "#fdc453",
    borderRadius: 15,
    margin: 7
  },
  middleButton2: {
    width: 100,
    height: 47,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7
  },
  middleButton3: {
    width: 100,
    height: 47,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7
  },
  middleButton4: {
    width: 100,
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
  },
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  cardImage: {
    flex: 1,
    width: 100,
    height: 100,
    borderRadius: 10
  },
  cardText: {
    flex: 2,
    marginLeft: 10
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  cardDesc: {
    fontSize: 15,
    marginTop: 5
  },
  cardDate: {
    fontSize: 12,
    marginTop: 7
  }
})