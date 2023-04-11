import React from 'react';
import { ConfirmContent } from './ConfirmContent';
export const Drawing = (props) => {
	const { cancelDelete, deleteDrawing, positionTop, positionLeft, width, height, svgRef } = props;
	const { path, stroke, strokeWidth, handleMouseDown, handleMouseMove, handleMouseOut, handleMouseUp, onClick } =
		props;
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
				width,
				height,
				cursor: 'move',
			}}>
			<div style={{ border: '1px solid black', overflow: 'auto', resize: 'both' }}>
				<svg ref={svgRef}>
					<path
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						strokeLinejoin="round"
						stroke={stroke}
						fill="none"
						d={path}
					/>
				</svg>
			</div>

			<ConfirmContent title="Delete?" onConfirm={deleteDrawing} onDismiss={cancelDelete} />
		</div>
	);
};
