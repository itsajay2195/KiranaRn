import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {NewsItemProps} from '../../../Types/HomescreenTypes';
import Typography from '../../../components/Typography';
import {dateFormatter} from '../../../utils/utils';
import {Swipeable} from 'react-native-gesture-handler';
import {theme} from '../../../styles/themes';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Trash from 'react-native-vector-icons/EvilIcons';

const renderLeftActions = (onPin: () => void, onDelete: () => void) => {
  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={onDelete} style={styles.swipeIconWrapper}>
        <Trash
          name={'trash'}
          size={theme.iconSizes.xMedium}
          color={theme.colors.white}
        />
        <Typography variant="caption" style={{color: theme.colors.white}}>
          Delete
        </Typography>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPin} style={styles.swipeIconWrapper}>
        <Icon
          name={'pin'}
          size={theme.iconSizes.small}
          color={theme.colors.white}
        />
        <Typography style={{color: theme.colors.white}} variant="caption">
          Pin
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const NewsListCard = ({
  data,
  onDeletePressed,
  onPinPressed,
  isPinnedItem,
}: {
  data: NewsItemProps;
  onPinPressed: (val: {id: string}) => void;
  onDeletePressed: (val: {id: string}) => void;
  isPinnedItem: boolean;
}) => {
  return (
    <Swipeable
      enabled={!isPinnedItem}
      renderRightActions={(progress, dragX) =>
        renderLeftActions(
          () => onPinPressed(data),
          () => onDeletePressed(data),
        )
      }>
      <View style={styles.container}>
        <View style={styles.infoSection}>
          {isPinnedItem ? (
            <View style={styles.pinnedItemWrapper}>
              <Icon
                name={'pin'}
                size={theme.iconSizes.small}
                color={theme.colors.primary}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.labelLetterStyle,
              {backgroundColor: data?.textBgColor || '#FF0000'},
            ]}>
            <Typography
              style={{color: theme.colors.black, fontWeight: 'bold'}}
              variant={'caption'}>
              {data?.source?.name?.[0]}
            </Typography>
          </View>
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

const styles = StyleSheet.create({
  container: {
    padding: theme.sizes.xMedium,
    backgroundColor: theme.colors.background,
  },
  centerContent: {
    flexDirection: 'row',
    gap: theme.sizes.small,
    paddingVertical: theme.sizes.small,
  },
  titleContainer: {flex: 3},
  imageWrapper: {
    height: 77,
    width: 77,
  },
  imageStyle: {height: '100%', width: '100%', borderRadius: 10},
  infoSection: {flexDirection: 'row', padding: 0},
  pinnedItemWrapper: {
    height: 24,
    width: 24,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: theme.colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  swipeIconWrapper: {
    paddingTop: theme.sizes.small,
    backgroundColor: theme.colors.secondaryBlue,
    paddingHorizontal: theme.sizes.small,
    alignItems: 'center',
    borderTopLeftRadius: 10,
  },
  labelLetterStyle: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginRight: 4,
  },
});
