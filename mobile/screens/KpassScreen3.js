import React from "react";
import PALETTE from "../styles/PALETTE";
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const styles = StyleSheet.create({
  container: {
    margin : 10,
    padding : 20,
    borderRadius : 10,
    backgroundColor : PALETTE.WHITE,
  },
  title: {
    marginBottom : 20,
    fontSize : 18,
    fontWeight : 'bold',
  },
  content : {
    fontSize : 14
  }
});

const information = [
  {id : 1, title : 'K-Pass 카드', content : `말레이시아 체류 교민이나 중단기 방문객중 현지 계좌를 개설할 요건이 안되거나 개설하는데 시간이 걸려 현금이나 수수료가 높은 한국 발행 신용카드나 체크카드를 사용해야만 하는 분들의 불편함을 덜어주기 위해 한인회가 OXPAY와 협력하여 발행하는 선불 기반의 Visa 카드입니다`},
  {id : 2, title : 'K-Pass 카드의 취지', content : `K-PASS 카드를 매개로 (K-PASS 가맹점에서 사용시 자동 캐쉬백 제공) 교민 Community 의 주요 구성원인 교민 소비자와 교민 사업자간의 연계 강화 및 이를 통한 교민사회의 자긍심 고취및 양적 질적 성장 그리고 교민 사업자의 사업 확대에 기여함을 목적으로합니다`},
  {id : 3, title : 'K-Pass 카드 등록 및 프리미엄 계정 전환', content : `안드로이드나 아이폰 앱 스토어에서 GoPayz 를 내려받고 안내에 따라 사용자및 카드등록후 프리미엄 계정으로 전환. 프리미엄 계정은 RM5,000 의 일일 한도내에서 자유롭게 충전및 사용이 가능합니다`},
  {id : 4, title : 'K-Pass 카드 구매 및 가맹점 문의', content : `말레이시아 한인회 : +60 3 6203 2834 / +60 14 830 7914\nOXPAY : +60 3 6205 3015 / +60 16 811 9534`},
  {id : 5, title : 'K-Pass 충전', content : `- 7 Eleven 을 통한 현금 충전\n- Internet Banking 을 이용한 GoPayz 앱 내에서의 충전\n- OXPAY 를 통한 개별및 Bulk 충전`},
  {id : 6, title : 'K-Pass 카드 사용자 캐쉬백 혜택', content : `결제금액의 2%를 사용자의 카드계정에 자동 캐쉬백 처리. 가맹점에 따라 캐쉬백 % 는 상이할수있으니 K-Pass 가맹점 List 상의 캐쉬백 % 를 참고하세요`},
  {id : 7, title : '트래블월렛카드 캐쉬백', content : `K-Pass 가맹점은 동시에 트래블월렛의 캐쉬백 가맹점이 됩니다. 결제금액의 1%가 트래블월렛 사용자 카드계정에 자동 캐쉬백 처리되고 캐쉬백 % 는 카드 가맹점 별로 상이할수 있으니 트래블월렛 가맹점 List 상의 캐쉬백 %를  참고하세요`}
]

export default function KpassScreen3(){

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTintColor : PALETTE.WHITE, 
      headerStyle: {backgroundColor: PALETTE.PURPLE,},
    });
  }, [navigation]);

  return (
    <View style={{backgroundColor : PALETTE.BACKGROUND, height : '100%', width : '100%'}}>
      <View style={styles.container}>
        <Text style={styles.title}>K-Pass 카드 사용자 캐쉬백 혜택</Text>
        <Text style={styles.content}>{`결제금액의 2%를 사용자의 카드계정에 자동 캐쉬백 처리. 가맹점에 따라 캐쉬백 % 는 상이할수있으니 K-Pass 앱에서 캐쉬백 % 를 참고하세요`}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>TravelWallet 카드 캐쉬백</Text>
        <Text style={styles.content}>{`K-Pass 가맹점은 동시에 트래블월렛의 캐쉬백 가맹점이 됩니다. 결제금액의 1%가 트래블월렛 사용자 카드계정에 자동 캐쉬백 처리되고 캐쉬백 % 는 카드 가맹점 별로 상이할수 있으니 K-Pass 앱에서 트래블월렛 가맹점의 캐쉬백 %를  참고하세요`}</Text>
      </View>
    </View>
  );
};