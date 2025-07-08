export default function SkeletonTimeline() {
  return (
    <ul className="mt-5 mx-auto w-full min-w-[350px] timeline timeline-snap-icon max-md:timeline-compact timeline-vertical animate-pulse">
      {[1, 2, 3].map((_, index) => (
        <li key={index}>
          <div className="timeline-middle">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
          <div
            className={
              index % 2 === 0
                ? "timeline-start mb-10 md:text-end"
                : "timeline-end mb-10 md:text-start"
            }
          >
            <div className="bg-gray-300 h-4 w-20 mb-2 rounded-md" />
            <div className="bg-gray-300 h-6 w-32 rounded-md" />
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
}
