import React, {Component} from "react";
import {CTXprov} from ".";
import Button from "./Button";

export default class ControlMenu extends Component{
  render(){
    const {newState}=this.props;
    const styles={
      rotateButton:{
        position:'absolute',
        top:'0%',
        right:'0%',
      },
    }
    return(
      <CTXprov.Consumer>
      {value=>{
        const {spinHoriz,spinVertX,spinVertZ,rotateX,rotateY}=value??{};
        const row=[0,1,2];
        return(
          <div style={styles.rotateButton}>
            <Button value='+45X' onClick={()=>{newState({rotateX:rotateX+45})}}/>
            <Button value='+45Y' onClick={()=>{newState({rotateY:rotateY+45})}}/>
            spin horisontal:
            {row.map(x=><Button value={x} onClick={()=>{spinHoriz(x)}}/>)}
            spin X:
            {row.map(x=><Button value={x} onClick={()=>{spinVertX(x)}}/>)}
            spin Z:
            {row.map(x=><Button value={x} onClick={()=>{spinVertZ(x)}}/>)}
          </div>
      )}}
      </CTXprov.Consumer>
    )
  }
}