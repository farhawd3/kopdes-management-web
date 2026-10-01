'use client';

export function SkeletonLoading() {
  return (
    <div className="skeleton-screen-container" role="status" aria-label="Memuat data ruang kerja">
      {/* Top Header Skeleton */}
      <div className="skeleton-header-row">
        <div className="skeleton-title-group">
          <div className="skeleton-pill skeleton-eyebrow" />
          <div className="skeleton-pill skeleton-title-bar" />
        </div>
        <div className="skeleton-pill skeleton-btn-pill" />
      </div>

      {/* Main Grid: Left Tasks Area, Right Overview Panels */}
      <div className="skeleton-main-grid">
        {/* Left Column: Meeting Banner + Tasks List */}
        <div className="skeleton-work-col">
          {/* Top Banner Skeleton */}
          <div className="skeleton-banner-card">
            <div className="skeleton-circle-icon" />
            <div className="skeleton-banner-text">
              <div className="skeleton-text-line w-28" />
              <div className="skeleton-text-line w-64" />
            </div>
            <div className="skeleton-circle-sm ml-auto" />
          </div>

          {/* Filter Pills Row */}
          <div className="skeleton-filters-row">
            <div className="skeleton-pill w-24 h-9" />
            <div className="skeleton-pill w-24 h-9" />
            <div className="skeleton-pill w-20 h-9" />
          </div>

          {/* Task Card Items */}
          <div className="skeleton-task-cards-list">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="skeleton-task-card">
                <div className="skeleton-card-top">
                  <div className="skeleton-pill w-24" />
                  <div className="skeleton-circle-xs ml-auto" />
                </div>
                <div className="skeleton-text-line w-3/4" />
                <div className="skeleton-card-meta">
                  <div className="skeleton-pill w-28" />
                  <div className="skeleton-pill w-16" />
                </div>
                <div className="skeleton-progress-bar" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Overview & Projects */}
        <div className="skeleton-side-col">
          {/* Panel 1: Progress Chart */}
          <div className="skeleton-panel-card">
            <div className="skeleton-panel-head">
              <div className="skeleton-text-line w-36" />
              <div className="skeleton-circle-progress" />
            </div>
            <div className="skeleton-text-line w-44" />
            <div className="skeleton-bars-row">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="skeleton-bar-col">
                  <div className="skeleton-bar" style={{ height: `${30 + ((i * 15) % 55)}%` }} />
                  <div className="skeleton-bar-day" />
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Projects List */}
          <div className="skeleton-panel-card">
            <div className="skeleton-panel-head">
              <div className="skeleton-text-line w-28" />
            </div>
            <div className="skeleton-project-rows">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton-project-row">
                  <div className="skeleton-circle-dot" />
                  <div className="skeleton-text-line w-40" />
                  <div className="skeleton-pill w-12 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cooperative Records Cards */}
      <div className="skeleton-records-row">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-record-card">
            <div className="skeleton-circle-icon-sm" />
            <div className="skeleton-text-line w-20" />
            <div className="skeleton-text-line w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
