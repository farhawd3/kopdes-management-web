# Audit UI — kode aktual

Dibuat ulang dengan `npm run audit:ui`. Duplikat dihitung dalam konteks media/at-rule yang sama; bukan bukti aman untuk menghapus CSS. Angka mencakup seluruh src, termasuk pustaka UI.

## Metrik

| Metrik | Jumlah |
|---|---:|
| button | 9 |
| input | 3 |
| select | 1 |
| textarea | 1 |
| date | 1 |
| inline | 85 |
| hexTsx | 24 |
| hexCss | 858 |
| important | 2058 |
| bytes | 590633 |
| Elemen mentah di luar components/ui | 0 |
| Selector berulang | 457 |
| Nilai border-radius unik | 11 |
| Nilai font-size unik | 6 |
| Nilai height unik | 62 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 27982 | 2 |
| src/app/personal.css | 544384 | 2053 |
| src/app/tokens.css | 3056 | 3 |
| src/app/ui.css | 15211 | 0 |

## Inventaris halaman dan overlay

- src/app/(app)/[slug]/page.tsx
- src/app/dev/komponen/page.tsx
- src/app/page.tsx
- src/app/pin/page.tsx
- src/components/layout/AppShell.tsx
- src/components/layout/ManagerActionModal.tsx
- src/components/ui/Modal.tsx
- src/features/projects/SprintModal.tsx
- src/features/tasks/RecursiveScheduleModal.tsx
- src/features/tasks/TaskDetailDrawer.tsx
- src/features/workspace/WorkspaceSearch.tsx

## Seluruh kontrol mentah

| Komponen | File:baris | Varian saat ini | Masalah | Pengganti | Status |
|---|---|---|---|---|---|
| button | src/components/ui/Button.tsx:17 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/CsvDropzone.tsx:79 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| input | src/components/ui/DateField.tsx:78 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| button | src/components/ui/DateField.tsx:107 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:136 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:146 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:157 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:172 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:180 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:184 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/Input.tsx:6 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| textarea | src/components/ui/Input.tsx:11 | HTML textarea | Primitive internal | Textarea | Pustaka UI |
| select | src/components/ui/Select.tsx:175 | HTML select | Primitive internal | Select | Pustaka UI |
| button | src/components/ui/Select.tsx:257 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |

## Selector berulang

