import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {lightTheme} from '../../styles/themes';
import {useLoadHeadLines} from '../../hooks/useLoadHeadLines';
import {useQuery} from '@realm/react';

const SplashScreen = ({navigation}: any) => {
  const savedHeadlines = useQuery('News');
  const {loadHeadlines, loading} = useLoadHeadLines(navigation);
  useEffect(() => {
    if (savedHeadlines?.length == 0) {
      loadHeadlines(true, 0);
    } else {
      setTimeout(() => navigation?.navigate('Home'), 2000);
    }
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
