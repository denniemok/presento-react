import React from 'react';

import Modal from '../components/Modal';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function EditTheme () {
  //
  const { store, putStore, prsId, sldId, display, setDisplay, prsBgColor, sldBgColor } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    prsBgColor,
    sldBgColor,
  });
  //
  React.useEffect(() => {
    setForm({
      prsBgColor,
      sldBgColor,
    });
  }, [display]);
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].bgColor = form.prsBgColor;
    newStore[prsId].slideBgColor[sldId] = form.sldBgColor;
    setDisplay({ ...display, editTheme: 'none' }); // close modal
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
    <Modal id='edit-theme-modal' display={display.editTheme}>
      <ButtonClose id='edit-theme-close' onClick={() => setDisplay({ ...display, editTheme: 'none' })}>x</ButtonClose>
      <h3>Edit Theme</h3>
      <label htmlFor='default-background'>Default Background</label>
      <Textbox id='default-background' type='text' name='prsBgColor' onChange={handleChange} value={form.prsBgColor} required />
      <label htmlFor='slide-background'>Slide Background</label>
      <Textbox id='slide-background' type='text' name='sldBgColor' placeholder='Leave this field empty to use default background.' onChange={handleChange} value={form.sldBgColor} />
      <Button id='edit-theme-confirm' onClick={() => handleUpdate()}>Update</Button>
    </Modal>
  );
}

export default EditTheme;
