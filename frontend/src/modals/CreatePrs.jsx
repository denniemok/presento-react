import React from 'react';

import Modal from '../components/Modal';
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { NewContext } from '../pages/Dashboard';
import ButtonClose from '../components/ButtonClose';

function CreatePrs () {
  //
  const { display, setDisplay, store, putStore } = React.useContext(NewContext);
  //
  const [form, setForm] = React.useState({
    title: '',
    desc: '',
  });
  //
  function handleCreate () {
    const newStore = [...store];
    newStore.push({
      title: form.title,
      slide: [[]], // contains an empty slide
      slideBgColor: [''],
      desc: form.desc,
      bgColor: 'white',
    });
    setDisplay('none'); // close modal
    putStore(newStore);
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
    <Modal id='create-prs-modal' display={display}>
      <ButtonClose id='create-prs-close' onClick={() => setDisplay('none')}>x</ButtonClose>
      <h3>New Presentation</h3>
      <label htmlFor='create-prs-title'>Title</label>
      <Textbox id='create-prs-title' type='text' name='title' placeholder='Title' onChange={handleChange} value={form.title} required />
      <label htmlFor='create-prs-desc'>Description</label>
      <Textbox id='create-prs-desc' type='text' name='desc' placeholder='Description' onChange={handleChange} value={form.desc} />
      <Button id='create-prs-confirm' onClick={() => handleCreate()}>Create</Button>
    </Modal>
  );
}

export default CreatePrs;
