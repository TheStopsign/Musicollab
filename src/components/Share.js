import React from 'react';
import Modal from 'react-modal';

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
// Modal.setAppElement('#yourAppElement')

function Share() {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function afterOpenModal() {

	}

	function closeModal() {
		setIsOpen(false);
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
				<form>
					<button className="btn btn-secondary" onClick={closeModal}>Nevermind</button>
					<input id="email" name="email" placeholder="Email" />
					<input type="checkbox" id="isOwner" name="isOwner" />
					<label for="isOwner">Is Owner</label>
					<input type="checkbox" id="canEdit" name="canEdit" />
					<label for="canEdit">Can Edit</label>
					<input type="checkbox" id="canView" name="canView" />
					<label for="canView">Can View</label>
					<button className="btn btn-primary" onClick={closeModal}>Share</button>
				</form>
			</Modal>
		</div>
	);
}

export default Share;