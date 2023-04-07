import React,{Component, Fragment} from "react";
import Side from "./Side";
import {cubeNames,cubePos,colors} from "./_document";

export const CTXprov=React.createContext();

export default class App extends Component{
  state={
    mixed:false,
    rotateX:-45,
    rotateY:100,
    rotateX:45,
    rotateY:-100,
    rotateX:135,
    rotateY:-170,
    // rotateX:0,
    // rotateY:0,
    cubeState:cubePos,
  }
  componentDidMount(){
    this.isMixed(this,this.state.cubeState);
  }
  isMixed(component,copyOf){
    const {mixed}=component.state;
    let cubeMixed=false;
    const sides={
      front:copyOf.front.true,
      back:copyOf.front.false,

      left:copyOf.left.true,
      right:copyOf.left.false,

      top:copyOf.top.true,
      bot:copyOf.top.false,
    }
    const firstF={
      front:sides.front[0][0],
      back:sides.back[0][0],
      top:sides.top[0][0],
      bot:sides.bot[0][0],
      left:sides.left[0][0],
      right:sides.right[0][0],
    }
    const singleSideIsMixed=(side,firstField)=>{
      side.map(x=>x.map(y=>{
        if(y!==firstField) return cubeMixed=true;
      }));
      return cubeMixed;
    }

    Object.keys(sides)
    .map(x=>cubeMixed=singleSideIsMixed(sides[x],firstF[x]));

    if(!mixed && cubeMixed) component.setState({mixed:true})
    else if(mixed && !cubeMixed) component.setState({mixed:false})
  }
  render(){
    const {rotateX,rotateY,cubeState,mixed}=this.state;
    const styles={
      App:{
        display:'grid',
        justifyItems:'center',
        alignContent:'center',
        transition:'all ease-in-out 0.3s',
        backgroundColor:mixed?'#e38ff2':'transparent',
      },
      fullCube:{
        transition:'all 0.5s ease-in-out',
        transformStyle:'preserve-3d',
        position:'relative',
        // position:'absolute',
        display:'grid',
        transformOrigin:'75px 75px -75px',
        transform:`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition:'all ease-in-out 0.7s',
        width:'150px',
        height:'150px',
      },
      rotateButton:{
        position:'absolute',
        top:'0%',
        right:'0%',
      },
    }
    let copyOf=cubeState;
    const moved=[0,50,100];
    const JSONcopy=(item)=>{return JSON.parse(JSON.stringify(item))};
    function rotateLeft(matrix) {
      const transposedMatrix = transpose(matrix);
      return transposedMatrix.map(row => row.reverse());
    }
    function rotateRight(matrix) {
      const reversedRowsMatrix = matrix.map(row => row.reverse());
      return transpose(reversedRowsMatrix);
    }
    function transpose(matrix) {
      return matrix[0].map((col,i) => matrix.map(row => row[i]));
    }
    const spinHorisontal=(row)=>{
      const {front,left}=copyOf;
      const temp={
        front:[...front.true[row]],
        back:[...front.false[row]],
        left:[...left.true[row]],
        right:[...left.false[row]],
      }
      const {top}=copyOf;
      if(row===0) copyOf.top.true=rotateLeft(top.true);
      else if(row===2) copyOf.top.false=rotateLeft(top.false);

      copyOf.front.true[row]=temp.right;
      copyOf.left.false[row]=temp.back;
      copyOf.front.false[row]=temp.left;
      copyOf.left.true[row]=temp.front;
      this.setState({cubeState:copyOf},this.isMixed(this,copyOf));
    }
    const fromTo=(from,to,column)=>{
      to=rotateLeft(to);
      to[column]=from;
      return rotateRight(to);
    }
    const changeTransition=(name,o1,o2,o3)=>{
      const queryName=document?.querySelectorAll(`.${name}`);
      const oldTransition=queryName[o1].style.transition;
      const copyStyles=(obj)=>{return queryName[obj].style.transform};
      const copied={
        o1:copyStyles(o1),
        o2:copyStyles(o2),
        o3:copyStyles(o3),
      }

      setTimeout(()=>{
        [o1,o2,o3].map(x=>queryName[x].style.transition='none');
      
        queryName[o1].style.transform=copied.o1;
        queryName[o2].style.transform=copied.o2;
        queryName[o3].style.transform=copied.o3;

        setTimeout(()=>{
          [o1,o2,o3].map(x=>queryName[x].style.transition=oldTransition);
        },100);
      },400);
    }
    const spinVerticalX=(column)=>{
      const animate=()=>{
        const coreAnimation=(name,move,o1,o2,o3)=>{
          const deg={};
          const queryName=document?.querySelectorAll(`.${name}`);
          const getTransform=(obj)=>{return queryName[obj].style.transform};
          const newStyles=(obj,styles)=>queryName[obj].style.transform+=styles;
          const rotateYcopy={
            o1:getTransform(o1).split(' '),
            o2:getTransform(o2).split(' '),
            o3:getTransform(o3).split(' '),
          };
  
          rotateYcopy.o1.map(x=>{if(x.slice(0,7)==='rotateY'){deg.o1=x.split('(')[1].split('deg')[0]}})
          rotateYcopy.o2.map(x=>{if(x.slice(0,7)==='rotateY'){deg.o2=x.split('(')[1].split('deg')[0]}})
          rotateYcopy.o3.map(x=>{if(x.slice(0,7)==='rotateY'){deg.o3=x.split('(')[1].split('deg')[0]}})
  
          if(name==='top'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateY(90deg)`);
            newStyles(o2,`rotateY(90deg) translateX(50px) translateZ(-50px)`);
            newStyles(o3,`rotateY(90deg) translateX(100px) translateZ(-100px)`);
          }
          else if(name==='right'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateX(-90deg) translateY(0px) translateZ(0px`);
            newStyles(o2,`rotateX(-90deg) translateY(50px) translateZ(-50px)`);
            newStyles(o3,`rotateX(-90deg) translateY(100px) translateZ(-100px)`);
          }
          else if(name==='bot'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateY(-90deg)`);
            newStyles(o2,`rotateY(-90deg) translateX(50px) translateZ(50px)`);
            newStyles(o3,`rotateY(-90deg) translateX(100px) translateZ(100px)`);
          }
          else if(name==='left'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateX(90deg)`);
            newStyles(o2,`rotateX(90deg) translateY(50px) translateZ(50px)`);
            newStyles(o3,`rotateX(90deg) translateY(100px) translateZ(100px)`);
          }
        }
        
        if(column===0){
          coreAnimation('top',-100,0,3,6);
          coreAnimation('right',0,6,7,8);
          coreAnimation('left',0,0,1,2);
          coreAnimation('bot',0,2,5,8);
        }
        else if(column===1){
          coreAnimation('top',-50,1,4,7);
          coreAnimation('right',0,3,4,5);
          coreAnimation('left',0,3,4,5);
          coreAnimation('bot',0,1,4,7);
        }
        else if(column===2){
          coreAnimation('top',0,2,5,8);
          coreAnimation('right',0,0,1,2);
          coreAnimation('left',0,6,7,8);
          coreAnimation('bot',0,0,3,6);
        }
      }
      setTimeout(()=>{
        const temp={
          top:copyOf.top.true[column],
          left:[...rotateLeft(JSONcopy(copyOf.left.true))[column]],
        }
        if(column===1){
          temp.bot=copyOf.top.false[column];
          temp.right=[...rotateLeft(copyOf.left.false)[column]];
          // right from top
          copyOf.left.false=fromTo(temp.top,copyOf.left.false,column);
          // bot from right
          copyOf.top.false[column]=temp.right;
          // left from bot
          copyOf.left.true=fromTo(temp.bot,copyOf.left.true,column);
          // top from left
          copyOf.top.true[column]=temp.left;
        }
        else if(column===2){
          temp.bot=copyOf.top.false[0];
          temp.right=[...rotateLeft(copyOf.left.false)[0]]
          // right from top
          copyOf.left.false=rotateLeft(copyOf.left.false);
          copyOf.left.false[0]=temp.top;
          copyOf.left.false=rotateRight(copyOf.left.false);
          // bot from right
          copyOf.top.false[0]=temp.right;
          // left from bot
          copyOf.left.true=fromTo(temp.bot,copyOf.left.true,column);
          // top from left
          copyOf.top.true[column]=temp.left;

          copyOf.front.true=rotateLeft(copyOf.front.true);
        }
        else if(column===0){
          temp.bot=copyOf.top.false[2];
          temp.right=[...rotateLeft(copyOf.left.false)[2]];
          //right from top
          copyOf.left.false=rotateLeft(copyOf.left.false);
          copyOf.left.false[2]=temp.top;
          copyOf.left.false=rotateRight(copyOf.left.false);
          // bot from right
          copyOf.top.false[2]=temp.right;
          // left from bot
          copyOf.left.true=fromTo(temp.bot,copyOf.left.true,column);
          // top from left
          copyOf.top.true[column]=temp.left;
          
          copyOf.front.false=rotateRight(copyOf.front.false);
        }
        this.setState({cubeState:copyOf},this.isMixed(this,copyOf));
      },400)
      animate(column);
    }
    const spinVerticalZ=(column)=>{
      const animate=(column)=>{
        const coreAnimation=(name,move,o1,o2,o3)=>{
          const deg={};
          const queryName=document?.querySelectorAll(`.${name}`);
          const getTransform=(obj)=>{return queryName[obj].style.transform};
          const newStyles=(obj,styles)=>queryName[obj].style.transform=styles;
          const rotateXcopy={
            o1:getTransform(o1).split(' '),
            o2:getTransform(o2).split(' '),
            o3:getTransform(o3).split(' '),
          };
  
          rotateXcopy.o1.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o1=x.split('(')[1].split('deg')[0]}})
          rotateXcopy.o2.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o2=x.split('(')[1].split('deg')[0]}})
          rotateXcopy.o3.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o3=x.split('(')[1].split('deg')[0]}})
  
          if(name==='top'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateX(${parseInt(deg.o1)-90}deg) translateX(${move}px)`);
            newStyles(o2,`rotateX(${parseInt(deg.o2)-90}deg) translateX(${move}px) translateY(50px)`);
            newStyles(o3,`rotateX(${parseInt(deg.o3)-90}deg) translateX(${move}px) translateY(100px)`);
          }
          else if(name==='bot'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,` translateX(${move}px) translateY(0px) rotateX(${parseInt(deg.o1)-90}deg)`);
            newStyles(o2,` translateX(${move}px) translateY(-50px) rotateX(${parseInt(deg.o2)-90}deg)`);
            newStyles(o3,` translateX(${move}px) translateY(-100px) rotateX(${parseInt(deg.o3)-90}deg)`);
          }
          else if(name==='front'){
            changeTransition(name,o1,o2,o3);

            newStyles(o1,`rotateX(${parseInt(deg.o1)-90}deg) translateX(${move}px) translateY(0px)`);
            newStyles(o2,`rotateX(${parseInt(deg.o2)-90}deg) translateX(${move}px) translateY(50px)`);
            newStyles(o3,`rotateX(${parseInt(deg.o3)-90}deg) translateX(${move}px) translateY(100px)`);
          }
          else if(name==='back'){
            changeTransition(name,o1,o2,o3);

            queryName[o1].style.transform+=`rotateX(${parseInt(deg.o1)+90}deg)`;
            queryName[o2].style.transform+=`rotateX(${parseInt(deg.o2)+90}deg) translateY(50px) translateZ(50px)`;
            queryName[o3].style.transform+=`rotateX(${parseInt(deg.o3)+90}deg) translateY(100px) translateZ(100px)`;
          }
        }
  
        if(column===0){
          coreAnimation('top',0,0,1,2)
          coreAnimation('bot',0,0,1,2);
          coreAnimation('front',0,0,1,2);
          coreAnimation('back',0,6,7,8);
        }
        else if(column===1){
          coreAnimation('top',50,3,4,5);
          coreAnimation('bot',50,3,4,5);
          coreAnimation('front',50,3,4,5);
          coreAnimation('back',0,3,4,5);
        }
        else if(column===2){
          coreAnimation('top',100,6,7,8);
          coreAnimation('bot',100,6,7,8);
          coreAnimation('front',100,6,7,8);
          coreAnimation('back',0,0,1,2);
        }
      }
      setTimeout(()=>{
        const temp={
          top:[...rotateLeft(JSONcopy(copyOf.top.true))[column]],
          bot:[...rotateLeft(JSONcopy(copyOf.top.false))[column]],
          front:[...rotateLeft(JSONcopy(copyOf.front.true))[column]],
          back:[...rotateRight(JSONcopy(copyOf.front.false))[column]],
        }
        // top from back
        copyOf.top.true=fromTo(temp.back,copyOf.top.true,column);
        // front from top
        copyOf.front.true=fromTo(temp.top,copyOf.front.true,column);
        // bot from front
        copyOf.top.false=fromTo(temp.front,copyOf.top.false,column);
        // back from bot
        copyOf.front.false=rotateRight(copyOf.front.false);
        copyOf.front.false[column]=temp.bot;
        copyOf.front.false=rotateLeft(copyOf.front.false);
  
        if(column===0) copyOf.left.true=rotateLeft(copyOf.left.true)
        else if(column===2) copyOf.left.false=rotateRight(copyOf.left.false)
  
        this.setState({cubeState:copyOf},this.isMixed(this,copyOf));

      },400);
      animate(column);
    }
    return(
      <div id="App" style={styles.App}>
        <div id="fullCube" style={styles.fullCube}>
          <CTXprov.Provider value={{colors,cubeState,cubeNames}}>
            {moved.map((x,i)=>moved.map((y,idx)=>{return(<Fragment key={`${idx}${i}`}>
              <Side name="top" rotateX={90} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.true}</Side>
              <Side name="front" rotateX={0} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.front.true}</Side>
              <Side name="back" rotateX={0} rotateY={-180} X={x} Y={y} idx={idx} i={i}>{cubeState.front.false}</Side>
              <Side name="bot" rotateX={270} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.false}</Side>
              <Side name="left" rotateX={0} rotateY={-90} X={x} Y={y} idx={idx} i={i}>{cubeState.left.true}</Side>
              <Side name="right" rotateX={0} rotateY={-270} X={x} Y={y} idx={idx} i={i}>{cubeState.left.false}</Side>
            </Fragment>)}))}
          </CTXprov.Provider>
        </div>
        <div style={styles.rotateButton}>
          <input type="button" value='+45X' onClick={()=>{this.setState({rotateX:rotateX+45})}}/>
          <input type="button" value='+45Y' onClick={()=>{this.setState({rotateY:rotateY+45})}}/>
          spin horisontal:
          <input type="button" value='0' onClick={()=>{spinHorisontal(0)}}/>
          <input type="button" value='1' onClick={()=>{spinHorisontal(1)}}/>
          <input type="button" value='2' onClick={()=>{spinHorisontal(2)}}/>
          spin X:
          <input type="button" value='0' onClick={()=>{spinVerticalX(0)}}/>
          <input type="button" value='1' onClick={()=>{spinVerticalX(1)}}/>
          <input type="button" value='2' onClick={()=>{spinVerticalX(2)}}/>
          spin Z:
          <input type="button" value='0' onClick={()=>{spinVerticalZ(0)}}/>
          <input type="button" value='1' onClick={()=>{spinVerticalZ(1)}}/>
          <input type="button" value='2' onClick={()=>{spinVerticalZ(2)}}/>
        </div>
      </div>
    )
  }
}