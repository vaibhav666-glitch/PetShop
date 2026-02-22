
import { StyleSheet, View } from 'react-native'
import React from 'react'
import StackNavigation from './src/navigation/StackNavigation';
import Toast from 'react-native-toast-message';

const App = () => {


return (

<>
      <StackNavigation />
      <Toast position="top" topOffset={60} />
    </>



);
  
}

export default App

const styles = StyleSheet.create({})