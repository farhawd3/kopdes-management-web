# Audit UI — kode aktual

Dibuat ulang dengan `npm run audit:ui`. Duplikat dihitung dalam konteks media/at-rule yang sama; bukan bukti aman untuk menghapus CSS. Angka mencakup seluruh src, termasuk pustaka UI.

## Metrik

| Metrik | Jumlah |
|---|---:|
| button | 12 |
| input | 3 |
| select | 1 |
| textarea | 1 |
| date | 1 |
| inline | 86 |
| hexTsx | 37 |
| hexCss | 945 |
| important | 2278 |
| bytes | 609077 |
| Elemen mentah di luar components/ui | 0 |
| Selector berulang | 519 |
| Nilai border-radius unik | 59 |
| Nilai font-size unik | 59 |
| Nilai height unik | 60 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 27511 | 5 |
| src/app/personal.css | 571354 | 2273 |
| src/app/tokens.css | 2753 | 0 |
| src/app/ui.css | 7459 | 0 |

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
| button | src/components/ui/EmptyState.tsx:56 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/EmptyState.tsx:71 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/Input.tsx:6 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| textarea | src/components/ui/Input.tsx:11 | HTML textarea | Primitive internal | Textarea | Pustaka UI |
| select | src/components/ui/Select.tsx:174 | HTML select | Primitive internal | Select | Pustaka UI |
| button | src/components/ui/Select.tsx:210 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/Select.tsx:256 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |

## Selector berulang

