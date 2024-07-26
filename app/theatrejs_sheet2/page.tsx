'use client'

import { useEffect, useRef } from 'react'

import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'

import myProjectState from './theatrejs_sheet2.theatre-project-state.json'
 
export default function Basic() {
  const rectangle = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);

  const project = getProject('theatrejs_sheet2', { state: myProjectState });
  studio.initialize();

  const sheet_a = project.sheet('Sheet_1');
  const sheet_b = project.sheet('Sheet_2');

  const rectangleObj = sheet_a.object('rectangle', {
    position: {
      x: 0,
      y: 0,
    }
  }, {reconfigure: true});

  const circleObj = sheet_b.object('circle', {
    position: {
      x: 0,
      y: 0,
    }
  }, {reconfigure: true});

  useEffect(() => {
    rectangleObj.onValuesChange((obj) => {
      const rectangleElm = rectangle.current;
      if(!rectangleElm) return;
      rectangleElm.style.transform = `translate(${obj.position.x}px, ${obj.position.y}px)`;
    })

    circleObj.onValuesChange((obj) => {
      const circleElm = circle.current;
      if(!circleElm) return;
      circleElm.style.transform = `translate(${obj.position.x}px, ${obj.position.y}px)`;
    })

  }, []);

  useEffect(() => {
    project.ready.then(() => {
      sheet_a.sequence.play({iterationCount: Infinity, range: [0, 1]})
      sheet_b.sequence.play({
        iterationCount: Infinity, 
        range: [0, 1], 
        direction: 'alternateReverse'
      })
    }) 
  }, []);

  return (
    <div className='p-32'>
      <div ref={rectangle} className='w-32 h-32 bg-yellow-200 origin-[bottom_center]'></div>
      <div ref={circle} className='w-32 h-32 bg-green-400 rounded-full origin-[bottom_center]'></div>
    </div>
  )
}