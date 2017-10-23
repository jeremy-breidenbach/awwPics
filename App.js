import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import PostList from './src/components/PostList';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header headerText={'Aww Pics'} />
        <PostList />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
