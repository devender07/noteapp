import React, { useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { NavLink } from 'react-router-dom';

const Card = (props) => {
    const note = useContext(NoteContext);

    const handleClick = async () => {
        await note.deleteNote(props.id);
    };

    // Function to truncate content to first 20 words
    const truncateContent = (content) => {
        const words = content.split(' '); 
        const truncatedWords = words.slice(0, 20); 
        const truncatedContent = truncatedWords.join(' '); 
        return truncatedContent;
    };

    return (
        <div className="container mx-auto mt-8 max-w-[400px]">
            <div className="bg-white p-4 rounded shadow">
                <div>
                    <h2 className="text-lg font-semibold py-2">{props.title || 'Title'}</h2>
                    <p className="text-base py-2">{truncateContent(props.content) || 'Content'}...</p> {/* Display truncated content */}
                </div>
                <NavLink to={`/note/${props.id}`} className="text-blue-500 hover:underline">Read more</NavLink>
                <div className="mt-4 flex justify-end">
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                        onClick={handleClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
