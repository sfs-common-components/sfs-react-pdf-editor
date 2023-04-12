import React, { useState, useLayoutEffect } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
//import { MenuBar } from './components/MenuBar';
//import { DrawingModal } from './modals/components/DrawingModal';
//import { HelpModal } from './modals/components/HelpModal';
import { usePdf } from './hooks/usePdf';
import { AttachmentTypes } from './entities';
import { ggID } from './utils/helpers';
import { useAttachments } from './hooks/useAttachments';
import { useUploader, UploadTypes } from './hooks/useUploader';
import { Empty } from './components/Empty';
import { Page } from './components/Page';
import { Attachments } from './components/Attachments';
const App = () => {
	const [helpModalOpen, setHelpModalOpen] = useState(false);
	const [drawingModalOpen, setDrawingModalOpen] = useState(false);
	const {
		file,
		initialize,
		pageIndex,
		isMultiPage,
		isFirstPage,
		isLastPage,
		currentPage,
		isSaving,
		savePdf,
		previousPage,
		nextPage,
		setDimensions,
		name,
		dimensions,
	} = usePdf();

	const {
		add: addAttachment,
		allPageAttachments,
		pageAttachments,
		reset: resetAttachments,
		update,
		remove,
		setPageIndex,
	} = useAttachments();
	const initializePageAndAttachments = (pdfDetails) => {
		initialize(pdfDetails);
		const numberOfPages = pdfDetails.pages.length;
		resetAttachments(numberOfPages);
	};
	const {
		inputRef: pdfInput,
		handleClick: handlePdfClick,
		isUploading,
		onClick,
		upload: uploadPdf,
	} = useUploader({
		use: UploadTypes.PDF,
		afterUploadPdf: initializePageAndAttachments,
	});
	const {
		inputRef: imageInput,
		handleClick: handleImageClick,
		onClick: onImageClick,
		upload: uploadImage,
	} = useUploader({
		use: UploadTypes.IMAGE,
		afterUploadAttachment: addAttachment,
	});
	const addText = () => {
		const newTextAttachment = {
			id: ggID(),
			type: AttachmentTypes.TEXT,
			x: 0,
			y: 0,
			width: 200,
			height: 25,
			size: 16,
			lineHeight: 1.4,
			fontFamily: 'Times-Roman',
			text: 'Enter Text Here',
		};
		addAttachment(newTextAttachment);
	};
	const addDrawing = (drawing) => {
		if (!drawing) return;
		const newDrawingAttachment = {
			id: ggID(),
			type: AttachmentTypes.DRAWING,
			...drawing,
			x: 0,
			y: 0,
			scale: 1,
		};
		addAttachment(newDrawingAttachment);
	};
	useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);
	const handleSavePdf = () => savePdf(allPageAttachments);
	return (
		<Grid container>
			<input
				data-testid="pdf-input"
				ref={pdfInput}
				type="file"
				name="pdf"
				id="pdf"
				accept="application/pdf"
				onChange={uploadPdf}
				onClick={onClick}
				style={{ display: 'none' }}
			/>
			<input
				ref={imageInput}
				type="file"
				id="image"
				name="image"
				accept="image/*"
				onClick={onImageClick}
				style={{ display: 'none' }}
				onChange={uploadImage}
			/>

			{!file ? (
				<Empty loading={isUploading} uploadPdf={handlePdfClick} />
			) : (
				<Grid container justify="space-around">
					<Grid item>{isMultiPage && !isFirstPage && <Button onClick={previousPage}>Pervious </Button>}</Grid>
					<Grid item xs={8}>
						<div style={{ position: 'relative' }}>
							<Page dimensions={dimensions} updateDimensions={setDimensions} page={currentPage} />
							{dimensions && (
								<Attachments
									pdfName={name}
									removeAttachment={remove}
									updateAttachment={update}
									pageDimensions={dimensions}
									attachments={pageAttachments}
								/>
							)}
						</div>
						{/* <iframe
							width={'100%'}
							style={{ height: '100vh' }}
							src="https://sfs-api-framework-upload-qa.s3.ca-central-1.amazonaws.com/pdfserver/1681125841844.html"></iframe> */}
					</Grid>
					<Grid item>{isMultiPage && !isLastPage && <Button onClick={nextPage}>Next </Button>}</Grid>
				</Grid>
			)}
			{/* <DrawingModal open={drawingModalOpen} dismiss={() => setDrawingModalOpen(false)} confirm={addDrawing} />

			<HelpModal open={helpModalOpen} dismiss={() => setHelpModalOpen(false)} /> */}
		</Grid>
	);
};
export default App;
