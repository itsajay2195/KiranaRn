import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {lightTheme} from '../../styles/themes';
import {useLoadHeadLines} from '../../hooks/useLoadHeadLines';

const SplashScreen = ({navigation}: any) => {
  const {loadHeadlines, loading} = useLoadHeadLines(navigation);
  useEffect(() => {
    loadHeadlines(true, 0);
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        style={{width: '100%', height: 80}}
        source={require('../../assets//png/headline.png')}
      />
      {loading ? (
        <ActivityIndicator size={'small'} color={lightTheme.colors.primary} />
      ) : null}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
