import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePlayerSearch } from '../hooks/usePlayerSearch';

export function PlayerSearch() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: results, isLoading } = usePlayerSearch(query);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(input.trim()), 300);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    if (query.length >= 3) setOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full md:w-72">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search player..."
        className="w-full border-2 border-black dark:border-gray-600 bg-white dark:bg-[#1a1a1a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black dark:text-gray-200 placeholder-gray-400 outline-none focus:border-[#e10600] transition-colors"
      />
      {open && query.length >= 3 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 border-2 border-black dark:border-gray-600 bg-white dark:bg-[#1a1a1a] shadow-lg max-h-60 overflow-y-auto">
          {isLoading && (
            <div className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wider">Searching...</div>
          )}
          {results && results.length === 0 && (
            <div className="px-4 py-3 text-xs text-gray-400 uppercase tracking-wider">No players found</div>
          )}
          {results?.map(p => (
            <Link
              key={p.steamID}
              to={`/player/${p.steamID}`}
              onClick={() => { setOpen(false); setInput(''); }}
              className="block px-4 py-3 text-sm font-bold tracking-tight hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
            >
              {p.lastName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
