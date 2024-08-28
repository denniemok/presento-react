import React from 'react';

import Modal from '../components/Modal';
import Button from '../components/Button';
import Textbox from '../components/Textbox';
import Dropdown from '../components/Dropdown';

import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function AddText () {
  //
  const { store, putStore, prsId, sldId, display, setDisplay } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    areaSize: '50, 50',
    areaPosition: '0, 0',
    textContent: 'YOUR TEXT HERE',
    textFontSize: '1',
    textFontType: '"Times New Roman", Times, serif',
    textColor: 'black',
  });
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].slide[sldId].push({
      category: 'text',
      width: form.areaSize.split(', ').at(0),
      height: form.areaSize.split(', ').at(1),
      top: form.areaPosition.split(', ').at(1),
      left: form.areaPosition.split(', ').at(0),
      content: form.textContent,
      fontSize: form.textFontSize,
      fontType: form.textFontType,
      color: form.textColor,
    })
    setDisplay({ ...display, addText: 'none' }); // close modal
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
    <Modal id='add-text-modal' display={display.addText}>
      <ButtonClose id='add-text-close' onClick={() => setDisplay({ ...display, addText: 'none' })}>x</ButtonClose>
      <h3>Add TEXT to Slide</h3>
      <label htmlFor='text-area-size'>Area Size (w%, h%)</label>
      <Textbox id='text-area-size' type='text' name='areaSize' onChange={handleChange} value={form.areaSize} required />
      <label htmlFor='text-area-position'>Position (x%, y%)</label>
      <Textbox id='text-area-position' type='text' name='areaPosition' onChange={handleChange} value={form.areaPosition} required />
      <label htmlFor='text-content'>Content</label>
      <Textbox id='text-content' type='text' name='textContent' onChange={handleChange} value={form.textContent} required />
      <label htmlFor='text-font-size'>Font Size (in em)</label>
      <Textbox id='text-font-size' type='text' name='textFontSize' onChange={handleChange} value={form.textFontSize} required />
      <label htmlFor='text-font-type'>Font Family</label>
      <Dropdown id='text-font-type' name='textFontType' onChange={handleChange} value={form.textFontType}>
        <option value='Arial, Helvetica, sans-serif'>Arial, Helvetica, sans-serif</option>
        <option value='"Times New Roman", Times, serif'>Times New Roman, Times, serif</option>
        <option value='"Lucida Console", "Courier New", monospace'>Lucida Console, Courier New, monospace</option>
      </Dropdown>
      <label htmlFor='text-color'>Color</label>
      <Textbox id='text-color' type='text' name='textColor' onChange={handleChange} value={form.textColor} required />
      <Button id='add-text-confirm' onClick={() => handleUpdate()}>Add</Button>
    </Modal>
  );
}

export default AddText;
