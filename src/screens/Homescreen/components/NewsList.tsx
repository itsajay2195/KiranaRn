import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import NewsListCard from './NewsListCard';
import Refresh from 'react-native-vector-icons/Feather';
import {theme} from '../../../styles/themes';

const ListHeaderComponent = ({
  onRefreshPress,
  pinnedHeadline,
}: {
  onRefreshPress: () => void;
  pinnedHeadline: any;
}) => {
  return (
    <View style={styles.headerComponentContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.headerImageStyle}
            source={require('../../../assets//png/headline.png')}
          />
        </View>
        <TouchableOpacity
          onPress={onRefreshPress}
          style={styles.headerRefreshIconWrapper}>
          <Refresh size={theme.iconSizes.small} name="refresh-ccw" />
        </TouchableOpacity>
      </View>
      {Object.keys(pinnedHeadline)?.length > 0 ? (
        <NewsListCard
          data={pinnedHeadline}
          onPinPressed={() => {}}
          onDeletePressed={() => {}}
          isPinnedItem={true}
        />
      ) : null}
    </View>
  );
};

const itemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        opacity: 0.25,
        backgroundColor: theme.colors.grey,
      }}
    />
  );
};
const RenderItem = ({
  data,
  onPinPressed,
  onDeletePressed,
}: {
  data: any;
  onPinPressed: (val: {id: string}) => void;
  onDeletePressed: (val: {id: string}) => void;
}) => {
  return (
    <NewsListCard
      data={data}
      onPinPressed={onPinPressed}
      onDeletePressed={onDeletePressed}
      isPinnedItem={false}
    />
  );
};

const NewsList = ({
  displayedHeadlines,
  onRefreshPress,
  onPinPressed,
  onDeletePressed,
  pinnedHeadline,
}: {
  displayedHeadlines: any;
  onRefreshPress: () => void;
  onPinPressed: (val: {id: string}) => void;
  onDeletePressed: (val: {id: string}) => void;
  pinnedHeadline: any;
}) => {
  const listHeaderComponent = () => (
    <ListHeaderComponent
      onRefreshPress={onRefreshPress}
      pinnedHeadline={pinnedHeadline}
    />
  );

  const renderItem = ({item, index}: any) => (
    <RenderItem
      data={item}
      onDeletePressed={onDeletePressed}
      onPinPressed={onPinPressed}
    />
  );
  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={displayedHeadlines}
      renderItem={renderItem}
      keyExtractor={(item, index) => item?.id?.toString()}
      contentContainerStyle={{paddingBottom: 100}}
      ItemSeparatorComponent={itemSeparator}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imageContainer: {
    flex: 1,
  },
  headerImageStyle: {height: 45, width: 111},
  headerRefreshIconWrapper: {
    height: 28,
    width: 28,
    justifyContent: 'center',
    marginRight: 10,
  },
  headerComponentContainer: {
    borderBottomWidth: 0.25,
    borderBottomColor: theme.colors.grey,
  },
});
