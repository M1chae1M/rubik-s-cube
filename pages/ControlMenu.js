import React, {Component} from "react";
import {CTXprov} from ".";
import Button from "./Button";

export default class ControlMenu extends Component{
  render(){
    const styles={
      rotateButton:{
        position:'absolute',
        top:'5%',
        right:'0%',
        left:'0%',
        textAlign:'center',
      },
    }
    return(
      <CTXprov.Consumer>
      {value=>{
        const {spinHoriz,spinVertX,spinVertZ}=value??{};
        const row=[0,1,2];
        return(
          <div style={styles.rotateButton}>
            {/* spin horisontal:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinHoriz(x)}}/>)} */}
            {/* spin X:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinVertX(x)}}/>)} */}
            {/* spin Z:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinVertZ(x)}}/>)} */}
          </div>
      )}}
      </CTXprov.Consumer>
    )
  }
}