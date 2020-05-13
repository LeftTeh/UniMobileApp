/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import CharacterScreen from '@components/CharacterScreen';
import CharacterSelect from '@components/CharacterSelect';
import CharacterCreate from '@components/CharacterCreate';



const Navigator = createStackNavigator({
  charSelect: CharacterSelect,
  charScreen: CharacterScreen,
  charCreate: CharacterCreate
})

export default createAppContainer(Navigator)


