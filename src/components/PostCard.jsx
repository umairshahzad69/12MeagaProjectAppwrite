import React, { useEffect, useState } from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage}) => {
  const [previewUrl, setPreviewUrl] = useState('');
  useEffect(() => {
    const fetchPreview = async ()=>{
      try{
        if (featuredImage) {
          const preview = await service.filePreview(featuredImage);
          setPreviewUrl(preview.href);
        }
      }
      catch(error){
        console.log("Error getting file preview", error);
      }
    };
    fetchPreview();
  }, [featuredImage])
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {previewUrl && <img src={previewUrl} alt={title} />}
          
        </div>
        <h2 className='font-bold text-xl'>{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard