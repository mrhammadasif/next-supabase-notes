'use client'

import ClientForm from '@/app/notes/client-form'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  const deleteNote = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    setNotes(notes?.filter((note) => note.id !== id) || [])
  }

  const getData = async () => {
    const { data } = await supabase.from('notes').select()
    setNotes(data)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (<div>
    {notes?.map(note => <div className='flex text-xs gap-2 border-b-solid border-b-red-100 pb-4'>
      <h1>{note.title}</h1>
      <a href="javascript://" className='text-red-400 underline pointer'>Delete Note</a>
    </div>)}
    {/* {notes?.map((note) => <div key={note.id} className='flex gap-x-4 items-center b-solid'>
      <span>{note.id}</span>
      <h2>{note.title}</h2>
      <button className='bg-red-400 px-4 py-2 rounded hover:bg-red-600' onClick={() => deleteNote(note.id)}>Delete</button>
    </div>} */}
    <ClientForm refreshData={() => getData()} />
  </div>)
}