import React from 'react';

import Modal from '../components/Modal';
import Button from '../components/Button';
import Textbox from '../components/Textbox';
import Textarea from '../components/Textarea';

import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function AddCode () {
  //
  const { store, putStore, prsId, sldId, display, setDisplay } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    areaSize: '50, 50',
    areaPosition: '0, 0',
    codeContent: 'YOUR CODE HERE',
    codeFontSize: '1',
  });
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].slide[sldId].push({
      category: 'code',
      width: form.areaSize.split(', ').at(0),
      height: form.areaSize.split(', ').at(1),
      top: form.areaPosition.split(', ').at(1),
      left: form.areaPosition.split(', ').at(0),
      fontSize: form.codeFontSize,
      content: form.codeContent,
      color: 'black',
    })
    setDisplay({ ...display, addCode: 'none' }); // close modal
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
    <Modal id='add-code-modal' display={display.addCode}>
      <ButtonClose id='add-code-close' onClick={() => setDisplay({ ...display, addCode: 'none' })}>x</ButtonClose>
      <h3>Add CODE to Slide</h3>
      <label htmlFor='code-area-size'>Area Size (w%, h%)</label>
      <Textbox id='code-area-size' type='text' name='areaSize' onChange={handleChange} value={form.areaSize} required />
      <label htmlFor='code-area-position'>Position (x%, y%)</label>
      <Textbox id='code-area-position' type='text' name='areaPosition' onChange={handleChange} value={form.areaPosition} required />
      <label htmlFor='code-content'>Content</label>
      <Textarea id='code-content' name='codeContent' onChange={handleChange} value={form.codeContent} required />
      <label htmlFor='code-font-size'>Font Size (in em)</label>
      <Textbox id='code-font-size' type='text' name='codeFontSize' onChange={handleChange} value={form.codeFontSize} required />
      <Button id='add-code-confirm' onClick={() => handleUpdate()}>Add</Button>
    </Modal>
  );
}

export default AddCode;
