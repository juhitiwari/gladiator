import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard, ToastAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetNumberFromCommaSeparatedNumber } from 'number-formatter';
import { theme } from '../constants';

const showToast = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
};

const SliderLabel = (props) => {
  const [editing, Isediting] = useState(false);
  const inputRef = useRef();

  return (
    <View style={styles.measure}>
      <Text style={styles.caption}> {props.label}</Text>

      <View style={{ flexDirection: 'row' }}>
        {props.caption === 'Rs.' ? <Text style={{ marginTop: 5 }}>Rs. </Text> : null}
        <TextInput
          value={`${props.value}`}
          keyboardType="numeric"
          numeric
          editable={editing}
          selectTextOnFocus={editing}
          ref={inputRef}
          onChangeText={(text) => {
            let num = isNaN(parseInt(GetNumberFromCommaSeparatedNumber(text)))
              ? 0
              : parseInt(GetNumberFromCommaSeparatedNumber(text));
            num = props.caption === 'Rs. ' && num === 0 ? 1 : num;
            if (num > props.max) {
              num = props.max;
              showToast(`Maximum value allowed : ${props.caption==='Rs'?props.caption:""} ${props.max} ${props.caption!='Rs'?props.caption:""}`);
            }
            num = num >= props.max ? props.max : num;
            props.onChange(parseFloat(num));
          }}
        />
        {props.caption !== 'Rs.' ? <Text style={{ marginTop: 5 }}>{props.caption} </Text> : null}
        {editing === false ? (
          <Icon
            name="pencil"
            onPress={() => {
              Isediting(true);
              setTimeout(() => inputRef.current.focus(), 0);
            }}
            size={20}
            color={theme.colors.tertiary}
            style={{ marginLeft: theme.sizes.base }}
          />
        ) : (
          <Icon
            name="check"
            onPress={() => {
              Keyboard.dismiss();
              Isediting(false);
            }}
            size={20}
            color={theme.colors.tertiary}
            style={{ marginLeft: theme.sizes.base }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: theme.sizes.font,
  },
  measure: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: theme.sizes.base * 0.5,
    marginLeft: theme.sizes.base,
    marginTop: theme.sizes.base,
  },
});
export { SliderLabel };
