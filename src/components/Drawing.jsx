import React from 'react';
import { Dimmer } from 'semantic-ui-react';
import { Div } from '../ui/components/Div';
import { ConfirmContent } from './ConfirmContent';
export const Drawing = ({ dimmerActive, cancelDelete, deleteDrawing, positionTop, positionLeft, width, height, svgRef, path, stroke, strokeWidth, handleMouseDown, handleMouseMove, handleMouseOut, handleMouseUp, onClick, }) => {
    return (<div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut} onDoubleClick={onClick} style={{
            position: 'absolute',
            top: positionTop,
            left: positionLeft,
            width,
            height,
            cursor: 'move',
        }}>
      <Dimmer.Dimmable as={Div} dimmed={dimmerActive}>
       
      
      <div style={{ border: '1px solid black',overflow:'auto',resize: 'both'}}>
        <svg ref={svgRef}>
          <path strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" stroke={stroke} fill="none" d={path}/>
        </svg>
      </div>
         
        <Dimmer active={dimmerActive} onClickOutside={cancelDelete}>
          <ConfirmContent title="Delete?" onConfirm={deleteDrawing} onDismiss={cancelDelete}/>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>);
};