| Berkas | Selector dan konteks | Baris |
|---|---|---|
| src/app/globals.css | h1 | 127, 135 |
| src/app/globals.css | h2 | 127, 140 |
| src/app/globals.css | h3 | 127, 144 |
| src/app/globals.css | .primary | 157, 182 |
| src/app/globals.css | textarea:not(.ui-input) | 202, 216 |
| src/app/globals.css | .nav-label | 233, 284 |
| src/app/globals.css | .sidebar | 251, 1025 |
| src/app/globals.css | .sidebar nav | 288, 1028 |
| src/app/globals.css | .sidebar nav a | 292, 1031 |
| src/app/globals.css | .sidebar nav a > span:first-child | 301, 1034 |
| src/app/globals.css | .sidebar-foot | 314, 1055 |
| src/app/globals.css | .hero | 358, 1095 |
| src/app/globals.css | .hero p | 368, 1106 |
| src/app/globals.css | .metrics .card | 401, 1140 |
| src/app/globals.css | .gantt-row strong | 671, 675 |
| src/app/globals.css | @media (min-width: 640px) and (max-width: 1023px) → .sidebar-foot | 786, 1391 |
| src/app/globals.css | .calendar-week | 975, 980 |
| src/app/globals.css | .calendar-days | 975, 985 |
| src/app/personal.css | button:not(.ui-btn) | 8, 16, 5968 |
| src/app/personal.css | .button | 8, 16, 2875, 5968, 22925 |
| src/app/personal.css | .primary | 8, 16, 23, 2863, 5968, 6020, 22925 |
| src/app/personal.css | input:not(.ui-input) | 8, 5968, 20850 |
| src/app/personal.css | select | 8, 5968, 5975, 20850 |
| src/app/personal.css | textarea:not(.ui-input) | 8, 20850 |
| src/app/personal.css | .card | 26, 1359, 2021, 2888, 5386, 5958, 15367 |
| src/app/personal.css | .page-heading | 71, 1346 |
| src/app/personal.css | .page-heading h1 | 76, 1355, 2017 |
| src/app/personal.css | .workspace-banner | 79, 1367, 2021, 2045 |
| src/app/personal.css | .workspace-banner h2 | 93, 1378, 2052 |
| src/app/personal.css | .workspace-banner p | 98, 1384 |
| src/app/personal.css | .workspace-metrics .card | 125, 1394 |
| src/app/personal.css | .onboarding-card | 165, 2021 |
| src/app/personal.css | .project-card | 185, 1359, 1405, 2021, 4210, 5958, 15367, 16525 |
| src/app/personal.css | .project-symbol | 204, 1416 |
| src/app/personal.css | .project-cover | 213, 1421, 4223, 22125, 22827 |
| src/app/personal.css | .module-intro | 322, 16054 |
| src/app/personal.css | .task-database | 335, 1359, 2021 |
| src/app/personal.css | .database-views | 342, 1444, 2801, 6025, 6477 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 345, 1450, 2836, 6061 |
| src/app/personal.css | .filters | 348, 1434, 2060, 11914, 14689 |
| src/app/personal.css | .filters label | 352, 1441, 11922 |
| src/app/personal.css | .task-table th | 355, 10832 |
| src/app/personal.css | .task-table-wrap | 362, 5958, 10810, 11129 |
| src/app/personal.css | .task-table td | 365, 10845 |
| src/app/personal.css | .task-table .task-title | 369, 19716 |
| src/app/personal.css | .record .section-head h3 | 376, 1467 |
| src/app/personal.css | .record-options | 385, 14707 |
| src/app/personal.css | .record-options > .actions | 388, 14728 |
| src/app/personal.css | .kanban-column | 391, 1455 |
| src/app/personal.css | .kanban-column:nth-child(3) | 398, 1461 |
| src/app/personal.css | .tabs | 419, 6025 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 426, 6037 |
| src/app/personal.css | .editor | 436, 2265 |
| src/app/personal.css | .editor .section-head | 442, 2281, 14618 |
| src/app/personal.css | .timeline-panel | 522, 5958, 15367 |
| src/app/personal.css | .project-status-tabs | 965, 1425, 4179, 6025 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 971, 4189, 6037, 22964 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 975, 1429, 4204, 6061 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 1005, 1011 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 1005, 1017 |
| src/app/personal.css | .task-calendar | 1048, 1359, 15367, 15617 |
| src/app/personal.css | .calendar-toolbar | 1053, 15627 |
| src/app/personal.css | .calendar-day-number | 1114, 5132, 5150, 6080, 17827 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 1124, 6083 |
| src/app/personal.css | .studio-shell .sidebar | 1196, 1856, 1955 |
| src/app/personal.css | .studio-shell .brand | 1201, 1960 |
| src/app/personal.css | .studio-shell .brand-icon | 1206, 1963 |
| src/app/personal.css | .studio-shell .brand-sub | 1214, 1968 |
| src/app/personal.css | .studio-shell .sidebar-search | 1218, 1862, 1972 |
| src/app/personal.css | .studio-shell .sidebar-create | 1232, 1862, 1977 |
| src/app/personal.css | .studio-shell .sidebar nav | 1243, 1868, 2008 |
| src/app/personal.css | .nav-group summary | 1251, 1968 |
| src/app/personal.css | .studio-shell .sidebar nav a | 1261, 1983 |
| src/app/personal.css | .studio-shell .sidebar nav a:hover | 1275, 1987 |
| src/app/personal.css | .studio-shell .sidebar nav a[aria-current='page'] | 1279, 1990 |
| src/app/personal.css | .studio-shell .sidebar-foot | 1283, 1862, 1994 |
| src/app/personal.css | .studio-shell .sidebar-foot strong | 1291, 1998 |
| src/app/personal.css | .studio-shell main | 1341, 2011 |
| src/app/personal.css | .page-heading .eyebrow | 1351, 2014 |
| src/app/personal.css | .workspace-banner .banner-tag | 1387, 2049 |
| src/app/personal.css | .workspace-intro | 1398, 2021, 2032 |
| src/app/personal.css | .project-card:hover | 1410, 2055, 4218, 15387, 16540 |
| src/app/personal.css | .record-options summary | 1470, 14714 |
| src/app/personal.css | .recording-tabs | 1481, 2066, 3936, 6025, 16066 |
| src/app/personal.css | .recording-tabs a | 1490, 2073, 3952, 6037 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1498, 3973, 6061 |
| src/app/personal.css | .activation-notice | 1572, 3980 |
| src/app/personal.css | .activation-notice h2 | 1583, 3992 |
| src/app/personal.css | .recording-metrics | 1586, 2076, 4143 |
| src/app/personal.css | .recording-metrics > div | 1591, 2082, 4150 |
| src/app/personal.css | .recording-metrics strong | 1597, 2091, 4169 |
| src/app/personal.css | .ledger-wrap | 1608, 2021, 10810, 16085 |
| src/app/personal.css | .ledger-table | 1614, 10822 |
| src/app/personal.css | .ledger-table th | 1620, 10832 |
| src/app/personal.css | .ledger-table td | 1627, 10845 |
| src/app/personal.css | .table-title | 1640, 11036 |
| src/app/personal.css | .date-picker-head | 1685, 8344 |
| src/app/personal.css | .date-picker-head strong | 1688, 8352 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1691, 8358, 21505 |
| src/app/personal.css | .date-picker-week | 1696, 1703, 8377 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1706, 8384, 21506 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1713, 8402 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1717, 8407 |
| src/app/personal.css | .date-picker-footer | 1720, 8419 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1724, 8429, 21505 |
| src/app/personal.css | .sidebar-areas | 1871, 2001 |
| src/app/personal.css | .sidebar-areas a[aria-current='page'] | 1890, 2004 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1895, 2324 |
| src/app/personal.css | :root | 1933, 2341, 4475 |
| src/app/personal.css | .dark | 1944, 2461, 4561 |
| src/app/personal.css | .notebook-toolbar | 2094, 4005, 16069 |
| src/app/personal.css | .notebook-toolbar p | 2097, 4021 |
| src/app/personal.css | .notebook-search | 2100, 4027, 22952 |
| src/app/personal.css | .notebook-search input:not(.ui-input) | 2105, 4038 |
| src/app/personal.css | .notebook-layout | 2108, 16073 |
| src/app/personal.css | .notebook-row | 2114, 4057 |
| src/app/personal.css | .notebook-row:hover | 2122, 4067 |
| src/app/personal.css | .notebook-spine | 2147, 4072 |
| src/app/personal.css | .spine-0 | 2154, 4084 |
| src/app/personal.css | .spine-1 | 2159, 4089 |
| src/app/personal.css | .spine-2 | 2164, 4094 |
| src/app/personal.css | .spine-3 | 2169, 4099 |
| src/app/personal.css | .notebook-count | 2174, 4104, 22979 |
| src/app/personal.css | .recent-notes | 2199, 4113, 5958, 16079 |
| src/app/personal.css | .recent-note | 2206, 4124 |
| src/app/personal.css | .skeleton-circle-icon | 2517, 2616 |
| src/app/personal.css | .skeleton-circle-icon-sm | 2517, 2776 |
| src/app/personal.css | .skeleton-circle-progress | 2517, 2694 |
| src/app/personal.css | .skeleton-circle-dot | 2517, 2746 |
| src/app/personal.css | .skeleton-bar | 2517, 2719 |
| src/app/personal.css | .skeleton-bar-day | 2517, 2725 |
| src/app/personal.css | .skeleton-progress-bar | 2517, 2592, 2665 |
| src/app/personal.css | .skeleton-work-col | 2584, 2592 |
| src/app/personal.css | .skeleton-banner-card | 2592, 2605 |
| src/app/personal.css | .skeleton-filters-row | 2592, 2630 |
| src/app/personal.css | .skeleton-task-cards-list | 2592, 2636 |
| src/app/personal.css | .skeleton-task-card | 2592, 2642 |
| src/app/personal.css | .skeleton-card-top | 2592, 2653 |
| src/app/personal.css | .skeleton-card-meta | 2592, 2659 |
| src/app/personal.css | .database-views button:not(.ui-btn) | 2814, 6037 |
| src/app/personal.css | .database-views button:not(.ui-btn):hover | 2832, 6054 |
| src/app/personal.css | .scrum-task-card | 2858, 5386, 8762 |
| src/app/personal.css | button:not(.ui-btn).button | 2875, 22925 |
| src/app/personal.css | .task-detail-panel | 2947, 22721 |
| src/app/personal.css | .drawer-top-bar | 2983, 22725 |
| src/app/personal.css | .btn-mark-complete | 2999, 22925 |
| src/app/personal.css | .btn-icon | 3026, 21434, 22850 |
| src/app/personal.css | .btn-icon:hover | 3040, 21471, 22890 |
| src/app/personal.css | .btn-drawer-action | 3057, 22925 |
| src/app/personal.css | .task-submission-card | 3090, 22755 |
| src/app/personal.css | .submission-status-pill | 3137, 22964 |
| src/app/personal.css | .btn-add-submission-quick | 3184, 22925 |
| src/app/personal.css | .submission-open-badge | 3235, 22964 |
| src/app/personal.css | .submission-quick-actions | 3251, 22761 |
| src/app/personal.css | .btn-tiny-delete | 3255, 3284 |
| src/app/personal.css | .project-badge | 3340, 22964 |
| src/app/personal.css | .priority-badge | 3350, 11600, 22964 |
| src/app/personal.css | .task-detail-title | 3371, 21059 |
| src/app/personal.css | .inline-edit-icon | 3379, 21086 |
| src/app/personal.css | .btn-tiny-save | 3432, 22943 |
| src/app/personal.css | .btn-tiny-cancel | 3461, 22943 |
| src/app/personal.css | .drawer-description-box | 3484, 22749 |
| src/app/personal.css | .metadata-cards-grid | 3515, 6097 |
| src/app/personal.css | .meta-label | 3537, 13321 |
| src/app/personal.css | .subtasks-section | 3635, 22768 |
| src/app/personal.css | .subtasks-header | 3641, 22772 |
| src/app/personal.css | .subtasks-progress-badge | 3654, 22979 |
| src/app/personal.css | .subtasks-progress-bar | 3664, 22776 |
| src/app/personal.css | .subtasks-tree-list | 3681, 22780 |
| src/app/personal.css | .subtask-tree-row | 3685, 22787 |
| src/app/personal.css | .add-subtask-form | 3752, 22792, 22952 |
| src/app/personal.css | .btn-add-subtask | 3770, 22943 |
| src/app/personal.css | .btn-submit-comment | 3848, 22925 |
| src/app/personal.css | .recording-tabs a:hover | 3968, 6054 |
| src/app/personal.css | .notebook-index | 4046, 5958 |
| src/app/personal.css | dialog.editor | 4233, 14580, 14996 |
| src/app/personal.css | .editor-modal-head | 4253, 14618 |
| src/app/personal.css | .editor-badge-eyebrow | 4264, 22979 |
| src/app/personal.css | .editor-close-btn | 4287, 12287, 14655, 15072, 21434, 22850 |
| src/app/personal.css | .editor-close-btn:hover | 4300, 14680, 15089, 21471, 22890 |
| src/app/personal.css | .field-input | 4349, 7783, 15027 |
| src/app/personal.css | .field-select | 4349, 4364, 15027 |
| src/app/personal.css | .field-textarea | 4349, 4377, 15027 |
| src/app/personal.css | .field-input:focus | 4368, 15050 |
| src/app/personal.css | .field-select:focus | 4368, 15050 |
| src/app/personal.css | .field-textarea:focus | 4368, 15050 |
| src/app/personal.css | .btn-editor-cancel | 4440, 22925 |
| src/app/personal.css | .btn-editor-submit | 4457, 22925 |
| src/app/personal.css | .manager-topbar | 4655, 14393, 19410 |
| src/app/personal.css | .manager-location-wrap | 4720, 14962 |
| src/app/personal.css | .manager-location | 4745, 20060 |
| src/app/personal.css | .topbar-fav-btn | 4754, 4811, 14969 |
| src/app/personal.css | .topbar-fav-btn:hover | 4765, 4822, 14986 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 4779, 12293 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 4779, 12293 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 4800, 14496 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 4806, 14497 |
| src/app/personal.css | .manager-sidebar | 4828, 6458, 14399, 19415 |
| src/app/personal.css | .close-navigation | 4882, 5411 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 4925, 14400, 15942, 19431 |
| src/app/personal.css | .sidebar-nav-item | 4976, 14406, 19434 |
| src/app/personal.css | .sidebar-nav-item:hover | 4990, 19439 |
| src/app/personal.css | .sidebar-item-icon | 4993, 19448 |
| src/app/personal.css | .sidebar-nav-item.is-active | 5012, 14407, 19442 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 5012, 14407, 19442 |
| src/app/personal.css | .project-dot | 5044, 8859 |
| src/app/personal.css | .sidebar-avatar | 5073, 12298 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 5106, 15674, 17822 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 5114, 15689 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 5120, 15696 |
| src/app/personal.css | .calendar-add | 5132, 5175 |
| src/app/personal.css | .calendar-agenda-title-group | 5207, 18845 |
| src/app/personal.css | .calendar-agenda-task-count | 5210, 18872, 22964 |
| src/app/personal.css | .calendar-agenda-actions | 5216, 18882 |
| src/app/personal.css | .calendar-agenda-clear-btn | 5219, 18911, 22925 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 5224, 18926 |
| src/app/personal.css | .calendar-event | 5261, 6087, 17831 |
| src/app/personal.css | .color-style-card | 5321, 14541, 15764 |
| src/app/personal.css | .color-swatch-item | 5327, 14463, 14518 |
| src/app/personal.css | .home-panel | 5386, 5790, 15367 |
| src/app/personal.css | .next-meeting | 5386, 5450, 22700 |
| src/app/personal.css | .focus-task | 5386, 5654 |
| src/app/personal.css | .sprint-summary-card | 5386, 9135 |
| src/app/personal.css | .daily-group-card | 5386, 9753, 16038 |
| src/app/personal.css | .focus-task:hover | 5397, 5668 |
| src/app/personal.css | .sprint-summary-card:hover | 5397, 9149 |
| src/app/personal.css | .scrum-task-card:hover | 5397, 8777 |
| src/app/personal.css | .manager-main | 5404, 14392 |
| src/app/personal.css | .manager-main .page-heading h1 | 5415, 14395 |
| src/app/personal.css | .home-heading h1 | 5415, 5434, 14922, 20588 |
| src/app/personal.css | .home-heading | 5421, 14901, 20585, 22691 |
| src/app/personal.css | .home-overview | 5445, 12792 |
| src/app/personal.css | .meeting-mode-pill | 5518, 10692 |
| src/app/personal.css | .round-arrow | 5551, 12302, 22958 |
| src/app/personal.css | .focus-filters | 5577, 6428, 22704 |
| src/app/personal.css | .focus-open | 5695, 12306 |
| src/app/personal.css | .home-text-link | 5782, 6452 |
| src/app/personal.css | .home-records | 5895, 15367 |
| src/app/personal.css | .home-records .section-head > a | 5903, 6452 |
| src/app/personal.css | select option | 6007, 20855 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 6104, 21539 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 6116, 21604 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 6116, 21614 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 6124, 20191, 21590 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 6127, 21624 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 6127, 21624 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 6140, 6435 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 6146, 6438 |
| src/app/personal.css | @media (max-width: 767px) → .home-grid | 6164, 22032 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 6187, 6222 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 6190, 22034 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task | 6194, 22035 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task h2 | 6198, 22036 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 6209, 21841 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 6215, 21853 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 6242, 6256 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 6242, 6672 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 6247, 6675 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 6345, 6447, 6641 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 6349, 6644 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 6352, 6665 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 6355, 6668 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 6358, 6656 |
| src/app/personal.css | .home-panel .section-head | 6394, 12539 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 6581, 19651 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 6610, 19655 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 6702, 19794 |
| src/app/personal.css | .manager-main .notebook-row | 6811, 12793 |
| src/app/personal.css | .manager-main .notebook-link | 6830, 12794 |
| src/app/personal.css | .manager-main .notebook-add-btn | 6947, 12795 |
| src/app/personal.css | .stakeholder-badge | 7164, 12280 |
| src/app/personal.css | .close-btn | 7730, 12287, 21434, 22850 |
| src/app/personal.css | .close-btn:hover | 7758, 21471, 22890 |
| src/app/personal.css | .textarea-input | 7783, 7803 |
| src/app/personal.css | .select-input | 7783, 7810 |
| src/app/personal.css | .btn-cancel | 7844, 14291 |
| src/app/personal.css | .dropzone-success | 7962, 22964 |
| src/app/personal.css | .dropzone-error | 7982, 22964 |
| src/app/personal.css | .close-picker-btn | 8151, 21434, 22850 |
| src/app/personal.css | .close-picker-btn:hover | 8165, 21471, 22890 |
| src/app/personal.css | .btn-clear-range | 8293, 22925 |
| src/app/personal.css | .btn-apply-range | 8311, 22925 |
| src/app/personal.css | .range-days-pill | 8328, 22964 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 8414, 21507 |
| src/app/personal.css | .card-task-code | 8818, 20087 |
| src/app/personal.css | .card-priority-pill | 8867, 22979 |
| src/app/personal.css | .card-date-pill | 8898, 22979 |
| src/app/personal.css | .scrum-assignee-pill | 8978, 11767 |
| src/app/personal.css | .sprint-action-btn | 9207, 21434, 22850 |
| src/app/personal.css | .sprint-action-btn:hover | 9222, 21471, 22890 |
| src/app/personal.css | .daily-tasks-container | 9299, 16035 |
| src/app/personal.css | .daily-nav-arrow-btn | 9342, 22958 |
| src/app/personal.css | .btn-quick-add-day | 9866, 22943 |
| src/app/personal.css | .task-code-tag | 9997, 11470 |
| src/app/personal.css | .task-title-text | 10004, 10499 |
| src/app/personal.css | .task-project-pill | 10015, 10515, 16116 |
| src/app/personal.css | .today-view-wrapper | 10122, 16023 |
| src/app/personal.css | .today-header-card | 10129, 16026 |
| src/app/personal.css | .today-quick-add-card | 10221, 16029, 20163 |
| src/app/personal.css | .today-grid-layout | 10310, 16032 |
| src/app/personal.css | .today-task-card | 10423, 17482 |
| src/app/personal.css | .today-check-circle | 10456, 20169 |
| src/app/personal.css | .today-check-circle.checked | 10476, 20182 |
| src/app/personal.css | .btn-reschedule-today | 10566, 22943 |
| src/app/personal.css | .task-table | 10822, 11141 |
| src/app/personal.css | .task-table tbody tr:last-child td | 10854, 11202 |
| src/app/personal.css | .task-table tbody tr:hover td | 10859, 11206 |
| src/app/personal.css | .badge-late | 10933, 12325 |
| src/app/personal.css | .table-btn-done | 11102, 11819 |
| src/app/personal.css | .task-assignee-empty | 11761, 11808 |
| src/app/personal.css | .filters input:not(.ui-input) | 11939, 11956 |
| src/app/personal.css | .filters select | 11939, 11960 |
| src/app/personal.css | .custom-select-option-content | 12045, 20962 |
| src/app/personal.css | .meeting-detail-row | 12067, 12152 |
| src/app/personal.css | .meeting-section-box | 12080, 12159 |
| src/app/personal.css | .meeting-section-box > svg | 12165, 12172 |
| src/app/personal.css | .meeting-section-header | 12191, 14841 |
| src/app/personal.css | .task-project-label | 12319, 20075 |
| src/app/personal.css | .dash-stats-row | 12337, 20580, 22695 |
| src/app/personal.css | .dash-stat-link | 12345, 12541 |
| src/app/personal.css | .dash-sparkline | 12353, 12786 |
| src/app/personal.css | .dash-bar-chart | 12361, 12636, 15133, 17637 |
| src/app/personal.css | .dash-bar-col | 12366, 15139, 17645 |
| src/app/personal.css | .dash-bar-count | 12372, 12670, 15151, 17667 |
| src/app/personal.css | .dash-bar-track | 12378, 12681, 15157, 17680 |
| src/app/personal.css | .dash-bar-fill | 12384, 12687, 15167, 17691 |
| src/app/personal.css | .bar-today .dash-bar-track | 12391, 15174 |
| src/app/personal.css | .bar-today .dash-bar-fill | 12395, 12692, 15179 |
| src/app/personal.css | .dash-bar-label | 12400, 12696, 15198, 17703 |
| src/app/personal.css | .bar-today .dash-bar-label | 12404, 17721 |
| src/app/personal.css | .dash-donut-wrap | 12409, 12718, 15209 |
| src/app/personal.css | .dash-donut-svg-wrap | 12414, 12724, 15216 |
| src/app/personal.css | .dash-donut-svg | 12419, 15223 |
| src/app/personal.css | .dash-donut-center | 12423, 15236 |
| src/app/personal.css | .dash-donut-center strong | 12427, 12733, 15246 |
| src/app/personal.css | .dash-donut-center span | 12433, 12738, 15253 |
| src/app/personal.css | .dash-donut-legend | 12439, 12743, 15259 |
| src/app/personal.css | .donut-legend-row | 12445, 15266 |
| src/app/personal.css | .donut-dot | 12449, 15286 |
| src/app/personal.css | .donut-legend-label | 12455, 12773, 15293 |
| src/app/personal.css | .donut-legend-val | 12459, 12777, 15300 |
| src/app/personal.css | .dash-proj-bar-row | 12471, 15307 |
| src/app/personal.css | .dash-proj-bar-row:hover | 12480, 15317 |
| src/app/personal.css | .dash-proj-bar-meta | 12485, 15321 |
| src/app/personal.css | .dash-proj-bar-label | 12489, 15327 |
| src/app/personal.css | .dash-proj-bar-pct | 12496, 15333 |
| src/app/personal.css | .dash-proj-bar-track | 12501, 15339 |
| src/app/personal.css | .dash-proj-bar-fill | 12506, 15347 |
| src/app/personal.css | .dashboard-controls | 12542, 14689 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 12549, 12644 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 12550, 12659 |
| src/app/personal.css | .dash-analytics-row | 12552, 20431 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 12557, 20439 |
| src/app/personal.css | .week-barchart-modern | 12574, 17548 |
| src/app/personal.css | .week-barchart-header | 12578, 17553 |
| src/app/personal.css | .week-barchart-metric | 12583, 17562 |
| src/app/personal.css | .week-metric-main | 12589, 17568 |
| src/app/personal.css | .week-metric-num | 12593, 17573 |
| src/app/personal.css | .week-metric-title | 12600, 17585 |
| src/app/personal.css | .week-metric-pill | 12604, 17601 |
| src/app/personal.css | .week-metric-pill.peak-pill | 12612, 17610 |
| src/app/personal.css | .week-filter-reset-chip | 12617, 17615 |
| src/app/personal.css | .week-filter-reset-chip:hover | 12626, 17629 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 12631, 17632 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 12664, 17663 |
| src/app/personal.css | .dash-bar-count.has-value | 12676, 17676 |
| src/app/personal.css | .dash-bar-daynum | 12700, 17708 |
| src/app/personal.css | .week-barchart-footer | 12705, 17725 |
| src/app/personal.css | .dash-chart-caption | 12711, 20134 |
| src/app/personal.css | .donut-segment | 12729, 15228 |
| src/app/personal.css | .relation-pill | 12811, 17795 |
| src/app/personal.css | .manager-action-dialog | 13552, 14996 |
| src/app/personal.css | .action-modal-close | 13629, 15072, 20043, 21434, 22850 |
| src/app/personal.css | .action-modal-close:hover | 13645, 15089, 20055, 21471, 22890 |
| src/app/personal.css | :root[data-theme-color='lime'] | 14388, 19397 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 14391, 19405 |
| src/app/personal.css | .manager-main .page-heading | 14394, 22687 |
| src/app/personal.css | .sidebar-group-toggle | 14402, 15967 |
| src/app/personal.css | .follow-up-panel | 14422, 15367, 15401, 16046 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 14423, 15417 |
| src/app/personal.css | .follow-up-list | 14427, 15473, 15550 |
| src/app/personal.css | .follow-up-row | 14428, 15480, 15556 |
| src/app/personal.css | .follow-up-marker | 14432, 15500 |
| src/app/personal.css | .appearance-settings | 14453, 14543, 15764 |
| src/app/personal.css | .weekly-review | 14499, 15367 |
| src/app/personal.css | .settings-container | 14513, 15712, 16090 |
| src/app/personal.css | .settings-tabs-row | 14514, 15729, 16093 |
| src/app/personal.css | .theme-live-preview-card | 14524, 14542, 15764 |
| src/app/personal.css | .settings-fields-grid | 14539, 15748 |
| src/app/personal.css | .security-settings-card | 14552, 15764 |
| src/app/personal.css | .backup-settings-card | 14554, 15764 |
| src/app/personal.css | .backup-action-boxes | 14555, 15756 |
| src/app/personal.css | .home-date-chip | 14938, 20591 |
| src/app/personal.css | .dash-bar-col:hover | 15146, 17659 |
| src/app/personal.css | .home-journal | 15367, 20237 |
| src/app/personal.css | .follow-up-wrapper | 15394, 16043 |
| src/app/personal.css | .project-code-tag | 16559, 22178 |
| src/app/personal.css | .follow-up-compact-bar | 17356, 20596, 22716 |
| src/app/personal.css | .journal-join-chip | 17807, 20473 |
| src/app/personal.css | .journal-join-chip:hover | 17813, 20487 |
| src/app/personal.css | .calendar-agenda-day-head | 17842, 18941 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 18338, 18463 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 18436, 18463 |
| src/app/personal.css | .drawer-status-select-wrap | 18670, 21266 |
| src/app/personal.css | .drawer-priority-select-wrap | 18670, 18743, 21266 |
| src/app/personal.css | .drawer-status-select | 18678, 18714 |
| src/app/personal.css | .drawer-priority-select | 18678, 18759 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 18700, 21278, 22918 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 18700, 21278, 22918 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 18709, 21316 |
| src/app/personal.css | .calendar-agenda-add-btn | 18889, 22925 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 19777, 21641 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 19794, 19802 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 19986, 19991 |
| src/app/personal.css | .activity-summary-section | 19998, 22797 |
| src/app/personal.css | .timeline-feed | 20004, 22801 |
| src/app/personal.css | .timeline-event | 20009, 22807 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 20231, 21681 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-badge | 20603, 20608 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-snippet | 20603, 20617 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-actions | 20603, 20612 |
| src/app/personal.css | .project-section-nav | 20665, 22442, 22839 |
| src/app/personal.css | .project-next-actions > summary | 20811, 20828 |
| src/app/personal.css | .project-next-actions | 20827, 22493 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .follow-up-compact-bar | 20845, 21723 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 20846, 21770 |
| src/app/personal.css | .custom-select-trigger | 20850, 20886, 22912 |
| src/app/personal.css | .custom-select-option | 20850, 20933 |
| src/app/personal.css | select:not(.custom-select-native) | 20858, 22912 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 20990, 22918 |
| src/app/personal.css | .drawer-properties-grid | 21109, 22741 |
| src/app/personal.css | .prop-user-chip | 21161, 22964 |
| src/app/personal.css | .prop-text-badge | 21215, 22964 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 21229, 22964 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 21434, 22850 |
| src/app/personal.css | .close-drawer-btn | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 21434, 22850 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 21471, 22890 |
| src/app/personal.css | .close-drawer-btn:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 21471, 22890 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 21471, 22890 |
| src/app/personal.css | .project-properties-grid | 22285, 22831 |
| src/app/personal.css | .project-progress-card | 22372, 22835 |
| src/app/tokens.css | :root | 2, 49 |
| src/app/ui.css | .ui-stat-card | 76, 111 |
| src/app/ui.css | .ui-focus-task | 87, 111 |
| src/app/ui.css | .ui-modal > header | 94, 95 |
| src/app/ui.css | .ui-modal > footer | 94, 96 |

