import React, {Component, Fragment} from "react";
import Side from "./Side";

export const ColorProv=React.createContext();

const cube=React.createRef();

const cubeNames={
  front:{true:'front',false:'back'},
  top:{true:'top',false:'bot'},
  left:{true:'left',false:'right'},
}
const cubePos={
  top:{
    true:[
      [cubeNames.top.true,cubeNames.top.true,cubeNames.top.true],
      [cubeNames.top.true,cubeNames.top.true,cubeNames.top.true],
      [cubeNames.top.true,cubeNames.top.true,cubeNames.top.true],
  
    ],
    false:[
      [cubeNames.top.false,cubeNames.top.false,cubeNames.top.false],
      [cubeNames.top.false,cubeNames.top.false,cubeNames.top.false],
      [cubeNames.top.false,cubeNames.top.false,cubeNames.top.false],
    ],
  },
  left:{
    true:[
      [cubeNames.left.true,cubeNames.left.true,cubeNames.left.true],
      [cubeNames.left.true,cubeNames.left.true,cubeNames.left.true],
      [cubeNames.left.true,cubeNames.left.true,cubeNames.left.true],
    ],
    false:[
      [cubeNames.left.false,cubeNames.left.false,cubeNames.left.false],
      [cubeNames.left.false,cubeNames.left.false,cubeNames.left.false],
      [cubeNames.left.false,cubeNames.left.false,cubeNames.left.false],
    ],
  },
  front:{
    true:[
      [cubeNames.front.true,cubeNames.front.true,cubeNames.front.true],
      [cubeNames.front.true,cubeNames.front.true,cubeNames.front.true],
      [cubeNames.front.true,cubeNames.front.true,cubeNames.front.true],
    ],
    false:[
      [cubeNames.front.false,cubeNames.front.false,cubeNames.front.false],
      [cubeNames.front.false,cubeNames.front.false,cubeNames.front.false],
      [cubeNames.front.false,cubeNames.front.false,cubeNames.front.false],
    ],
  }
}
const colors={
  front:'red',
  back:'grey',
  top:'black',
  bot:'yellow',
  left:'purple',
  right:'lightgreen',
}

