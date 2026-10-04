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
| hexCss | 765 |
| important | 1979 |
| bytes | 517624 |
| Elemen mentah di luar components/ui | 0 |
| Selector berulang | 384 |
| Nilai border-radius unik | 9 |
| Nilai font-size unik | 6 |
| Nilai height unik | 57 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 17334 | 2 |
| src/app/personal.css | 482023 | 1974 |
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
| src/app/globals.css | .calendar-week | 600, 605 |
| src/app/globals.css | .calendar-days | 600, 610 |
| src/app/personal.css | button:not(.ui-btn) | 8, 16, 4671 |
| src/app/personal.css | .button | 8, 16, 1996, 4671, 20053 |
| src/app/personal.css | .primary | 8, 16, 23, 1984, 4671, 4723, 20053 |
| src/app/personal.css | input:not(.ui-input) | 8, 4671, 18049 |
| src/app/personal.css | select | 8, 4671, 4678, 18049 |
| src/app/personal.css | textarea:not(.ui-input) | 8, 18049 |
| src/app/personal.css | .card | 26, 929, 1264, 2009, 4211, 4661, 12868 |
| src/app/personal.css | .page-heading | 41, 916 |
| src/app/personal.css | .page-heading h1 | 46, 925, 1260 |
| src/app/personal.css | .project-card | 58, 929, 943, 1264, 3066, 4661, 12868, 13961 |
| src/app/personal.css | .project-cover | 77, 953, 3079, 19278, 19959 |
| src/app/personal.css | .module-intro | 105, 13519 |
| src/app/personal.css | .task-database | 118, 929, 1264 |
| src/app/personal.css | .database-views | 125, 976, 1935, 4728, 5122 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 128, 982, 1970, 4764 |
| src/app/personal.css | .filters | 131, 966, 1291, 9843, 12323 |
| src/app/personal.css | .filters label | 135, 973, 9851 |
| src/app/personal.css | .task-table th | 138, 8893 |
| src/app/personal.css | .task-table-wrap | 145, 4661, 8871, 9187 |
| src/app/personal.css | .task-table td | 148, 8906 |
| src/app/personal.css | .record .section-head h3 | 156, 987 |
| src/app/personal.css | .record-options | 165, 12341 |
| src/app/personal.css | .record-options > .actions | 168, 12362 |
| src/app/personal.css | .tabs | 189, 4728 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 196, 4740 |
| src/app/personal.css | .editor | 206, 1480 |
| src/app/personal.css | .editor .section-head | 212, 1496, 12252 |
| src/app/personal.css | .timeline-panel | 292, 4661, 12868 |
| src/app/personal.css | .project-status-tabs | 685, 957, 3035, 4728 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 691, 3045, 4740, 20089 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 695, 961, 3060, 4764 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 725, 731 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 725, 737 |
| src/app/personal.css | .task-calendar | 768, 929, 12868, 13117 |
| src/app/personal.css | .calendar-toolbar | 773, 13127 |
| src/app/personal.css | .calendar-day-number | 830, 3960, 3978, 4783, 15243 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 840, 4786 |
| src/app/personal.css | .page-heading .eyebrow | 921, 1257 |
| src/app/personal.css | .workspace-intro | 936, 1264, 1273 |
| src/app/personal.css | .project-card:hover | 948, 1286, 3074, 12887, 13976 |
| src/app/personal.css | .record-options summary | 990, 12348 |
| src/app/personal.css | .recording-tabs | 1001, 1297, 2792, 4728, 13524 |
| src/app/personal.css | .recording-tabs a | 1010, 1304, 2808, 4740 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1018, 2829, 4764 |
| src/app/personal.css | .activation-notice | 1023, 2836 |
| src/app/personal.css | .activation-notice h2 | 1034, 2848 |
| src/app/personal.css | .recording-metrics | 1037, 1307, 2999 |
| src/app/personal.css | .recording-metrics > div | 1042, 1313, 3006 |
| src/app/personal.css | .recording-metrics strong | 1048, 1322, 3025 |
| src/app/personal.css | .ledger-wrap | 1059, 1264, 8871, 13539 |
| src/app/personal.css | .ledger-table | 1065, 8883 |
| src/app/personal.css | .ledger-table th | 1071, 8893 |
| src/app/personal.css | .ledger-table td | 1078, 8906 |
| src/app/personal.css | .table-title | 1091, 9094 |
| src/app/personal.css | .date-picker-head | 1118, 6501 |
| src/app/personal.css | .date-picker-head strong | 1121, 6509 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1124, 6515, 18701 |
| src/app/personal.css | .date-picker-week | 1129, 1136, 6534 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1139, 6541, 18702 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1146, 6559 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1150, 6564 |
| src/app/personal.css | .date-picker-footer | 1153, 6576 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1157, 6586, 18701 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1199, 1533 |
| src/app/personal.css | :root | 1235, 1550, 3311 |
| src/app/personal.css | .dark | 1246, 1670, 3397 |
| src/app/personal.css | .notebook-toolbar | 1325, 2861, 13527 |
| src/app/personal.css | .notebook-toolbar p | 1328, 2877 |
| src/app/personal.css | .notebook-search | 1331, 2883, 20077 |
| src/app/personal.css | .notebook-search input:not(.ui-input) | 1336, 2894 |
| src/app/personal.css | .notebook-layout | 1339, 13530 |
| src/app/personal.css | .notebook-row | 1345, 2913 |
| src/app/personal.css | .notebook-row:hover | 1353, 2923 |
| src/app/personal.css | .notebook-spine | 1378, 2928 |
| src/app/personal.css | .spine-0 | 1385, 2940 |
| src/app/personal.css | .spine-1 | 1390, 2945 |
| src/app/personal.css | .spine-2 | 1395, 2950 |
| src/app/personal.css | .spine-3 | 1400, 2955 |
| src/app/personal.css | .notebook-count | 1405, 2960, 20103 |
| src/app/personal.css | .recent-notes | 1430, 2969, 4661, 13536 |
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
| src/app/personal.css | .database-views button:not(.ui-btn) | 1948, 4740 |
| src/app/personal.css | .database-views button:not(.ui-btn):hover | 1966, 4757 |
| src/app/personal.css | .scrum-task-card | 1979, 4211, 6905 |
| src/app/personal.css | button:not(.ui-btn).button | 1996, 20053 |
| src/app/personal.css | .task-detail-panel | 2068, 19858 |
| src/app/personal.css | .drawer-top-bar | 2104, 19862 |
| src/app/personal.css | .btn-mark-complete | 2120, 20053 |
| src/app/personal.css | .btn-icon | 2147, 18632, 19982 |
| src/app/personal.css | .btn-icon:hover | 2161, 18668, 20020 |
| src/app/personal.css | .btn-drawer-action | 2178, 20053 |
| src/app/personal.css | .task-submission-card | 2211, 19892 |
| src/app/personal.css | .submission-status-pill | 2258, 20089 |
| src/app/personal.css | .btn-add-submission-quick | 2305, 20053 |
| src/app/personal.css | .submission-open-badge | 2356, 20089 |
| src/app/personal.css | .submission-quick-actions | 2372, 19898 |
| src/app/personal.css | .btn-tiny-delete | 2376, 2405 |
| src/app/personal.css | .project-badge | 2453, 20089 |
| src/app/personal.css | .priority-badge | 2463, 9529, 20089 |
| src/app/personal.css | .task-detail-title | 2484, 18258 |
| src/app/personal.css | .inline-edit-icon | 2492, 18285 |
| src/app/personal.css | .btn-tiny-save | 2545, 20068 |
| src/app/personal.css | .btn-tiny-cancel | 2574, 20068 |
| src/app/personal.css | .drawer-description-box | 2597, 19886 |
| src/app/personal.css | .meta-label | 2628, 11124 |
| src/app/personal.css | .subtasks-section | 2646, 19905 |
| src/app/personal.css | .subtasks-header | 2652, 19909 |
| src/app/personal.css | .subtasks-progress-badge | 2665, 20103 |
| src/app/personal.css | .subtasks-progress-bar | 2675, 19913 |
| src/app/personal.css | .subtasks-tree-list | 2692, 19917 |
| src/app/personal.css | .subtask-tree-row | 2696, 19924 |
| src/app/personal.css | .add-subtask-form | 2757, 19929, 20077 |
| src/app/personal.css | .btn-add-subtask | 2775, 20068 |
| src/app/personal.css | .recording-tabs a:hover | 2824, 4757 |
| src/app/personal.css | .notebook-index | 2902, 4661 |
| src/app/personal.css | dialog.editor | 3089, 12214, 12550 |
| src/app/personal.css | .editor-modal-head | 3109, 12252 |
| src/app/personal.css | .editor-badge-eyebrow | 3120, 20103 |
| src/app/personal.css | .editor-close-btn | 3143, 10216, 12289, 12620, 18632, 19982 |
| src/app/personal.css | .editor-close-btn:hover | 3156, 12314, 12637, 18668, 20020 |
| src/app/personal.css | .field-input | 3205, 6251, 12579 |
| src/app/personal.css | .field-textarea | 3205, 3227, 12579 |
| src/app/personal.css | .field-input:focus | 3219, 12600 |
| src/app/personal.css | .field-textarea:focus | 3219, 12600 |
| src/app/personal.css | .btn-editor-cancel | 3276, 20053 |
| src/app/personal.css | .btn-editor-submit | 3293, 20053 |
| src/app/personal.css | .manager-topbar | 3491, 12060, 16694 |
| src/app/personal.css | .manager-location-wrap | 3556, 12516 |
| src/app/personal.css | .manager-location | 3581, 17333 |
| src/app/personal.css | .topbar-fav-btn | 3590, 3647, 12523 |
| src/app/personal.css | .topbar-fav-btn:hover | 3601, 3658, 12540 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 3615, 10222 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 3615, 10222 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 3636, 12141 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 3642, 12142 |
| src/app/personal.css | .manager-sidebar | 3664, 5108, 12066, 16699 |
| src/app/personal.css | .close-navigation | 3718, 4234 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 3761, 12067, 13410, 16715 |
| src/app/personal.css | .sidebar-nav-item | 3804, 12073, 16718 |
| src/app/personal.css | .sidebar-nav-item:hover | 3818, 16723 |
| src/app/personal.css | .sidebar-item-icon | 3821, 16732 |
| src/app/personal.css | .sidebar-nav-item.is-active | 3840, 12074, 16726 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 3840, 12074, 16726 |
| src/app/personal.css | .project-dot | 3872, 7002 |
| src/app/personal.css | .sidebar-avatar | 3901, 10227 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 3934, 13174, 15238 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 3942, 13189 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 3948, 13196 |
| src/app/personal.css | .calendar-add | 3960, 4003 |
| src/app/personal.css | .calendar-agenda-title-group | 4035, 16129 |
| src/app/personal.css | .calendar-agenda-task-count | 4038, 16156, 20089 |
| src/app/personal.css | .calendar-agenda-actions | 4044, 16166 |
| src/app/personal.css | .calendar-agenda-clear-btn | 4047, 16195, 20053 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 4052, 16210 |
| src/app/personal.css | .calendar-event | 4089, 4790, 15247 |
| src/app/personal.css | .color-style-card | 4149, 12185, 13264 |
| src/app/personal.css | .color-swatch-item | 4155, 12110, 12162 |
| src/app/personal.css | .home-panel | 4211, 4576, 12868 |
| src/app/personal.css | .next-meeting | 4211, 4268, 19848 |
| src/app/personal.css | .sprint-summary-card | 4211, 7263 |
| src/app/personal.css | .daily-group-card | 4211, 7881, 13506 |
| src/app/personal.css | .sprint-summary-card:hover | 4221, 7277 |
| src/app/personal.css | .scrum-task-card:hover | 4221, 6920 |
| src/app/personal.css | .manager-main | 4227, 12059 |
| src/app/personal.css | .manager-main .page-heading h1 | 4238, 12062 |
| src/app/personal.css | .home-heading h1 | 4238, 4257, 12476, 17816 |
| src/app/personal.css | .home-heading | 4244, 12455, 17813, 19844 |
| src/app/personal.css | .home-overview | 4263, 10646 |
| src/app/personal.css | .meeting-mode-pill | 4336, 8753 |
| src/app/personal.css | .round-arrow | 4369, 10231, 20083 |
| src/app/personal.css | .focus-filters | 4395, 5078, 19852 |
| src/app/personal.css | .focus-open | 4494, 10235 |
| src/app/personal.css | .home-text-link | 4568, 5102 |
| src/app/personal.css | .home-records | 4598, 12868 |
| src/app/personal.css | .home-records .section-head > a | 4606, 5102 |
| src/app/personal.css | select option | 4710, 18054 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 4804, 18732 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 4816, 18797 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 4816, 18807 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 4822, 17422, 18783 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 4825, 18817 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 4825, 18817 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 4838, 5085 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 4844, 5088 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 4880, 4903 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 4883, 19204 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 4890, 19012 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 4896, 19024 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 4923, 4937 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 4923, 5314 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 4928, 5317 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 5026, 5097, 5286 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 5030, 5289 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 5033, 5307 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 5036, 5310 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 5039, 5301 |
| src/app/personal.css | .home-panel .section-head | 5075, 10412 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 5226, 16935 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 5255, 16939 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 5344, 17067 |
| src/app/personal.css | .manager-main .notebook-row | 5450, 10647 |
| src/app/personal.css | .manager-main .notebook-link | 5469, 10648 |
| src/app/personal.css | .manager-main .notebook-add-btn | 5586, 10649 |
| src/app/personal.css | .stakeholder-badge | 5803, 10209 |
| src/app/personal.css | .close-btn | 6198, 10216, 18632, 19982 |
| src/app/personal.css | .close-btn:hover | 6226, 18668, 20020 |
| src/app/personal.css | .btn-cancel | 6296, 11959 |
| src/app/personal.css | .dropzone-success | 6405, 20089 |
| src/app/personal.css | .dropzone-error | 6425, 20089 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 6571, 18703 |
| src/app/personal.css | .card-task-code | 6961, 17337 |
| src/app/personal.css | .card-priority-pill | 7010, 20103 |
| src/app/personal.css | .card-date-pill | 7041, 20103 |
| src/app/personal.css | .scrum-assignee-pill | 7120, 9696 |
| src/app/personal.css | .sprint-action-btn | 7335, 18632, 19982 |
| src/app/personal.css | .sprint-action-btn:hover | 7350, 18668, 20020 |
| src/app/personal.css | .daily-tasks-container | 7427, 13503 |
| src/app/personal.css | .daily-nav-arrow-btn | 7470, 20083 |
| src/app/personal.css | .btn-quick-add-day | 7994, 20068 |
| src/app/personal.css | .task-code-tag | 8125, 9487 |
| src/app/personal.css | .task-title-text | 8132, 8570 |
| src/app/personal.css | .task-project-pill | 8143, 8586, 13566 |
| src/app/personal.css | .today-view-wrapper | 8226, 13491 |
| src/app/personal.css | .today-header-card | 8233, 13494 |
| src/app/personal.css | .today-quick-add-card | 8325, 13497, 17394 |
| src/app/personal.css | .today-grid-layout | 8396, 13500 |
| src/app/personal.css | .today-task-card | 8494, 14898 |
| src/app/personal.css | .today-check-circle | 8527, 17400 |
| src/app/personal.css | .today-check-circle.checked | 8547, 17413 |
| src/app/personal.css | .btn-reschedule-today | 8627, 20068 |
| src/app/personal.css | .task-table | 8883, 9199 |
| src/app/personal.css | .task-table tbody tr:last-child td | 8915, 9260 |
| src/app/personal.css | .task-table tbody tr:hover td | 8920, 9264 |
| src/app/personal.css | .table-btn-done | 9160, 9748 |
| src/app/personal.css | .task-assignee-empty | 9690, 9737 |
| src/app/personal.css | .filters input:not(.ui-input) | 9868, 9885 |
| src/app/personal.css | .filters select | 9868, 9889 |
| src/app/personal.css | .custom-select-option-content | 9974, 18161 |
| src/app/personal.css | .meeting-detail-row | 9996, 10081 |
| src/app/personal.css | .meeting-section-box | 10009, 10088 |
| src/app/personal.css | .meeting-section-box > svg | 10094, 10101 |
| src/app/personal.css | .meeting-section-header | 10120, 12395 |
| src/app/personal.css | .dash-sparkline | 10251, 10641 |
| src/app/personal.css | .dash-bar-chart | 10259, 10508, 12681, 15053 |
| src/app/personal.css | .dash-bar-col | 10264, 12687, 15061 |
| src/app/personal.css | .dash-bar-count | 10270, 10542, 12699, 15083 |
| src/app/personal.css | .dash-bar-track | 10276, 10553, 12705, 15096 |
| src/app/personal.css | .dash-bar-fill | 10282, 10559, 12715, 15107 |
| src/app/personal.css | .bar-today .dash-bar-track | 10289, 12722 |
| src/app/personal.css | .bar-today .dash-bar-fill | 10293, 10564, 12727 |
| src/app/personal.css | .dash-bar-label | 10298, 10568, 12746, 15119 |
| src/app/personal.css | .bar-today .dash-bar-label | 10302, 15137 |
| src/app/personal.css | .dash-donut-wrap | 10307, 10590, 12757 |
| src/app/personal.css | .dash-donut-svg-wrap | 10312, 10596, 12764 |
| src/app/personal.css | .dash-donut-svg | 10317, 12771 |
| src/app/personal.css | .dash-donut-center | 10321, 12784 |
| src/app/personal.css | .dash-donut-center strong | 10325, 10605, 12794 |
| src/app/personal.css | .dash-donut-center span | 10331, 10610, 12801 |
| src/app/personal.css | .dash-proj-bar-row | 10344, 12808 |
| src/app/personal.css | .dash-proj-bar-row:hover | 10353, 12818 |
| src/app/personal.css | .dash-proj-bar-meta | 10358, 12822 |
| src/app/personal.css | .dash-proj-bar-label | 10362, 12828 |
| src/app/personal.css | .dash-proj-bar-pct | 10369, 12834 |
| src/app/personal.css | .dash-proj-bar-track | 10374, 12840 |
| src/app/personal.css | .dash-proj-bar-fill | 10379, 12848 |
| src/app/personal.css | .dashboard-controls | 10414, 12323 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 10421, 10516 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 10422, 10531 |
| src/app/personal.css | .dash-analytics-row | 10424, 17662 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 10429, 17670 |
| src/app/personal.css | .week-barchart-modern | 10446, 14964 |
| src/app/personal.css | .week-barchart-header | 10450, 14969 |
| src/app/personal.css | .week-barchart-metric | 10455, 14978 |
| src/app/personal.css | .week-metric-main | 10461, 14984 |
| src/app/personal.css | .week-metric-num | 10465, 14989 |
| src/app/personal.css | .week-metric-title | 10472, 15001 |
| src/app/personal.css | .week-metric-pill | 10476, 15017 |
| src/app/personal.css | .week-metric-pill.peak-pill | 10484, 15026 |
| src/app/personal.css | .week-filter-reset-chip | 10489, 15031 |
| src/app/personal.css | .week-filter-reset-chip:hover | 10498, 15045 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 10503, 15048 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 10536, 15079 |
| src/app/personal.css | .dash-bar-count.has-value | 10548, 15092 |
| src/app/personal.css | .dash-bar-daynum | 10572, 15124 |
| src/app/personal.css | .week-barchart-footer | 10577, 15141 |
| src/app/personal.css | .dash-chart-caption | 10583, 17365 |
| src/app/personal.css | .donut-segment | 10601, 12776 |
| src/app/personal.css | .relation-pill | 10665, 15211 |
| src/app/personal.css | .manager-action-dialog | 11349, 12550 |
| src/app/personal.css | .action-modal-close | 11426, 12620, 17316, 18632, 19982 |
| src/app/personal.css | .action-modal-close:hover | 11442, 12637, 17328, 18668, 20020 |
| src/app/personal.css | :root[data-theme-color='lime'] | 12055, 16681 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 12058, 16689 |
| src/app/personal.css | .manager-main .page-heading | 12061, 19840 |
| src/app/personal.css | .sidebar-group-toggle | 12069, 13435 |
| src/app/personal.css | .follow-up-panel | 12078, 12868, 12901, 13514 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 12079, 12917 |
| src/app/personal.css | .follow-up-list | 12083, 12973, 13050 |
| src/app/personal.css | .follow-up-row | 12084, 12980, 13056 |
| src/app/personal.css | .follow-up-marker | 12088, 13000 |
| src/app/personal.css | .appearance-settings | 12107, 12187, 13264 |
| src/app/personal.css | .weekly-review | 12144, 12868 |
| src/app/personal.css | .settings-container | 12157, 13212, 13544 |
| src/app/personal.css | .settings-tabs-row | 12158, 13229, 13547 |
| src/app/personal.css | .theme-live-preview-card | 12168, 12186, 13264 |
| src/app/personal.css | .settings-fields-grid | 12183, 13248 |
| src/app/personal.css | .security-settings-card | 12196, 13264 |
| src/app/personal.css | .backup-settings-card | 12198, 13264 |
| src/app/personal.css | .backup-action-boxes | 12199, 13256 |
| src/app/personal.css | .home-date-chip | 12492, 17819 |
| src/app/personal.css | .dash-bar-col:hover | 12694, 15075 |
| src/app/personal.css | .home-journal | 12868, 17468 |
| src/app/personal.css | .follow-up-wrapper | 12894, 13511 |
| src/app/personal.css | .project-code-tag | 13995, 19331 |
| src/app/personal.css | .journal-join-chip | 15223, 17704 |
| src/app/personal.css | .journal-join-chip:hover | 15229, 17718 |
| src/app/personal.css | .calendar-agenda-day-head | 15258, 16225 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 15700, 15825 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 15798, 15825 |
| src/app/personal.css | .drawer-status-select-wrap | 16031, 18465 |
| src/app/personal.css | .drawer-priority-select-wrap | 16031, 16056, 18465 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 16040, 18476, 20046 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 16040, 18476, 20046 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 16049, 18514 |
| src/app/personal.css | .calendar-agenda-add-btn | 16173, 20053 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 17050, 18834 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 17067, 17075 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 17259, 17264 |
| src/app/personal.css | .activity-summary-section | 17271, 19934 |
| src/app/personal.css | .timeline-feed | 17277, 19938 |
| src/app/personal.css | .timeline-event | 17282, 19944 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 17462, 18874 |
| src/app/personal.css | .project-section-nav | 17865, 19595, 19971 |
| src/app/personal.css | .project-next-actions > summary | 18011, 18028 |
| src/app/personal.css | .project-next-actions | 18027, 19646 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 18045, 18947 |
| src/app/personal.css | .custom-select-trigger | 18049, 18085, 20040 |
| src/app/personal.css | .custom-select-option | 18049, 18132 |
| src/app/personal.css | select:not(.custom-select-native) | 18057, 20040 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 18189, 20046 |
| src/app/personal.css | .drawer-properties-grid | 18308, 19878 |
| src/app/personal.css | .prop-user-chip | 18360, 20089 |
| src/app/personal.css | .prop-text-badge | 18414, 20089 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 18428, 20089 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 18632, 19982 |
| src/app/personal.css | .close-drawer-btn | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 18632, 19982 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 18668, 20020 |
| src/app/personal.css | .close-drawer-btn:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 18668, 20020 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 18668, 20020 |
| src/app/personal.css | .project-properties-grid | 19438, 19963 |
| src/app/personal.css | .project-progress-card | 19525, 19967 |
| src/app/tokens.css | :root | 2, 49 |
| src/app/ui.css | .ui-stat-card | 76, 111 |
| src/app/ui.css | .ui-focus-task | 87, 111 |
| src/app/ui.css | .ui-modal > header | 94, 95 |
| src/app/ui.css | .ui-modal > footer | 94, 96 |

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
