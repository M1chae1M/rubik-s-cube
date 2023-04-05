import React, {Component} from "react";
import {ColorProv} from ".";

export default class Side extends Component{
  render(){
    const {color, rotateY, rotateX, children, translateX, translateY, idx, i, X, Y}=this.props;
    const styles={
      Side:{
        transition:'all 0.5s ease-in-out',
        // transition:'all 0.8s ease-in-out',
        transformStyle:'preserve-3d',
        // position:'absolute',
        // position:'relative',
        width:'50px',
        height:'50px',
        color:'green',
        // transform:`rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateX(${X}px) translateY(${Y}px)`,
        transform:`rotateY(${0}deg) rotateX(${0}deg) translateX(${0}px) translateY(${0}px)`,
        // transformOrigin:'75px 75px -75px',
        // transformOrigin:'150% 150% -75px',
        // transformOrigin:this.props.cubeOrigin,
        display:'grid',
        // gridTemplateColumns:'1fr 1fr 1fr',
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
          <div style={{...styles.Side, backgroundColor:bgColor}} className={children[idx][i]}>
            {children[idx][i]}
          </div>
        )
      }}
      </ColorProv.Consumer>
    )
  }
}