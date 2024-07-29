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

const ListHeaderComponent = ({
  onRefreshPress,
}: {
  onRefreshPress: () => void;
}) => {
  return (
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
        <Refresh size={16} name="refresh-ccw" />
      </TouchableOpacity>
    </View>
  );
};

const renderItem = ({item}: {item: any}) => {
  return <NewsListCard data={item} />;
};

const NewsList = ({
  displayedHeadlines,
  onRefreshPress,
}: {
  displayedHeadlines: any;
  onRefreshPress: () => void;
}) => {
  const listHeaderComponent = () => (
    <ListHeaderComponent onRefreshPress={onRefreshPress} />
  );
  return (
    <FlatList
      ListHeaderComponent={listHeaderComponent}
      data={displayedHeadlines}
      renderItem={renderItem}
      keyExtractor={(item, index) => item?.id?.toString()}
      contentContainerStyle={{paddingBottom: 100}}
    />
  );
};

export default NewsList;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
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
});
