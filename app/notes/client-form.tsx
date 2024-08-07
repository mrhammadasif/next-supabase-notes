"use client"

import { createClient } from '@/utils/supabase/client'

export default function ClientForm(props: {
  refreshData: () => void
}) {
  const supabase = createClient()
  
  async function createNote(formData: FormData) {
    const title = formData.get('note') as string
    await supabase.from('notes').insert([{ title }])
    alert("Note Created!")
    props.refreshData()
  }

  return (
    <div>
      <form>
        <input name='note' type='text' className='px-4 py-2 text-blue-900' placeholder='Enter Note Text...' />
        <button formAction={createNote} className='bg-green-400 px-4 py-2 rounded hover:bg-green-600'>Create Note</button>
      </form>
    </div>
  )
}