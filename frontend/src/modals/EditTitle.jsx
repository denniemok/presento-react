import React from 'react';

import Modal from '../components/Modal';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import ButtonClose from '../components/ButtonClose';

import { EditContext } from '../pages/Edit';

function EditTitle () {
  //
  const { store, putStore, prsId, display, setDisplay, prsTitle, prsDesc } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    title: prsTitle,
    desc: prsDesc,
  });
  //
  React.useEffect(() => {
    setForm({
      title: prsTitle,
      desc: prsDesc,
    });
  }, [display]);
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].title = form.title;
    newStore[prsId].desc = form.desc;
    setDisplay({ ...display, editTitle: 'none' }); // close modal
    putStore(newStore, false);
  }
  //
  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }
  //
  return (
    <Modal id='edit-title-modal' display={display.editTitle}>
      <ButtonClose id='edit-title-close' onClick={() => setDisplay({ ...display, editTitle: 'none' })}>x</ButtonClose>
      <h3>Edit Title</h3>
      <label htmlFor='edit-title-title'>Title</label>
      <Textbox id='edit-title-title' type='text' name='title' onChange={handleChange} value={form.title} required />
      <label htmlFor='edit-title-desc'>Description</label>
      <Textbox id='edit-title-desc' type='text' name='desc' onChange={handleChange} value={form.desc} />
      <Button id='edit-title-confirm' onClick={() => handleUpdate()}>Update</Button>
    </Modal>
  );
}

export default EditTitle;
