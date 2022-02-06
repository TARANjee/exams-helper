import React,{useState} from 'react';

const useModal = () => {
  const [open, setOpen] = useState(false);
  function toggle(){
    setOpen(true)
  }
  return {toggle,open}
}

export default useModal;
