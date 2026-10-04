# Audit UI — kode aktual

Dibuat ulang dengan `npm run audit:ui`. Duplikat dihitung dalam konteks media/at-rule yang sama; bukan bukti aman untuk menghapus CSS. Angka mencakup seluruh src, termasuk pustaka UI.

## Metrik

| Metrik | Jumlah |
|---|---:|
| button | 11 |
| input | 3 |
| select | 1 |
| textarea | 1 |
| date | 1 |
| inline | 85 |
| hexTsx | 24 |
| hexCss | 945 |
| important | 2268 |
| bytes | 611635 |
| Elemen mentah di luar components/ui | 0 |
| Selector berulang | 517 |
| Nilai border-radius unik | 59 |
| Nilai font-size unik | 60 |
| Nilai height unik | 61 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 27354 | 2 |
| src/app/personal.css | 569142 | 2263 |
| src/app/tokens.css | 2887 | 3 |
| src/app/ui.css | 12252 | 0 |

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
| src/app/personal.css | body | 8, 2611 |
| src/app/personal.css | button:not(.ui-btn) | 11, 19, 6301 |
| src/app/personal.css | .button | 11, 19, 3010, 6301, 24135 |
| src/app/personal.css | .primary | 11, 19, 26, 2996, 6301, 6353, 24135 |
| src/app/personal.css | input:not(.ui-input) | 11, 6301, 21757 |
| src/app/personal.css | select | 11, 6301, 6308, 21757 |
| src/app/personal.css | textarea:not(.ui-input) | 11, 21757 |
| src/app/personal.css | .card | 29, 1403, 2107, 3023, 5712, 6291, 16173 |
| src/app/personal.css | .home-heading h1 | 68, 5744, 5767, 15619, 21490 |
| src/app/personal.css | .page-heading | 77, 1389 |
| src/app/personal.css | .page-heading h1 | 82, 1398, 2103 |
| src/app/personal.css | .workspace-banner | 85, 1411, 2107, 2131 |
| src/app/personal.css | .workspace-banner h2 | 100, 1423, 2138 |
| src/app/personal.css | .workspace-banner p | 106, 1430 |
| src/app/personal.css | .workspace-metrics .card | 133, 1443 |
| src/app/personal.css | .onboarding-card | 173, 2107 |
| src/app/personal.css | .project-card | 193, 1403, 1457, 2107, 4367, 6291, 15167, 16173, 17331 |
| src/app/personal.css | .project-symbol | 214, 1469 |
| src/app/personal.css | .project-cover | 223, 1474, 4386, 23334, 24037 |
| src/app/personal.css | .module-intro | 332, 16860 |
| src/app/personal.css | .task-database | 345, 1403, 2107 |
| src/app/personal.css | .database-views | 352, 1502, 2918, 6358, 6822 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 355, 1508, 2957, 6394 |
| src/app/personal.css | .filters | 359, 1492, 2146, 12327, 15386 |
| src/app/personal.css | .filters label | 364, 1499, 12335 |
| src/app/personal.css | .filters input:not(.ui-input) | 367, 12352, 12369 |
| src/app/personal.css | .filters select | 367, 12352, 12373 |
| src/app/personal.css | .task-table th | 371, 11243 |
| src/app/personal.css | .task-table-wrap | 378, 6291, 11221, 11541 |
| src/app/personal.css | .task-table td | 381, 11256 |
| src/app/personal.css | .task-table .task-title | 385, 20600 |
| src/app/personal.css | .record .section-head h3 | 392, 1525 |
| src/app/personal.css | .record-options | 401, 15404 |
| src/app/personal.css | .record-options summary | 406, 1528, 15411 |
| src/app/personal.css | .record-options > .actions | 410, 15425 |
| src/app/personal.css | .kanban-column | 413, 1513 |
| src/app/personal.css | .kanban-column:nth-child(3) | 421, 1519 |
| src/app/personal.css | .tabs | 442, 6358 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 449, 6370 |
| src/app/personal.css | .editor | 459, 2377 |
| src/app/personal.css | .editor .section-head | 465, 2393, 15315 |
| src/app/personal.css | .timeline-panel | 545, 6291, 16173 |
| src/app/personal.css | .project-status-tabs | 988, 1478, 4336, 6358 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 994, 1483, 4346, 6370, 24174 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 999, 1487, 4361, 6394 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 1030, 1036 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 1030, 1042 |
| src/app/personal.css | .task-calendar | 1073, 1403, 16173, 16423 |
| src/app/personal.css | .calendar-toolbar | 1080, 16433 |
| src/app/personal.css | .calendar-day-number | 1145, 5388, 5406, 6413, 18641 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 1159, 6416 |
| src/app/personal.css | .studio-shell .sidebar | 1231, 1942, 2041 |
| src/app/personal.css | .studio-shell .brand | 1238, 2046 |
| src/app/personal.css | .studio-shell .brand-icon | 1243, 2049 |
| src/app/personal.css | .studio-shell .brand-sub | 1251, 2054 |
| src/app/personal.css | .studio-shell .sidebar-search | 1255, 1948, 2058 |
| src/app/personal.css | .studio-shell .sidebar-create | 1270, 1948, 2063 |
| src/app/personal.css | .studio-shell .sidebar nav | 1281, 1954, 2094 |
| src/app/personal.css | .nav-group summary | 1290, 2054 |
| src/app/personal.css | .studio-shell .sidebar nav a | 1300, 2069 |
| src/app/personal.css | .studio-shell .sidebar nav a:hover | 1314, 2073 |
| src/app/personal.css | .studio-shell .sidebar nav a[aria-current='page'] | 1318, 2076 |
| src/app/personal.css | .studio-shell .sidebar-foot | 1324, 1948, 2080 |
| src/app/personal.css | .studio-shell .sidebar-foot strong | 1333, 2084 |
| src/app/personal.css | .studio-shell main | 1384, 2097 |
| src/app/personal.css | .page-heading .eyebrow | 1394, 2100 |
| src/app/personal.css | .workspace-banner .banner-tag | 1433, 2135 |
| src/app/personal.css | .home-heading | 1440, 5750, 15598, 21487, 23901 |
| src/app/personal.css | .workspace-intro | 1447, 2107, 2118 |
| src/app/personal.css | .workspace-intro h2 | 1454, 2128 |
| src/app/personal.css | .project-card:hover | 1463, 2141, 4381, 16193, 17346 |
| src/app/personal.css | .recording-tabs | 1540, 2152, 4093, 6358, 16872 |
| src/app/personal.css | .recording-tabs a | 1550, 2160, 4109, 6370 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1560, 4130, 6394 |
| src/app/personal.css | .activation-notice | 1634, 4137 |
| src/app/personal.css | .activation-notice h2 | 1648, 4149 |
| src/app/personal.css | .activation-notice p | 1652, 4156 |
| src/app/personal.css | .recording-metrics | 1655, 2163, 4300 |
| src/app/personal.css | .recording-metrics > div | 1661, 2169, 4307 |
| src/app/personal.css | .recording-metrics strong | 1667, 2178, 4326 |
| src/app/personal.css | .ledger-wrap | 1678, 2107, 11221, 16891 |
| src/app/personal.css | .ledger-table | 1684, 11233 |
| src/app/personal.css | .ledger-table th | 1690, 11243 |
| src/app/personal.css | .ledger-table td | 1697, 11256 |
| src/app/personal.css | .table-title | 1710, 11447 |
| src/app/personal.css | .date-picker-head | 1757, 8722 |
| src/app/personal.css | .date-picker-head strong | 1763, 8730 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1766, 8736, 22412 |
| src/app/personal.css | .date-picker-week | 1771, 1778, 8755 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1783, 8762, 22413 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1791, 8781 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1795, 8786 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 1798, 8793, 22414 |
| src/app/personal.css | .date-picker-footer | 1802, 8800 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1809, 8810, 22412 |
| src/app/personal.css | .sidebar-areas | 1957, 2087 |
| src/app/personal.css | .sidebar-areas a[aria-current='page'] | 1976, 2090 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1981, 2436 |
| src/app/personal.css | :root | 2019, 2453, 4679 |
| src/app/personal.css | .dark | 2030, 2576, 4765 |
| src/app/personal.css | .notebook-toolbar | 2181, 4162, 16875 |
| src/app/personal.css | .notebook-toolbar h2 | 2188, 4170 |
| src/app/personal.css | .notebook-toolbar p | 2192, 4178 |
| src/app/personal.css | .notebook-search | 2196, 4184, 24162 |
| src/app/personal.css | .notebook-search input:not(.ui-input) | 2203, 4195 |
| src/app/personal.css | .notebook-layout | 2209, 16879 |
| src/app/personal.css | .notebook-row | 2215, 4214 |
| src/app/personal.css | .notebook-row:hover | 2225, 4224 |
| src/app/personal.css | .notebook-spine | 2250, 4229 |
| src/app/personal.css | .spine-0 | 2262, 4241 |
| src/app/personal.css | .spine-1 | 2267, 4246 |
| src/app/personal.css | .spine-2 | 2272, 4251 |
| src/app/personal.css | .spine-3 | 2277, 4256 |
| src/app/personal.css | .notebook-count | 2282, 4261, 24189 |
| src/app/personal.css | .recent-notes | 2308, 4270, 6291, 16885 |
| src/app/personal.css | .recent-note | 2315, 4281 |
| src/app/personal.css | @keyframes fadeIn → from | 2630, 3110 |
| src/app/personal.css | @keyframes fadeIn → to | 2631, 3113 |
| src/app/personal.css | .skeleton-circle-icon | 2634, 2733 |
| src/app/personal.css | .skeleton-circle-icon-sm | 2634, 2893 |
| src/app/personal.css | .skeleton-circle-progress | 2634, 2811 |
| src/app/personal.css | .skeleton-circle-dot | 2634, 2863 |
| src/app/personal.css | .skeleton-bar | 2634, 2836 |
| src/app/personal.css | .skeleton-bar-day | 2634, 2842 |
| src/app/personal.css | .skeleton-progress-bar | 2634, 2709, 2782 |
| src/app/personal.css | .skeleton-work-col | 2701, 2709 |
| src/app/personal.css | .skeleton-banner-card | 2709, 2722 |
| src/app/personal.css | .skeleton-filters-row | 2709, 2747 |
| src/app/personal.css | .skeleton-task-cards-list | 2709, 2753 |
| src/app/personal.css | .skeleton-task-card | 2709, 2759 |
| src/app/personal.css | .skeleton-card-top | 2709, 2770 |
| src/app/personal.css | .skeleton-card-meta | 2709, 2776 |
| src/app/personal.css | .database-views button:not(.ui-btn) | 2935, 6370 |
| src/app/personal.css | .database-views button:not(.ui-btn):hover | 2953, 6387 |
| src/app/personal.css | .scrum-task-card | 2979, 5712, 9143 |
| src/app/personal.css | .scrum-task-card:hover | 2986, 5723, 9158 |
| src/app/personal.css | .scrum-progress-bar-fill | 2991, 9514 |
| src/app/personal.css | button:not(.ui-btn).button | 3010, 24135 |
| src/app/personal.css | .task-detail-panel | 3082, 23931 |
| src/app/personal.css | .drawer-top-bar | 3118, 23935 |
| src/app/personal.css | .btn-mark-complete | 3134, 24135 |
| src/app/personal.css | .btn-icon | 3161, 22341, 24060 |
| src/app/personal.css | .btn-icon:hover | 3175, 22378, 24100 |
| src/app/personal.css | .btn-drawer-action | 3192, 24135 |
| src/app/personal.css | .task-submission-card | 3225, 23965 |
| src/app/personal.css | .submission-status-pill | 3272, 24174 |
| src/app/personal.css | .btn-add-submission-quick | 3319, 24135 |
| src/app/personal.css | .submission-open-badge | 3370, 24174 |
| src/app/personal.css | .submission-quick-actions | 3386, 23971 |
| src/app/personal.css | .btn-tiny-delete | 3392, 3421 |
| src/app/personal.css | .project-badge | 3477, 24174 |
| src/app/personal.css | .priority-badge | 3487, 12012, 24174 |
| src/app/personal.css | .task-detail-title | 3513, 21966 |
| src/app/personal.css | .inline-edit-icon | 3525, 21993 |
| src/app/personal.css | .task-detail-title:hover .inline-edit-icon | 3533, 22010 |
| src/app/personal.css | .btn-tiny-save | 3585, 24153 |
| src/app/personal.css | .btn-tiny-cancel | 3614, 24153 |
| src/app/personal.css | .drawer-description-box | 3637, 23959 |
| src/app/personal.css | .metadata-cards-grid | 3668, 6430 |
| src/app/personal.css | .meta-label | 3690, 14007 |
| src/app/personal.css | .subtasks-section | 3789, 23978 |
| src/app/personal.css | .subtasks-header | 3795, 23982 |
| src/app/personal.css | .subtasks-progress-badge | 3808, 24189 |
| src/app/personal.css | .subtasks-progress-bar | 3818, 23986 |
| src/app/personal.css | .subtasks-tree-list | 3835, 23990 |
| src/app/personal.css | .subtask-tree-row | 3841, 23997 |
| src/app/personal.css | .add-subtask-form | 3908, 24002, 24162 |
| src/app/personal.css | .btn-add-subtask | 3927, 24153 |
| src/app/personal.css | .btn-submit-comment | 4005, 24135 |
| src/app/personal.css | .recording-tabs a:hover | 4125, 6387 |
| src/app/personal.css | .notebook-index | 4203, 6291 |
| src/app/personal.css | dialog.editor | 4398, 15277, 15693 |
| src/app/personal.css | .editor-modal-head | 4436, 15315 |
| src/app/personal.css | .editor-title-wrap | 4447, 15333 |
| src/app/personal.css | .editor-badge-eyebrow | 4453, 24189 |
| src/app/personal.css | .editor-close-btn | 4476, 12707, 15352, 15769, 22341, 24060 |
| src/app/personal.css | .editor-close-btn:hover | 4504, 15377, 15786, 22378, 24100 |
| src/app/personal.css | .field-input | 4553, 8161, 15724 |
| src/app/personal.css | .field-select | 4553, 4568, 15724 |
| src/app/personal.css | .field-textarea | 4553, 4581, 15724 |
| src/app/personal.css | .field-input:focus | 4572, 15747 |
| src/app/personal.css | .field-select:focus | 4572, 15747 |
| src/app/personal.css | .field-textarea:focus | 4572, 15747 |
| src/app/personal.css | .btn-editor-cancel | 4644, 24135 |
| src/app/personal.css | .btn-editor-submit | 4661, 24135 |
| src/app/personal.css | .manager-topbar | 4859, 15086, 20291 |
| src/app/personal.css | .manager-location-wrap | 4926, 15659 |
| src/app/personal.css | .manager-location | 4954, 20946 |
| src/app/personal.css | .topbar-fav-btn | 4964, 5035, 15666 |
| src/app/personal.css | .topbar-fav-btn:hover | 4980, 5050, 15683 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 4994, 12713 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 4994, 12713 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 5015, 15191 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 5029, 15192 |
| src/app/personal.css | .manager-sidebar | 5056, 6803, 15093, 20296 |
| src/app/personal.css | .close-navigation | 5111, 5737 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 5154, 15094, 16748, 20312 |
| src/app/personal.css | .sidebar-nav-item | 5210, 15100, 20315 |
| src/app/personal.css | .sidebar-nav-item:hover | 5224, 20320 |
| src/app/personal.css | .sidebar-item-icon | 5228, 20329 |
| src/app/personal.css | .sidebar-nav-item.is-active | 5247, 15101, 20323 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 5247, 15101, 20323 |
| src/app/personal.css | .project-dot | 5281, 9240 |
| src/app/personal.css | .sidebar-avatar | 5312, 12718 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 5345, 16480, 18636 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 5359, 16495 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 5367, 16502 |
| src/app/personal.css | .calendar-days > section.calendar-today | 5373, 16508 |
| src/app/personal.css | .calendar-days > section.calendar-outside | 5376, 16512 |
| src/app/personal.css | .calendar-add | 5388, 5432 |
| src/app/personal.css | .calendar-agenda-add-btn | 5464, 19770, 24135 |
| src/app/personal.css | .calendar-agenda-add-btn:hover | 5480, 19787 |
| src/app/personal.css | .calendar-agenda-title-group | 5484, 19726 |
| src/app/personal.css | .calendar-agenda-task-count | 5490, 19753, 24174 |
| src/app/personal.css | .calendar-agenda-actions | 5499, 19763 |
| src/app/personal.css | .calendar-agenda-clear-btn | 5505, 19792, 24135 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 5519, 19807 |
| src/app/personal.css | .calendar-event | 5558, 6420, 18645 |
| src/app/personal.css | .color-style-card | 5620, 15238, 16570 |
| src/app/personal.css | .color-swatches-grid | 5626, 15214, 16545 |
| src/app/personal.css | .color-swatch-item | 5633, 15157, 15215 |
| src/app/personal.css | .color-swatch-item:hover | 5647, 15216 |
| src/app/personal.css | .color-swatch-item.is-selected | 5652, 15217 |
| src/app/personal.css | .home-panel | 5712, 6123, 16173 |
| src/app/personal.css | .next-meeting | 5712, 5783, 23910 |
| src/app/personal.css | .focus-task | 5712, 5987 |
| src/app/personal.css | .sprint-summary-card | 5712, 9524 |
| src/app/personal.css | .daily-group-card | 5712, 10142, 16844 |
| src/app/personal.css | .focus-task:hover | 5723, 6001 |
| src/app/personal.css | .sprint-summary-card:hover | 5723, 9538 |
| src/app/personal.css | .manager-main | 5730, 15085 |
| src/app/personal.css | .manager-main .page-heading | 5741, 15087, 23897 |
| src/app/personal.css | .manager-main .page-heading h1 | 5744, 15088 |
| src/app/personal.css | .home-overview | 5778, 13475 |
| src/app/personal.css | .meeting-mode-pill | 5851, 11103 |
| src/app/personal.css | .round-arrow | 5884, 12722, 24168 |
| src/app/personal.css | .focus-filters | 5910, 6773, 23914 |
| src/app/personal.css | .focus-open | 6028, 12726 |
| src/app/personal.css | .home-text-link | 6115, 6797 |
| src/app/personal.css | .home-records | 6228, 16173 |
| src/app/personal.css | .home-records .section-head > a | 6236, 6797 |
| src/app/personal.css | select option | 6340, 21762 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 6437, 22695 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 6451, 22760 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 6451, 22770 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 6459, 21077, 22746 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions | 6462, 22773 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 6466, 22780 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 6466, 22780 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 6479, 6780 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 6485, 6783 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 6503, 20529, 20661, 22797 |
| src/app/personal.css | @media (max-width: 767px) → .home-grid | 6508, 23241 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 6531, 6567 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 6534, 23243 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task | 6538, 23244 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task h2 | 6542, 23245 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 6553, 23050 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 6560, 23062 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 6587, 6601 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 6587, 7017 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 6592, 7020 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 6690, 6792, 6986 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 6694, 6989 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 6697, 7010 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 6700, 7013 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 6703, 7001 |
| src/app/personal.css | .home-panel .section-head | 6739, 13089 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 6926, 20535 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 6955, 20539 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 7047, 20678 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days > section.calendar-day-cell | 7052, 20699 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-header | 7063, 20718 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-number | 7070, 20728 |
| src/app/personal.css | .manager-main .notebook-row | 7187, 13476 |
| src/app/personal.css | .manager-main .notebook-link | 7206, 13477 |
| src/app/personal.css | .manager-main .notebook-add-btn | 7323, 13478 |
| src/app/personal.css | .stakeholder-badge | 7540, 12700 |
| src/app/personal.css | .close-btn | 8108, 12707, 22341, 24060 |
| src/app/personal.css | .close-btn:hover | 8136, 22378, 24100 |
| src/app/personal.css | .textarea-input | 8161, 8181 |
| src/app/personal.css | .select-input | 8161, 8188 |
| src/app/personal.css | .btn-cancel | 8222, 14984 |
| src/app/personal.css | .dropzone-success | 8340, 24174 |
| src/app/personal.css | .dropzone-error | 8360, 24174 |
| src/app/personal.css | .close-picker-btn | 8529, 22341, 24060 |
| src/app/personal.css | .close-picker-btn:hover | 8543, 22378, 24100 |
| src/app/personal.css | .btn-clear-range | 8671, 24135 |
| src/app/personal.css | .btn-apply-range | 8689, 24135 |
| src/app/personal.css | .range-days-pill | 8706, 24174 |
| src/app/personal.css | .card-task-code | 9199, 20973 |
| src/app/personal.css | .card-priority-pill | 9248, 24189 |
| src/app/personal.css | .card-date-pill | 9279, 24189 |
| src/app/personal.css | .scrum-assignee-pill | 9359, 12180 |
| src/app/personal.css | .sprint-action-btn | 9596, 22341, 24060 |
| src/app/personal.css | .sprint-action-btn:hover | 9611, 22378, 24100 |
| src/app/personal.css | .daily-tasks-container | 9688, 16841 |
| src/app/personal.css | .daily-nav-arrow-btn | 9731, 24168 |
| src/app/personal.css | .btn-quick-add-day | 10255, 24153 |
| src/app/personal.css | .task-code-tag | 10386, 11882 |
| src/app/personal.css | .task-title-text | 10398, 10908 |
| src/app/personal.css | .task-project-pill | 10414, 10924, 16922 |
| src/app/personal.css | .today-view-wrapper | 10527, 16829 |
| src/app/personal.css | .today-header-card | 10534, 16832 |
| src/app/personal.css | .today-quick-add-card | 10626, 16835, 21049 |
| src/app/personal.css | .today-grid-layout | 10718, 16838 |
| src/app/personal.css | .today-task-card | 10831, 18290 |
| src/app/personal.css | .today-check-circle | 10864, 21055 |
| src/app/personal.css | .today-check-circle.checked | 10884, 21068 |
| src/app/personal.css | .btn-reschedule-today | 10977, 24153 |
| src/app/personal.css | .task-table | 11233, 11553 |
| src/app/personal.css | .task-table tbody tr:last-child td | 11265, 11614 |
| src/app/personal.css | .task-table tbody tr:hover td | 11270, 11618 |
| src/app/personal.css | .badge-late | 11344, 12746 |
| src/app/personal.css | .table-btn-done | 11513, 12232 |
| src/app/personal.css | .task-assignee-empty | 12173, 12221 |
| src/app/personal.css | .custom-select-option-content | 12458, 21869 |
| src/app/personal.css | .meeting-detail-row | 12483, 12570 |
| src/app/personal.css | .meeting-section-box | 12498, 12577 |
| src/app/personal.css | .meeting-section-box > svg | 12583, 12590 |
| src/app/personal.css | .meeting-section-header | 12609, 15538 |
| src/app/personal.css | .task-project-label | 12739, 20961 |
| src/app/personal.css | .dash-stats-row | 12758, 21469, 23905 |
| src/app/personal.css | .dash-stat-link | 12768, 13091 |
| src/app/personal.css | .dash-stat-card | 12775, 13092, 15795, 21472, 22422 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent | 12794, 15815, 22433 |
| src/app/personal.css | .dash-stat-top | 12808, 13471, 15834 |
| src/app/personal.css | .dash-stat-label | 12815, 13472, 15841 |
| src/app/personal.css | .dash-stat-value | 12823, 15849 |
| src/app/personal.css | .dash-stat-sub | 12832, 13093, 13473, 15857 |
| src/app/personal.css | .dash-sparkline | 12842, 13466 |
| src/app/personal.css | .dash-bar-chart | 12850, 13235, 15920, 18445 |
| src/app/personal.css | .dash-bar-col | 12858, 15929, 18453 |
| src/app/personal.css | .dash-bar-count | 12867, 13270, 15949, 18475 |
| src/app/personal.css | .dash-bar-track | 12875, 13283, 15957, 18488 |
| src/app/personal.css | .dash-bar-fill | 12887, 13297, 15971, 18499 |
| src/app/personal.css | .bar-today .dash-bar-track | 12895, 13305, 15979 |
| src/app/personal.css | .bar-today .dash-bar-fill | 12900, 13310, 15984 |
| src/app/personal.css | .dash-bar-label | 12905, 13321, 16003, 18511 |
| src/app/personal.css | .bar-today .dash-bar-label | 12912, 18529 |
| src/app/personal.css | .dash-donut-wrap | 12918, 13355, 16015 |
| src/app/personal.css | .dash-donut-svg-wrap | 12925, 13363, 16022 |
| src/app/personal.css | .dash-donut-svg | 12932, 13370, 16029 |
| src/app/personal.css | .dash-donut-center | 12938, 13383, 16042 |
| src/app/personal.css | .dash-donut-center strong | 12948, 13393, 16052 |
| src/app/personal.css | .dash-donut-center span | 12955, 13400, 16059 |
| src/app/personal.css | .dash-donut-legend | 12963, 13408, 16065 |
| src/app/personal.css | .donut-legend-row | 12971, 16072 |
| src/app/personal.css | .donut-dot | 12978, 13441, 16092 |
| src/app/personal.css | .donut-legend-label | 12986, 13448, 16099 |
| src/app/personal.css | .donut-legend-val | 12992, 13456, 16106 |
| src/app/personal.css | .dash-proj-bar-row | 13005, 16113 |
| src/app/personal.css | .dash-proj-bar-row:hover | 13018, 16123 |
| src/app/personal.css | .dash-proj-bar-meta | 13023, 16127 |
| src/app/personal.css | .dash-proj-bar-label | 13030, 16133 |
| src/app/personal.css | .dash-proj-bar-pct | 13040, 16139 |
| src/app/personal.css | .dash-proj-bar-track | 13047, 16145 |
| src/app/personal.css | .dash-proj-bar-fill | 13055, 16153 |
| src/app/personal.css | .dashboard-controls | 13094, 15386 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 13101, 13244 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 13102, 13259 |
| src/app/personal.css | .dash-analytics-row | 13104, 21320 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 13112, 21328 |
| src/app/personal.css | .week-barchart-modern | 13130, 18356 |
| src/app/personal.css | .week-barchart-header | 13136, 18361 |
| src/app/personal.css | .week-barchart-metric | 13146, 18370 |
| src/app/personal.css | .week-metric-main | 13155, 18376 |
| src/app/personal.css | .week-metric-num | 13161, 18381 |
| src/app/personal.css | .week-metric-text-group | 13169, 18388 |
| src/app/personal.css | .week-metric-title | 13175, 18393 |
| src/app/personal.css | .week-metric-sub | 13181, 18399 |
| src/app/personal.css | .week-metric-pills | 13186, 18403 |
| src/app/personal.css | .week-metric-pill | 13193, 18409 |
| src/app/personal.css | .week-metric-pill.peak-pill | 13203, 18418 |
| src/app/personal.css | .week-filter-reset-chip | 13209, 18423 |
| src/app/personal.css | .week-filter-reset-chip:hover | 13224, 18437 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 13229, 18440 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 13264, 18471 |
| src/app/personal.css | .dash-bar-count.has-value | 13278, 18484 |
| src/app/personal.css | .dash-bar-labels-wrap | 13314, 18505 |
| src/app/personal.css | .dash-bar-daynum | 13328, 18516 |
| src/app/personal.css | .today-badge-dot | 13334, 18521 |
| src/app/personal.css | .week-barchart-footer | 13341, 18533 |
| src/app/personal.css | .dash-chart-caption | 13347, 21020 |
| src/app/personal.css | .donut-segment | 13375, 16034 |
| src/app/personal.css | .donut-segment:hover | 13379, 16038 |
| src/app/personal.css | .relation-pill | 13494, 18603 |
| src/app/personal.css | .kpi-icon-wrap | 14049, 17222 |
| src/app/personal.css | .kpi-info | 14052, 17249 |
| src/app/personal.css | .manager-action-dialog | 14245, 15693 |
| src/app/personal.css | .action-modal-close | 14322, 15769, 20929, 22341, 24060 |
| src/app/personal.css | .action-modal-close:hover | 14338, 15786, 20941, 22378, 24100 |
| src/app/personal.css | :root[data-theme-color='lime'] | 15081, 20278 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 15084, 20286 |
| src/app/personal.css | .workspace-page | 15092, 16165 |
| src/app/personal.css | .sidebar-group-toggle | 15096, 16773 |
| src/app/personal.css | .follow-up-panel | 15116, 16173, 16207, 16852 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 15117, 16223 |
| src/app/personal.css | .follow-up-list | 15121, 16279, 16356 |
| src/app/personal.css | .follow-up-row | 15122, 16286, 16362 |
| src/app/personal.css | .follow-up-marker | 15126, 16306 |
| src/app/personal.css | .appearance-settings | 15147, 15240, 16570 |
| src/app/personal.css | .weekly-review | 15194, 16173 |
| src/app/personal.css | .settings-container | 15208, 16518, 16896 |
| src/app/personal.css | .settings-tabs-row | 15209, 16535, 16899 |
| src/app/personal.css | .settings-content-grid | 15213, 16528 |
| src/app/personal.css | .theme-live-preview-card | 15221, 15239, 16570 |
| src/app/personal.css | .settings-fields-grid | 15236, 16554 |
| src/app/personal.css | .security-settings-card | 15249, 16570 |
| src/app/personal.css | .backup-settings-card | 15251, 16570 |
| src/app/personal.css | .backup-action-boxes | 15252, 16562 |
| src/app/personal.css | .home-date-chip | 15635, 21493 |
| src/app/personal.css | .dash-stat-card:hover | 15809, 22428 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent:hover | 15821, 22441 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-label | 15825, 22447 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-sub | 15825, 22464 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-value | 15830, 22456 |
| src/app/personal.css | .dash-bar-col:hover | 15944, 18467 |
| src/app/personal.css | .home-journal | 16173, 21126 |
| src/app/personal.css | .follow-up-wrapper | 16200, 16849 |
| src/app/personal.css | .project-code-tag | 17365, 23388 |
| src/app/personal.css | .follow-up-compact-bar | 18164, 21498, 23926 |
| src/app/personal.css | .journal-join-chip | 18615, 21362 |
| src/app/personal.css | .journal-join-chip:hover | 18627, 21376 |
| src/app/personal.css | .calendar-agenda-day-head | 18656, 19822 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 19156, 19281 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 19254, 19281 |
| src/app/personal.css | .drawer-status-select-wrap | 19488, 22173 |
| src/app/personal.css | .drawer-priority-select-wrap | 19488, 19624, 22173 |
| src/app/personal.css | .drawer-status-select | 19496, 19595 |
| src/app/personal.css | .drawer-priority-select | 19496, 19640 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 19518, 22185, 24128 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 19518, 22185, 24128 |
| src/app/personal.css | .drawer-status-select-wrap.status-rencana .custom-select-trigger | 19534, 22202 |
| src/app/personal.css | .drawer-status-select-wrap.status-proses .custom-select-trigger | 19540, 22207 |
| src/app/personal.css | .drawer-status-select-wrap.status-selesai .custom-select-trigger | 19546, 22212 |
| src/app/personal.css | .drawer-status-select-wrap.status-dibatalkan .custom-select-trigger | 19552, 22217 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 19558, 22223 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-normal .custom-select-trigger | 19564, 22228 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-tinggi .custom-select-trigger | 19570, 22233 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-mendesak .custom-select-trigger | 19576, 22238 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-chevron | 19582, 22244 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-chevron | 19582, 22244 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-menu | 19589, 22252 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-menu | 19589, 22252 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 20678, 20686 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 20870, 20875 |
| src/app/personal.css | .activity-summary-section | 20882, 24007 |
| src/app/personal.css | .timeline-feed | 20888, 24011 |
| src/app/personal.css | .timeline-event | 20894, 24017 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 21120, 22837 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-badge | 21505, 21510 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-snippet | 21505, 21519 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-actions | 21505, 21514 |
| src/app/personal.css | .project-section-nav | 21567, 23652, 24049 |
| src/app/personal.css | .project-next-actions > summary | 21713, 21730 |
| src/app/personal.css | .project-next-actions | 21729, 23703 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .follow-up-compact-bar | 21747, 22879 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-info | 21748, 22895 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-text-group | 21749, 22902 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-main-line | 21750, 22906 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-badge | 21751, 22912 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-snippet | 21752, 22923 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 21753, 22926 |
| src/app/personal.css | .custom-select-trigger | 21757, 21793, 24122 |
| src/app/personal.css | .custom-select-option | 21757, 21840 |
| src/app/personal.css | select:not(.custom-select-native) | 21765, 24122 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 21897, 24128 |
| src/app/personal.css | .drawer-properties-grid | 22016, 23951 |
| src/app/personal.css | .prop-user-chip | 22068, 24174 |
| src/app/personal.css | .prop-text-badge | 22122, 24174 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 22136, 24174 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 22341, 24060 |
| src/app/personal.css | .close-drawer-btn | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 22341, 24060 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 22378, 24100 |
| src/app/personal.css | .close-drawer-btn:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 22378, 24100 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 22378, 24100 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-label | 22661, 22673 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-value | 22663, 22674 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-sub | 22665, 22675 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-icon-wrap | 22667, 22676 |
| src/app/personal.css | .project-properties-grid | 23495, 24041 |
| src/app/personal.css | .project-progress-card | 23582, 24045 |
| src/app/tokens.css | :root | 2, 49 |
| src/app/ui.css | .ui-stat-card | 76, 111 |
| src/app/ui.css | .ui-focus-task | 87, 111 |
| src/app/ui.css | .ui-modal > header | 94, 95 |
| src/app/ui.css | .ui-modal > footer | 94, 96 |

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
- `var(--fs-title)`
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
- `var(--h-md)`
- `var(--icon-md)`
- `var(--space-8)`
- `var(--table-th-height)`
