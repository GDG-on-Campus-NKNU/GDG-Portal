import React, { useRef, useState } from 'react'

export default function FileUploader({ onUpload }) {
  const inputRef = useRef()
  const [dragging, setDragging] = useState(false)

  const handleFiles = (files) => {
    onUpload(files)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles(e.dataTransfer.files)
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center
        ${dragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}
        cursor-pointer transition
      `}
      onClick={() => inputRef.current.click()}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <p className="text-gray-600">點擊或拖曳檔案到此以上傳</p>
    </div>
  )
}
