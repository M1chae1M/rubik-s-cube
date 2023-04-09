import React,{Component, Fragment} from "react";
import Side from "./Side";
import {cubeNames,cubePos,colors} from "./_document";
import ControlMenu from "./ControlMenu";

export const CTXprov=React.createContext();
export const speed=120;

export default class App extends Component{
  state={
    mixed:false,
    turnX:-45,
    turnY:45,
    cubeState:cubePos,
    canMix:true,
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
    const {turnX,turnY,cubeState,mixed}=this.state;
    const styles={
      App:{
        display:'grid',
        justifyItems:'center',
        alignContent:'center',
        transition:'all ease-in-out 0.3s',
        background:mixed?'#e38ff2':'transparent',
      },
      fullCube:{
        transition:'all 0.5s ease-in-out',
        transformStyle:'preserve-3d',
        position:'relative',
        display:'grid',
        transformOrigin:'75px 75px -75px',
        transform:`rotateX(${turnX}deg) rotateY(${turnY}deg)`,
        transition:'all ease-in-out 0.7s',
        width:'150px',
        height:'150px',
      },
    }
    let copyOf=cubeState;
    const moved=[0,50,100];
    const JSONcopy=(item)=>{return JSON.parse(JSON.stringify(item))};
    function rotateL(matrix){
      const transposedMatrix=transpose(matrix);
      return transposedMatrix.map(row=>row.reverse());
    }
    function rotateR(matrix){
      const reversedRowsMatrix=matrix.map(row=>row.reverse());
      return transpose(reversedRowsMatrix);
    }
    function transpose(matrix){
      return matrix[0].map((x,i)=>matrix.map(row=>row[i]));
    }
    const editTrans=(name,o1,o2,o3)=>{
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
      },speed);
    }
    const spinHoriz=(row)=>{
      const animate=(row)=>{
        const coreAnimation=(name,move,o1,o2,o3)=>{
          const queryName=document?.querySelectorAll(`.${name}`);
          const addStyles=(obj,styles)=>queryName[obj].style.transform+=styles;
          const changeStyles=(obj,styles)=>queryName[obj].style.transform=styles;

          editTrans(name,o1,o2,o3);
          switch(name){
            case 'left':{
              addStyles(o1,`rotateY(-90deg)`);
              addStyles(o2,`rotateY(-90deg) translateX(50px) translateZ(50px)`);
              addStyles(o3,`rotateY(-90deg) translateX(100px) translateZ(100px)`);
              break;
            }
            case 'right':{
              addStyles(o1,`rotateY(-90deg)`);
              addStyles(o2,`rotateY(-90deg) translateX(50px) translateZ(50px)`);
              addStyles(o3,`rotateY(-90deg) translateX(100px) translateZ(100px)`);
              break;
            }
            case 'front':{
              changeStyles(o1,`rotateY(-90deg) translateY(${move}px)`);
              changeStyles(o2,`rotateY(-90deg) translateY(${move}px) translateX(50px)`);
              changeStyles(o3,`rotateY(-90deg) translateY(${move}px) translateX(100px)`);
              break;
            }
            case 'back':{
              changeStyles(o1,`rotateY(-270deg) translateY(${move}px)`);
              changeStyles(o2,`rotateY(-270deg) translateY(${move}px) translateX(50px)`);
              changeStyles(o3,`rotateY(-270deg) translateY(${move}px) translateX(100px)`);
              break;
            }
            case 'top':{
              changeStyles(o1,`rotate(90deg) rotateY(-90deg) translateX(${move}px)`);
              changeStyles(o2,`rotate(90deg) rotateY(-90deg) translateX(${move}px) translateY(50px)`);
              changeStyles(o3,`rotate(90deg) rotateY(-90deg) translateX(${move}px) translateY(100px)`);
              break;
            }
            case 'bot':{
              changeStyles(o1,`rotate(-90deg) rotateY(-90deg) translateX(${move}px)`);
              changeStyles(o2,`rotate(-90deg) rotateY(-90deg) translateX(${move}px) translateY(50px)`);
              changeStyles(o3,`rotate(-90deg) rotateY(-90deg) translateX(${move}px) translateY(100px)`);
              break;
            }
          }
        }
  
        if(row===0){
          coreAnimation('left',0,0,3,6)
          coreAnimation('right',0,0,3,6)
          coreAnimation('front',0,0,3,6);
          coreAnimation('back',0,0,3,6);
          coreAnimation('top',0,0,1,2);
          coreAnimation('top',50,3,4,5);
          coreAnimation('top',100,6,7,8);
        }
        else if(row===1){
          coreAnimation('left',50,1,4,7);
          coreAnimation('right',50,1,4,7);
          coreAnimation('front',50,1,4,7);
          coreAnimation('back',50,1,4,7);
        }
        else if(row===2){
          coreAnimation('left',100,2,5,8);
          coreAnimation('right',100,2,5,8);
          coreAnimation('front',100,2,5,8);
          coreAnimation('back',100,2,5,8);
          coreAnimation('bot',0,0,1,2);
          coreAnimation('bot',50,3,4,5);
          coreAnimation('bot',100,6,7,8);
        }
      }
      if(this.state.canMix){
        this.setState({canMix:false},()=>{

          setTimeout(()=>{
            const {front,left}=copyOf;
            const temp={
              front:[...front.true[row]],
              back:[...front.false[row]],
              left:[...left.true[row]],
              right:[...left.false[row]],
            }
            const {top}=copyOf;
            if(row===0) copyOf.top.true=rotateL(top.true);
            else if(row===2) copyOf.top.false=rotateR(top.false);

            copyOf.front.true[row]=temp.right;
            copyOf.left.false[row]=temp.back;
            copyOf.front.false[row]=temp.left;
            copyOf.left.true[row]=temp.front;
            this.setState({cubeState:copyOf},this.isMixed(this,copyOf));
            setTimeout(()=>{
              this.setState({canMix:true});
            },100);
          },speed);
          animate(row);
        });

      }
    }
    const fromTo=(from,to,column)=>{
      to=rotateL(to);
      to[column]=from;
      return rotateR(to);
    }
    const spinVertX=(column)=>{
      const animate=()=>{
        const coreAnimation=(name,move,o1,o2,o3)=>{
          const queryName=document?.querySelectorAll(`.${name}`);
          const addStyles=(obj,styles)=>queryName[obj].style.transform+=styles;

          editTrans(name,o1,o2,o3);
          switch(name){
            case 'top':{
              addStyles(o1,`rotateY(90deg)`);
              addStyles(o2,`translateZ(-50px) translateX(-50px) rotateY(90deg)`);
              addStyles(o3,`translateZ(-100px) translateX(-100px) rotateY(90deg)`);
              break;
            }
            case 'left':{
              addStyles(o1,`rotateX(90deg)`);
              addStyles(o2,`translateZ(50px) translateY(-50px) rotateX(90deg)`);
              addStyles(o3,`translateZ(100px) translateY(-100px) rotateX(90deg)`);
              break;
            }
            case 'right':{
              addStyles(o1,`rotateX(-90deg)`);
              addStyles(o2,`translateZ(-50px) translateY(-50px) rotateX(-90deg)`);
              addStyles(o3,`translateZ(-100px) translateY(-100px) rotateX(-90deg)`);
              break;
            }
            case 'bot':{
              addStyles(o1,`rotateY(-90deg)`);
              addStyles(o2,`translateZ(50px) translateX(-50px) rotateY(-90deg)`);
              addStyles(o3,`translateZ(100px) translateX(-100px) rotateY(-90deg)`);
              break;
            }
            case 'front':{
              addStyles(o1,`rotate(90deg) translateY(${+move}px) translateX(${move}px)`);
              addStyles(o2,`rotate(90deg) translateY(${50+move}px) translateX(${-50+move}px)`);
              addStyles(o3,`rotate(90deg) translateY(${100+move}px) translateX(${-100+move}px)`);
              break;
            }
            case 'back':{
              addStyles(o1,`rotate(-90deg) translateY(${-move}px) translateX(${0+move}px)`);
              addStyles(o2,`rotate(-90deg) translateY(${50-move}px) translateX(${50+move}px)`);
              addStyles(o3,`rotate(-90deg) translateY(${100-move}px) translateX(${100+move}px)`);
              break;
            }
          }
        }
        
        if(column===0){
          coreAnimation('top',-100,0,3,6);
          coreAnimation('right',0,6,7,8);
          coreAnimation('left',0,0,1,2);
          coreAnimation('bot',0,2,5,8);
          coreAnimation('back',0,0,1,2);
          coreAnimation('back',50,3,4,5);
          coreAnimation('back',100,6,7,8);
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
          coreAnimation('front',0,0,1,2);
          coreAnimation('front',50,3,4,5);
          coreAnimation('front',100,6,7,8);
        }
      }
      if(this.state.canMix){
        this.setState({canMix:false},()=>{
          setTimeout(()=>{
            const temp={
              top:copyOf.top.true[column],
              left:[...rotateL(JSONcopy(copyOf.left.true))[column]],
            }
            if(column===1){
              temp.bot=copyOf.top.false[column];
              temp.right=[...rotateL(copyOf.left.false)[column]];
              // right from top
              copyOf.left.false=fromTo(temp.top.reverse(),copyOf.left.false,column);
              // bot from right
              copyOf.top.false[column]=temp.right;
              // left from bot
              copyOf.left.true=fromTo(temp.bot.reverse(),copyOf.left.true,column);
              // top from left
              copyOf.top.true[column]=temp.left;
            }
            else if(column===2){
              temp.bot=copyOf.top.false[0];
              temp.right=[...rotateL(copyOf.left.false)[0]]
              // right from top
              copyOf.left.false=rotateL(copyOf.left.false);
              copyOf.left.false[0]=temp.top.reverse();
              copyOf.left.false=rotateR(copyOf.left.false);
              // bot from right
              copyOf.top.false[0]=temp.right;
              // left from bot
              copyOf.left.true=fromTo(temp.bot.reverse(),copyOf.left.true,column);
              // top from left
              copyOf.top.true[column]=temp.left;

              copyOf.front.true=rotateL(copyOf.front.true);
            }
            else if(column===0){
              temp.bot=copyOf.top.false[2];
              temp.right=[...rotateL(copyOf.left.false)[2]];
              //right from top
              copyOf.left.false=rotateL(copyOf.left.false);
              copyOf.left.false[2]=temp.top.reverse();
              copyOf.left.false=rotateR(copyOf.left.false);
              // bot from right
              copyOf.top.false[2]=temp.right;
              // left from bot
              copyOf.left.true=fromTo(temp.bot.reverse(),copyOf.left.true,column);
              // top from left
              copyOf.top.true[column]=temp.left;
              
              copyOf.front.false=rotateR(copyOf.front.false);
            }
            this.setState({cubeState:copyOf},this.isMixed(this,copyOf));
            setTimeout(()=>{
              this.setState({canMix:true})
            },100)
          },speed)
          animate(column);
        });
      }
    }
    const spinVertZ=(column)=>{
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
  
          rotateXcopy.o1.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o1=parseInt(x.split('(')[1].split('deg')[0])}})
          rotateXcopy.o2.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o2=parseInt(x.split('(')[1].split('deg')[0])}})
          rotateXcopy.o3.map(x=>{if(x.slice(0,7)==='rotateX'){deg.o3=parseInt(x.split('(')[1].split('deg')[0])}})
  
          editTrans(name,o1,o2,o3);
          switch(name){
            case 'top':{
              newStyles(o1,`rotateX(${deg.o1-90}deg) translateX(${move}px)`);
              newStyles(o2,`rotateX(${deg.o2-90}deg) translateX(${move}px) translateY(50px)`);
              newStyles(o3,`rotateX(${deg.o3-90}deg) translateX(${move}px) translateY(100px)`);
              break;
            }
            case 'bot':{
              newStyles(o1,`translateX(${move}px) rotateX(${deg.o1-90}deg)`);
              newStyles(o2,`translateX(${move}px) translateY(-50px) rotateX(${deg.o2-90}deg)`);
              newStyles(o3,`translateX(${move}px) translateY(-100px) rotateX(${deg.o3-90}deg)`);
              break;
            }
            case 'front':{
              newStyles(o1,`rotateX(${deg.o1-90}deg) translateX(${move}px)`);
              newStyles(o2,`rotateX(${deg.o2-90}deg) translateX(${move}px) translateY(50px)`);
              newStyles(o3,`rotateX(${deg.o3-90}deg) translateX(${move}px) translateY(100px)`);
              break;
            }
            case 'back':{
              queryName[o1].style.transform+=`rotateX(${deg.o1+90}deg)`;
              queryName[o2].style.transform+=`rotateX(${deg.o2+90}deg) translateY(50px) translateZ(50px)`;
              queryName[o3].style.transform+=`rotateX(${deg.o3+90}deg) translateY(100px) translateZ(100px)`;
              break;
            }
            case 'left':{
              newStyles(o1,`rotateY(-90deg) translateX(100px) translateY(${move}px)`);
              newStyles(o2,`rotateY(-90deg) translateX(50px) translateY(${move}px)`);
              newStyles(o3,`rotateY(-90deg) translateX(0px) translateY(${move}px)`);
              break;
            }
            case 'right':{
              newStyles(o1,`rotate(-90deg) rotateX(-90deg) translateX(${move}px) translateY(0px)`);
              newStyles(o2,`rotate(-90deg) rotateX(-90deg) translateX(${move}px) translateY(50px)`);
              newStyles(o3,`rotate(-90deg) rotateX(-90deg) translateX(${move}px) translateY(100px)`);
              break;
            }
          }
        }
  
        if(column===0){
          coreAnimation('top',0,0,1,2)
          coreAnimation('bot',0,0,1,2);
          coreAnimation('front',0,0,1,2);
          coreAnimation('back',0,6,7,8);
          coreAnimation('left',0,0,1,2);
          coreAnimation('left',50,3,4,5);
          coreAnimation('left',100,6,7,8);
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
          coreAnimation('right',0,0,1,2);
          coreAnimation('right',50,3,4,5);
          coreAnimation('right',100,6,7,8);
        }
      }
      if(this.state.canMix){
        this.setState({canMix:false},()=>{
          setTimeout(()=>{
            const temp={
              top:[...rotateL(JSONcopy(copyOf.top.true))[column]],
              bot:[...rotateL(JSONcopy(copyOf.top.false))[column]],
              front:[...rotateL(JSONcopy(copyOf.front.true))[column]],
              back:[...rotateR(JSONcopy(copyOf.front.false))[column]],
            }
            // top from back
            copyOf.top.true=fromTo(temp.back,copyOf.top.true,column);
            // front from top
            copyOf.front.true=fromTo(temp.top,copyOf.front.true,column);
            // bot from front
            copyOf.top.false=fromTo(temp.front,copyOf.top.false,column);
            // back from bot
            copyOf.front.false=rotateR(copyOf.front.false);
            copyOf.front.false[column]=temp.bot;
            copyOf.front.false=rotateL(copyOf.front.false);
      
            if(column===0) copyOf.left.true=rotateL(copyOf.left.true)
            else if(column===2) copyOf.left.false=rotateR(copyOf.left.false)
      
            this.setState({cubeState:copyOf},this.isMixed(this,copyOf));
            setTimeout(()=>{
              this.setState({canMix:true})
            },100)
          },speed);
          animate(column);
        });
      }
    }
    return(
      <div id="App" style={styles.App}>
        <CTXprov.Provider value={{colors,cubeState,cubeNames,spinHoriz,spinVertX,spinVertZ,turnX,turnY}}>
          <div id="fullCube" style={styles.fullCube}>
            {moved.map((x,i)=>moved.map((y,idx)=>{return(<Fragment key={`${idx}${i}`}>
              <Side name="top" turnX={90} turnY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.true}</Side>
              <Side name="front" turnX={0} turnY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.front.true}</Side>
              <Side name="back" turnX={0} turnY={-180} X={x} Y={y} idx={idx} i={i}>{cubeState.front.false}</Side>
              <Side name="bot" turnX={270} turnY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.false}</Side>
              <Side name="left" turnX={0} turnY={-90} X={x} Y={y} idx={idx} i={i}>{cubeState.left.true}</Side>
              <Side name="right" turnX={0} turnY={-270} X={x} Y={y} idx={idx} i={i}>{cubeState.left.false}</Side>
            </Fragment>)}))}
          </div>
          <ControlMenu newState={(newState)=>this.setState(newState)}/>
        </CTXprov.Provider>
      </div>
    )
  }
}