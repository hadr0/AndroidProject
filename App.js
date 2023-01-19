import React, { useEffect, useState, } from 'react';
import { Button, View, FlatList, Text } from 'react-native';

const wait = (timeout) => { return new Promise(resolve => { setTimeout(resolve, timeout); }); }

export default function App({ routet }) {
  const onRefresh = React.useCallback(() => { setRefreshing(true); wait(2000).then(() => setRefreshing(false), setOpen(false), loadKeychains()); }, []);
  const [refreshing, setRefreshing] = useState(false);

  const [fruits, setFruits] = useState(null);

  useEffect(() => {
    fetch("http://10.0.2.2:8080/fruits")
      .then(response => response.json())
      .then((responseJson) => {
        console.log("geting data from fetch", responseJson);
        setFruits(responseJson);
      })
      .catch(error => console.log(error));
  },
    [])

  const printElement = ({ item }) => {
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>{item.price}</Text>
        </View>
      </ScrollView>

    )

  }

  return (
    <FlatList
      data={fruits}
      renderItem={printElement}
      keyExtractor={item => item.id}
    />
  )
}





