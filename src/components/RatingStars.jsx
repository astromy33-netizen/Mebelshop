export const RatingStars = ({ rating, size = 'md' }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`flex items-center gap-1 ${starSize}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <span key={i} className="text-yellow-400">★</span>
      ))}
      {hasHalfStar && <span className="text-yellow-400">☆</span>}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <span key={i} className="text-gray-300 dark:text-gray-600">★</span>
      ))}
      <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">{rating.toFixed(1)}</span>
    </div>
  );
};
