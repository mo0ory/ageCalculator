import React, {Component} from 'react';
import { View} from 'react-native';

import { StyleSheet} from 'react-native';
import CALCULATOR from './calculator';

export default class App extends Component {
 
  render () {
    return (
      
      <View style={styles.container} >
           <CALCULATOR />
        </View>
       
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
