import React, { useState, useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import CreateNote from '../components/CreateNote';

const Home = () => {

  const navigate = useNavigate();
  const note = useContext(NoteContext);

  const [notes,setNotes] = useState([])
  
  useEffect(()=>{
    if(!note.isLogin){
      navigate('/login')
      return
    }
    const fetchData = async()=>{
      const data = await note.getNotes()
      setNotes(data.notes)
    }
    fetchData()
  },[note.isLogin, note.reload])


  return (
    <>
    <div className='h-auto flex justify-center py-10 px-3'>


    {notes.length==0 ? "Create a note to show data here":<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4'>
      {notes.map((note) => (
        <Card key={note._id} id={note._id} title={note.title} content={note.content} />
        ))}
    </div>}
    
  </div>
  <CreateNote/>
  </>

  );
};

export default Home;
