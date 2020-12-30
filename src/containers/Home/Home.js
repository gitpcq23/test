import React, {useContext, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {Context} from '../../contexts';
import {Controller, useForm} from 'react-hook-form';
import {MODULES} from '../../navigation/routes';

const REGEX = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
};

const inputs = {
  email: {
    label: 'Email',
    name: 'email',
    rules: {
      required: 'Email is required!',
      pattern: {
        value: REGEX.EMAIL,
        message: 'Invalid Email',
      },
    },
  },
};

const Home = props => {
  const {navigation} = props;
  const {state, setState} = useContext(Context);

  const {control, handleSubmit, errors, clearErrors} = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    submitFocusError: true,
  });

  const onSubmit = data => {
    console.log('submit', data);

    navigation.navigate(MODULES.roomScreen.name, {email: data.email});
  };

  const addRoom = () => {
    let arr = [
      ...state,
      {
        id: 1,
        name: 'Hotel Room #1',
      },
    ];
    setState(arr);
  };

  return (
    <>
      {/* <Button onPress={() => addRoom()} title="addRoom" /> */}

      <Controller
        control={control}
        name={inputs.email.name}
        rules={inputs.email.rules}
        defaultValue={''}
        render={({onChange, onBlur, value}) => (
          <TextInput
            label={inputs.email.label}
            value={value}
            placeholder={inputs.email.placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
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

      {errors.email && errors.email.message && (
        <Text style={{color: 'red'}}>
          {errors.email && errors.email.message}
        </Text>
      )}
      <Button onPress={handleSubmit(onSubmit)} title="Go to app" />
    </>
  );
};

export default Home;
