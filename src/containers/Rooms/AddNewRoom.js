import React, {useContext, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {Context} from '../../contexts';
import {Controller, useForm} from 'react-hook-form';
import {MODULES} from '../../navigation/routes';

const inputs = {
  room: {
    label: 'Room',
    name: 'room',
    rules: {
      required: 'room is required!',
    },
  },
};

const AddNewRoom = props => {
  const {onSave, roomList} = props;

  const {control, handleSubmit, errors, setError, clearErrors} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    submitFocusError: true,
  });

  const onSubmit = data => {
    console.log('submit', data);

    if (data.room) {
      const item = roomList.filter(item => {
        return item.name == data.room;
      });
      if (item.length > 0) {
        setError(inputs.room.name, {
          type: 'required',
          message: 'Enter unique name',
        });
      } else {
        clearErrors();
        onSave(data);
      }
    }
  };

  return (
    <>
      <Controller
        control={control}
        name={inputs.room.name}
        rules={inputs.room.rules}
        defaultValue={''}
        render={({onChange, onBlur, value}) => (
          <TextInput
            label={inputs.room.label}
            value={value}
            placeholder={inputs.room.placeholder}
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="Next"
            onChangeText={value => {
              clearErrors();
              onChange(value);
            }}
            onBlur={onBlur}
            color="white"
            placeholderTextColor="#00000"
            style={{color: '#000', borderBottomWidth: 1}}
          />
        )}></Controller>

      {errors.room && errors.room.message && (
        <Text style={{color: 'red'}}>{errors.room && errors.room.message}</Text>
      )}
      <Button onPress={handleSubmit(onSubmit)} title="Add new room" />
    </>
  );
};

export default AddNewRoom;
