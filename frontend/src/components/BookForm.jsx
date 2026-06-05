import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateBookMutation, useUpdateBookMutation } from '../store/apis/bookApi';

const emptyBook = {
    title: '',
    author: '',
    category: '',
    pages: '',
    description: '',
    isbn: '',
    publisher: '',
    publishedYear: '',
    language: '',
    edition: '',
    shelfLocation: '',
    availability: 'available',
    copies: 1,
    coverUrl: '',
    longDescription: '',
};

const getInitialBookForm = (book) => {
    if (!book) {
        return emptyBook;
    }

    return {
        title: book.title,
        author: book.author,
        category: book.category,
        pages: book.pages,
        description: book.description,
        isbn: book.isbn || '',
        publisher: book.publisher || '',
        publishedYear: book.publishedYear || '',
        language: book.language || '',
        edition: book.edition || '',
        shelfLocation: book.shelfLocation || '',
        availability: book.availability || 'available',
        copies: book.copies ?? 1,
        coverUrl: book.coverUrl || '',
        longDescription: book.longDescription || '',
    };
};

const BookForm = ({ editingBook, onCancelEdit }) => {
    const [formData, setFormData] = useState(() => getInitialBookForm(editingBook));
    const [createBook, { isLoading: isCreating }] = useCreateBookMutation();
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            pages: Number(formData.pages),
            publishedYear: formData.publishedYear ? Number(formData.publishedYear) : undefined,
            copies: Number(formData.copies),
        };

        const result = editingBook
            ? await updateBook({ id: editingBook._id, ...payload })
            : await createBook(payload);

        if (result.error) {
            toast.error(result.error.data?.message || 'Veprimi deshtoi');
            return;
        }

        toast.success(editingBook ? 'Libri u perditesua' : 'Libri u shtua ne katalog');
        setFormData(emptyBook);
        onCancelEdit();
    };

    const isLoading = isCreating || isUpdating;

    return (
        <section className='management-panel'>
            <div className='section-title'>
                <span>Panel menaxhimi</span>
                <h2>{editingBook ? 'Modifiko librin' : 'Shto liber te ri'}</h2>
                {editingBook && <p className='editing-note'>Po modifikon: {editingBook.title}</p>}
            </div>

            <form onSubmit={onSubmit} className='book-form'>
                <div className='form-grid'>
                    <div className='form-group'>
                        <label htmlFor='title'>Titulli</label>
                        <input required type='text' id='title' name='title' value={formData.title} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='author'>Autori</label>
                        <input required type='text' id='author' name='author' value={formData.author} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='category'>Kategoria</label>
                        <input required type='text' id='category' name='category' value={formData.category} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='pages'>Faqe</label>
                        <input required min='1' type='number' id='pages' name='pages' value={formData.pages} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='isbn'>ISBN</label>
                        <input type='text' id='isbn' name='isbn' value={formData.isbn} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='publisher'>Botuesi</label>
                        <input type='text' id='publisher' name='publisher' value={formData.publisher} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='publishedYear'>Viti</label>
                        <input min='0' type='number' id='publishedYear' name='publishedYear' value={formData.publishedYear} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='language'>Gjuha</label>
                        <input type='text' id='language' name='language' value={formData.language} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='edition'>Edicioni</label>
                        <input type='text' id='edition' name='edition' value={formData.edition} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='shelfLocation'>Rafti</label>
                        <input type='text' id='shelfLocation' name='shelfLocation' value={formData.shelfLocation} onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='availability'>Disponueshmeria</label>
                        <select id='availability' name='availability' value={formData.availability} onChange={onChange}>
                            <option value='available'>I disponueshem</option>
                            <option value='borrowed'>I huazuar</option>
                            <option value='reserved'>I rezervuar</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='copies'>Kopje</label>
                        <input min='0' type='number' id='copies' name='copies' value={formData.copies} onChange={onChange} />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor='description'>Pershkrim i shkurter</label>
                    <textarea required id='description' name='description' rows='4' value={formData.description} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='coverUrl'>URL kopertine</label>
                    <input type='url' id='coverUrl' name='coverUrl' value={formData.coverUrl} onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='longDescription'>Pershkrim i plote</label>
                    <textarea id='longDescription' name='longDescription' rows='6' value={formData.longDescription} onChange={onChange} />
                </div>

                <div className='button-row'>
                    <button className='btn' type='submit' disabled={isLoading}>
                        {isLoading ? 'Duke ruajtur...' : editingBook ? 'Ruaj ndryshimet' : 'Shto librin'}
                    </button>
                    {editingBook && (
                        <button className='btn btn-reverse' type='button' onClick={onCancelEdit}>
                            Anulo
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default BookForm;