| Berkas | Selector dan konteks | Baris |
|---|---|---|
| src/app/globals.css | h1 | 127, 135 |
| src/app/globals.css | h2 | 127, 140 |
| src/app/globals.css | h3 | 127, 144 |
| src/app/globals.css | .primary | 157, 182 |
| src/app/globals.css | textarea:not(.ui-input) | 202, 216 |
| src/app/globals.css | .nav-label | 233, 284 |
| src/app/globals.css | .sidebar | 251, 1032 |
| src/app/globals.css | .sidebar nav | 288, 1035 |
| src/app/globals.css | .sidebar nav a | 292, 1038 |
| src/app/globals.css | .sidebar nav a > span:first-child | 301, 1041 |
| src/app/globals.css | .sidebar-foot | 314, 1062 |
| src/app/globals.css | .hero | 358, 1102 |
| src/app/globals.css | .hero p | 368, 1113 |
| src/app/globals.css | .metrics .card | 401, 1147 |
| src/app/globals.css | .gantt-row strong | 671, 675 |
| src/app/globals.css | @media (min-width: 640px) and (max-width: 1023px) → .sidebar-foot | 786, 1398 |
| src/app/globals.css | .calendar-week | 982, 987 |
| src/app/globals.css | .calendar-days | 982, 992 |
| src/app/personal.css | body | 8, 2628 |
| src/app/personal.css | button:not(.ui-btn) | 11, 19, 6318 |
| src/app/personal.css | .button | 11, 19, 3027, 6318, 24234 |
| src/app/personal.css | .primary | 11, 19, 26, 3013, 6318, 6370, 24234 |
| src/app/personal.css | input:not(.ui-input) | 11, 6318, 21856 |
| src/app/personal.css | select | 11, 6318, 6325, 21856 |
| src/app/personal.css | textarea:not(.ui-input) | 11, 21856 |
| src/app/personal.css | .card | 29, 1410, 2124, 3040, 5729, 6308, 16210 |
| src/app/personal.css | .home-heading h1 | 68, 5761, 5784, 15656, 21589 |
| src/app/personal.css | .page-heading | 77, 1396 |
| src/app/personal.css | .page-heading h1 | 82, 1405, 2120 |
| src/app/personal.css | .workspace-banner | 85, 1418, 2124, 2148 |
| src/app/personal.css | .workspace-banner h2 | 100, 1430, 2155 |
| src/app/personal.css | .workspace-banner p | 106, 1437 |
| src/app/personal.css | .workspace-metrics .card | 133, 1450 |
| src/app/personal.css | .onboarding-card | 173, 2124 |
| src/app/personal.css | .project-card | 193, 1410, 1464, 2124, 4384, 6308, 15203, 16210, 17400 |
| src/app/personal.css | .project-symbol | 214, 1476 |
| src/app/personal.css | .project-cover | 223, 1481, 4403, 23433, 24136 |
| src/app/personal.css | .module-intro | 332, 16897 |
| src/app/personal.css | .task-database | 345, 1410, 2124 |
| src/app/personal.css | .database-views | 352, 1509, 2935, 6375, 6848 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 355, 1515, 2974, 6411 |
| src/app/personal.css | .filters | 359, 1499, 2163, 12353, 15423 |
| src/app/personal.css | .filters label | 364, 1506, 12361 |
| src/app/personal.css | .filters input:not(.ui-input) | 367, 12378, 12395 |
| src/app/personal.css | .filters select | 367, 12378, 12399 |
| src/app/personal.css | .task-table th | 371, 11269 |
| src/app/personal.css | .task-table-wrap | 378, 6308, 11247, 11567 |
| src/app/personal.css | .task-table td | 381, 11282 |
| src/app/personal.css | .task-table .task-title | 385, 20699 |
| src/app/personal.css | .record .section-head h3 | 392, 1532 |
| src/app/personal.css | .record-options | 401, 15441 |
| src/app/personal.css | .record-options summary | 406, 1535, 15448 |
| src/app/personal.css | .record-options > .actions | 410, 15462 |
| src/app/personal.css | .kanban-column | 413, 1520 |
| src/app/personal.css | .kanban-column:nth-child(3) | 421, 1526 |
| src/app/personal.css | .tabs | 442, 6375 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 449, 6387 |
| src/app/personal.css | .editor | 459, 2394 |
| src/app/personal.css | .editor .section-head | 465, 2410, 15352 |
| src/app/personal.css | .timeline-panel | 545, 6308, 16210 |
| src/app/personal.css | .project-status-tabs | 995, 1485, 4353, 6375 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 1001, 1490, 4363, 6387, 24273 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 1006, 1494, 4378, 6411 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 1037, 1043 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 1037, 1049 |
| src/app/personal.css | .task-calendar | 1080, 1410, 16210, 16460 |
| src/app/personal.css | .calendar-toolbar | 1087, 16470 |
| src/app/personal.css | .calendar-day-number | 1152, 5405, 5423, 6430, 18710 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 1166, 6433 |
| src/app/personal.css | .studio-shell .sidebar | 1238, 1959, 2058 |
| src/app/personal.css | .studio-shell .brand | 1245, 2063 |
| src/app/personal.css | .studio-shell .brand-icon | 1250, 2066 |
| src/app/personal.css | .studio-shell .brand-sub | 1258, 2071 |
| src/app/personal.css | .studio-shell .sidebar-search | 1262, 1965, 2075 |
| src/app/personal.css | .studio-shell .sidebar-create | 1277, 1965, 2080 |
| src/app/personal.css | .studio-shell .sidebar nav | 1288, 1971, 2111 |
| src/app/personal.css | .nav-group summary | 1297, 2071 |
| src/app/personal.css | .studio-shell .sidebar nav a | 1307, 2086 |
| src/app/personal.css | .studio-shell .sidebar nav a:hover | 1321, 2090 |
| src/app/personal.css | .studio-shell .sidebar nav a[aria-current='page'] | 1325, 2093 |
| src/app/personal.css | .studio-shell .sidebar-foot | 1331, 1965, 2097 |
| src/app/personal.css | .studio-shell .sidebar-foot strong | 1340, 2101 |
| src/app/personal.css | .studio-shell main | 1391, 2114 |
| src/app/personal.css | .page-heading .eyebrow | 1401, 2117 |
| src/app/personal.css | .workspace-banner .banner-tag | 1440, 2152 |
| src/app/personal.css | .home-heading | 1447, 5767, 15635, 21586, 24000 |
| src/app/personal.css | .workspace-intro | 1454, 2124, 2135 |
| src/app/personal.css | .workspace-intro h2 | 1461, 2145 |
| src/app/personal.css | .project-card:hover | 1470, 2158, 4398, 16230, 17415 |
| src/app/personal.css | .recording-tabs | 1547, 2169, 4110, 6375, 16909 |
| src/app/personal.css | .recording-tabs a | 1557, 2177, 4126, 6387 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1567, 4147, 6411 |
| src/app/personal.css | .activation-notice | 1641, 4154 |
| src/app/personal.css | .activation-notice h2 | 1655, 4166 |
| src/app/personal.css | .activation-notice p | 1659, 4173 |
| src/app/personal.css | .recording-metrics | 1662, 2180, 4317 |
| src/app/personal.css | .recording-metrics > div | 1668, 2186, 4324 |
| src/app/personal.css | .recording-metrics strong | 1674, 2195, 4343 |
| src/app/personal.css | .ledger-wrap | 1685, 2124, 11247, 16928 |
| src/app/personal.css | .ledger-table | 1691, 11259 |
| src/app/personal.css | .ledger-table th | 1697, 11269 |
| src/app/personal.css | .ledger-table td | 1704, 11282 |
| src/app/personal.css | .table-title | 1717, 11473 |
| src/app/personal.css | .date-picker-head | 1764, 8748 |
| src/app/personal.css | .date-picker-head strong | 1770, 8756 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1773, 8762, 22511 |
| src/app/personal.css | .date-picker-week | 1778, 1785, 8781 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1790, 8788, 22512 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1798, 8807 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1802, 8812 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 1805, 8819, 22513 |
| src/app/personal.css | .date-picker-footer | 1809, 8826 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1816, 8836, 22511 |
| src/app/personal.css | @media (prefers-reduced-motion: reduce) → .project-card | 1933, 13506 |
| src/app/personal.css | .sidebar-areas | 1974, 2104 |
| src/app/personal.css | .sidebar-areas a[aria-current='page'] | 1993, 2107 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1998, 2453 |
| src/app/personal.css | :root | 2036, 2470, 4696 |
| src/app/personal.css | .dark | 2047, 2593, 4782 |
| src/app/personal.css | .notebook-toolbar | 2198, 4179, 16912 |
| src/app/personal.css | .notebook-toolbar h2 | 2205, 4187 |
| src/app/personal.css | .notebook-toolbar p | 2209, 4195 |
| src/app/personal.css | .notebook-search | 2213, 4201, 24261 |
| src/app/personal.css | .notebook-search input:not(.ui-input) | 2220, 4212 |
| src/app/personal.css | .notebook-layout | 2226, 16916 |
| src/app/personal.css | .notebook-row | 2232, 4231 |
| src/app/personal.css | .notebook-row:hover | 2242, 4241 |
| src/app/personal.css | .notebook-spine | 2267, 4246 |
| src/app/personal.css | .spine-0 | 2279, 4258 |
| src/app/personal.css | .spine-1 | 2284, 4263 |
| src/app/personal.css | .spine-2 | 2289, 4268 |
| src/app/personal.css | .spine-3 | 2294, 4273 |
| src/app/personal.css | .notebook-count | 2299, 4278, 24288 |
| src/app/personal.css | .recent-notes | 2325, 4287, 6308, 16922 |
| src/app/personal.css | .recent-note | 2332, 4298 |
| src/app/personal.css | @keyframes fadeIn → from | 2647, 3127 |
| src/app/personal.css | @keyframes fadeIn → to | 2648, 3130 |
| src/app/personal.css | .skeleton-circle-icon | 2651, 2750 |
| src/app/personal.css | .skeleton-circle-icon-sm | 2651, 2910 |
| src/app/personal.css | .skeleton-circle-progress | 2651, 2828 |
| src/app/personal.css | .skeleton-circle-dot | 2651, 2880 |
| src/app/personal.css | .skeleton-bar | 2651, 2853 |
| src/app/personal.css | .skeleton-bar-day | 2651, 2859 |
| src/app/personal.css | .skeleton-progress-bar | 2651, 2726, 2799 |
| src/app/personal.css | .skeleton-work-col | 2718, 2726 |
| src/app/personal.css | .skeleton-banner-card | 2726, 2739 |
| src/app/personal.css | .skeleton-filters-row | 2726, 2764 |
| src/app/personal.css | .skeleton-task-cards-list | 2726, 2770 |
| src/app/personal.css | .skeleton-task-card | 2726, 2776 |
| src/app/personal.css | .skeleton-card-top | 2726, 2787 |
| src/app/personal.css | .skeleton-card-meta | 2726, 2793 |
| src/app/personal.css | .database-views button:not(.ui-btn) | 2952, 6387 |
| src/app/personal.css | .database-views button:not(.ui-btn):hover | 2970, 6404 |
| src/app/personal.css | .scrum-task-card | 2996, 5729, 9169 |
| src/app/personal.css | .scrum-task-card:hover | 3003, 5740, 9184 |
| src/app/personal.css | .scrum-progress-bar-fill | 3008, 9540 |
| src/app/personal.css | button:not(.ui-btn).button | 3027, 24234 |
| src/app/personal.css | .task-detail-panel | 3099, 24030 |
| src/app/personal.css | .drawer-top-bar | 3135, 24034 |
| src/app/personal.css | .btn-mark-complete | 3151, 24234 |
| src/app/personal.css | .btn-icon | 3178, 22440, 24159 |
| src/app/personal.css | .btn-icon:hover | 3192, 22477, 24199 |
| src/app/personal.css | .btn-drawer-action | 3209, 24234 |
| src/app/personal.css | .task-submission-card | 3242, 24064 |
| src/app/personal.css | .submission-status-pill | 3289, 24273 |
| src/app/personal.css | .btn-add-submission-quick | 3336, 24234 |
| src/app/personal.css | .submission-open-badge | 3387, 24273 |
| src/app/personal.css | .submission-quick-actions | 3403, 24070 |
| src/app/personal.css | .btn-tiny-delete | 3409, 3438 |
| src/app/personal.css | .project-badge | 3494, 24273 |
| src/app/personal.css | .priority-badge | 3504, 12038, 24273 |
| src/app/personal.css | .task-detail-title | 3530, 22065 |
| src/app/personal.css | .inline-edit-icon | 3542, 22092 |
| src/app/personal.css | .task-detail-title:hover .inline-edit-icon | 3550, 22109 |
| src/app/personal.css | .btn-tiny-save | 3602, 24252 |
| src/app/personal.css | .btn-tiny-cancel | 3631, 24252 |
| src/app/personal.css | .drawer-description-box | 3654, 24058 |
| src/app/personal.css | .metadata-cards-grid | 3685, 6447 |
| src/app/personal.css | .meta-label | 3707, 14043 |
| src/app/personal.css | .subtasks-section | 3806, 24077 |
| src/app/personal.css | .subtasks-header | 3812, 24081 |
| src/app/personal.css | .subtasks-progress-badge | 3825, 24288 |
| src/app/personal.css | .subtasks-progress-bar | 3835, 24085 |
| src/app/personal.css | .subtasks-tree-list | 3852, 24089 |
| src/app/personal.css | .subtask-tree-row | 3858, 24096 |
| src/app/personal.css | .add-subtask-form | 3925, 24101, 24261 |
| src/app/personal.css | .btn-add-subtask | 3944, 24252 |
| src/app/personal.css | .btn-submit-comment | 4022, 24234 |
| src/app/personal.css | .recording-tabs a:hover | 4142, 6404 |
| src/app/personal.css | .notebook-index | 4220, 6308 |
| src/app/personal.css | dialog.editor | 4415, 15314, 15730 |
| src/app/personal.css | .editor-modal-head | 4453, 15352 |
| src/app/personal.css | .editor-title-wrap | 4464, 15370 |
| src/app/personal.css | .editor-badge-eyebrow | 4470, 24288 |
| src/app/personal.css | .editor-close-btn | 4493, 12733, 15389, 15806, 22440, 24159 |
| src/app/personal.css | .editor-close-btn:hover | 4521, 15414, 15823, 22477, 24199 |
| src/app/personal.css | .field-input | 4570, 8187, 15761 |
| src/app/personal.css | .field-select | 4570, 4585, 15761 |
| src/app/personal.css | .field-textarea | 4570, 4598, 15761 |
| src/app/personal.css | .field-input:focus | 4589, 15784 |
| src/app/personal.css | .field-select:focus | 4589, 15784 |
| src/app/personal.css | .field-textarea:focus | 4589, 15784 |
| src/app/personal.css | .btn-editor-cancel | 4661, 24234 |
| src/app/personal.css | .btn-editor-submit | 4678, 24234 |
| src/app/personal.css | .manager-topbar | 4876, 15122, 20360 |
| src/app/personal.css | .manager-location-wrap | 4943, 15696 |
| src/app/personal.css | .manager-location | 4971, 21045 |
| src/app/personal.css | .topbar-fav-btn | 4981, 5052, 15703 |
| src/app/personal.css | .topbar-fav-btn:hover | 4997, 5067, 15720 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 5011, 12739 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 5011, 12739 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 5032, 15228 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 5046, 15229 |
| src/app/personal.css | .manager-sidebar | 5073, 6829, 15129, 20365 |
| src/app/personal.css | .close-navigation | 5128, 5754 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 5171, 15130, 16785, 20381 |
| src/app/personal.css | .sidebar-nav-item | 5227, 15136, 20384 |
| src/app/personal.css | .sidebar-nav-item:hover | 5241, 20389 |
| src/app/personal.css | .sidebar-item-icon | 5245, 20398 |
| src/app/personal.css | .sidebar-nav-item.is-active | 5264, 15137, 20392 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 5264, 15137, 20392 |
| src/app/personal.css | .project-dot | 5298, 9266 |
| src/app/personal.css | .sidebar-avatar | 5329, 12744 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 5362, 16517, 18705 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 5376, 16532 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 5384, 16539 |
| src/app/personal.css | .calendar-days > section.calendar-today | 5390, 16545 |
| src/app/personal.css | .calendar-days > section.calendar-outside | 5393, 16549 |
| src/app/personal.css | .calendar-add | 5405, 5449 |
| src/app/personal.css | .calendar-agenda-add-btn | 5481, 19839, 24234 |
| src/app/personal.css | .calendar-agenda-add-btn:hover | 5497, 19856 |
| src/app/personal.css | .calendar-agenda-title-group | 5501, 19795 |
| src/app/personal.css | .calendar-agenda-task-count | 5507, 19822, 24273 |
| src/app/personal.css | .calendar-agenda-actions | 5516, 19832 |
| src/app/personal.css | .calendar-agenda-clear-btn | 5522, 19861, 24234 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 5536, 19876 |
| src/app/personal.css | .calendar-event | 5575, 6437, 18714 |
| src/app/personal.css | .color-style-card | 5637, 15275, 16607 |
| src/app/personal.css | .color-swatches-grid | 5643, 15251, 16582 |
| src/app/personal.css | .color-swatch-item | 5650, 15193, 15252 |
| src/app/personal.css | .color-swatch-item:hover | 5664, 15253 |
| src/app/personal.css | .color-swatch-item.is-selected | 5669, 15254 |
| src/app/personal.css | .home-panel | 5729, 6140, 16210 |
| src/app/personal.css | .next-meeting | 5729, 5800, 24009 |
| src/app/personal.css | .focus-task | 5729, 6004 |
| src/app/personal.css | .sprint-summary-card | 5729, 9550 |
| src/app/personal.css | .daily-group-card | 5729, 10168, 16881 |
| src/app/personal.css | .focus-task:hover | 5740, 6018 |
| src/app/personal.css | .sprint-summary-card:hover | 5740, 9564 |
| src/app/personal.css | .manager-main | 5747, 15121 |
| src/app/personal.css | .manager-main .page-heading | 5758, 15123, 23996 |
| src/app/personal.css | .manager-main .page-heading h1 | 5761, 15124 |
| src/app/personal.css | .home-overview | 5795, 13511 |
| src/app/personal.css | .meeting-mode-pill | 5868, 11129 |
| src/app/personal.css | .round-arrow | 5901, 12748, 24267 |
| src/app/personal.css | .focus-filters | 5927, 6790, 24013 |
| src/app/personal.css | .focus-open | 6045, 12752 |
| src/app/personal.css | .home-text-link | 6132, 6823 |
| src/app/personal.css | .home-records | 6245, 16210 |
| src/app/personal.css | .home-records .section-head > a | 6253, 6823 |
| src/app/personal.css | select option | 6357, 21861 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 6454, 22794 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 6468, 22859 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 6468, 22869 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 6476, 21176, 22845 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions | 6479, 22872 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 6483, 22879 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 6483, 22879 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 6496, 6806 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 6502, 6809 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 6520, 20598, 20760, 22896 |
| src/app/personal.css | @media (max-width: 767px) → .home-grid | 6525, 23340 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 6548, 6584 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 6551, 23342 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task | 6555, 23343 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task h2 | 6559, 23344 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 6570, 23149 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 6577, 23161 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 6604, 6618 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 6604, 7043 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 6609, 7046 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 6707, 6818, 7012 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 6711, 7015 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 6714, 7036 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 6717, 7039 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 6720, 7027 |
| src/app/personal.css | .home-panel .section-head | 6756, 13124 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 6952, 20604 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 6981, 20608 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 7073, 20777 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days > section.calendar-day-cell | 7078, 20798 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-header | 7089, 20817 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-number | 7096, 20827 |
| src/app/personal.css | .manager-main .notebook-row | 7213, 13512 |
| src/app/personal.css | .manager-main .notebook-link | 7232, 13513 |
| src/app/personal.css | .manager-main .notebook-add-btn | 7349, 13514 |
| src/app/personal.css | .stakeholder-badge | 7566, 12726 |
| src/app/personal.css | .close-btn | 8134, 12733, 22440, 24159 |
| src/app/personal.css | .close-btn:hover | 8162, 22477, 24199 |
| src/app/personal.css | .textarea-input | 8187, 8207 |
| src/app/personal.css | .select-input | 8187, 8214 |
| src/app/personal.css | .btn-cancel | 8248, 15020 |
| src/app/personal.css | .dropzone-success | 8366, 24273 |
| src/app/personal.css | .dropzone-error | 8386, 24273 |
| src/app/personal.css | .close-picker-btn | 8555, 22440, 24159 |
| src/app/personal.css | .close-picker-btn:hover | 8569, 22477, 24199 |
| src/app/personal.css | .btn-clear-range | 8697, 24234 |
| src/app/personal.css | .btn-apply-range | 8715, 24234 |
| src/app/personal.css | .range-days-pill | 8732, 24273 |
| src/app/personal.css | .card-task-code | 9225, 21072 |
| src/app/personal.css | .card-priority-pill | 9274, 24288 |
| src/app/personal.css | .card-date-pill | 9305, 24288 |
| src/app/personal.css | .scrum-assignee-pill | 9385, 12206 |
| src/app/personal.css | .sprint-action-btn | 9622, 22440, 24159 |
| src/app/personal.css | .sprint-action-btn:hover | 9637, 22477, 24199 |
| src/app/personal.css | .daily-tasks-container | 9714, 16878 |
| src/app/personal.css | .daily-nav-arrow-btn | 9757, 24267 |
| src/app/personal.css | .btn-quick-add-day | 10281, 24252 |
| src/app/personal.css | .task-code-tag | 10412, 11908 |
| src/app/personal.css | .task-title-text | 10424, 10934 |
| src/app/personal.css | .task-project-pill | 10440, 10950, 16959 |
| src/app/personal.css | .today-view-wrapper | 10553, 16866 |
| src/app/personal.css | .today-header-card | 10560, 16869 |
| src/app/personal.css | .today-quick-add-card | 10652, 16872, 21148 |
| src/app/personal.css | .today-grid-layout | 10744, 16875 |
| src/app/personal.css | .today-task-card | 10857, 18359 |
| src/app/personal.css | .today-check-circle | 10890, 21154 |
| src/app/personal.css | .today-check-circle.checked | 10910, 21167 |
| src/app/personal.css | .btn-reschedule-today | 11003, 24252 |
| src/app/personal.css | .task-table | 11259, 11579 |
| src/app/personal.css | .task-table tbody tr:last-child td | 11291, 11640 |
| src/app/personal.css | .task-table tbody tr:hover td | 11296, 11644 |
| src/app/personal.css | .badge-late | 11370, 12772 |
| src/app/personal.css | .table-btn-done | 11539, 12258 |
| src/app/personal.css | .task-assignee-empty | 12199, 12247 |
| src/app/personal.css | .custom-select-option-content | 12484, 21968 |
| src/app/personal.css | .meeting-detail-row | 12509, 12596 |
| src/app/personal.css | .meeting-section-box | 12524, 12603 |
| src/app/personal.css | .meeting-section-box > svg | 12609, 12616 |
| src/app/personal.css | .meeting-section-header | 12635, 15575 |
| src/app/personal.css | .task-project-label | 12765, 21060 |
| src/app/personal.css | .dash-stats-row | 12784, 21568, 24004 |
| src/app/personal.css | .dash-stat-link | 12794, 13126 |
| src/app/personal.css | .dash-stat-card | 12801, 13127, 15832, 21571, 22521 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent | 12820, 15852, 22532 |
| src/app/personal.css | .dash-stat-top | 12834, 13507, 15871 |
| src/app/personal.css | .dash-stat-label | 12841, 13508, 15878 |
| src/app/personal.css | .dash-stat-value | 12849, 15886 |
| src/app/personal.css | .dash-stat-sub | 12858, 13128, 13509, 15894 |
| src/app/personal.css | .dash-sparkline | 12868, 13501 |
| src/app/personal.css | .dash-bar-chart | 12876, 13270, 15957, 18514 |
| src/app/personal.css | .dash-bar-col | 12884, 15966, 18522 |
| src/app/personal.css | .dash-bar-count | 12893, 13305, 15986, 18544 |
| src/app/personal.css | .dash-bar-track | 12901, 13318, 15994, 18557 |
| src/app/personal.css | .dash-bar-fill | 12913, 13332, 16008, 18568 |
| src/app/personal.css | .bar-today .dash-bar-track | 12921, 13340, 16016 |
| src/app/personal.css | .bar-today .dash-bar-fill | 12926, 13345, 16021 |
| src/app/personal.css | .dash-bar-label | 12931, 13356, 16040, 18580 |
| src/app/personal.css | .bar-today .dash-bar-label | 12938, 18598 |
| src/app/personal.css | .dash-donut-wrap | 12944, 13390, 16052 |
| src/app/personal.css | .dash-donut-svg-wrap | 12951, 13398, 16059 |
| src/app/personal.css | .dash-donut-svg | 12958, 13405, 16066 |
| src/app/personal.css | .dash-donut-center | 12964, 13418, 16079 |
| src/app/personal.css | .dash-donut-center strong | 12974, 13428, 16089 |
| src/app/personal.css | .dash-donut-center span | 12981, 13435, 16096 |
| src/app/personal.css | .dash-donut-legend | 12989, 13443, 16102 |
| src/app/personal.css | .donut-legend-row | 12997, 16109 |
| src/app/personal.css | .donut-dot | 13004, 13476, 16129 |
| src/app/personal.css | .donut-legend-label | 13012, 13483, 16136 |
| src/app/personal.css | .donut-legend-val | 13018, 13491, 16143 |
| src/app/personal.css | .dash-proj-bar-row | 13031, 16150 |
| src/app/personal.css | .dash-proj-bar-row:hover | 13044, 16160 |
| src/app/personal.css | .dash-proj-bar-meta | 13049, 16164 |
| src/app/personal.css | .dash-proj-bar-label | 13056, 16170 |
| src/app/personal.css | .dash-proj-bar-pct | 13066, 16176 |
| src/app/personal.css | .dash-proj-bar-track | 13073, 16182 |
| src/app/personal.css | .dash-proj-bar-fill | 13081, 16190 |
| src/app/personal.css | .dashboard-controls | 13129, 15423 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 13136, 13279 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 13137, 13294 |
| src/app/personal.css | .dash-analytics-row | 13139, 21419 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 13147, 21427 |
| src/app/personal.css | .week-barchart-modern | 13165, 18425 |
| src/app/personal.css | .week-barchart-header | 13171, 18430 |
| src/app/personal.css | .week-barchart-metric | 13181, 18439 |
| src/app/personal.css | .week-metric-main | 13190, 18445 |
| src/app/personal.css | .week-metric-num | 13196, 18450 |
| src/app/personal.css | .week-metric-text-group | 13204, 18457 |
| src/app/personal.css | .week-metric-title | 13210, 18462 |
| src/app/personal.css | .week-metric-sub | 13216, 18468 |
| src/app/personal.css | .week-metric-pills | 13221, 18472 |
| src/app/personal.css | .week-metric-pill | 13228, 18478 |
| src/app/personal.css | .week-metric-pill.peak-pill | 13238, 18487 |
| src/app/personal.css | .week-filter-reset-chip | 13244, 18492 |
| src/app/personal.css | .week-filter-reset-chip:hover | 13259, 18506 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 13264, 18509 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 13299, 18540 |
| src/app/personal.css | .dash-bar-count.has-value | 13313, 18553 |
| src/app/personal.css | .dash-bar-labels-wrap | 13349, 18574 |
| src/app/personal.css | .dash-bar-daynum | 13363, 18585 |
| src/app/personal.css | .today-badge-dot | 13369, 18590 |
| src/app/personal.css | .week-barchart-footer | 13376, 18602 |
| src/app/personal.css | .dash-chart-caption | 13382, 21119 |
| src/app/personal.css | .donut-segment | 13410, 16071 |
| src/app/personal.css | .donut-segment:hover | 13414, 16075 |
| src/app/personal.css | .relation-pill | 13530, 18672 |
| src/app/personal.css | .kpi-icon-wrap | 14085, 17291 |
| src/app/personal.css | .kpi-info | 14088, 17318 |
| src/app/personal.css | .manager-action-dialog | 14281, 15730 |
| src/app/personal.css | .action-modal-close | 14358, 15806, 21028, 22440, 24159 |
| src/app/personal.css | .action-modal-close:hover | 14374, 15823, 21040, 22477, 24199 |
| src/app/personal.css | :root[data-theme-color='lime'] | 15117, 20347 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 15120, 20355 |
| src/app/personal.css | .workspace-page | 15128, 16202 |
| src/app/personal.css | .sidebar-group-toggle | 15132, 16810 |
| src/app/personal.css | .follow-up-panel | 15152, 16210, 16244, 16889 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 15153, 16260 |
| src/app/personal.css | .follow-up-list | 15157, 16316, 16393 |
| src/app/personal.css | .follow-up-row | 15158, 16323, 16399 |
| src/app/personal.css | .follow-up-marker | 15162, 16343 |
| src/app/personal.css | .appearance-settings | 15183, 15277, 16607 |
| src/app/personal.css | .weekly-review | 15231, 16210 |
| src/app/personal.css | .settings-container | 15245, 16555, 16933 |
| src/app/personal.css | .settings-tabs-row | 15246, 16572, 16936 |
| src/app/personal.css | .settings-content-grid | 15250, 16565 |
| src/app/personal.css | .theme-live-preview-card | 15258, 15276, 16607 |
| src/app/personal.css | .settings-fields-grid | 15273, 16591 |
| src/app/personal.css | .security-settings-card | 15286, 16607 |
| src/app/personal.css | .backup-settings-card | 15288, 16607 |
| src/app/personal.css | .backup-action-boxes | 15289, 16599 |
| src/app/personal.css | .home-date-chip | 15672, 21592 |
| src/app/personal.css | .dash-stat-card:hover | 15846, 22527 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent:hover | 15858, 22540 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-label | 15862, 22546 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-sub | 15862, 22563 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-value | 15867, 22555 |
| src/app/personal.css | .dash-bar-col:hover | 15981, 18536 |
| src/app/personal.css | .home-journal | 16210, 21225 |
| src/app/personal.css | .follow-up-wrapper | 16237, 16886 |
| src/app/personal.css | .project-code-tag | 17434, 23487 |
| src/app/personal.css | .follow-up-compact-bar | 18233, 21597, 24025 |
| src/app/personal.css | .journal-join-chip | 18684, 21461 |
| src/app/personal.css | .journal-join-chip:hover | 18696, 21475 |
| src/app/personal.css | .calendar-agenda-day-head | 18725, 19891 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 19225, 19350 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 19323, 19350 |
| src/app/personal.css | .drawer-status-select-wrap | 19557, 22272 |
| src/app/personal.css | .drawer-priority-select-wrap | 19557, 19693, 22272 |
| src/app/personal.css | .drawer-status-select | 19565, 19664 |
| src/app/personal.css | .drawer-priority-select | 19565, 19709 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 19587, 22284, 24227 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 19587, 22284, 24227 |
| src/app/personal.css | .drawer-status-select-wrap.status-rencana .custom-select-trigger | 19603, 22301 |
| src/app/personal.css | .drawer-status-select-wrap.status-proses .custom-select-trigger | 19609, 22306 |
| src/app/personal.css | .drawer-status-select-wrap.status-selesai .custom-select-trigger | 19615, 22311 |
| src/app/personal.css | .drawer-status-select-wrap.status-dibatalkan .custom-select-trigger | 19621, 22316 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 19627, 22322 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-normal .custom-select-trigger | 19633, 22327 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-tinggi .custom-select-trigger | 19639, 22332 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-mendesak .custom-select-trigger | 19645, 22337 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-chevron | 19651, 22343 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-chevron | 19651, 22343 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-menu | 19658, 22351 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-menu | 19658, 22351 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 20777, 20785 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 20969, 20974 |
| src/app/personal.css | .activity-summary-section | 20981, 24106 |
| src/app/personal.css | .timeline-feed | 20987, 24110 |
| src/app/personal.css | .timeline-event | 20993, 24116 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 21219, 22936 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-badge | 21604, 21609 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-snippet | 21604, 21618 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-actions | 21604, 21613 |
| src/app/personal.css | .project-section-nav | 21666, 23751, 24148 |
| src/app/personal.css | .project-next-actions > summary | 21812, 21829 |
| src/app/personal.css | .project-next-actions | 21828, 23802 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .follow-up-compact-bar | 21846, 22978 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-info | 21847, 22994 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-text-group | 21848, 23001 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-main-line | 21849, 23005 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-badge | 21850, 23011 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-snippet | 21851, 23022 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 21852, 23025 |
| src/app/personal.css | .custom-select-trigger | 21856, 21892, 24221 |
| src/app/personal.css | .custom-select-option | 21856, 21939 |
| src/app/personal.css | select:not(.custom-select-native) | 21864, 24221 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 21996, 24227 |
| src/app/personal.css | .drawer-properties-grid | 22115, 24050 |
| src/app/personal.css | .prop-user-chip | 22167, 24273 |
| src/app/personal.css | .prop-text-badge | 22221, 24273 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 22235, 24273 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 22440, 24159 |
| src/app/personal.css | .close-drawer-btn | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 22440, 24159 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 22477, 24199 |
| src/app/personal.css | .close-drawer-btn:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 22477, 24199 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 22477, 24199 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-label | 22760, 22772 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-value | 22762, 22773 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-sub | 22764, 22774 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-icon-wrap | 22766, 22775 |
| src/app/personal.css | .project-properties-grid | 23594, 24140 |
| src/app/personal.css | .project-progress-card | 23681, 24144 |
| src/app/tokens.css | :root | 2, 49 |
| src/app/ui.css | .ui-modal | 64, 69 |
| src/app/ui.css | .ui-modal::backdrop | 65, 70 |
| src/app/ui.css | .ui-modal > header | 66, 67, 71, 72 |
| src/app/ui.css | .ui-modal > footer | 66, 68, 71, 73 |
| src/app/ui.css | @media (max-width: 767px) → .ui-modal | 79, 80 |

