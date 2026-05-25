import "./paginador.css";

type Props = {
  next: boolean;
  prev: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

const Paginador = ({
  next,
  prev,
  page,
  totalPages,
  setPage,
}: Props) => {

  const getPages = () => {
    const pages = new Set<number>();

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.add(i);
    }

    pages.add(page);

    for (
      let i = Math.max(totalPages - 2, 1);
      i <= totalPages;
      i++
    ) {
      pages.add(i);
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const pages = getPages();

  return (
    <div className="paginadorContainer">

      {prev && (
        <div
          className="arrowContainer"
          onClick={() => setPage(page - 1)}
        >
          <p>Anterior</p>
        </div>
      )}

      <div className="pagesContainer">
        {pages.map((p) => (
          <button
            key={p}
            className={p === page ? "activePage" : "pageButton"}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {next && (
        <div
          className="arrowContainer"
          onClick={() => setPage(page + 1)}
        >
          <p>Siguiente</p>
        </div>
      )}
    </div>
  );
};

export default Paginador;