import BookList from './BookList';

const Catalog = () => {
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

            <BookList />
        </>
    );
};

export default Catalog;