## Nilai deklarasi

### border-radius

- `0`
- `0 4px 4px 0`
- `0 8px 8px 0`
- `10px`
- `11px`
- `12px`
- `13px`
- `14px`
- `15px`
- `16px`
- `18px`
- `1px`
- `20px`
- `20px 20px 0 0`
- `22px`
- `24px`
- `24px 24px 0 0`
- `28px`
- `28px 28px 0 0`
- `2px`
- `30px`
- `3px`
- `4px`
- `50%`
- `50% 50% 20px 20px`
- `5px`
- `6px`
- `7px`
- `8px`
- `8px 8px 0 0`
- `8px 8px 3px 3px`
- `9999px`
- `999px`
- `99px`
- `9px`
- `var(--btn-radius-md)`
- `var(--btn-radius-sm)`
- `var(--control-radius-md)`
- `var(--control-radius-md, 10px)`
- `var(--control-radius-sm)`
- `var(--r-full)`
- `var(--r-lg)`
- `var(--r-md)`
- `var(--r-sm)`
- `var(--radius-lg)`
- `var(--radius-lg, 14px)`
- `var(--radius-md)`
- `var(--radius-md, 14px)`
- `var(--radius-md, 18px)`
- `var(--radius-md, 8px)`
- `var(--radius-pill)`
- `var(--radius-pill, 20px)`
- `var(--radius-pill, 9999px)`
- `var(--radius-sm)`
- `var(--radius-sm, 6px)`
- `var(--radius-xl)`
- `var(--radius-xs)`
- `var(--radius-xs, 6px)`
- `var(--table-radius)`

