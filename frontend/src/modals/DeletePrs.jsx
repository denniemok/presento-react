import React from 'react';

import Modal from '../components/Modal';
import Button from '../components/Button';
import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function DeletePrs () {
  //
  const { store, putStore, prsId, display, setDisplay } = React.useContext(EditContext);
  //
  function handleDelete () {
    const newStore = [...store];
    newStore.splice(prsId, 1);
    setDisplay({ ...display, delete: 'none' }); // close modal
    putStore(newStore, true);
  }
  //
  return (
    <Modal id='delete-prs-modal' display={display.delete}>
      <ButtonClose id='delete-prs-close' onClick={() => setDisplay({ ...display, delete: 'none' })}>x</ButtonClose>
      <h3>Delete Presentation</h3>
      <div>Are you sure to proceed?</div>
      <br />
      <Button id='delete-prs-confirm' onClick={() => handleDelete()}>Confirm</Button>
    </Modal>
  );
}

export default DeletePrs;
