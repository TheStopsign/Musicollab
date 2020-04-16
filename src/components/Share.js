import React from 'react';
import Modal from 'react-modal';
import axios from 'axios'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('root'));

function Share(props) {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {

	}

	function closeModal() {
		setIsOpen(false);
	}

	function shareDoc(e) {
		e.preventDefault()
		let email = document.getElementById('email').value
		let isOwner = document.getElementById('isOwner').value == "on"
		let canEdit = document.getElementById('canEdit').value == "on"
		let canView = document.getElementById('canView').value == "on"
		let sharedUserID; // To store the sharedUserID if found from /findEmail GET

		// Query database for email (account) to share document with
		axios.get('http://localhost:8000/accounts/findEmail/' + email)
			.then(res => {
				//found account
				if (res.status == 200) {
					console.log('Account found, database id:', res.data)
					sharedUserID = res.data;

					let permission; // to store new permission object from /new POST
					// Now create a new permission to represent sharing
					axios.post('http://localhost:8000/permissions/new', {
						document: props.docID,
						isOwner: isOwner,
						canEdit: canEdit,
						canView: canView,
					}).then(res2 => {
						console.log('New permission:', res2.data)
						permission = res2.data;

						// Add the new permission_id to the shared user's list of permissions
						axios.post('http://localhost:8000/accounts/newPermission', {
							permission: permission,
							userID: sharedUserID
						}).then(res3 => {
							console.log('Successfully saved permission to account', res3);
						}).catch(error => {
							console.log('Share permission with account error: ', error);
						})
					}).catch(error => {
						console.log('permissions/new error: ', error)
					})
				} else {
					console.log('Account not found, status:', res.status)
				}

			}).catch(err => {
				console.log('accounts/findEmail ERROR: ', err)
			})
	}

	return (
		<div>
			<button className="btn btn-primary" onClick={openModal}>Share...</button>
			<Modal
				isOpen={modalIsOpen}
				onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<form onSubmit={shareDoc}>
					<button className="btn btn-secondary" onClick={closeModal}>Nevermind</button>
					<input id="email" name="email" placeholder="Email" required />
					<input type="checkbox" id="isOwner" name="isOwner" />
					<label for="isOwner">Is Owner</label>
					<input type="checkbox" id="canEdit" name="canEdit" />
					<label for="canEdit">Can Edit</label>
					<input type="checkbox" id="canView" name="canView" />
					<label for="canView">Can View</label>
					<button type="submit" className="btn btn-primary">Share</button>
				</form>
			</Modal>
		</div>
	);
}

export default Share;