### font-size

- `0.68rem`
- `0.73rem`
- `0.76rem`
- `0.78rem`
- `0.82rem`
- `0.84rem`
- `0.88rem`
- `0.8rem`
- `0.95rem`
- `10.5px`
- `10px`
- `11.5px`
- `11px`
- `12.5px`
- `12px`
- `13.5px`
- `13px`
- `14.5px`
- `14px`
- `15.5px`
- `15px`
- `16px`
- `17px`
- `18px`
- `19px`
- `20px`
- `22px`
- `23px`
- `24px`
- `26px`
- `28px`
- `32px`
- `34px`
- `7.5px`
- `8.5px`
- `8px`
- `9.5px`
- `9px`
- `clamp(15px, 1.8vw, 18px)`
- `clamp(16px, 2vw, 20px)`
- `clamp(20px, 2vw, 28px)`
- `var(--btn-font-size-md)`
- `var(--btn-font-size-sm)`
- `var(--card-title-size)`
- `var(--control-font-size-sm)`
- `var(--control-text-size)`
- `var(--control-text-size, 14px)`
- `var(--font-size-base)`
- `var(--font-size-sm)`
- `var(--font-size-xs)`
- `var(--fs-body)`
- `var(--fs-caption)`
- `var(--fs-h2)`
- `var(--fs-label)`
- `var(--fs-overline)`
- `var(--page-title-size)`
- `var(--section-title-size)`
- `var(--table-td-font-size)`
- `var(--table-th-font-size)`

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
- `var(--icon-md)`
- `var(--space-8)`
- `var(--table-th-height)`
