import React, { useState, useContext, useEffect } from 'react';
import { NoteContext } from '../context/NoteContext';
import { useParams } from 'react-router-dom';

const NotePage = () => {
    const note = useContext(NoteContext);
    const { id } = useParams();

    const [noteData, setNoteData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await note.getNote(id);
                setNoteData(response.note);
                setEditedTitle(response.note.title);
                setEditedContent(response.note.content);
            } catch (error) {
                console.error('Error fetching note:', error);
            }
        };

        fetchNote();
    }, [id, note]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            await note.updateNote(id,{ title: editedTitle, content: editedContent });
            setNoteData(prevNoteData => ({
                ...prevNoteData,
                title: editedTitle,
                content: editedContent // Update content in local state
            }));
            setEditMode(false);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 md:w-2/4">
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg p-2">
                    {editMode ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded"
                        />
                    ) : (
                        noteData.title
                    )}
                </h3>
                <p className="text-base p-2 leading-8">
                    {editMode ? (
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full h-40 p-2 border border-gray-300 rounded resize-none"
                        ></textarea>
                    ) : (
                        noteData.content
                    )}
                </p>

                <div className="mt-4 flex justify-end">
                    {editMode ? (
                        <>
                            <button
                                onClick={handleSaveClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setEditMode(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditClick}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotePage;
