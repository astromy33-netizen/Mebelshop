export const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-fadeIn">
      <div className="h-64 shimmer"></div>
      <div className="p-5">
        <div className="h-5 shimmer rounded mb-3"></div>
        <div className="h-5 shimmer rounded w-3/4 mb-3"></div>
        <div className="h-4 shimmer rounded w-1/2 mb-4"></div>
        <div className="flex gap-3">
          <div className="h-10 flex-1 shimmer rounded"></div>
          <div className="h-10 w-10 shimmer rounded"></div>
        </div>
      </div>
    </div>
  );
};