export default class App extends Component{
  state={
    mixed:false,
    rotateX:-40,
    rotateY:45,
    cubeState:cubePos,
  }
  componentDidMount(){
    this.isMixed(this, this.state.cubeState);
  }
  isMixed(component, copyOf){
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
    const singleSideIsMixed=(side, firstField)=>{
      side.map(x=>x.map(y=>{
        if(y!==firstField) return cubeMixed=true;
      }));
      return cubeMixed;
    }

    ['front', 'back', 'left', 'right', 'top', 'bot']
    .map(x=>cubeMixed=singleSideIsMixed(sides[x], firstF[x]));

    if(!mixed && cubeMixed) component.setState({mixed:true})
    else if(mixed && !cubeMixed) component.setState({mixed:false})
  }
  render(){
    const {rotateX, rotateY, cubeState, mixed}=this.state;
    let copyOf=cubeState;
    const moved=[0,50,100];
    const JSONcopy=(item)=>{return JSON.parse(JSON.stringify(item))};
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
      topWall:{
        transformOrigin:'75px 75px -75px',
        transition:'all 0.5s ease-in-out',
        transformStyle:'preserve-3d',
        position:'relative',
        // display:'grid',
      }
    }
    function rotateLeft(matrix) {
      const transposedMatrix = transpose(matrix);
      return transposedMatrix.map(row => row.reverse());
    }
    function rotateRight(matrix) {
      const reversedRowsMatrix = matrix.map(row => row.reverse());
      return transpose(reversedRowsMatrix);
    }
    function transpose(matrix) {
      return matrix[0].map((col, i) => matrix.map(row => row[i]));
    }
    const spinHorisontal=(row)=>{
      const {front, left}=copyOf;
      const temp={
        front:[...front.true[row]],
        back:[...front.false[row]],
        left:[...left.true[row]],
        right:[...left.false[row]],
      }

      // Array.from(document.querySelectorAll('.top')).map((x,i)=>{
      //   if(i===0){
      //     x.style.transform+='rotate(90deg)';
      //   }
      //   else if(i===3){
      //     x.style.transform+='translateY(-50px) translateX(-50px) rotate(90deg)';
      //   }
      //   else if(i===6){
      //     x.style.transform+='translateX(-100px) translateY(-100px) rotate(90deg)';
      //   }
      //   else if(i===1){
      //     x.style.transform+='translateY(50px) translateX(-50px) rotate(90deg)';
      //   }
      //   else if(i===2){
      //     x.style.transform+='translateY(100px) translateX(-100px) rotate(90deg)';
      //   }
      //   else if(i===5){
      //     x.style.transform += 'translateY(-50px) translateX(-50px) rotate(-90deg)';
      //   }
      // })
      const {top}=copyOf;
      if(row===0) copyOf.top.true=rotateLeft(top.true);
      else if(row===2) copyOf.top.false=rotateLeft(top.false);

      copyOf.front.true[row]=temp.right;
      copyOf.left.false[row]=temp.back;
      copyOf.front.false[row]=temp.left;
      copyOf.left.true[row]=temp.front;
      this.setState({cubeState:copyOf}, this.isMixed(this, copyOf));
    }
    const fromTo=(from, to, column)=>{
      to=rotateLeft(to);
      to[column]=from;
      return rotateRight(to);
    }
    const spinVerticalX=(column)=>{
      // Array.from(document.querySelectorAll('.left')).map((x,i)=>{
      //   if(i===0 &&column===0 || i===3 &&column===1 || i===6 &&column===2){
      //     x.style.transform+='rotateX(90deg)';
      //   }
      //   else if(i===2 &&column===0 || i===5 &&column===1 || i===8 &&column===2){
      //     x.style.transform+='translateY(-100px) translateZ(100px) rotateX(90deg)';
      //   }
      //   else if(i===1 &&column===0 || i===4 &&column===1 || i===7 &&column===2){
      //     x.style.transform+='translateY(-50px) translateZ(50px) rotateX(90deg)'
      //   }
      // });

      // Array.from(document.querySelectorAll('.top')).map((x,i)=>{
      //   if(i===0 &&column===0 || i===3 &&column===1 || i===6 &&column===2){
      //     x.style.transform+='rotateY(90deg)';
      //   }
      //   else if(i===2 &&column===0 || i===5 &&column===1 || i===8 &&column===2){
      //     x.style.transform+='translateX(-100px) translateZ(-100px) rotateY(90deg)';
      //   }
      //   else if(i===1 &&column===0 || i===4 &&column===1 || i===7 &&column===2){
      //     x.style.transform+='translateX(-50px) translateZ(-50px) rotateY(90deg)';
      //   }
      // });

      // Array.from(document.querySelectorAll('.right')).map((x,i)=>{
      //   if(i===0 &&column===0 || i===3 &&column===1 || i===6 &&column===2){
      //     x.style.transform+='rotateX(-90deg)';
      //   }
      //   else if(i===2 &&column===0 || i===5 &&column===1 || i===8 &&column===2){
      //     x.style.transform+='translateY(-100px) translateZ(-100px) rotateX(-90deg)';
      //   }
      //   else if(i===1 &&column===0 || i===4 &&column===1 || i===7 &&column===2){
      //     x.style.transform+='translateY(-50px) translateZ(-50px) rotateX(-90deg)';
      //   }
      // });

      // Array.from(document.querySelectorAll('.bot')).map((x,i)=>{
      //   if(i===0 &&column===0 || i===3 &&column===1 || i===6 &&column===2){
      //     x.style.transform+='rotateY(-90deg)';
      //   }
      //   else if(i===2 &&column===0 || i===5 &&column===1 || i===8 &&column===2){
      //     x.style.transform+='translateX(-100px) translateZ(100px) rotateY(-90deg)';
      //   }
      //   else if(i===1 &&column===0 || i===4 &&column===1 || i===7 &&column===2){
      //     x.style.transform+='translateX(-50px) translateZ(50px) rotateY(-90deg)';
      //   }
      // });

      const temp={
        top:copyOf.top.true[column],
        bot:copyOf.top.false[column],
        left:[...rotateLeft(JSONcopy(copyOf.left.true))[column]],
      }
      if(column===1){
        temp.right=[...rotateLeft(copyOf.left.false)[column]];
        // right from top
        copyOf.left.false=fromTo(temp.top, copyOf.left.false, column);
        // bot from right
        copyOf.top.false[column]=temp.right;
        // left from bot
        copyOf.left.true=fromTo(temp.bot, copyOf.left.true, column);
        // top from left
        copyOf.top.true[column]=temp.left;
      }
      else if(column===2){
        temp.right=[...rotateLeft(copyOf.left.false)[0]]
        // right from top
        copyOf.left.false=rotateLeft(copyOf.left.false);
        copyOf.left.false[0]=temp.top;
        copyOf.left.false=rotateRight(copyOf.left.false);
        // bot from right
        copyOf.top.false[column]=temp.right;
        // left from bot
        copyOf.left.true=fromTo(temp.bot, copyOf.left.true, column);
        // top from left
        copyOf.top.true[column]=temp.left;

        copyOf.front.true=rotateLeft(copyOf.front.true);
      }
      else if(column===0){
        temp.right=[...rotateLeft(copyOf.left.false)[2]];
        //right from top
        copyOf.left.false=rotateLeft(copyOf.left.false);
        copyOf.left.false[2]=temp.top;
        copyOf.left.false=rotateRight(copyOf.left.false);
        // bot from right
        copyOf.top.false[column]=temp.right;
        // left from bot
        copyOf.left.true=fromTo(temp.bot, copyOf.left.true, column);
        // top from left
        copyOf.top.true[column]=temp.left;
        
        copyOf.front.false=rotateRight(copyOf.front.false);
      }
      this.setState({cubeState:copyOf}, this.isMixed(this, copyOf));
    }
    const spinVerticalZ=(column)=>{

      const animateTop=()=>{
        document.querySelector('#topWall').style.transform='rotateX(-90deg)'

        // Array.from(cube.current.children).map(x=>{
        //   if(x.className==='top'){
        //     // console.log(x.style.transform);
        //     // x.style.transformOrigin='center center center';
        //     x.style.transform+='rotateX(-90deg)';
        //   }
        // }
        // )


        // return(
          // Array.from(document.querySelectorAll('.top')).map((x,i)=>{
            // console.log(x)
            // x.style.transform+='translateX(0px)';
            // x.style.transformOrigin='';
            // x.style.transform+='rotateX(-90deg)';
          // })
        // )
      }

      animateTop()
      // setTimeout(()=>{
        const temp={
          top:[...rotateLeft(JSONcopy(copyOf.top.true))[column]],
          bot:[...rotateLeft(JSONcopy(copyOf.top.false))[column]],
          front:[...rotateLeft(JSONcopy(copyOf.front.true))[column]],
          back:[...rotateRight(JSONcopy(copyOf.front.false))[column]],
        }
        // top from back
        copyOf.top.true=fromTo(temp.back, copyOf.top.true, column);
        // front from top
        copyOf.front.true=fromTo(temp.top, copyOf.front.true, column);
        // bot from front
        copyOf.top.false=fromTo(temp.front, copyOf.top.false, column);
        // back from bot
        copyOf.front.false=rotateRight(copyOf.front.false);
        copyOf.front.false[column]=temp.bot;
        copyOf.front.false=rotateLeft(copyOf.front.false);
  
        if(column===0) copyOf.left.true=rotateLeft(copyOf.left.true)
        else if(column===2) copyOf.left.false=rotateRight(copyOf.left.false)
  
        this.setState({cubeState:copyOf}, this.isMixed(this, copyOf));

        // animateTop();

      // },1000);
    }
    return(
      <div id="App" style={styles.App}>
        <div id="fullCube" style={styles.fullCube} ref={cube}>
          <ColorProv.Provider value={{colors, cubeState, cubeNames}}>
            {moved.map((x, i)=>moved.map((y, idx)=>
            <Fragment key={`${idx}${i}`}>
<Side key={`front${idx}${i}`} rotateX={0} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.front.true}</Side>

<Side key={`left${idx}${i}`} rotateX={0} rotateY={-90} X={x} Y={y} idx={idx} i={i}>{cubeState.left.true}</Side>

<Side key={`back${idx}${i}`} rotateX={0} rotateY={-180} X={x} Y={y} idx={idx} i={i}>{cubeState.front.false}</Side>

<Side key={`right${idx}${i}`} rotateX={0} rotateY={-270} X={x} Y={y} idx={idx} i={i}>{cubeState.left.false}</Side>


<Side key={`bot${idx}${i}`} rotateX={-90} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.false}</Side>
            </Fragment>
            ))}
            <div id="topWall" style={styles.topWall}>

{moved.map((x, i)=>moved.map((y, idx)=>{
  return <Side key={`top${idx}${i}`} rotateX={90} rotateY={0} X={x} Y={y} idx={idx} i={i}>{cubeState.top.true}</Side>

}))}
            </div>


          </ColorProv.Provider>


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