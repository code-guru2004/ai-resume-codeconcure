'use client'
import React, { useEffect, useState } from 'react';


const FileUpload = ({onFileSelect}) => {
const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        onFileSelect(file)
    };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute flex flex-col items-center">
              <img alt="File Icon" className="mb-3" src="https://img.icons8.com/dusk/64/000000/file.png" />
              {
                file?(
                  <span>{file.name}</span>
                ) :(
                  <p className='text-center'>

                    <span className="block text-gray-500 font-semibold">Drag &amp; drop your Resume/CV here</span>
                    <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                  </p>
                )
              }
             
            </div>
            <input className="h-full w-full opacity-0 cursor-pointer" type="file" accept="application/pdf" onChange={handleFileChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FileUpload;
