import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { updateTask } from '../features/taskSlice';
import toast from 'react-hot-toast';

const MODAL_STYLES = {
    position: "fixed",
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    border: '1px solid gray',
    borderRadius: '0.5em'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const Update = ({taskId, open , onClose}) => {
  const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [task, setTask] = useState('')
    
    const update = () => {
      if(name !== '' && task !== ''){
       dispatch(updateTask({taskId, name, task}))
       setName('')
       setTask('')
       toast.success('Task Updated')
      }else{
        toast.error('Please provide details')
      }
    }


    if(!open) return null
    return createPortal(
        <>
            <div style={OVERLAY_STYLE} />

            <div 
            style={MODAL_STYLES}
            >
            <button onClick={onClose}>
            <i class="fa-solid fa-x"></i>
            </button>
            <div className='w-full flex flex-col gap-2 border-solid border-1 border-black p-2 rounded'>
      <input 
        placeholder='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full border-solid border-2 border-gray-400 p-2'/>
      <input 
        placeholder='task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className='w-full border-solid border-2 border-gray-400 p-2'/>
      <button 
        className='w-full bg-green-500 p-2'
        onClick={update}
      >
       <i className="fa-solid fa-pen"></i>
      </button>
    </div>

            </div>
        </>,
         document.getElementById('portal')
    )
}

export default Update