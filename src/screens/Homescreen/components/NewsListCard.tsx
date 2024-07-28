import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {NewsItemProps} from '../../../Types/HomescreenTypes';
import Typography from '../../../components/Typography';
import {useTheme} from '../../../context/ThemeContext';
import {dateFormatter} from '../../../utils/utils';

const NewsListCard = ({data}: NewsItemProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  console.log(JSON.stringify(data, null, 3));
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <View style={{flex: 3, flexDirection: 'row'}}>
          <Typography style={{color: theme.colors.grey}} variant={'caption'}>
            {data?.source?.name}
          </Typography>
        </View>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          <Typography style={{color: theme.colors.black}} variant="subText">
            {dateFormatter(data?.publishedAt || new Date())}
          </Typography>
        </View>
      </View>
      <View style={styles.centerContent}>
        <View style={styles.titleContainer}>
          <Typography numberOfLines={3} variant={'body'}>
            {data?.title}
          </Typography>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.imageStyle}
            source={{
              uri:
                data?.urlToImage ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EiVVE-6Yy60Gw9iGKVOtixTHVl7VFPJ2zM6Fk1Gvwiz4Oen-dxZ-58oyy0vtPBbNsO4&usqp=CAU',
            }}
          />
        </View>
      </View>

      <View>
        <Typography style={{color: theme.colors.grey}} variant={'subText'}>
          {data?.author}
        </Typography>
      </View>
    </View>
  );
};

export default NewsListCard;

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: theme.colors.background,
    },
    centerContent: {
      flexDirection: 'row',
      gap: 8,
      paddingVertical: 8,
    },
    titleContainer: {flex: 3},
    imageWrapper: {
      height: 77,
      width: 77,
    },
    imageStyle: {height: '100%', width: '100%', borderRadius: 10},
    infoSection: {flexDirection: 'row', padding: 0},
  });
