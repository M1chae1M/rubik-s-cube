import {Html,Head,Main,NextScript} from 'next/document'

export default function Document(){
  return(
    <Html lang="pl">
      <Head/>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )
}

export const cubeNames={
  front:{true:'front',false:'back'},
  top:{true:'top',false:'bot'},
  left:{true:'left',false:'right'},
}
export const cubePos={
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
export const colors={
  front:'red',
  back:'grey',
  top:'black',
  bot:'yellow',
  left:'purple',
  right:'lightgreen',
}