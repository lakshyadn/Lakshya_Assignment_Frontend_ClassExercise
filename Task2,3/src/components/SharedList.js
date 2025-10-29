import React, { useContext, useState } from 'react';
import { ProfileContext } from '../ProfileContext';

const SharedList = () => {
  const { items, addItem, removeItem } = useContext(ProfileContext);
  const [text, setText] = useState('');

  const handleAdd = () => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;
    addItem({ text: trimmed });
    setText('');
  };

  return (
    <div style={{ minWidth: 300, padding: 24 }}>
      <h3>Shared Items</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an item"
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.length === 0 && <li style={{ color: '#666' }}>No items yet</li>}
        {items.map((it) => (
          <li key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ flex: 1 }}>{it.text}</span>
            <button onClick={() => removeItem(it.id)} style={{ background: '#dc3545' }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedList;
