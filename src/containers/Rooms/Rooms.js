import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Context} from '../../contexts';
import {useRoute} from '@react-navigation/core';
import AddNewRoom from './AddNewRoom';

const Rooms = () => {
  const {state, setState} = useContext(Context);
  const route = useRoute();
  const [type, setType] = useState('admin');
  const email = route.params?.email;
  const [rooms, setRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    console.log('Email', email);
    if (email == 'admin@gmail.com') {
      setType('admin');
    } else {
      setType('user');
    }
  }, [email]);

  useEffect(() => {
    const item = state.filter(item => {
      return item.status == 'Free';
    });
    setRoom(item);
  }, [state]);

  const renderAdminItem = ({item, index}) => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.name}</Text>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Button onPress={() => changeStatus(item)} title={'Free'} />
          </View>

          <View>
            <Button
              disabled={item.status == 'Booked'}
              onPress={() => deleteRoom(item)}
              title="Delete"
            />
          </View>
        </View>
      </View>
    );
  };

  const renderUserItem = ({item, index}) => {
    if (item.status == 'Free') {
      return (
        <TouchableOpacity
          onPress={() => setSelectedRoom(item)}
          style={{
            flexDirection: 'row',
            paddingVertical: 10,
            justifyContent: 'space-between',
            backgroundColor:
              selectedRoom && selectedRoom.name == item.name ? 'green' : '#fff',
          }}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const addRoom = val => {
    console.log('val', val);
    const payload = {
      name: val.room,
      status: 'Free',
    };
    let arr = [...state, payload];
    setState(arr);
  };

  const deleteRoom = item => {
    let arr = [...state];
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    console.log(arr);
    setState(arr);
    Alert.alert('Success', 'This room is deleted!');
  };

  const orderRooms = () => {
    if (selectedRoom) {
      var item = state.find(x => x.name == selectedRoom.name);
      if (item) {
        item.status = 'Booked';
      }

      let arr = [...state];
      setState(arr);
      Alert.alert('Success', 'Your room is booked!');
    }
  };

  const changeStatus = val => {
    if (val) {
      var item = state.find(x => x.name == val.name);
      if (item) {
        item.status = 'Free';
      }

      let arr = [...state];
      setState(arr);
      Alert.alert('Success', 'This room is free!');
    }
  };

  return (
    <View style={{padding: 8}}>
      {type == 'admin' && (
        <>
          <AddNewRoom onSave={val => addRoom(val)} roomList={state} />
          <FlatList
            data={state}
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={renderAdminItem}
            keyExtractor={(item, index) => `List_${index}`}
          />
        </>
      )}

      {type == 'user' && (
        <>
          {state.length > 0 && (
            <FlatList
              data={state}
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}
              bounces={false}
              renderItem={renderUserItem}
              keyExtractor={(item, index) => `List_${index}`}
              ListEmptyComponent={<Text>No rooms found</Text>}
            />
          )}
          {rooms.length == 0 && (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>No rooms found</Text>
            </View>
          )}
          {rooms.length > 0 && (
            <Button onPress={() => orderRooms()} title="Order Rooms" />
          )}
        </>
      )}
    </View>
  );
};

export default Rooms;
