import { useState } from 'react';
import { Message } from './types';

const PostForm = ({
  onSubmit,
  clear,
}: {
  onSubmit: (message: Message) => void;
  clear?: boolean;
}) => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const fieldsInvalid = !(title.trim().length && text.trim().length);

  return (
    <form onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit({ title, text });
        if (clear) {
          setTitle('');
          setText('');
        }
      }}
      className="post-form flex flex-col"
    >
      <input
        type="text"
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        placeholder="Title"
        className="input mb-3"
      />
      <textarea
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        placeholder="Your Message Here"
        className="textarea mb-3"
        style={{ width: '1000px' }}
      />
      <button
        type="submit"
        className={`button ${
          fieldsInvalid ? 'is-primary' : 'is-link'
        } ml-auto`}
        disabled={fieldsInvalid}
      >
        Submit
      </button>
    </form>
  );
};

export default PostForm;

