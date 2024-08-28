import React from 'react';

import Modal from '../components/Modal';
import Button from '../components/Button';
import Textbox from '../components/Textbox';

import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function AddImage () {
  //
  const { store, putStore, prsId, sldId, display, setDisplay } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    areaSize: '50, 50',
    areaPosition: '0, 0',
    imageUrl: 'https://cgi.cse.unsw.edu.au/~cs6080/static/media/mainlogo.076dd3cde2e51483f2d0.png',
    imageAlt: 'ALT TEXT HERE',
  });
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].slide[sldId].push({
      category: 'image',
      width: form.areaSize.split(', ').at(0),
      height: form.areaSize.split(', ').at(1),
      top: form.areaPosition.split(', ').at(1),
      left: form.areaPosition.split(', ').at(0),
      url: form.imageUrl,
      alt: form.imageAlt,
    })
    setDisplay({ ...display, addImage: 'none' }); // close modal
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
    <Modal id='add-image-modal' display={display.addImage}>
      <ButtonClose id='add-image-close' onClick={() => setDisplay({ ...display, addImage: 'none' })}>x</ButtonClose>
      <h3>Add IMAGE to Slide</h3>
      <label htmlFor='image-area-size'>Area Size (w%, h%)</label>
      <Textbox id='image-area-size' type='text' name='areaSize' onChange={handleChange} value={form.areaSize} required />
      <label htmlFor='image-area-position'>Position (x%, y%)</label>
      <Textbox id='image-area-position' type='text' name='areaPosition' onChange={handleChange} value={form.areaPosition} required />
      <label htmlFor='image-url'>URL</label>
      <Textbox id='image-url' type='text' name='imageUrl' onChange={handleChange} value={form.imageUrl} required />
      <label htmlFor='image-alt'>Alt Text</label>
      <Textbox id='image-alt' type='text' name='imageAlt' onChange={handleChange} value={form.imageAlt} required />
      <Button id='add-image-confirm' onClick={() => handleUpdate()}>Add</Button>
    </Modal>
  );
}

export default AddImage;
