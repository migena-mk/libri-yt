import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetBooksQuery } from '../store/apis/taskApi';
import Spinner from './Spinner';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit = () => {} }) => {
    const user = useSelector((state) => state.user);
    const { data: books = [], isLoading, isError, error } = useGetBooksQuery();
    const isAdmin = user?.role === 'admin';

    const booksByCategory = useMemo(() => {
        return books.reduce((groups, book) => {
            const category = book.category || 'Te pakategorizuara';
            return {
                ...groups,
                [category]: [...(groups[category] || []), book],
            };
        }, {});
    }, [books]);

    if (isLoading) return <Spinner />;

    if (isError) {
        console.error('Gabim gjate marrjes se librave:', error);
        return <p className='error'>Nuk u mor katalogu i librave.</p>;
    }

    if (books.length === 0) {
        return <p className='empty-state'>Katalogu eshte bosh per momentin.</p>;
    }

    return (
        <section className='catalog'>
            {Object.entries(booksByCategory).map(([category, categoryBooks]) => (
                <div className='category-section' key={category}>
                    <div className='section-title'>
                        <span>Kategori</span>
                        <h2>{category}</h2>
                    </div>
                    <div className='books-grid'>
                        {categoryBooks.map((book) => (
                            <TaskItem key={book._id} book={book} isAdmin={isAdmin} onEdit={onEdit} />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default TaskList;
