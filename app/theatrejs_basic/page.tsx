'use client'

import { useEffect, useRef } from 'react'

import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'

import myProjectState from './My Project.theatre-project-state.json'
 
export default function Basic() {
  const rectangle = useRef(null);

  // projectの宣言と初期化
  const project = getProject('My Project', { state: myProjectState }); // UIに表示されるproject名。任意
  studio.initialize() // UI表示
  // 実案件のときは開発のときだけUIが表示されるようにする
  // if(process.env.NODE_ENV === 'development') {
  //   studio.initialize()
  // }

  const sheet = project.sheet('Sheet 1'); // UIに表示されるsheet名。任意

  // UIの項目を設定する
  const rectangleObj = sheet.object('rectangle', { // UIに表示されるobject名。任意
    position: {
      x: 0,
      y: 0,
    },
    scale: {
      sx: types.number(1, { range: [-5, 5] }),
      sy: types.number(1, { range: [-5, 5] }),
    },
    opacity: types.number(1, { range: [0, 1] }),
  }, {reconfigure: true});

  useEffect(() => {
    // UIのパラメーターとstyleを紐づける
    rectangleObj.onValuesChange((obj) => {
      const rectangleElm = rectangle.current;

      if(!rectangleElm) return;

      rectangleElm.style.transform = `translate(${obj.position.x}px, ${obj.position.y}px) scale(${obj.scale.sx}, ${obj.scale.sy})`;
      rectangleElm.style.opacity = obj.opacity
    })

  }, []);

  useEffect(() => {
    project.ready.then(() => {
      sheet.sequence.play({iterationCount: Infinity, range: [0, 3]})
    }) 
  }, []);

  return (
    <div className='p-32'>
      <div ref={rectangle} className='w-32 h-32 bg-yellow-200 origin-[bottom_center]'></div>
    </div>
  )
}