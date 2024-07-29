import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NewsItemProps} from '../../../Types/HomescreenTypes';
import Typography from '../../../components/Typography';
import {useTheme} from '../../../context/ThemeContext';
import {dateFormatter} from '../../../utils/utils';
import {Swipeable} from 'react-native-gesture-handler';
import {lightTheme} from '../../../styles/themes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Trash from 'react-native-vector-icons/EvilIcons';

const renderLeftActions = (onPin: () => void, onDelete: () => void) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={onDelete}
        style={{
          paddingTop: lightTheme.sizes.small,
          backgroundColor: lightTheme.colors.secondaryBlue,
          paddingHorizontal: 8,
          alignItems: 'center',
          borderTopLeftRadius: 10,
        }}>
        <Trash name={'trash'} size={20} color={lightTheme.colors.white} />
        <Typography variant="caption" style={{color: lightTheme.colors.white}}>
          Delete
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onPin}
        style={{
          paddingTop: lightTheme.sizes.small,
          backgroundColor: lightTheme.colors.secondaryBlue,
          paddingHorizontal: 8,
          alignItems: 'center',
          borderBottomLeftRadius: 10,
        }}>
        <Icon name={'pin'} size={16} color={lightTheme.colors.white} />
        <Typography style={{color: lightTheme.colors.white}} variant="caption">
          Pin
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const NewsListCard = ({data}: NewsItemProps) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderLeftActions(
          () => console.log('onPin'),
          () => console.log('onDelete'),
        )
      }>
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
    </Swipeable>
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
