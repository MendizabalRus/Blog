// Packages
import { useState } from 'react';

// Style
import style from '../../style/pages/Redact.module.css';

// Files
import TextInput from '../../../../shared/utils/TextInput.jsx';
import { Editor } from '@tinymce/tinymce-react';

const Redact = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handlePostSubmit = () => {};

  return (
    <div className={style.Redact}>
      <form onSubmit={handlePostSubmit}>
        <input type="text" />
        <Editor
          apiKey="5jhq28tbw5e7fqp4y7pktzryfwohpq7jgtyk90jvvcfxmvrq"
          initialValue="<p>This is the initial content of the editor.</p>"
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
      </form>
    </div>
  );
};
export default Redact;
