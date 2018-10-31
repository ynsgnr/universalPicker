
import React, {Component} from 'react';
import {Platform, Text, View, TouchableOpacity, ActionSheetIOS} from 'react-native';
import {Picker as RNPicker} from 'react-native'

class UniversalPicker extends Component {

  static defaultProps = {
    selectedValue:'',
    onValueChange:(changedValue)=>console.log("Selected value "+changedValue),
    defaultText:'Select an item'
  }

  state={
    items:[],
    itemValues:{},
    itemLabels:{}
  }

  componentDidMount(){
    if(Platform.OS==='ios'){
      items=[]
      itemValues={}
      itemLabels={}
      for(i=0;i<this.props.children.length;i++){
        items.push(this.props.children[i].props.label)
        itemValues[i]=this.props.children[i].props.value
        itemLabels[this.props.children[i].props.value]=this.props.children[i].props.label
      }
      this.setState({items:items,itemValues:itemValues,itemLabels:itemLabels})
    }
  }

  render() {
    if(Platform.OS==='ios')
      return (
        <TouchableOpacity style={{paddingLeft:'5%',paddingRight:'5%',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}} onPress={()=>{
            ActionSheetIOS.showActionSheetWithOptions({
              options:this.state.items ,
            },
            (buttonIndex) => {this.props.onValueChange(this.state.itemValues[buttonIndex])}
          )
        }}>
          <Text style={{padding:'1%'}}>{this.state.itemLabels[this.props.selectedValue]!=undefined ? this.state.itemLabels[this.props.selectedValue] : this.props.defaultText}</Text>
          <View style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 5,
            borderRightWidth: 5,
            borderBottomWidth: 10,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'rgb(140,160,179)',
            transform: [{rotate: '180deg'}]
          }}/>
        </TouchableOpacity>
      )
    return(
      <RNPicker
        selectedValue={this.props.selectedValue}
        onValueChange={(itemValue)=>this.props.onValueChange(itemValue)}
      >
        {this.props.children}
      </RNPicker>
    )
  }
}

UniversalPicker.Item = ()=>null
export {UniversalPicker}
