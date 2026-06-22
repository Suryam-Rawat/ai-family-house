// src/components/CreateFamilyMember.tsx

import { useState } from 'react';

const ROLES = ['mom', 'dad', 'sister', 'brother', 'grandma', 'grandpa', 'friend'];
const RELIGIONS = ['hindu', 'muslim', 'christian', 'sikh', 'jain', 'buddhist', 'parsi'];

export function CreateFamilyMember() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('mom');
  const [religion, setReligion] = useState('hindu');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // TODO: Replace with actual API call
    const response = await fetch('/api/family/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: 'user123', // Replace with actual user auth
        name,
        role,
        religion,
        appearance_url: image,
        dialogues: ['I love you', 'How are you?', 'Tell me more']
      }),
    });
    
    if (response.ok) {
      alert('Family member created!');
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-primary mb-6">Create Virtual Family Member</h1>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          
          <select
            value={religion}
            onChange={(e) => setReligion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          
          {image && (
            <img src={image} alt="Preview" className="w-full h-40 rounded-lg object-cover" />
          )}
          
          <button
            onClick={handleSubmit}
            disabled={loading || !name}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-secondary transition"
          >
            {loading ? 'Creating...' : 'Create Family Member'}
          </button>
        </div>
      </div>
    </div>
  );
}
