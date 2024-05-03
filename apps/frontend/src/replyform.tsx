import React, { useState } from 'react';
import { Message } from './types';

const ReplyForm = ({ onSubmit, onCancel }: { onSubmit: (message: Message) => void; onCancel: () => void; }) => {
  const [text, setText] = useState('');
  const title  = '';

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (!text.trim()) {
      return;
    }
    onSubmit({ title, text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <textarea
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        placeholder="Your Message Here"
        className="textarea mb-3"
      />
      <button type="submit" className="button is-link ml-auto" disabled={!text.trim()}>
        Submit
      </button>
      <button type="button" className="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ReplyForm;

