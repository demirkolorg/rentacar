import { boolean } from 'joi';

export function highlightText(fullText, query) {
  if (!fullText) return ''; // fullText null veya undefined kontrolü için `== null` kullanılır.
  if (!query) return fullText; // Eğer aranan metin boş ise, direkt tüm metni döndür.

  const parts = fullText.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-yellow-300">
        {part}
      </span>
    ) : (
      part
    )
  );
}
