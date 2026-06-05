import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BookForm from './BookForm';
import BookList from './BookList';

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [editingBook, setEditingBook] = useState(null);
    const managementPanelRef = useRef(null);

    const handleEditBook = (book) => {
        setEditingBook(book);
        window.setTimeout(() => {
            managementPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
    };

    return (
        <>
            <section className='dashboard-hero'>
                <div className='dashboard-copy'>
                    <span className='eyebrow'>Dashboard</span>
                    <h1>Menaxhimi i katalogut</h1>
                    <p>Je i loguar si {user?.name}. Shto libra te rinj, perditeso informacionin dhe hiq titujt qe nuk jane me pjese e katalogut.</p>
                </div>
                <div className='dashboard-summary'>
                    <span>Admin</span>
                    <strong>{user?.email}</strong>
                </div>
            </section>

            <div ref={managementPanelRef}>
                <BookForm key={editingBook?._id || 'new-book'} editingBook={editingBook} onCancelEdit={() => setEditingBook(null)} />
            </div>

            <BookList canManage onEdit={handleEditBook} />
        </>
    );
};

export default Dashboard;
