import { Link, useParams } from 'react-router';
import { useGetBookQuery } from '../store/apis/bookApi';
import Spinner from './Spinner';

const BookDetail = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useGetBookQuery(id);

    if (isLoading) return <Spinner />;

    if (isError || !book) {
        return (
            <section className='empty-state'>
                <p>Libri nuk u gjet.</p>
                <Link className='text-link' to='/'>Kthehu te katalogu</Link>
            </section>
        );
    }

    const availabilityLabel = {
        available: 'I disponueshem',
        borrowed: 'I huazuar',
        reserved: 'I rezervuar',
    }[book.availability] || 'I disponueshem';

    return (
        <section className='book-detail'>
            <Link className='text-link' to='/'>Kthehu te katalogu</Link>
            <div className='book-detail-card'>
                {book.coverUrl && <img className='book-cover-large' src={book.coverUrl} alt={book.title} />}
                <div>
                    <span className='book-category'>{book.category}</span>
                    <h1>{book.title}</h1>
                    <p className='book-author'>nga {book.author}</p>
                    <div className='detail-meta'>
                        <span>{book.pages} faqe</span>
                        <span>{book.category}</span>
                        {book.publishedYear && <span>{book.publishedYear}</span>}
                        {book.language && <span>{book.language}</span>}
                        <span>{availabilityLabel}</span>
                        <span>{book.copies ?? 1} kopje</span>
                    </div>
                    <dl className='detail-list'>
                        {book.isbn && <><dt>ISBN</dt><dd>{book.isbn}</dd></>}
                        {book.publisher && <><dt>Botuesi</dt><dd>{book.publisher}</dd></>}
                        {book.edition && <><dt>Edicioni</dt><dd>{book.edition}</dd></>}
                        {book.shelfLocation && <><dt>Vendndodhja</dt><dd>{book.shelfLocation}</dd></>}
                    </dl>
                    <p className='detail-description'>{book.longDescription || book.description}</p>
                </div>
            </div>
        </section>
    );
};

export default BookDetail;
