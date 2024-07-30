import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';

import {theme} from '../../styles/themes';
import {useLoadHeadLines} from '../../hooks/useLoadHeadLines';
import {useQuery} from '@realm/react';

const SplashScreen = ({navigation}: any) => {
  const savedHeadlines = useQuery('News');
  const {loadHeadlines, loading} = useLoadHeadLines(navigation);
  useEffect(() => {
    if (!savedHeadlines || savedHeadlines?.length == 0) {
      loadHeadlines(true, 0);
    } else {
      console.log('inside else', savedHeadlines);
      setTimeout(() => navigation?.navigate('Home'), 2000);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../assets//png/headline.png')}
      />
      {loading ? (
        <ActivityIndicator size={'small'} color={theme.colors.primary} />
      ) : null}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  imageStyle: {width: '100%', height: 80},
});
