export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200 shadow-[0_20px_55px_-35px_rgba(6,10,18,0.2)] overflow-hidden animate-fadeIn dark:bg-[#0c121d] dark:border-white/10 dark:shadow-[0_20px_55px_-35px_rgba(6,10,18,0.9)]">
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
