import React, {Component} from "react";
import {ColorProv} from ".";

export default class Side extends Component{
  render(){
    const {color, rotateY, rotateX, children, translateX, translateY, idx, i, X, Y}=this.props;
    const styles={
      Side:{
        transition:'all 0.5s ease-in-out',
        transformStyle:'preserve-3d',
        position:'absolute',
        width:'50px',
        height:'50px',
        color:'green',
        transform:`rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateX(${X}px) translateY(${Y}px)`,
        transformOrigin:'75px 75px -75px',
        display:'grid',
        justifyItems:'center',
        alignItems:'center',
        userSelect:'none',
      },
    }
    return(
      <ColorProv.Consumer>
      {value=>{
        const {cubeState, colors}=value??{};
        const bgColor=colors?.[children?.[idx]?.[i]];

        return(
          <div style={{...styles.Side, backgroundColor:bgColor}}
          // className={`${cubeState.front.true?.[idx]?.[i]}`}
          >
            {children?.[idx]?.[i]}
          </div>
        )
      }}
      </ColorProv.Consumer>
    )
  }
}