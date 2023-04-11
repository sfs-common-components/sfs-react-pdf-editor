import React from 'react';
import { Menu, MenuItem, Dropdown, Icon } from '@material-ui/core';
export const MenuBar = ({
	openHelp,
	uploadNewPdf,
	addDrawing,
	addText,
	addImage,
	isPdfLoaded,
	savingPdfStatus,
	savePdf,
}) => (
	<Menu pointing>
		<MenuItem header>PDF Editor</MenuItem>
		<MenuItem position="right">
			{isPdfLoaded && (
				<>
					<Dropdown data-testid="edit-menu-dropdown" item closeOnBlur icon="edit outline" simple>
						<Dropdown.Menu>
							<Dropdown.Item onClick={addText}>Add Text</Dropdown.Item>
							<Dropdown.Item onClick={addImage}>Add Image</Dropdown.Item>
							<Dropdown.Item onClick={addDrawing}>Add Drawing</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Menu.Item
						data-testid="save-menu-item"
						name={savingPdfStatus ? 'Saving...' : 'Save'}
						disabled={savingPdfStatus}
						onClick={savePdf}
					/>
					<Menu.Item data-testid="upload-menu-item" name="Upload New" onClick={uploadNewPdf} />
				</>
			)}
			<Menu.Item data-testid="help-menu-item" onClick={openHelp}>
				<Icon name="question circle outline" />
			</Menu.Item>
		</MenuItem>
	</Menu>
);
