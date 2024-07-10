
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { addTask, completeTask, deleteTask, showTask } from './features/taskSlice'
import Update from './components/Update'

function App() {
      const {tasks, loading, error} = useSelector((state) => state.task) 
      const dispatch = useDispatch()
      const [open , setOpen] = useState(false)
      const [name, setName] = useState('')
      const [task, setTask] = useState('')
      const [id, setId] = useState(undefined)
      const [complete, setComplete] = useState(false)

      const memoizedTasks = useMemo(() => tasks, [tasks]);

      useEffect(() => {
            dispatch(showTask())
    }, [dispatch])


      const handleOpen = (id) => {

          setOpen(true)
          setId(id)
      }

      const handleComplete = ({id}) => {
         setComplete(true)
         dispatch(completeTask({id, complete}))
      }

      const handleAdd = ({ name, task }) => {
        if (name !== '' && task !== '') {
          // Dispatch action only if tasks array is empty
        
            dispatch(addTask({ name, task }));
            setName('');
            setTask('');
            toast.success('Task Added');
          }
      };

      const handleDelete = (id) => {
        dispatch(deleteTask(id))
      }

      return (
        <>
          <Toaster 
            position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
            toastOptions={{ duration: 5000 }} />
          <div className='w-full my-10 flex flex-col justify-center items-center '>
            <div className='w-3/6 flex flex-row gap-2 border-solid border-1 border-black p-2 rounded'>
              <input 
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-3/6 border-solid border-2 border-gray-400 p-2'/>
              <input 
                placeholder='task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className='w-3/6 border-solid border-2 border-gray-400 p-2'/>
              <button 
                className='w-2/6 bg-green-500 p-2'
                onClick={() => handleAdd({ name, task })}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              memoizedTasks.length > 0 || error ? (
                memoizedTasks.map((task) => (
                  <div key={task._id} className='lg:w-3/6 sm:w-full grid grid-cols-1 border-solid border-2 border-black rounded mt-2'>
                    <div className='h-20 flex flex-row justify-between items-middle'> 
                      <div className='flex flex-col p-2 '>
                        <h4>{task.name || ''}</h4>
                        <h5>{task.todo || ''}</h5>
                      </div>
                      <div className='flex flex-row p-2 gap-2 '>
                        <button onClick={() => handleDelete(task._id)} className='border-solid border-2 border-gray-400 p-3 rounded'><i className="fa-solid fa-trash"></i></button>
                        <button onClick={() => handleOpen(task._id)} className='border-solid border-2 border-gray-400 p-3 rounded'><i className="fa-solid fa-pen"></i></button>
                        <button onClick={() => handleComplete({ id: task._id })} style={{ color: task.completed === true ? 'gray': 'black' }} className='border-solid border-2 border-gray-400 p-2 rounded' disabled={task.completed}>COMPLETED</button>
                      </div>
                    </div>
                    <Update taskId={id} open={open} onClose={() => setOpen(false)}/>
                  </div>
                ))
              ) : (
                <h1>No Tasks found..</h1>
              )
            )}
          </div>
        </>
      );
}

export default App
