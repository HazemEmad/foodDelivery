import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';

const ModalOfPayment = ({showGateway, setShowGateway, makeOrder}) => {
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');

  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      alert('PAYMENT MADE SUCCESSFULLY!');
      makeOrder();
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }
  }
  return (
    <Modal
      visible={showGateway}
      onDismiss={() => setShowGateway(false)}
      onRequestClose={() => setShowGateway(false)}
      animationType={'fade'}
      transparent>
      <View style={styles.webViewCon}>
        <View style={styles.wbHead}>
          <TouchableOpacity
            style={{padding: 13}}
            onPress={() => setShowGateway(false)}>
            <Feather name={'x'} size={24} />
          </TouchableOpacity>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
              color: '#00457C',
            }}>
            PayPal GateWay
          </Text>
          <View style={{padding: 13, opacity: prog ? 1 : 0}}>
            <ActivityIndicator size={24} color={progClr} />
          </View>
        </View>
        <WebView
          source={{uri: 'https://my-pay-web.web.app/'}}
          style={{flex: 1}}
          onLoadStart={() => {
            setProg(true);
            setProgClr('#000');
          }}
          onLoadProgress={() => {
            setProg(true);
            setProgClr('#00457C');
          }}
          onLoadEnd={() => {
            setProg(false);
          }}
          onLoad={() => {
            setProg(false);
          }}
          onMessage={onMessage}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default ModalOfPayment;
