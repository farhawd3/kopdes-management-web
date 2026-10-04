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
| inline | 84 |
| hexTsx | 24 |
| hexCss | 765 |
| important | 1972 |
| bytes | 515761 |
| Elemen mentah di luar components/ui | 0 |
| Selector berulang | 384 |
| Nilai border-radius unik | 9 |
| Nilai font-size unik | 6 |
| Nilai height unik | 57 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 17334 | 2 |
| src/app/personal.css | 477247 | 1965 |
| src/app/tokens.css | 3080 | 3 |
| src/app/ui.css | 18100 | 2 |

## Inventaris halaman dan overlay

- src/app/(app)/[slug]/page.tsx
- src/app/dev/komponen/page.tsx
- src/app/dev/popup/page.tsx
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
| src/app/globals.css | .calendar-week | 600, 605 |
| src/app/globals.css | .calendar-days | 600, 610 |
| src/app/personal.css | button:not(.ui-btn) | 8, 16, 4658 |
| src/app/personal.css | .button | 8, 16, 1996, 4658, 19842 |
| src/app/personal.css | .primary | 8, 16, 23, 1984, 4658, 4710, 19842 |
| src/app/personal.css | input:not(.ui-input) | 8, 4658, 17847 |
| src/app/personal.css | select | 8, 4658, 4665, 17847 |
| src/app/personal.css | textarea:not(.ui-input) | 8, 17847 |
| src/app/personal.css | .card | 26, 929, 1264, 2009, 4211, 4648, 12790 |
| src/app/personal.css | .page-heading | 41, 916 |
| src/app/personal.css | .page-heading h1 | 46, 925, 1260 |
| src/app/personal.css | .project-card | 58, 929, 943, 1264, 3066, 4648, 12790, 13883 |
| src/app/personal.css | .project-cover | 77, 953, 3079, 19067, 19748 |
| src/app/personal.css | .module-intro | 105, 13441 |
| src/app/personal.css | .task-database | 118, 929, 1264 |
| src/app/personal.css | .database-views | 125, 976, 1935, 4715, 5108 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 128, 982, 1970, 4751 |
| src/app/personal.css | .filters | 131, 966, 1291, 9765, 12245 |
| src/app/personal.css | .filters label | 135, 973, 9773 |
| src/app/personal.css | .task-table th | 138, 8815 |
| src/app/personal.css | .task-table-wrap | 145, 4648, 8793, 9109 |
| src/app/personal.css | .task-table td | 148, 8828 |
| src/app/personal.css | .record .section-head h3 | 156, 987 |
| src/app/personal.css | .record-options | 165, 12263 |
| src/app/personal.css | .record-options > .actions | 168, 12284 |
| src/app/personal.css | .tabs | 189, 4715 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 196, 4727 |
| src/app/personal.css | .editor | 206, 1480 |
| src/app/personal.css | .editor .section-head | 212, 1496, 12174 |
| src/app/personal.css | .timeline-panel | 292, 4648, 12790 |
| src/app/personal.css | .project-status-tabs | 685, 957, 3035, 4715 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 691, 3045, 4727, 19878 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 695, 961, 3060, 4751 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 725, 731 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 725, 737 |
| src/app/personal.css | .task-calendar | 768, 929, 12790, 13039 |
| src/app/personal.css | .calendar-toolbar | 773, 13049 |
| src/app/personal.css | .calendar-day-number | 830, 3960, 3978, 4770, 15154 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 840, 4773 |
| src/app/personal.css | .page-heading .eyebrow | 921, 1257 |
| src/app/personal.css | .workspace-intro | 936, 1264, 1273 |
| src/app/personal.css | .project-card:hover | 948, 1286, 3074, 12809, 13898 |
| src/app/personal.css | .record-options summary | 990, 12270 |
| src/app/personal.css | .recording-tabs | 1001, 1297, 2792, 4715, 13446 |
| src/app/personal.css | .recording-tabs a | 1010, 1304, 2808, 4727 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1018, 2829, 4751 |
| src/app/personal.css | .activation-notice | 1023, 2836 |
| src/app/personal.css | .activation-notice h2 | 1034, 2848 |
| src/app/personal.css | .recording-metrics | 1037, 1307, 2999 |
| src/app/personal.css | .recording-metrics > div | 1042, 1313, 3006 |
| src/app/personal.css | .recording-metrics strong | 1048, 1322, 3025 |
| src/app/personal.css | .ledger-wrap | 1059, 1264, 8793, 13461 |
| src/app/personal.css | .ledger-table | 1065, 8805 |
| src/app/personal.css | .ledger-table th | 1071, 8815 |
| src/app/personal.css | .ledger-table td | 1078, 8828 |
| src/app/personal.css | .table-title | 1091, 9016 |
| src/app/personal.css | .date-picker-head | 1118, 6487 |
| src/app/personal.css | .date-picker-head strong | 1121, 6495 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1124, 6501, 18499 |
| src/app/personal.css | .date-picker-week | 1129, 1136, 6520 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1139, 6527, 18500 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1146, 6545 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1150, 6550 |
| src/app/personal.css | .date-picker-footer | 1153, 6562 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1157, 6572, 18499 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1199, 1533 |
| src/app/personal.css | :root | 1235, 1550, 3311 |
| src/app/personal.css | .dark | 1246, 1670, 3397 |
| src/app/personal.css | .notebook-toolbar | 1325, 2861, 13449 |
| src/app/personal.css | .notebook-toolbar p | 1328, 2877 |
| src/app/personal.css | .notebook-search | 1331, 2883, 19866 |
| src/app/personal.css | .notebook-search input:not(.ui-input) | 1336, 2894 |
| src/app/personal.css | .notebook-layout | 1339, 13452 |
| src/app/personal.css | .notebook-row | 1345, 2913 |
| src/app/personal.css | .notebook-row:hover | 1353, 2923 |
| src/app/personal.css | .notebook-spine | 1378, 2928 |
| src/app/personal.css | .spine-0 | 1385, 2940 |
| src/app/personal.css | .spine-1 | 1390, 2945 |
| src/app/personal.css | .spine-2 | 1395, 2950 |
| src/app/personal.css | .spine-3 | 1400, 2955 |
| src/app/personal.css | .notebook-count | 1405, 2960, 19892 |
| src/app/personal.css | .recent-notes | 1430, 2969, 4648, 13458 |
| src/app/personal.css | .recent-note | 1437, 2980 |
| src/app/personal.css | .skeleton-circle-icon | 1723, 1818 |
| src/app/personal.css | .skeleton-circle-dot | 1723, 1911 |
| src/app/personal.css | .skeleton-progress-bar | 1723, 1794, 1867 |
| src/app/personal.css | .skeleton-work-col | 1786, 1794 |
| src/app/personal.css | .skeleton-banner-card | 1794, 1807 |
| src/app/personal.css | .skeleton-filters-row | 1794, 1832 |
| src/app/personal.css | .skeleton-task-cards-list | 1794, 1838 |
| src/app/personal.css | .skeleton-task-card | 1794, 1844 |
| src/app/personal.css | .skeleton-card-top | 1794, 1855 |
| src/app/personal.css | .skeleton-card-meta | 1794, 1861 |
| src/app/personal.css | .database-views button:not(.ui-btn) | 1948, 4727 |
| src/app/personal.css | .database-views button:not(.ui-btn):hover | 1966, 4744 |
| src/app/personal.css | .scrum-task-card | 1979, 4211, 6891 |
| src/app/personal.css | button:not(.ui-btn).button | 1996, 19842 |
| src/app/personal.css | .task-detail-panel | 2068, 19647 |
| src/app/personal.css | .drawer-top-bar | 2104, 19651 |
| src/app/personal.css | .btn-mark-complete | 2120, 19842 |
| src/app/personal.css | .btn-icon | 2147, 18430, 19771 |
| src/app/personal.css | .btn-icon:hover | 2161, 18466, 19809 |
| src/app/personal.css | .btn-drawer-action | 2178, 19842 |
| src/app/personal.css | .task-submission-card | 2211, 19681 |
| src/app/personal.css | .submission-status-pill | 2258, 19878 |
| src/app/personal.css | .btn-add-submission-quick | 2305, 19842 |
| src/app/personal.css | .submission-open-badge | 2356, 19878 |
| src/app/personal.css | .submission-quick-actions | 2372, 19687 |
| src/app/personal.css | .btn-tiny-delete | 2376, 2405 |
| src/app/personal.css | .project-badge | 2453, 19878 |
| src/app/personal.css | .priority-badge | 2463, 9451, 19878 |
| src/app/personal.css | .task-detail-title | 2484, 18056 |
| src/app/personal.css | .inline-edit-icon | 2492, 18083 |
| src/app/personal.css | .btn-tiny-save | 2545, 19857 |
| src/app/personal.css | .btn-tiny-cancel | 2574, 19857 |
| src/app/personal.css | .drawer-description-box | 2597, 19675 |
| src/app/personal.css | .meta-label | 2628, 11046 |
| src/app/personal.css | .subtasks-section | 2646, 19694 |
| src/app/personal.css | .subtasks-header | 2652, 19698 |
| src/app/personal.css | .subtasks-progress-badge | 2665, 19892 |
| src/app/personal.css | .subtasks-progress-bar | 2675, 19702 |
| src/app/personal.css | .subtasks-tree-list | 2692, 19706 |
| src/app/personal.css | .subtask-tree-row | 2696, 19713 |
| src/app/personal.css | .add-subtask-form | 2757, 19718, 19866 |
| src/app/personal.css | .btn-add-subtask | 2775, 19857 |
| src/app/personal.css | .recording-tabs a:hover | 2824, 4744 |
| src/app/personal.css | .notebook-index | 2902, 4648 |
| src/app/personal.css | dialog.editor | 3089, 12136, 12472 |
| src/app/personal.css | .editor-modal-head | 3109, 12174 |
| src/app/personal.css | .editor-badge-eyebrow | 3120, 19892 |
| src/app/personal.css | .editor-close-btn | 3143, 10138, 12211, 12542, 18430, 19771 |
| src/app/personal.css | .editor-close-btn:hover | 3156, 12236, 12559, 18466, 19809 |
| src/app/personal.css | .field-input | 3205, 6237, 12501 |
| src/app/personal.css | .field-textarea | 3205, 3227, 12501 |
| src/app/personal.css | .field-input:focus | 3219, 12522 |
| src/app/personal.css | .field-textarea:focus | 3219, 12522 |
| src/app/personal.css | .btn-editor-cancel | 3276, 19842 |
| src/app/personal.css | .btn-editor-submit | 3293, 19842 |
| src/app/personal.css | .manager-topbar | 3491, 11982, 16494 |
| src/app/personal.css | .manager-location-wrap | 3556, 12438 |
| src/app/personal.css | .manager-location | 3581, 17133 |
| src/app/personal.css | .topbar-fav-btn | 3590, 3647, 12445 |
| src/app/personal.css | .topbar-fav-btn:hover | 3601, 3658, 12462 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 3615, 10144 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 3615, 10144 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 3636, 12063 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 3642, 12064 |
| src/app/personal.css | .manager-sidebar | 3664, 5094, 11988, 16499 |
| src/app/personal.css | .close-navigation | 3718, 4234 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 3761, 11989, 13332, 16515 |
| src/app/personal.css | .sidebar-nav-item | 3804, 11995, 16518 |
| src/app/personal.css | .sidebar-nav-item:hover | 3818, 16523 |
| src/app/personal.css | .sidebar-item-icon | 3821, 16532 |
| src/app/personal.css | .sidebar-nav-item.is-active | 3840, 11996, 16526 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 3840, 11996, 16526 |
| src/app/personal.css | .project-dot | 3872, 6988 |
| src/app/personal.css | .sidebar-avatar | 3901, 10149 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 3934, 13096, 15149 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 3942, 13111 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 3948, 13118 |
| src/app/personal.css | .calendar-add | 3960, 4003 |
| src/app/personal.css | .calendar-agenda-title-group | 4035, 15929 |
| src/app/personal.css | .calendar-agenda-task-count | 4038, 15956, 19878 |
| src/app/personal.css | .calendar-agenda-actions | 4044, 15966 |
| src/app/personal.css | .calendar-agenda-clear-btn | 4047, 15995, 19842 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 4052, 16010 |
| src/app/personal.css | .calendar-event | 4089, 4777, 15158 |
| src/app/personal.css | .color-style-card | 4149, 12107, 13186 |
| src/app/personal.css | .color-swatch-item | 4155, 12032, 12084 |
| src/app/personal.css | .home-panel | 4211, 4563, 12790 |
| src/app/personal.css | .next-meeting | 4211, 4268, 19637 |
| src/app/personal.css | .sprint-summary-card | 4211, 7249 |
| src/app/personal.css | .daily-group-card | 4211, 7867, 13428 |
| src/app/personal.css | .sprint-summary-card:hover | 4221, 7263 |
| src/app/personal.css | .scrum-task-card:hover | 4221, 6906 |
| src/app/personal.css | .manager-main | 4227, 11981 |
| src/app/personal.css | .manager-main .page-heading h1 | 4238, 11984 |
| src/app/personal.css | .home-heading h1 | 4238, 4257, 12398, 17614 |
| src/app/personal.css | .home-heading | 4244, 12377, 17611, 19633 |
| src/app/personal.css | .home-overview | 4263, 10568 |
| src/app/personal.css | .meeting-mode-pill | 4336, 8675 |
| src/app/personal.css | .round-arrow | 4369, 10153, 19872 |
| src/app/personal.css | .focus-filters | 4395, 5065, 19641 |
| src/app/personal.css | .focus-open | 4494, 10157 |
| src/app/personal.css | .home-text-link | 4555, 5089 |
| src/app/personal.css | .home-records | 4585, 12790 |
| src/app/personal.css | .home-records .section-head > a | 4593, 5089 |
| src/app/personal.css | select option | 4697, 17852 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 4791, 18530 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 4803, 18595 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 4803, 18605 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 4809, 17220, 18581 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 4812, 18615 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 4812, 18615 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 4825, 5072 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 4831, 5075 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 4867, 4890 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 4870, 18993 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 4877, 18810 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 4883, 18822 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 4910, 4924 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 4910, 5300 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 4915, 5303 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 5013, 5084, 5272 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 5017, 5275 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 5020, 5293 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 5023, 5296 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 5026, 5287 |
| src/app/personal.css | .home-panel .section-head | 5062, 10334 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 5212, 16735 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 5241, 16739 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 5330, 16867 |
| src/app/personal.css | .manager-main .notebook-row | 5436, 10569 |
| src/app/personal.css | .manager-main .notebook-link | 5455, 10570 |
| src/app/personal.css | .manager-main .notebook-add-btn | 5572, 10571 |
| src/app/personal.css | .stakeholder-badge | 5789, 10131 |
| src/app/personal.css | .close-btn | 6184, 10138, 18430, 19771 |
| src/app/personal.css | .close-btn:hover | 6212, 18466, 19809 |
| src/app/personal.css | .btn-cancel | 6282, 11881 |
| src/app/personal.css | .dropzone-success | 6391, 19878 |
| src/app/personal.css | .dropzone-error | 6411, 19878 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 6557, 18501 |
| src/app/personal.css | .card-task-code | 6947, 17137 |
| src/app/personal.css | .card-priority-pill | 6996, 19892 |
| src/app/personal.css | .card-date-pill | 7027, 19892 |
| src/app/personal.css | .scrum-assignee-pill | 7106, 9618 |
| src/app/personal.css | .sprint-action-btn | 7321, 18430, 19771 |
| src/app/personal.css | .sprint-action-btn:hover | 7336, 18466, 19809 |
| src/app/personal.css | .daily-tasks-container | 7413, 13425 |
| src/app/personal.css | .daily-nav-arrow-btn | 7456, 19872 |
| src/app/personal.css | .btn-quick-add-day | 7980, 19857 |
| src/app/personal.css | .task-code-tag | 8111, 9409 |
| src/app/personal.css | .task-title-text | 8118, 8552 |
| src/app/personal.css | .task-project-pill | 8129, 8568, 13488 |
| src/app/personal.css | .today-view-wrapper | 8212, 13413 |
| src/app/personal.css | .today-header-card | 8219, 13416 |
| src/app/personal.css | .today-quick-add-card | 8311, 13419, 17194 |
| src/app/personal.css | .today-grid-layout | 8382, 13422 |
| src/app/personal.css | .today-task-card | 8480, 14809 |
| src/app/personal.css | .today-check-circle | 8513, 17200 |
| src/app/personal.css | .today-check-circle.checked | 8529, 17211 |
| src/app/personal.css | .btn-reschedule-today | 8609, 19857 |
| src/app/personal.css | .task-table | 8805, 9121 |
| src/app/personal.css | .task-table tbody tr:last-child td | 8837, 9182 |
| src/app/personal.css | .task-table tbody tr:hover td | 8842, 9186 |
| src/app/personal.css | .table-btn-done | 9082, 9670 |
| src/app/personal.css | .task-assignee-empty | 9612, 9659 |
| src/app/personal.css | .filters input:not(.ui-input) | 9790, 9807 |
| src/app/personal.css | .filters select | 9790, 9811 |
| src/app/personal.css | .custom-select-option-content | 9896, 17959 |
| src/app/personal.css | .meeting-detail-row | 9918, 10003 |
| src/app/personal.css | .meeting-section-box | 9931, 10010 |
| src/app/personal.css | .meeting-section-box > svg | 10016, 10023 |
| src/app/personal.css | .meeting-section-header | 10042, 12317 |
| src/app/personal.css | .dash-sparkline | 10173, 10563 |
| src/app/personal.css | .dash-bar-chart | 10181, 10430, 12603, 14964 |
| src/app/personal.css | .dash-bar-col | 10186, 12609, 14972 |
| src/app/personal.css | .dash-bar-count | 10192, 10464, 12621, 14994 |
| src/app/personal.css | .dash-bar-track | 10198, 10475, 12627, 15007 |
| src/app/personal.css | .dash-bar-fill | 10204, 10481, 12637, 15018 |
| src/app/personal.css | .bar-today .dash-bar-track | 10211, 12644 |
| src/app/personal.css | .bar-today .dash-bar-fill | 10215, 10486, 12649 |
| src/app/personal.css | .dash-bar-label | 10220, 10490, 12668, 15030 |
| src/app/personal.css | .bar-today .dash-bar-label | 10224, 15048 |
| src/app/personal.css | .dash-donut-wrap | 10229, 10512, 12679 |
| src/app/personal.css | .dash-donut-svg-wrap | 10234, 10518, 12686 |
| src/app/personal.css | .dash-donut-svg | 10239, 12693 |
| src/app/personal.css | .dash-donut-center | 10243, 12706 |
| src/app/personal.css | .dash-donut-center strong | 10247, 10527, 12716 |
| src/app/personal.css | .dash-donut-center span | 10253, 10532, 12723 |
| src/app/personal.css | .dash-proj-bar-row | 10266, 12730 |
| src/app/personal.css | .dash-proj-bar-row:hover | 10275, 12740 |
| src/app/personal.css | .dash-proj-bar-meta | 10280, 12744 |
| src/app/personal.css | .dash-proj-bar-label | 10284, 12750 |
| src/app/personal.css | .dash-proj-bar-pct | 10291, 12756 |
| src/app/personal.css | .dash-proj-bar-track | 10296, 12762 |
| src/app/personal.css | .dash-proj-bar-fill | 10301, 12770 |
| src/app/personal.css | .dashboard-controls | 10336, 12245 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 10343, 10438 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 10344, 10453 |
| src/app/personal.css | .dash-analytics-row | 10346, 17460 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 10351, 17468 |
| src/app/personal.css | .week-barchart-modern | 10368, 14875 |
| src/app/personal.css | .week-barchart-header | 10372, 14880 |
| src/app/personal.css | .week-barchart-metric | 10377, 14889 |
| src/app/personal.css | .week-metric-main | 10383, 14895 |
| src/app/personal.css | .week-metric-num | 10387, 14900 |
| src/app/personal.css | .week-metric-title | 10394, 14912 |
| src/app/personal.css | .week-metric-pill | 10398, 14928 |
| src/app/personal.css | .week-metric-pill.peak-pill | 10406, 14937 |
| src/app/personal.css | .week-filter-reset-chip | 10411, 14942 |
| src/app/personal.css | .week-filter-reset-chip:hover | 10420, 14956 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 10425, 14959 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 10458, 14990 |
| src/app/personal.css | .dash-bar-count.has-value | 10470, 15003 |
| src/app/personal.css | .dash-bar-daynum | 10494, 15035 |
| src/app/personal.css | .week-barchart-footer | 10499, 15052 |
| src/app/personal.css | .dash-chart-caption | 10505, 17165 |
| src/app/personal.css | .donut-segment | 10523, 12698 |
| src/app/personal.css | .relation-pill | 10587, 15122 |
| src/app/personal.css | .manager-action-dialog | 11271, 12472 |
| src/app/personal.css | .action-modal-close | 11348, 12542, 17116, 18430, 19771 |
| src/app/personal.css | .action-modal-close:hover | 11364, 12559, 17128, 18466, 19809 |
| src/app/personal.css | :root[data-theme-color='lime'] | 11977, 16481 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 11980, 16489 |
| src/app/personal.css | .manager-main .page-heading | 11983, 19629 |
| src/app/personal.css | .sidebar-group-toggle | 11991, 13357 |
| src/app/personal.css | .follow-up-panel | 12000, 12790, 12823, 13436 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 12001, 12839 |
| src/app/personal.css | .follow-up-list | 12005, 12895, 12972 |
| src/app/personal.css | .follow-up-row | 12006, 12902, 12978 |
| src/app/personal.css | .follow-up-marker | 12010, 12922 |
| src/app/personal.css | .appearance-settings | 12029, 12109, 13186 |
| src/app/personal.css | .weekly-review | 12066, 12790 |
| src/app/personal.css | .settings-container | 12079, 13134, 13466 |
| src/app/personal.css | .settings-tabs-row | 12080, 13151, 13469 |
| src/app/personal.css | .theme-live-preview-card | 12090, 12108, 13186 |
| src/app/personal.css | .settings-fields-grid | 12105, 13170 |
| src/app/personal.css | .security-settings-card | 12118, 13186 |
| src/app/personal.css | .backup-settings-card | 12120, 13186 |
| src/app/personal.css | .backup-action-boxes | 12121, 13178 |
| src/app/personal.css | .home-date-chip | 12414, 17617 |
| src/app/personal.css | .dash-bar-col:hover | 12616, 14986 |
| src/app/personal.css | .home-journal | 12790, 17266 |
| src/app/personal.css | .follow-up-wrapper | 12816, 13433 |
| src/app/personal.css | .project-code-tag | 13917, 19120 |
| src/app/personal.css | .journal-join-chip | 15134, 17502 |
| src/app/personal.css | .journal-join-chip:hover | 15140, 17516 |
| src/app/personal.css | .calendar-agenda-day-head | 15169, 16025 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 15502, 15627 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 15600, 15627 |
| src/app/personal.css | .drawer-status-select-wrap | 15831, 18263 |
| src/app/personal.css | .drawer-priority-select-wrap | 15831, 15856, 18263 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 15840, 18274, 19835 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 15840, 18274, 19835 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 15849, 18312 |
| src/app/personal.css | .calendar-agenda-add-btn | 15973, 19842 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 16850, 18632 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 16867, 16875 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 17059, 17064 |
| src/app/personal.css | .activity-summary-section | 17071, 19723 |
| src/app/personal.css | .timeline-feed | 17077, 19727 |
| src/app/personal.css | .timeline-event | 17082, 19733 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 17260, 18672 |
| src/app/personal.css | .project-section-nav | 17663, 19384, 19760 |
| src/app/personal.css | .project-next-actions > summary | 17809, 17826 |
| src/app/personal.css | .project-next-actions | 17825, 19435 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 17843, 18745 |
| src/app/personal.css | .custom-select-trigger | 17847, 17883, 19829 |
| src/app/personal.css | .custom-select-option | 17847, 17930 |
| src/app/personal.css | select:not(.custom-select-native) | 17855, 19829 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 17987, 19835 |
| src/app/personal.css | .drawer-properties-grid | 18106, 19667 |
| src/app/personal.css | .prop-user-chip | 18158, 19878 |
| src/app/personal.css | .prop-text-badge | 18212, 19878 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 18226, 19878 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 18430, 19771 |
| src/app/personal.css | .close-drawer-btn | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 18430, 19771 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 18466, 19809 |
| src/app/personal.css | .close-drawer-btn:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 18466, 19809 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 18466, 19809 |
| src/app/personal.css | .project-properties-grid | 19227, 19752 |
| src/app/personal.css | .project-progress-card | 19314, 19756 |
| src/app/tokens.css | :root | 2, 50 |
| src/app/ui.css | .ui-stat-card | 90, 126 |
| src/app/ui.css | .ui-focus-task | 101, 126 |
| src/app/ui.css | .ui-modal > header | 108, 109 |
| src/app/ui.css | .ui-modal > footer | 108, 110 |

## Nilai deklarasi

### border-radius

- `0`
- `0 var(--r-md) var(--r-md) 0`
- `var(--r-full)`
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
- `100vh`
- `10px`
- `110px`
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
- `64px`
- `68px`
- `6px`
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
