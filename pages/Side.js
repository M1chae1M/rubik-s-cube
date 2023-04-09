import React,{Component} from "react";
import {CTXprov} from ".";
import {speed} from ".";

export default class Side extends Component{
  render(){
    const {turnY,turnX,children,idx,i,X,Y,name}=this.props;
    const styles={
      Side:{
        transition:`all 0.4s ease-in-out`,
        transition:`all ${speed/1000}s ease-in-out`,
        transformStyle:'preserve-3d',
        position:'absolute',
        width:'50px',
        height:'50px',
        color:'green',
        transform:`rotateY(${turnY}deg) rotateX(${turnX}deg) translateX(${X}px) translateY(${Y}px)`,
        transformOrigin:'75px 75px -75px',
        display:'grid',
        justifyItems:'center',
        alignItems:'center',
        // userSelect:'none',
      },
    }
    return(
      <CTXprov.Consumer>
      {value=>{
        const {colors




        // ,clickCube
        }=value??{};
        const bgColor=colors?.[children?.[idx]?.[i]];
        return <div style={{...styles.Side,background:bgColor}} id="side" className={name}
        // onClick={(e)=>{clickCube(e)}}
        x={idx} y={i}
        />
      }}
      </CTXprov.Consumer>
    )
  }
}