'use client';

export function SkeletonLoading() {
  return (
    <div className="skeleton-screen-container" role="status" aria-label="Memuat data ruang kerja">
      {/* Top Welcome Heading Skeleton */}
      <div className="skeleton-header-row">
        <div className="skeleton-pill skeleton-title-bar" />
        <div className="skeleton-pill skeleton-meta-bar" />
      </div>

      {/* Grid of 4 Main Cards matching Reference Design */}
      <div className="skeleton-cards-grid">
        {/* Card 1: Schedule Card Skeleton */}
        <div className="skeleton-card skeleton-schedule-card">
          <div className="skeleton-card-head">
            <div className="skeleton-circle" />
            <div className="skeleton-text-line w-40" />
            <div className="skeleton-pill w-20 ml-auto" />
          </div>
          <div className="skeleton-schedule-split">
            <div className="skeleton-subcol">
              <div className="skeleton-text-line w-28" />
              <div className="skeleton-box h-20" />
              <div className="skeleton-pill w-full" />
            </div>
            <div className="skeleton-subcol-wide">
              <div className="skeleton-row-pills">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="skeleton-circle-sm" />
                ))}
              </div>
              <div className="skeleton-box h-12" />
              <div className="skeleton-box h-12" />
            </div>
          </div>
        </div>

        {/* Card 2: Task Completed Chart Card Skeleton */}
        <div className="skeleton-card skeleton-chart-card">
          <div className="skeleton-card-head">
            <div className="skeleton-circle" />
            <div className="skeleton-text-line w-36" />
            <div className="skeleton-pill w-16 ml-auto" />
          </div>
          <div className="skeleton-chart-bars">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton-bar-wrap">
                <div
                  className="skeleton-bar"
                  style={{ height: `${40 + ((i * 18) % 55)}%` }}
                />
                <div className="skeleton-bar-label" />
              </div>
            ))}
          </div>
          <div className="skeleton-pill w-full h-11 mt-auto" />
        </div>

        {/* Card 3: Calendar Card Skeleton */}
        <div className="skeleton-card skeleton-calendar-card">
          <div className="skeleton-card-head">
            <div className="skeleton-circle" />
            <div className="skeleton-text-line w-32" />
            <div className="skeleton-circle-sm ml-auto" />
          </div>
          <div className="skeleton-filter-pills">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton-pill w-16" />
            ))}
          </div>
          <div className="skeleton-calendar-grid">
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i} className="skeleton-circle-day" />
            ))}
          </div>
        </div>

        {/* Card 4: Projects Horizontal Cards Skeleton */}
        <div className="skeleton-card skeleton-projects-card">
          <div className="skeleton-card-head">
            <div className="skeleton-circle" />
            <div className="skeleton-text-line w-28" />
            <div className="skeleton-pill w-20 ml-auto" />
          </div>
          <div className="skeleton-project-items">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton-project-mini-card">
                <div className="skeleton-text-line w-32" />
                <div className="skeleton-text-line w-full" />
                <div className="skeleton-box h-4 mt-2" />
                <div className="skeleton-row-meta mt-4">
                  <div className="skeleton-pill w-16" />
                  <div className="skeleton-avatars-row ml-auto">
                    <div className="skeleton-circle-xs" />
                    <div className="skeleton-circle-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
