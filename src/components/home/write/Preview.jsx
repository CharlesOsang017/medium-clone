import react, { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { LiaTimesSolid } from "react-icons/lia";
import ReactQuill from "react-quill";
import TagsInput from "react-tagsinput";
import { db, storage } from "../../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { Blog } from "../../../context/Context";
import { useNavigate } from "react-router-dom";

const Preview = ({ setPublish, title, description }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState({
    title: "",
    photo: "",
  });
  const imgRef = useRef(null);
  const {currentUser} = Blog()
  const navigate = useNavigate()
  const handleClick = () => {
    imgRef.current.click();
  };
  useEffect(() => {
    if (title || description) {
      setPreview({ ...preview, title: title });
      setDesc(description);
    } else {
      setPreview({ ...preview, title: "" });
      setDesc("");
    }
  }, [title, description]);
  const handleSubmit = async()=>{
    setLoading(true)
    try {
      if(preview.title === '' || desc === '' || tags.length === 0){
        toast.error('All fields are required!')
        return;
      }
      if (preview.title.length < 15){
        toast.error('Title must be at least 15 characters')
      }
      const collections = collection(db, 'posts')
      const storageRef = ref(storage, `image/${preview.photo.name}`)
      await uploadBytes(storageRef, preview?.photo)

      const imageUrl = await getDownloadURL(storageRef)
      await addDoc(collections, {
        userId: currentUser?.uid,
        title: preview.title,
        desc,
        tags,
        postImg: imageUrl,
        created: Date.now(),
        pageViews: 0,

      })
      toast.success('post created successfully!')
      navigate('/')
      setPublish(false)
      setPreview({
        title: '',
        photo: ''
      })
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <section className='absolute inset-0 bg-white z-30'>
      <div className='size my-[2rem]'>
        <span
          onClick={() => setPublish(false)}
          className='absolute cursor-pointer right-[1rem] md:right-[5rem] top-[3rem] text-2xl'
        >
          <LiaTimesSolid />
        </span>
        {/* preview the text */}
        <div className='flex flex-col md:flex-row gap-10 mt-[8rem]'>
          <div className='flex-[1rem]'>
            <h3>Story Preview</h3>
            <div
              style={{ backgroundImage: `url(${imgUrl})` }}
              onClick={handleClick}
              className='h-[200px] w-full object-cover bg-gray-100 my-3 grid place-items-center cursor-pointer bg-cover bg-no-repeat'
            >
              {!imgUrl && "Add Image"}
            </div>
            <input
              onChange={(e) => {
                setImgUrl(URL.createObjectURL(e.target.files[0]));
                setPreview({ ...preview, photo: e.target.files[0] });
              }}
              ref={imgRef}
              type='file'
              hidden
            />
            <input
              type='text'
              placeholder='Title'
              value={preview.title}
              onChange={(e) =>
                setPreview({ ...preview, title: e.target.value })
              }
              className='border-b border-gray-300 py-2 outline-none w-full'
            />
            <ReactQuill
              placeholder='Tell Your Story...'
              theme='bubble'
              value={desc}
              onChange={setDesc}
              className='py-3 border-b border-gray-300'
            />
            <p className='text-gray-500 pt-4 text-sm'>
              <span className='font-bold'>Note:</span> Change here will affect
              how your story appers in public places like Medium's homepage and
              in subscribers' inboxes - not the contents of the story itself
            </p>
          </div>
          <div className='flex-[1rem] flex flex-col gap-4 mb-5 md:mb-0'>
            <h3 className='text-2xl'>
              Publishing to:{" "}
              <span className='font-bold capitalize'>Charles</span>
            </h3>
            <p>
              Add or change topics up to 5 so readers know what your story is
              about
            </p>
            <TagsInput value={tags} onChange={setTags} />
            <button onClick={handleSubmit} className='btn !bg-green-800 !w-fit !text-white !rounded-full'>
              {loading ? 'Submitting ...' : 'Publish Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
