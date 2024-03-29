import React, {Component} from 'react';
import {Dimensions,TouchableOpacity,Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';


type Props = {};
export default class CALCULATOR extends Component<Props> {
  state = {
    isDateTimePickerVisible: true,
    date:undefined,
    millSecLeft:0,
    dateOpacity:1,
  };
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    date=new Date(date)
    this.setState({date:date},()=>{
      this._hideDateTimePicker();
      this._calculateTheDifference()
    })
  };
  _calculateTheDifference(){
    if(!this.state.date){
      return;
    }
    let current_date=new Date().getDate()
    let current_month=new Date().getMonth()
    let current_year=new Date().getFullYear()
    let birth_date=this.state.date.getDate()
    let birth_month=this.state.date.getMonth()
    let birth_year=this.state.date.getFullYear()
    let month = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    if (birth_date > current_date) {
        current_month = current_month - 1;
        current_date = current_date + month[birth_month - 1];
    }
    if (birth_month > current_month) {
        current_year = current_year - 1;
        current_month = current_month + 12;
    }
    let calculated_date = current_date - birth_date;
    let calculated_month = current_month - birth_month;
    let calculated_year = current_year - birth_year;
    if(calculated_date||calculated_month||calculated_year)
    this.setState({
      calculated_date:calculated_date,
      calculated_month:calculated_month,
      calculated_year:calculated_year,
      dateOpacity:1,
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>AGE CALCULATOR</Text>
        <Text style={styles.instructions}>Select your birth date from dataPicker</Text>
        <View style={{margin:10,alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity style={{
            height:Dimensions.get('window').width/5,
            width:Dimensions.get('window').height/3,
            backgroundColor:"#841584",
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
          }} onPress={this._showDateTimePicker}>
            <Text style={{fontSize: 20,color:'white'}}>Show DatePicker</Text>
          </TouchableOpacity>
        </View>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'date'}
           
          maximumDate={new Date()}
        />
        <View style={{
          marginTop:Dimensions.get('window').width/10,
          opacity:this.state.dateOpacity,
          justifyContent: 'center',
           
          alignItems: 'center',
        }}>
          
          <Text style={styles.welcome}>Your age :</Text>
        <Text>Years: {this.state.calculated_year}</Text>
        <Text>Months: {this.state.calculated_month}</Text>
        <Text>Days: {this.state.calculated_date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:"#841584"
  }
});
