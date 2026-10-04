# Audit UI — kode aktual

Dibuat ulang dengan `npm run audit:ui`. Duplikat dihitung dalam konteks media/at-rule yang sama; bukan bukti aman untuk menghapus CSS. Angka mencakup seluruh src, termasuk pustaka UI.

## Metrik

| Metrik | Jumlah |
|---|---:|
| button | 16 |
| input | 3 |
| select | 1 |
| textarea | 1 |
| date | 1 |
| inline | 86 |
| hexTsx | 26 |
| hexCss | 808 |
| important | 2806 |
| bytes | 575445 |
| Elemen mentah di luar components/ui | 7 |
| Selector berulang | 389 |
| Nilai border-radius unik | 12 |
| Nilai font-size unik | 25 |
| Nilai height unik | 58 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 17334 | 2 |
| src/app/personal.css | 519067 | 2699 |
| src/app/tokens.css | 3101 | 3 |
| src/app/ui.css | 35943 | 102 |

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
| button | src/components/layout/AppShell.tsx:262 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/ui/Button.tsx:17 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/CsvDropzone.tsx:79 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| input | src/components/ui/DateField.tsx:78 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| button | src/components/ui/DateField.tsx:120 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:149 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:159 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:170 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:185 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:193 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:197 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/Input.tsx:6 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| textarea | src/components/ui/Input.tsx:11 | HTML textarea | Primitive internal | Textarea | Pustaka UI |
| select | src/components/ui/Select.tsx:175 | HTML select | Primitive internal | Select | Pustaka UI |
| button | src/components/ui/Select.tsx:257 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/features/Records.tsx:568 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:681 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:727 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:771 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:2009 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:2108 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |

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
| src/app/personal.css | button:not(.ui-btn) | 8, 16, 4867 |
| src/app/personal.css | .button | 8, 16, 2091, 4867, 20339 |
| src/app/personal.css | .primary | 8, 16, 23, 2079, 4867, 4919, 20339 |
| src/app/personal.css | input:not(.ui-input) | 8, 4867, 18335 |
| src/app/personal.css | select | 8, 4867, 4874, 18335 |
| src/app/personal.css | textarea:not(.ui-input) | 8, 18335 |
| src/app/personal.css | .card | 26, 969, 1304, 2104, 4409, 4857, 13037 |
| src/app/personal.css | .page-heading | 41, 956 |
| src/app/personal.css | .page-heading h1 | 46, 965, 1300 |
| src/app/personal.css | .project-card | 58, 969, 983, 1304, 3247, 4857, 13037, 14135 |
| src/app/personal.css | .project-cover | 77, 993, 3260, 19563, 20244 |
| src/app/personal.css | .module-intro | 105, 13688 |
| src/app/personal.css | .task-database | 118, 969, 1304 |
| src/app/personal.css | .database-views | 125, 1016, 1975, 4924, 5322 |
| src/app/personal.css | .database-views button:not(.ui-btn)[aria-pressed='true'] | 128, 1022, 4960 |
| src/app/personal.css | .filters | 131, 1006, 1331, 10005, 12485 |
| src/app/personal.css | .filters label | 135, 1013, 10013 |
| src/app/personal.css | .task-table th | 138, 9055 |
| src/app/personal.css | .task-table-wrap | 145, 4857, 9033, 9349 |
| src/app/personal.css | .task-table td | 148, 9068 |
| src/app/personal.css | .record .section-head h3 | 156, 1027 |
| src/app/personal.css | .record-options | 165, 12503 |
| src/app/personal.css | .record-options > .actions | 168, 12524 |
| src/app/personal.css | .tabs | 189, 4924 |
| src/app/personal.css | .tabs button:not(.ui-btn) | 196, 4936 |
| src/app/personal.css | .editor | 206, 1520 |
| src/app/personal.css | .editor .section-head | 212, 1536, 12414 |
| src/app/personal.css | .timeline-panel | 292, 4857, 13037 |
| src/app/personal.css | .project-status-tabs | 725, 997, 3216, 4924 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn) | 731, 3226, 4936, 20375 |
| src/app/personal.css | .project-status-tabs button:not(.ui-btn)[aria-pressed='true'] | 735, 1001, 3241, 4960 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 765, 771 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 765, 777 |
| src/app/personal.css | .task-calendar | 808, 969, 13037, 13286 |
| src/app/personal.css | .calendar-toolbar | 813, 13296 |
| src/app/personal.css | .calendar-day-number | 870, 4158, 4176, 4979, 15629 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 880, 4982 |
| src/app/personal.css | .page-heading .eyebrow | 961, 1297 |
| src/app/personal.css | .workspace-intro | 976, 1304, 1313 |
| src/app/personal.css | .project-card:hover | 988, 1326, 3255, 13056, 14150 |
| src/app/personal.css | .record-options summary | 1030, 12510 |
| src/app/personal.css | .recording-tabs | 1041, 1337, 2887, 4924, 13693, 20781 |
| src/app/personal.css | .recording-tabs a | 1050, 1344, 2903, 4936 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1058, 2924, 4960 |
| src/app/personal.css | .activation-notice | 1063, 2931 |
| src/app/personal.css | .activation-notice h2 | 1074, 2943 |
| src/app/personal.css | .recording-metrics | 1077, 1347, 3107, 20840 |
| src/app/personal.css | .recording-metrics > div | 1082, 1353 |
| src/app/personal.css | .recording-metrics strong | 1088, 1362 |
| src/app/personal.css | .ledger-wrap | 1099, 1304, 9033, 13708 |
| src/app/personal.css | .ledger-table | 1105, 9045 |
| src/app/personal.css | .ledger-table th | 1111, 9055 |
| src/app/personal.css | .ledger-table td | 1118, 9068 |
| src/app/personal.css | .table-title | 1131, 9256 |
| src/app/personal.css | .date-picker-head | 1158, 6723 |
| src/app/personal.css | .date-picker-head strong | 1161, 6731 |
| src/app/personal.css | .date-picker-head button:not(.ui-btn) | 1164, 6737, 18992 |
| src/app/personal.css | .date-picker-week | 1169, 1176, 6756 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn) | 1179, 6763, 18993 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[data-outside='true'] | 1186, 6781 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-current='date'] | 1190, 6786 |
| src/app/personal.css | .date-picker-footer | 1193, 6798 |
| src/app/personal.css | .date-picker-footer button:not(.ui-btn) | 1197, 6808, 18992 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 1239, 1573 |
| src/app/personal.css | :root | 1275, 1590, 3492 |
| src/app/personal.css | .dark | 1286, 1710, 3578 |
| src/app/personal.css | .notebook-toolbar | 1365, 2956, 13696 |
| src/app/personal.css | .notebook-toolbar p | 1368, 2972 |
| src/app/personal.css | .notebook-search | 1371, 2978, 20363 |
| src/app/personal.css | .notebook-layout | 1379, 13699 |
| src/app/personal.css | .notebook-row | 1385, 3021 |
| src/app/personal.css | .notebook-row:hover | 1393, 3031 |
| src/app/personal.css | .notebook-spine | 1418, 3036 |
| src/app/personal.css | .spine-0 | 1425, 3048 |
| src/app/personal.css | .spine-1 | 1430, 3053 |
| src/app/personal.css | .spine-2 | 1435, 3058 |
| src/app/personal.css | .spine-3 | 1440, 3063 |
| src/app/personal.css | .notebook-count | 1445, 3068, 20389 |
| src/app/personal.css | .recent-notes | 1470, 3077, 4857, 13705 |
| src/app/personal.css | .recent-note | 1477, 3088 |
| src/app/personal.css | .skeleton-circle-icon | 1763, 1858 |
| src/app/personal.css | .skeleton-circle-dot | 1763, 1951 |
| src/app/personal.css | .skeleton-progress-bar | 1763, 1834, 1907 |
| src/app/personal.css | .skeleton-work-col | 1826, 1834 |
| src/app/personal.css | .skeleton-banner-card | 1834, 1847 |
| src/app/personal.css | .skeleton-filters-row | 1834, 1872 |
| src/app/personal.css | .skeleton-task-cards-list | 1834, 1878 |
| src/app/personal.css | .skeleton-task-card | 1834, 1884 |
| src/app/personal.css | .skeleton-card-top | 1834, 1895 |
| src/app/personal.css | .skeleton-card-meta | 1834, 1901 |
| src/app/personal.css | .scrum-task-card | 2074, 4409, 7127 |
| src/app/personal.css | button:not(.ui-btn).button | 2091, 20339 |
| src/app/personal.css | .task-detail-panel | 2163, 20143 |
| src/app/personal.css | .drawer-top-bar | 2199, 20147 |
| src/app/personal.css | .btn-mark-complete | 2215, 20339 |
| src/app/personal.css | .btn-icon | 2242, 18923, 20267 |
| src/app/personal.css | .btn-icon:hover | 2256, 18959, 20305 |
| src/app/personal.css | .btn-drawer-action | 2273, 20339 |
| src/app/personal.css | .task-submission-card | 2306, 20177 |
| src/app/personal.css | .submission-status-pill | 2353, 20375 |
| src/app/personal.css | .btn-add-submission-quick | 2400, 20339 |
| src/app/personal.css | .submission-open-badge | 2451, 20375 |
| src/app/personal.css | .submission-quick-actions | 2467, 20183 |
| src/app/personal.css | .btn-tiny-delete | 2471, 2500 |
| src/app/personal.css | .project-badge | 2548, 20375 |
| src/app/personal.css | .priority-badge | 2558, 9691, 20375 |
| src/app/personal.css | .task-detail-title | 2579, 18549 |
| src/app/personal.css | .inline-edit-icon | 2587, 18576 |
| src/app/personal.css | .btn-tiny-save | 2640, 20354 |
| src/app/personal.css | .btn-tiny-cancel | 2669, 20354 |
| src/app/personal.css | .drawer-description-box | 2692, 20171 |
| src/app/personal.css | .meta-label | 2723, 11286 |
| src/app/personal.css | .subtasks-section | 2741, 20190 |
| src/app/personal.css | .subtasks-header | 2747, 20194 |
| src/app/personal.css | .subtasks-progress-badge | 2760, 20389 |
| src/app/personal.css | .subtasks-progress-bar | 2770, 20198 |
| src/app/personal.css | .subtasks-tree-list | 2787, 20202 |
| src/app/personal.css | .subtask-tree-row | 2791, 20209 |
| src/app/personal.css | .add-subtask-form | 2852, 20214, 20363 |
| src/app/personal.css | .btn-add-subtask | 2870, 20354 |
| src/app/personal.css | .recording-tabs::-webkit-scrollbar | 2901, 20795 |
| src/app/personal.css | .recording-tabs a:hover | 2919, 4953 |
| src/app/personal.css | .notebook-index | 3010, 4857 |
| src/app/personal.css | .recording-metrics .metric-card | 3114, 20847 |
| src/app/personal.css | .recording-metrics .metric-card:hover | 3128, 20861 |
| src/app/personal.css | dialog.editor | 3270, 12376, 12719 |
| src/app/personal.css | .editor-modal-head | 3290, 12414 |
| src/app/personal.css | .editor-badge-eyebrow | 3301, 20389 |
| src/app/personal.css | .editor-close-btn | 3324, 10378, 12451, 12789, 18923, 20267 |
| src/app/personal.css | .editor-close-btn:hover | 3337, 12476, 12806, 18959, 20305 |
| src/app/personal.css | .field-input | 3386, 6472, 12748 |
| src/app/personal.css | .field-textarea | 3386, 3408, 12748 |
| src/app/personal.css | .field-input:focus | 3400, 12769 |
| src/app/personal.css | .field-textarea:focus | 3400, 12769 |
| src/app/personal.css | .btn-editor-cancel | 3457, 20339 |
| src/app/personal.css | .btn-editor-submit | 3474, 20339 |
| src/app/personal.css | .manager-topbar | 3672, 12222, 16975 |
| src/app/personal.css | .manager-location-wrap | 3737, 12678 |
| src/app/personal.css | .manager-location | 3761, 17614 |
| src/app/personal.css | .topbar-fav-btn | 3771, 3837, 12689 |
| src/app/personal.css | .topbar-fav-btn:hover | 3789, 3854, 12708 |
| src/app/personal.css | .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 3805, 10384 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 3805, 10384 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 3826, 12303 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 3832, 12304 |
| src/app/personal.css | .manager-sidebar | 3862, 5303, 12228, 16980 |
| src/app/personal.css | .close-navigation | 3916, 4432 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 3959, 12229, 13579, 16996 |
| src/app/personal.css | .sidebar-nav-item | 4002, 12235, 16999 |
| src/app/personal.css | .sidebar-nav-item:hover | 4016, 17004 |
| src/app/personal.css | .sidebar-item-icon | 4019, 17013 |
| src/app/personal.css | .sidebar-nav-item.is-active | 4038, 12236, 17007 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 4038, 12236, 17007 |
| src/app/personal.css | .project-dot | 4070, 7224 |
| src/app/personal.css | .sidebar-avatar | 4099, 10389 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 4132, 13343, 15624 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 4140, 13358 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 4146, 13365 |
| src/app/personal.css | .calendar-add | 4158, 4201 |
| src/app/personal.css | .calendar-agenda-title-group | 4233, 16410 |
| src/app/personal.css | .calendar-agenda-task-count | 4236, 16437, 20375 |
| src/app/personal.css | .calendar-agenda-actions | 4242, 16447 |
| src/app/personal.css | .calendar-agenda-clear-btn | 4245, 16476, 20339 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 4250, 16491 |
| src/app/personal.css | .calendar-event | 4287, 4986, 15633 |
| src/app/personal.css | .color-style-card | 4347, 12347, 13433 |
| src/app/personal.css | .color-swatch-item | 4353, 12272, 12324 |
| src/app/personal.css | .home-panel | 4409, 4772, 13037 |
| src/app/personal.css | .next-meeting | 4409, 4466, 20133 |
| src/app/personal.css | .sprint-summary-card | 4409, 7485 |
| src/app/personal.css | .daily-group-card | 4409, 8103, 13675 |
| src/app/personal.css | .sprint-summary-card:hover | 4419, 7499 |
| src/app/personal.css | .scrum-task-card:hover | 4419, 7142 |
| src/app/personal.css | .manager-main | 4425, 12221 |
| src/app/personal.css | .manager-main .page-heading h1 | 4436, 12224 |
| src/app/personal.css | .home-heading h1 | 4436, 4455, 12638, 18095 |
| src/app/personal.css | .home-heading | 4442, 12617, 18092, 20129 |
| src/app/personal.css | .home-overview | 4461, 10808 |
| src/app/personal.css | .meeting-mode-pill | 4545, 8915 |
| src/app/personal.css | .round-arrow | 4578, 10393, 20369 |
| src/app/personal.css | .focus-filters | 4604, 5274, 20137 |
| src/app/personal.css | .focus-open | 4703, 10397 |
| src/app/personal.css | .home-text-link | 4764, 5298 |
| src/app/personal.css | .home-records | 4794, 13037 |
| src/app/personal.css | .home-records .section-head > a | 4802, 5298 |
| src/app/personal.css | select option | 4906, 18340 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 5000, 19023 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 5012, 19088 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 5012, 19098 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 5018, 17701, 19074 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.ui-btn):not(.quick-action-hub-btn) | 5021, 19108 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 5021, 19108 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 5034, 5281 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 5040, 5284 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 5076, 5099 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 5079, 19489 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 5086, 19303 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 5092, 19318 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 5119, 5133 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 5119, 5521 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 5124, 5524 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 5222, 5293, 5493 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 5226, 5496 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 5229, 5514 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button:not(.ui-btn) | 5232, 5517 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 5235, 5508 |
| src/app/personal.css | .home-panel .section-head | 5271, 10574 |
| src/app/personal.css | .manager-main :is(button:not(.ui-btn), a):focus-visible | 5307, 18110 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 5428, 17216 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 5457, 17220 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 5551, 17348 |
| src/app/personal.css | .manager-main .notebook-row | 5670, 10809 |
| src/app/personal.css | .manager-main .notebook-link | 5689, 10810 |
| src/app/personal.css | .manager-main .notebook-add-btn | 5806, 10811 |
| src/app/personal.css | .stakeholder-badge | 6023, 10371 |
| src/app/personal.css | .close-btn | 6419, 10378, 18923, 20267 |
| src/app/personal.css | .close-btn:hover | 6447, 18959, 20305 |
| src/app/personal.css | .btn-cancel | 6518, 12121 |
| src/app/personal.css | .dropzone-success | 6627, 20375 |
| src/app/personal.css | .dropzone-error | 6647, 20375 |
| src/app/personal.css | .date-picker-days button:not(.ui-btn)[aria-pressed='true'] | 6793, 18994 |
| src/app/personal.css | .card-task-code | 7183, 17618 |
| src/app/personal.css | .card-priority-pill | 7232, 20389 |
| src/app/personal.css | .card-date-pill | 7263, 20389 |
| src/app/personal.css | .scrum-assignee-pill | 7342, 9858 |
| src/app/personal.css | .sprint-action-btn | 7557, 18923, 20267 |
| src/app/personal.css | .sprint-action-btn:hover | 7572, 18959, 20305 |
| src/app/personal.css | .daily-tasks-container | 7649, 13672 |
| src/app/personal.css | .daily-nav-arrow-btn | 7692, 20369 |
| src/app/personal.css | .btn-quick-add-day | 8216, 20354 |
| src/app/personal.css | .task-code-tag | 8347, 9649 |
| src/app/personal.css | .task-title-text | 8354, 8792 |
| src/app/personal.css | .task-project-pill | 8365, 8808, 13735 |
| src/app/personal.css | .today-view-wrapper | 8448, 13660 |
| src/app/personal.css | .today-header-card | 8455, 13663 |
| src/app/personal.css | .today-quick-add-card | 8547, 13666, 17675 |
| src/app/personal.css | .today-grid-layout | 8622, 13669 |
| src/app/personal.css | .today-task-card | 8720, 15096 |
| src/app/personal.css | .today-check-circle | 8753, 17681 |
| src/app/personal.css | .today-check-circle.checked | 8769, 17692 |
| src/app/personal.css | .btn-reschedule-today | 8849, 20354 |
| src/app/personal.css | .task-table | 9045, 9361 |
| src/app/personal.css | .task-table tbody tr:last-child td | 9077, 9422 |
| src/app/personal.css | .task-table tbody tr:hover td | 9082, 9426 |
| src/app/personal.css | .table-btn-done | 9322, 9910 |
| src/app/personal.css | .task-assignee-empty | 9852, 9899 |
| src/app/personal.css | .filters :is(input, .ui-input) | 10030, 10047 |
| src/app/personal.css | .filters select | 10030, 10051 |
| src/app/personal.css | .custom-select-option-content | 10136, 18451 |
| src/app/personal.css | .meeting-detail-row | 10158, 10243 |
| src/app/personal.css | .meeting-section-box | 10171, 10250 |
| src/app/personal.css | .meeting-section-box > svg | 10256, 10263 |
| src/app/personal.css | .meeting-section-header | 10282, 12557 |
| src/app/personal.css | .dash-sparkline | 10413, 10803 |
| src/app/personal.css | .dash-bar-chart | 10421, 10670, 12850, 15251 |
| src/app/personal.css | .dash-bar-col | 10426, 12856, 15259 |
| src/app/personal.css | .dash-bar-count | 10432, 10704, 12868, 15281 |
| src/app/personal.css | .dash-bar-track | 10438, 10715, 12874, 15294 |
| src/app/personal.css | .dash-bar-fill | 10444, 10721, 12884, 15305 |
| src/app/personal.css | .bar-today .dash-bar-track | 10451, 12891 |
| src/app/personal.css | .bar-today .dash-bar-fill | 10455, 10726, 12896 |
| src/app/personal.css | .dash-bar-label | 10460, 10730, 12915, 15317 |
| src/app/personal.css | .bar-today .dash-bar-label | 10464, 15335 |
| src/app/personal.css | .dash-donut-wrap | 10469, 10752, 12926 |
| src/app/personal.css | .dash-donut-svg-wrap | 10474, 10758, 12933 |
| src/app/personal.css | .dash-donut-svg | 10479, 12940 |
| src/app/personal.css | .dash-donut-center | 10483, 12953 |
| src/app/personal.css | .dash-donut-center strong | 10487, 10767, 12963 |
| src/app/personal.css | .dash-donut-center span | 10493, 10772, 12970 |
| src/app/personal.css | .dash-proj-bar-row | 10506, 12977 |
| src/app/personal.css | .dash-proj-bar-row:hover | 10515, 12987 |
| src/app/personal.css | .dash-proj-bar-meta | 10520, 12991 |
| src/app/personal.css | .dash-proj-bar-label | 10524, 12997 |
| src/app/personal.css | .dash-proj-bar-pct | 10531, 13003 |
| src/app/personal.css | .dash-proj-bar-track | 10536, 13009 |
| src/app/personal.css | .dash-proj-bar-fill | 10541, 13017 |
| src/app/personal.css | .dashboard-controls | 10576, 12485 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col | 10583, 10678 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col:hover | 10584, 10693 |
| src/app/personal.css | .dash-analytics-row | 10586, 17941 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 10591, 17949 |
| src/app/personal.css | .week-barchart-modern | 10608, 15162 |
| src/app/personal.css | .week-barchart-header | 10612, 15167 |
| src/app/personal.css | .week-barchart-metric | 10617, 15176 |
| src/app/personal.css | .week-metric-main | 10623, 15182 |
| src/app/personal.css | .week-metric-num | 10627, 15187 |
| src/app/personal.css | .week-metric-title | 10634, 15199 |
| src/app/personal.css | .week-metric-pill | 10638, 15215 |
| src/app/personal.css | .week-metric-pill.peak-pill | 10646, 15224 |
| src/app/personal.css | .week-filter-reset-chip | 10651, 15229 |
| src/app/personal.css | .week-filter-reset-chip:hover | 10660, 15243 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 10665, 15246 |
| src/app/personal.css | button:not(.ui-btn).dash-bar-col.is-selected-bar | 10698, 15277 |
| src/app/personal.css | .dash-bar-count.has-value | 10710, 15290 |
| src/app/personal.css | .dash-bar-daynum | 10734, 15322 |
| src/app/personal.css | .week-barchart-footer | 10739, 15339 |
| src/app/personal.css | .dash-chart-caption | 10745, 17646 |
| src/app/personal.css | .donut-segment | 10763, 12945 |
| src/app/personal.css | .manager-action-dialog | 11511, 12719 |
| src/app/personal.css | .action-modal-close | 11588, 12789, 17597, 18923, 20267 |
| src/app/personal.css | .action-modal-close:hover | 11604, 12806, 17609, 18959, 20305 |
| src/app/personal.css | :root[data-theme-color='lime'] | 12217, 16962 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 12220, 16970 |
| src/app/personal.css | .manager-main .page-heading | 12223, 20125 |
| src/app/personal.css | .sidebar-group-toggle | 12231, 13604 |
| src/app/personal.css | .follow-up-panel | 12240, 13037, 13070, 13683 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 12241, 13086 |
| src/app/personal.css | .follow-up-list | 12245, 13142, 13219 |
| src/app/personal.css | .follow-up-row | 12246, 13149, 13225 |
| src/app/personal.css | .follow-up-marker | 12250, 13169 |
| src/app/personal.css | .appearance-settings | 12269, 12349, 13433 |
| src/app/personal.css | .weekly-review | 12306, 13037 |
| src/app/personal.css | .settings-container | 12319, 13381, 13713 |
| src/app/personal.css | .settings-tabs-row | 12320, 13398, 13716 |
| src/app/personal.css | .theme-live-preview-card | 12330, 12348, 13433 |
| src/app/personal.css | .settings-fields-grid | 12345, 13417 |
| src/app/personal.css | .security-settings-card | 12358, 13433 |
| src/app/personal.css | .backup-settings-card | 12360, 13433 |
| src/app/personal.css | .backup-action-boxes | 12361, 13425 |
| src/app/personal.css | .home-date-chip | 12654, 18098 |
| src/app/personal.css | .dash-bar-col:hover | 12863, 15273 |
| src/app/personal.css | .home-journal | 13037, 17747 |
| src/app/personal.css | .follow-up-wrapper | 13063, 13680 |
| src/app/personal.css | .project-code-tag | 14169, 19616 |
| src/app/personal.css | .calendar-agenda-day-head | 15644, 16506 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 15983, 16108 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 16081, 16108 |
| src/app/personal.css | .drawer-status-select-wrap | 16312, 18756 |
| src/app/personal.css | .drawer-priority-select-wrap | 16312, 16337, 18756 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 16321, 18767 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 16321, 18767 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 16330, 18805 |
| src/app/personal.css | .calendar-agenda-add-btn | 16454, 20339 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 17331, 19125 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 17348, 17356 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 17540, 17545 |
| src/app/personal.css | .activity-summary-section | 17552, 20219 |
| src/app/personal.css | .timeline-feed | 17558, 20223 |
| src/app/personal.css | .timeline-event | 17563, 20229 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 17741, 19165 |
| src/app/personal.css | .project-section-nav | 18151, 19880, 20256 |
| src/app/personal.css | .project-next-actions > summary | 18297, 18314 |
| src/app/personal.css | .project-next-actions | 18313, 19931 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 18331, 19238 |
| src/app/personal.css | select:not(.custom-select-native) | 18343, 20325 |
| src/app/personal.css | .custom-select-trigger | 18372, 20325 |
| src/app/personal.css | .task-status-custom-select :is(.custom-select-trigger, .ui-select-trigger) | 18479, 20332 |
| src/app/personal.css | .drawer-properties-grid | 18599, 20163 |
| src/app/personal.css | .prop-user-chip | 18651, 20375 |
| src/app/personal.css | .prop-text-badge | 18705, 20375 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 18719, 20375 |
| src/app/personal.css | button:not(.ui-btn).btn-icon | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn | 18923, 20267 |
| src/app/personal.css | .close-drawer-btn | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).close-btn | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn | 18923, 20267 |
| src/app/personal.css | button:not(.ui-btn).btn-icon:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).close-drawer-btn:hover | 18959, 20305 |
| src/app/personal.css | .close-drawer-btn:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).editor-close-btn:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).close-btn:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).action-modal-close:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).close-picker-btn:hover | 18959, 20305 |
| src/app/personal.css | button:not(.ui-btn).sprint-action-btn:hover | 18959, 20305 |
| src/app/personal.css | .project-properties-grid | 19723, 20248 |
| src/app/personal.css | .project-progress-card | 19810, 20252 |
| src/app/personal.css | .timeline-mobile-header-actions | 20399, 20412 |
| src/app/personal.css | .gantt-nav-today-btn | 20657, 20677 |
| src/app/tokens.css | :root | 2, 51 |
| src/app/ui.css | .ui-select-trigger.ui-select-trigger | 62, 68 |
| src/app/ui.css | .unit-record .record-meta | 82, 181 |
| src/app/ui.css | .record.card > .actions > .record-options | 83, 174 |
| src/app/ui.css | .record.card > .actions > .record-options > summary | 84, 176 |
| src/app/ui.css | .record.card > .actions > .record-options[open] | 85, 175 |
| src/app/ui.css | .op-card-title | 111, 112 |
| src/app/ui.css | .ui-stat-card | 222, 271 |
| src/app/ui.css | .ui-focus-task | 233, 271 |
| src/app/ui.css | .ui-modal > header | 240, 241 |
| src/app/ui.css | .ui-modal > footer | 240, 242 |

## Nilai deklarasi

### border-radius

- `0`
- `0 var(--r-md) var(--r-md) 0`
- `6px`
- `999px`
- `var(--r-full)`
- `var(--r-lg)`
- `var(--r-lg) var(--r-lg) 0 0`
- `var(--r-md)`
- `var(--r-md) var(--r-md) 0 0`
- `var(--r-md) var(--r-md) var(--r-sm) var(--r-sm)`
- `var(--r-sm)`
- `var(--r-xl, 14px)`

### font-size

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
- `18px`
- `20px`
- `22px`
- `23px`
- `var(--fs-body)`
- `var(--fs-button)`
- `var(--fs-caption)`
- `var(--fs-h2)`
- `var(--fs-label)`
- `var(--fs-overline)`
- `var(--fs-overline, 11px)`
- `var(--fs-title)`

### height

- `100%`
- `100dvh`
- `100vh`
- `100vw`
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
- `162px`
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
- `var(--btn-height-md)`
- `var(--btn-height-sm)`
- `var(--control-height-md)`
- `var(--h-md)`
- `var(--icon-md)`
- `var(--space-2)`
- `var(--space-8)`
- `var(--table-th-height)`
