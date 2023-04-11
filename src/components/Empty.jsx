import React from 'react';
import { Grid, Icon, Button } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
export const Empty = ({ uploadPdf }) => (
	<Grid container justify="center" style={{ height: '80vh' }} spacing={4}>
		<Grid item>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<PictureAsPdfIcon />
					Upload your PDF to start editing!
				</Grid>
				<Grid item xs={12}>
					<Button variant="contained" onClick={uploadPdf}>
						Load PDF
					</Button>
				</Grid>
			</Grid>
		</Grid>
	</Grid>
);
