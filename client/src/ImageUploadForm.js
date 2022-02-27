import React, {useState} from 'react';

function ImageUploadForm() {
const [image1, setImage1] = useState({})
const [image2, setImage2] = useState({})
const [title, setTitle] = useState('')

const [errors, setErrors] = useState([])
const [posts, setPosts] = useState([])

const handleOneChange = e => {
    e.persist();
    setImage1(e.target.files[0]);
  };

const handleTwoChange = e => {
    e.persist();
    setImage2(e.target.files[0]);
  };  

const handleTitleChange = e => {
    setTitle(e.target.value);
  };  

const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    data.append('image1', image1);
    data.append('image2', image2);
    data.append('title', title);

    fetch('/posts', {
      method: 'POST',
      body: data,
    }).then((r) => {
      if (r.ok) {
          r.json().then((posts) => {
              setPosts(posts);
          });
      } else {
          r.json().then((err) => setErrors(err.errors));
      }
  })
  
  
  };

    return (
        <div className='image-upload'>
            <h2>Upload</h2>
            <form onSubmit={handleSubmit}>
                <label>Image Upload</label>
                <input type="text" name="title" onChange={handleTitleChange}/>
                <input type="file" name="image1" required onChange={handleOneChange}/>
                <input type="file" name="image1" required onChange={handleTwoChange}/>

                <input type="submit" />
                {errors.map((e)=><p key={e}>{e}</p>)}
            </form>
        </div>
    )
};

export default ImageUploadForm;