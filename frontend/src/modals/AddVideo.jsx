import React from 'react';

import Modal from '../components/Modal';
import Button from '../components/Button';
import Textbox from '../components/Textbox';
import Checkbox from '../components/Checkbox';

import { EditContext } from '../pages/Edit';
import ButtonClose from '../components/ButtonClose';

function AddVideo () {
  //
  const { store, putStore, prsId, sldId, display, setDisplay } = React.useContext(EditContext);
  //
  const [form, setForm] = React.useState({
    areaSize: '50, 50',
    areaPosition: '0, 0',
    videoUrl: 'hVtm2M08IX4',
    videoAutoPlay: true,
  });
  //
  function handleUpdate () {
    const newStore = [...store];
    newStore[prsId].slide[sldId].push({
      category: 'video',
      width: form.areaSize.split(', ').at(0),
      height: form.areaSize.split(', ').at(1),
      top: form.areaPosition.split(', ').at(1),
      left: form.areaPosition.split(', ').at(0),
      url: form.videoUrl,
      autoPlay: form.videoAutoPlay,
    })
    setDisplay({ ...display, addVideo: 'none' }); // close modal
    putStore(newStore, false);
  }
  //
  function handleChange (e) {
    setForm({
      ...form,
      [e.target.name]: e.target.getAttribute('type') === 'checkbox' ? e.target.checked : e.target.value,
    })
  }
  //
  return (
    <Modal id='add-video-modal' display={display.addVideo}>
      <ButtonClose id='add-video-close' onClick={() => setDisplay({ ...display, addVideo: 'none' })}>x</ButtonClose>
      <h3>Add VIDEO to Slide</h3>
      <label htmlFor='video-area-size'>Area Size (w%, h%)</label>
      <Textbox id='video-area-size' type='text' name='areaSize' onChange={handleChange} value={form.areaSize} required />
      <label htmlFor='video-area-position'>Position (x%, y%)</label>
      <Textbox id='video-area-position' type='text' name='areaPosition' onChange={handleChange} value={form.areaPosition} required />
      <label htmlFor='video-id'>Youtube Video ID</label>
      <Textbox id='video-id' type='text' name='videoUrl' onChange={handleChange} value={form.videoUrl} required />
      <label htmlFor='video-autoplay'>Auto Play</label>
      <Checkbox id='video-autoplay' name='videoAutoPlay' onChange={handleChange} checked={form.videoAutoPlay} />
      <Button id='add-video-confirm' onClick={() => handleUpdate()}>Add</Button>
    </Modal>
  );
}

export default AddVideo;
