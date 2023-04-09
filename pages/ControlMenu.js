import React, {Component} from "react";
import {CTXprov} from ".";
import Button from "./Button";

export default class ControlMenu extends Component{
  render(){
    const {newState}=this.props;
    const styles={
      rotateButton:{
        // userSelect:'none',
        position:'absolute',
        top:'0%',
        right:'0%',
      },
    }
    return(
      <CTXprov.Consumer>
      {value=>{
        const {spinHoriz,spinVertX,spinVertZ,turnX,turnY}=value??{};
        const row=[0,1,2];
        return(
          <div style={styles.rotateButton}>
            {/* {this.props.text===true?'text':'not text'} */}
            {this.props.text}
            <Button value='+45X' onClick={()=>{newState({turnX:turnX+45})}}/>
            <Button value='+45Y' onClick={()=>{newState({turnY:turnY+45})}}/>
            spin horisontal:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinHoriz(x)}}/>)}
            spin X:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinVertX(x)}}/>)}
            spin Z:
            {row.map(x=><Button key={x} value={x} onClick={()=>{spinVertZ(x)}}/>)}
          </div>
      )}}
      </CTXprov.Consumer>
    )
  }
}