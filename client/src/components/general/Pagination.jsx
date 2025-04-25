export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}) {
  const createRange = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = [];
  const left = Math.max(1, currentPage - siblingCount);
  const right = Math.min(totalPages, currentPage + siblingCount);

  pages.push(...createRange(left, right));

  return (
    <nav className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`
            px-3 py-1 border rounded
            ${p === currentPage ? 'bg-blue-600 text-white' : 'bg-white'}
          `}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-white border rounded disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
