import React, {Component} from "react";
import {CTXprov} from ".";
import Button from "./Button";


const parentRef = React.createRef()

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
   <div ref={parentRef} onTouchMove={(e)=>{
    const parentElement = parentRef.current;
    const touch = event.targetTouches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

    if (parentElement.contains(targetElement)) {
      console.log(targetElement);
    }
   }}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </div>
            <div>Game in beta! To mix cube on mobile use buttons</div>
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