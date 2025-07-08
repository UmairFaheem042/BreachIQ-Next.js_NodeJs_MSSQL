export default function SkeletonStat() {
  return (
    <div className="flex-1 stats bg-base-100 border border-base-300 animate-pulse">
      <div className="stat">
        <div className="stat-title bg-gray-300 h-4 w-24 rounded-md mb-2"></div>
        <div className="stat-value bg-gray-300 h-8 w-20 rounded-md"></div>
        <div className="stat-actions mt-2">
          <div className="btn btn-xs w-24 h-5 bg-gray-300 border-none" />
        </div>
      </div>

      <div className="stat">
        <div className="stat-title bg-gray-300 h-4 w-24 rounded-md mb-2"></div>
        <div className="stat-value bg-gray-300 h-8 w-20 rounded-md"></div>
        <div className="stat-actions mt-2">
          <div className="btn btn-xs w-32 h-5 bg-gray-300 border-none" />
        </div>
      </div>
    </div>
  );
}
