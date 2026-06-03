import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [editingBook, setEditingBook] = useState(null);
    const adminPanelRef = useRef(null);
    const isAdmin = user?.role === 'admin';

    const handleEditBook = (book) => {
        setEditingBook(book);
        window.setTimeout(() => {
            adminPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    };

    return (
        <>
            <section className='hero'>
                <div>
                    <span className='eyebrow'>Biblioteka online</span>
                    <h1>Katalogu i librave</h1>
                    <p>
                        Shfleto librat ekzistues sipas kategorive dhe hap detajet per te pare autorin,
                        numrin e faqeve dhe pershkrimin e plote.
                    </p>
                </div>
            </section>

            {isAdmin && (
                <div ref={adminPanelRef}>
                    <TaskForm editingBook={editingBook} onCancelEdit={() => setEditingBook(null)} />
                </div>
            )}

            <TaskList onEdit={handleEditBook} />
        </>
    );
};

export default Dashboard;
