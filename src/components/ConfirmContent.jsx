import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmContent = (props) => {
	const { title, onConfirm, onDismiss, open } = props;
	return (
		<Dialog
			open={open}
			onClose={onDismiss}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description">
			<DialogTitle id="alert-dialog-title">Confirmation Dialog</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{title}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onDismiss} color="primary">
					No
				</Button>
				<Button onClick={onConfirm} color="primary" autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};
