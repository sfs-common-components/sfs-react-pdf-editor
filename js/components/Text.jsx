import React from 'react';
import { TextMode } from '../entities';
export const Text = ({ text, width, height, inputRef, mode, size, fontFamily, positionTop, positionLeft, onChangeText, toggleEditMode, handleMouseDown, handleMouseMove, handleMouseOut, handleMouseUp, lineHeight, }) => {
    return (<div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseOut={handleMouseOut} onDoubleClick={toggleEditMode} style={{
            width,
            border: 1,
            height,
            fontFamily,
            fontSize: size,
            lineHeight,
            cursor: mode === TextMode.COMMAND ? 'move' : 'default',
            top: positionTop,
            left: positionLeft,
            borderColor: 'gray',
            borderStyle: 'solid',
            wordWrap: 'break-word',
            padding: 0,
            position: 'absolute',
        }}>
      <input type="text" ref={inputRef} onChange={onChangeText} readOnly={mode === TextMode.COMMAND} style={{
            width: '100%',
            borderStyle: 'none',
            borderWidth: 0,
            fontFamily,
            fontSize: size,
            outline: 'none',
            padding: 0,
            boxSizing: 'border-box',
            lineHeight,
            height,
            margin: 0,
            backgroundColor: 'transparent',
            cursor: mode === TextMode.COMMAND ? 'move' : 'text',
        }} value={text}/>
    </div>);
};
