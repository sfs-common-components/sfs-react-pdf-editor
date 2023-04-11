import React from 'react';
import { ConfirmContent } from './ConfirmContent';
const ADJUSTERS_DIMENSIONS = 20;
export const Image = ({
	canvasRef,
	positionTop,
	positionLeft,
	width,
	height,
	handleMouseOut,
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
	handleImageScale,
	cancelDelete,
	deleteImage,
	onClick,
}) => {
	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseOut={handleMouseOut}
			onDoubleClick={onClick}
			style={{
				position: 'absolute',
				top: positionTop,
				left: positionLeft,
				borderStyle: 'dashed',
				borderWidth: 1,
				borderColor: 'grey',
				width: width + 2,
				height: height + 2,
				cursor: 'move',
			}}>
			<canvas
				ref={canvasRef}
				style={{
					width: '100%',
					height: '100%',
				}}
			/>
			<ConfirmContent title="Delete?" onConfirm={deleteImage} onDismiss={cancelDelete} />
			<div
				data-direction="top-left"
				onMouseDown={handleMouseDown}
				onMouseUp={handleMouseUp}
				onMouseMove={handleImageScale}
				style={{
					position: 'absolute',
					cursor: 'nwse-resize',
					top: -5,
					left: -5,
					width: ADJUSTERS_DIMENSIONS,
					height: ADJUSTERS_DIMENSIONS,
				}}
			/>
		</div>
	);
};
