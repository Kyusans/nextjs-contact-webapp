import React from 'react'

function Spinner() {
  return (
    <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-purple-950 rounded-full" role="status" aria-label="loading">
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Spinner