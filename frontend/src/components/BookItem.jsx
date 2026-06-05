import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { useDeleteBookMutation } from '../store/apis/bookApi';

const BookItem = ({ book, canManage, onEdit }) => {
    const [deleteBook] = useDeleteBookMutation();

    const handleDelete = async () => {
        const result = await deleteBook(book._id);
        if (result.error) {
            toast.error(result.error.data?.message || 'Fshirja e librit deshtoi');
            return;
        }

        toast.success('Libri u fshi nga katalogu');
    };

    return (
        <article className='book-card'>
            {book.coverUrl && <img className='book-cover-thumb' src={book.coverUrl} alt={book.title} />}
            <div className='book-top'>
                <span className='book-category'>{book.category}</span>
                <span className='book-pages'>{book.pages} faqe</span>
            </div>

            <h3>
                <Link to={`/books/${book._id}`}>{book.title}</Link>
            </h3>
            <p className='book-author'>nga {book.author}</p>
            <p className='book-description'>{book.description}</p>
            <div className='book-mini-meta'>
                {book.publishedYear && <span>{book.publishedYear}</span>}
                {book.language && <span>{book.language}</span>}
                {book.availability && <span>{book.availability === 'available' ? 'I disponueshem' : book.availability === 'borrowed' ? 'I huazuar' : 'I rezervuar'}</span>}
            </div>
            <Link className='text-link' to={`/books/${book._id}`}>Shiko detajet</Link>

            {canManage && (
                <div className='book-actions'>
                    <button type='button' className='icon-btn' onClick={() => onEdit(book)} aria-label='Modifiko librin'>
                        <MdOutlineEdit />
                    </button>
                    <button type='button' className='icon-btn danger' onClick={handleDelete} aria-label='Fshi librin'>
                        <MdOutlineDelete />
                    </button>
                </div>
            )}
        </article>
    );
};

export default BookItem;
