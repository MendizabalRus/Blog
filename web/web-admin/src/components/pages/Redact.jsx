// Packages
import { useState } from 'react';
import { useNavigate } from 'react-router';

// Style
import style from '../../style/pages/Redact.module.css';

// Files
import Button from '../../../../shared/utils/Button.jsx';
import { Editor } from '@tinymce/tinymce-react';

const Redact = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const navigate = useNavigate();

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
        }),
      });

      const result = await response.json();
      console.log(result);

      navigate('/dashboard');
    } catch (err) {
      console.error(err || 'Something went wrong...');
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className={style.Redact}>
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        apiKey="5jhq28tbw5e7fqp4y7pktzryfwohpq7jgtyk90jvvcfxmvrq"
        initialValue="<p></p>"
        onEditorChange={(content) => setBody(content)}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <Button type="submit" value="Post!" />
    </form>
  );
};
export default Redact;