## Nilai deklarasi

### border-radius

- `0`
- `0 var(--r-md) var(--r-md) 0`
- `0 var(--r-sm) var(--r-sm) 0`
- `var(--r-full)`
- `var(--r-full) var(--r-full) var(--r-lg) var(--r-lg)`
- `var(--r-lg)`
- `var(--r-lg) var(--r-lg) 0 0`
- `var(--r-md)`
- `var(--r-md) var(--r-md) 0 0`
- `var(--r-md) var(--r-md) var(--r-sm) var(--r-sm)`
- `var(--r-sm)`

### font-size

- `var(--fs-body)`
- `var(--fs-caption)`
- `var(--fs-h2)`
- `var(--fs-label)`
- `var(--fs-overline)`
- `var(--fs-title)`

### height

- `100%`
- `100dvh`
- `100px`
- `100vh`
- `10px`
- `110px`
- `115px`
- `120px`
- `128px`
- `12px`
- `140px`
- `14px`
- `150px`
- `15px`
- `160px`
- `165px`
- `16px`
- `180px`
- `18px`
- `19px`
- `1px`
- `20px`
- `22px`
- `24px`
- `26px`
- `28px`
- `3.5px`
- `30px`
- `32px`
- `34px`
- `36px`
- `38px`
- `40px`
- `42px`
- `44px`
- `46px`
- `48px`
- `4px`
- `52px`
- `56px`
- `58px`
- `5px`
- `60px`
- `62px`
- `64px`
- `68px`
- `6px`
- `72px`
- `7px`
- `8px`
- `90px`
- `9px`
- `auto`
- `var(--border-width)`
- `var(--btn-height-md)`
- `var(--btn-height-sm)`
- `var(--control-height-md)`
- `var(--h-md)`
- `var(--icon-md)`
- `var(--space-2)`
- `var(--space-8)`
- `var(--table-th-height)`
