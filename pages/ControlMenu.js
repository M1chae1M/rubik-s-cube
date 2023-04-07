import React, {Component} from "react";
import {CTXprov} from ".";

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
            <input type="button" value='+45X' onClick={()=>{newState({rotateX:rotateX+45})}}/>
            <input type="button" value='+45Y' onClick={()=>{newState({rotateY:rotateY+45})}}/>
            spin horisontal:
            {row.map(x=><input key={x} type="button" value={x} onClick={()=>{spinHoriz(x)}}/>)}
            spin X:
            {row.map(x=><input key={x} type="button" value={x} onClick={()=>{spinVertX(x)}}/>)}
            spin Z:
            {row.map(x=><input key={x} type="button" value={x} onClick={()=>{spinVertZ(x)}}/>)}
          </div>
      )}}
      </CTXprov.Consumer>
    )
  }
}