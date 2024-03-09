import React, { useState, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';

const CreateNote = () => {
    const note = useContext(NoteContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showCard, setShowCard] = useState(false); // State to toggle card visibility

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await note.createNote(title, content);
            setTitle('');
            setContent('');
            setShowCard(false);
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 relative">
            {showCard && (
                <form onSubmit={handleSubmit} className="w-3/5 md:w-1/5 bg-white p-4 rounded shadow fixed bottom-5 right-10 mb-4 mr-4 z-10">
                    <h2 className="text-lg font-semibold mb-4">Create a New Note</h2>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-400"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400">
                        Save
                    </button>
                </form>
            )}
            <button
                onClick={() => setShowCard(!showCard)} // Toggle card visibility on button click
                className="bg-blue-500 text-white rounded-full p-4 fixed bottom-4 right-4 z-20 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M13 3a1 1 0 00-2 0v4H7a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V3z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};

export default CreateNote;
