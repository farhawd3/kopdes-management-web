# Audit UI — kode aktual

Dibuat ulang dengan `npm run audit:ui`. Duplikat dihitung dalam konteks media/at-rule yang sama; bukan bukti aman untuk menghapus CSS. Angka mencakup seluruh src, termasuk pustaka UI.

## Metrik

| Metrik | Jumlah |
|---|---:|
| button | 250 |
| input | 45 |
| select | 4 |
| textarea | 5 |
| date | 1 |
| inline | 86 |
| hexTsx | 37 |
| hexCss | 946 |
| important | 2353 |
| bytes | 603721 |
| Elemen mentah di luar components/ui | 289 |
| Selector berulang | 522 |
| Nilai border-radius unik | 55 |
| Nilai font-size unik | 56 |
| Nilai height unik | 58 |

## CSS

| Berkas | Byte | !important |
|---|---:|---:|
| src/app/globals.css | 28167 | 5 |
| src/app/personal.css | 575554 | 2348 |

## Inventaris halaman dan overlay

- src/app/(app)/[slug]/page.tsx
- src/app/page.tsx
- src/app/pin/page.tsx
- src/components/layout/AppShell.tsx
- src/components/layout/ManagerActionModal.tsx
- src/features/projects/SprintModal.tsx
- src/features/tasks/RecursiveScheduleModal.tsx
- src/features/tasks/TaskDetailDrawer.tsx
- src/features/workspace/WorkspaceSearch.tsx

## Seluruh kontrol mentah

| Komponen | File:baris | Varian saat ini | Masalah | Pengganti | Status |
|---|---|---|---|---|---|
| button | src/app/error.tsx:7 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/app/pin/page.tsx:40 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/app/pin/page.tsx:54 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/app/pin/page.tsx:63 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/charts/DashboardCharts.tsx:58 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/charts/DashboardCharts.tsx:81 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/charts/DashboardCharts.tsx:196 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:194 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:224 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:251 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:260 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:267 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:274 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:327 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:356 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:365 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:375 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:428 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:523 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:550 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:569 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:609 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:621 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:667 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:671 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:702 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/AppShell.tsx:707 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/ManagerActionModal.tsx:184 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/ManagerActionModal.tsx:202 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/layout/ManagerActionModal.tsx:228 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/components/ui/Button.tsx:10 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| input | src/components/ui/CsvDropzone.tsx:79 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| input | src/components/ui/DateField.tsx:78 | HTML input | Primitive internal | Input / DateInput | Pustaka UI |
| button | src/components/ui/DateField.tsx:99 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:127 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:137 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:148 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:163 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:171 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/DateField.tsx:175 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/EmptyState.tsx:56 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/EmptyState.tsx:71 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| select | src/components/ui/Select.tsx:172 | HTML select | Primitive internal | Select | Pustaka UI |
| button | src/components/ui/Select.tsx:202 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/components/ui/Select.tsx:248 | HTML button | Primitive internal | Button / IconButton | Pustaka UI |
| button | src/features/dashboard/Dashboard.tsx:334 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:353 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:440 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/dashboard/Dashboard.tsx:460 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:683 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/dashboard/Dashboard.tsx:696 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/dashboard/Dashboard.tsx:704 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:714 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:725 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:743 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/Dashboard.tsx:752 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/dashboard/TodayView.tsx:184 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:193 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:201 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:257 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:295 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:334 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:366 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:482 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/dashboard/TodayView.tsx:604 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:313 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:327 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:344 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:370 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:388 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:485 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:500 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:508 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| select | src/features/Editor.tsx:529 | HTML select | Gaya tersebar; tinjau perilaku | Select | Belum dimigrasi |
| select | src/features/Editor.tsx:571 | HTML select | Gaya tersebar; tinjau perilaku | Select | Belum dimigrasi |
| button | src/features/Editor.tsx:609 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:624 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:639 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:653 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:667 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:682 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| select | src/features/Editor.tsx:695 | HTML select | Gaya tersebar; tinjau perilaku | Select | Belum dimigrasi |
| input | src/features/Editor.tsx:804 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:831 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:849 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:859 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:862 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:912 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:923 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:947 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:957 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:960 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:1005 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:1039 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:1042 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:1086 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:1097 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:1116 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:1119 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:1165 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/Editor.tsx:1192 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:1203 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:1206 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Editor.tsx:1251 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:1269 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:1272 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| textarea | src/features/Editor.tsx:1363 | HTML textarea | Gaya tersebar; tinjau perilaku | Textarea | Belum dimigrasi |
| input | src/features/Editor.tsx:1399 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Editor.tsx:1565 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Editor.tsx:1568 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/follow-ups/FollowUps.tsx:68 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/follow-ups/PinnedRecords.tsx:71 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/follow-ups/PinnedRecords.tsx:90 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:267 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/operations/Operations.tsx:517 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:546 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:590 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:634 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:638 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/operations/Operations.tsx:734 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:790 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:833 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:842 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:872 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/operations/Operations.tsx:930 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:98 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:107 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:116 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:127 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:146 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:220 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/MilestoneTracker.tsx:239 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:68 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:82 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:86 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:90 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:94 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| textarea | src/features/projects/ProjectNotes.tsx:101 | HTML textarea | Gaya tersebar; tinjau perilaku | Textarea | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:116 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/ProjectNotes.tsx:125 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/Projects.tsx:79 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/Projects.tsx:116 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/Projects.tsx:422 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/projects/Projects.tsx:475 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/projects/Projects.tsx:483 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/Projects.tsx:503 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/SprintCard.tsx:63 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/SprintCard.tsx:74 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/SprintModal.tsx:96 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/projects/SprintModal.tsx:110 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/projects/SprintModal.tsx:122 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| textarea | src/features/projects/SprintModal.tsx:197 | HTML textarea | Gaya tersebar; tinjau perilaku | Textarea | Belum dimigrasi |
| button | src/features/projects/SprintModal.tsx:213 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/projects/SprintModal.tsx:216 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:208 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:222 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:378 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:518 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:611 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:652 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:693 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:902 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:986 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1027 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1038 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1048 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1059 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1075 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1086 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1495 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1502 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Records.tsx:1534 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Records.tsx:1553 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1557 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1578 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1596 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1604 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1634 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1655 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1715 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1768 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1790 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1802 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Records.tsx:1861 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Records.tsx:1872 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:1884 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/Records.tsx:1897 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/Records.tsx:2191 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:2283 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:2293 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/Records.tsx:2435 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/reports/Reports.tsx:211 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| textarea | src/features/reports/Reports.tsx:233 | HTML textarea | Gaya tersebar; tinjau perilaku | Textarea | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:251 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:262 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:294 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:301 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:308 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:363 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:373 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:391 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:406 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:410 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:481 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/reports/Reports.tsx:490 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:58 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:68 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:78 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:88 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:118 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:166 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:265 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/settings/Settings.tsx:345 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| input | src/features/settings/Settings.tsx:359 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/settings/Settings.tsx:372 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/settings/Settings.tsx:411 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:180 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:221 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:233 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:288 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:297 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:305 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:324 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:355 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:363 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:373 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:432 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/DailyTasksView.tsx:465 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/RecursiveScheduleModal.tsx:66 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/RecursiveScheduleModal.tsx:91 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/RecursiveScheduleModal.tsx:119 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/RecursiveScheduleModal.tsx:122 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/SavedTaskViews.tsx:39 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/SavedTaskViews.tsx:40 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/SavedTaskViews.tsx:67 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/SavedTaskViews.tsx:74 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:165 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:210 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:362 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:375 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:385 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/ScrumBoardView.tsx:398 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/SubtaskToggle.tsx:19 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskBatchActions.tsx:25 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskBatchActions.tsx:34 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskBatchActions.tsx:72 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:79 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:92 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:102 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:118 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskCalendar.tsx:134 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:174 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:190 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:234 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:279 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskCalendar.tsx:289 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:258 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:267 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:277 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:296 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:307 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:319 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:329 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskDetailDrawer.tsx:375 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:400 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:410 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:432 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:593 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| textarea | src/features/tasks/TaskDetailDrawer.tsx:605 | HTML textarea | Gaya tersebar; tinjau perilaku | Textarea | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:613 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:623 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskDetailDrawer.tsx:667 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:676 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:686 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:720 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:729 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:738 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:755 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:798 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskDetailDrawer.tsx:814 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:822 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/tasks/TaskDetailDrawer.tsx:857 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/tasks/TaskDetailDrawer.tsx:865 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:84 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:87 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:88 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:128 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:142 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:181 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:184 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:224 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:255 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:272 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:340 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/tasks/TaskTimeline.tsx:378 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:82 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:92 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:103 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:143 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:179 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:193 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| button | src/features/workspace/WorkspacePage.tsx:207 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |
| input | src/features/workspace/WorkspaceSearch.tsx:40 | HTML input | Gaya tersebar; tinjau perilaku | Input / DateInput | Belum dimigrasi |
| button | src/features/workspace/WorkspaceSearch.tsx:51 | HTML button | Gaya tersebar; tinjau perilaku | Button / IconButton | Belum dimigrasi |

## Selector berulang

| Berkas | Selector dan konteks | Baris |
|---|---|---|
| src/app/globals.css | h1 | 127, 135 |
| src/app/globals.css | h2 | 127, 140 |
| src/app/globals.css | h3 | 127, 144 |
| src/app/globals.css | .primary | 157, 182 |
| src/app/globals.css | textarea | 202, 216 |
| src/app/globals.css | .nav-label | 233, 284 |
| src/app/globals.css | .sidebar | 251, 1072 |
| src/app/globals.css | .sidebar nav | 288, 1075 |
| src/app/globals.css | .sidebar nav a | 292, 1078 |
| src/app/globals.css | .sidebar nav a > span:first-child | 301, 1081 |
| src/app/globals.css | .sidebar-foot | 314, 1102 |
| src/app/globals.css | .hero | 358, 1142 |
| src/app/globals.css | .hero p | 368, 1153 |
| src/app/globals.css | .metrics .card | 401, 1187 |
| src/app/globals.css | .gantt-row strong | 671, 675 |
| src/app/globals.css | @media (min-width: 640px) and (max-width: 1023px) → .sidebar-foot | 789, 1441 |
| src/app/globals.css | .calendar-week | 1022, 1027 |
| src/app/globals.css | .calendar-days | 1022, 1032 |
| src/app/personal.css | body | 8, 2692 |
| src/app/personal.css | button | 11, 19, 6399 |
| src/app/personal.css | .button | 11, 19, 3091, 6399, 24501 |
| src/app/personal.css | .primary | 11, 19, 26, 3077, 6399, 6451, 24501 |
| src/app/personal.css | input | 11, 6399, 22121 |
| src/app/personal.css | select | 11, 6399, 6406, 22121 |
| src/app/personal.css | textarea | 11, 22121 |
| src/app/personal.css | .card | 29, 1413, 2188, 3104, 5809, 6389, 16372 |
| src/app/personal.css | .home-heading h1 | 68, 5842, 5865, 15818, 21852 |
| src/app/personal.css | .page-heading | 77, 1399 |
| src/app/personal.css | .page-heading h1 | 82, 1408, 2184 |
| src/app/personal.css | .workspace-banner | 85, 1421, 2188, 2212 |
| src/app/personal.css | .workspace-banner h2 | 100, 1433, 2219 |
| src/app/personal.css | .workspace-banner p | 106, 1440 |
| src/app/personal.css | .workspace-metrics .card | 133, 1453 |
| src/app/personal.css | .onboarding-card | 173, 2188 |
| src/app/personal.css | .project-card | 193, 1413, 1467, 2188, 4448, 6389, 15365, 16372, 17562 |
| src/app/personal.css | .project-symbol | 214, 1479 |
| src/app/personal.css | .project-cover | 223, 1484, 4467, 23700, 24403 |
| src/app/personal.css | .module-intro | 332, 17059 |
| src/app/personal.css | .task-database | 345, 1413, 2188 |
| src/app/personal.css | .database-views | 352, 1512, 2999, 6456, 6979 |
| src/app/personal.css | .database-views button[aria-pressed='true'] | 355, 1518, 3038, 6492 |
| src/app/personal.css | .filters | 359, 1502, 2227, 12484, 15585 |
| src/app/personal.css | .filters label | 364, 1509, 12492 |
| src/app/personal.css | .filters input | 367, 12509, 12526 |
| src/app/personal.css | .filters select | 367, 12509, 12530 |
| src/app/personal.css | .task-table th | 371, 11400 |
| src/app/personal.css | .task-table-wrap | 378, 6389, 11378, 11698 |
| src/app/personal.css | .task-table td | 381, 11413 |
| src/app/personal.css | .task-table .task-title | 385, 20870 |
| src/app/personal.css | .record .section-head h3 | 392, 1535 |
| src/app/personal.css | .record-options | 401, 15603 |
| src/app/personal.css | .record-options summary | 406, 1538, 15610 |
| src/app/personal.css | .record-options > .actions | 410, 15624 |
| src/app/personal.css | .kanban-column | 413, 1523 |
| src/app/personal.css | .kanban-column:nth-child(3) | 421, 1529 |
| src/app/personal.css | .tabs | 442, 6456 |
| src/app/personal.css | .tabs button | 449, 6468 |
| src/app/personal.css | .editor | 459, 2458 |
| src/app/personal.css | .editor .section-head | 465, 2474, 15514 |
| src/app/personal.css | .timeline-panel | 545, 6389, 16372 |
| src/app/personal.css | .project-status-tabs | 998, 1488, 4417, 6456 |
| src/app/personal.css | .project-status-tabs button | 1004, 1493, 4427, 6468, 24540 |
| src/app/personal.css | .project-status-tabs button[aria-pressed='true'] | 1009, 1497, 4442, 6492 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple]) | 1040, 1046 |
| src/app/personal.css | @supports (appearance: base-select) → select:not([multiple])::picker(select) | 1040, 1052 |
| src/app/personal.css | .task-calendar | 1083, 1413, 16372, 16622 |
| src/app/personal.css | .calendar-toolbar | 1090, 16632 |
| src/app/personal.css | .calendar-day-number | 1155, 5485, 5503, 6511, 18872 |
| src/app/personal.css | .calendar-day-number[aria-pressed='true'] | 1169, 6514 |
| src/app/personal.css | .studio-shell .sidebar | 1241, 2017, 2122 |
| src/app/personal.css | .studio-shell .brand | 1248, 2127 |
| src/app/personal.css | .studio-shell .brand-icon | 1253, 2130 |
| src/app/personal.css | .studio-shell .brand-sub | 1261, 2135 |
| src/app/personal.css | .studio-shell .sidebar-search | 1265, 2023, 2139 |
| src/app/personal.css | .studio-shell .sidebar-create | 1280, 2023, 2144 |
| src/app/personal.css | .studio-shell .sidebar nav | 1291, 2029, 2175 |
| src/app/personal.css | .nav-group summary | 1300, 2135 |
| src/app/personal.css | .studio-shell .sidebar nav a | 1310, 2150 |
| src/app/personal.css | .studio-shell .sidebar nav a:hover | 1324, 2154 |
| src/app/personal.css | .studio-shell .sidebar nav a[aria-current='page'] | 1328, 2157 |
| src/app/personal.css | .studio-shell .sidebar-foot | 1334, 2023, 2161 |
| src/app/personal.css | .studio-shell .sidebar-foot strong | 1343, 2165 |
| src/app/personal.css | .studio-shell main | 1394, 2178 |
| src/app/personal.css | .page-heading .eyebrow | 1404, 2181 |
| src/app/personal.css | .workspace-banner .banner-tag | 1443, 2216 |
| src/app/personal.css | .home-heading | 1450, 5848, 15797, 21849, 24267 |
| src/app/personal.css | .workspace-intro | 1457, 2188, 2199 |
| src/app/personal.css | .workspace-intro h2 | 1464, 2209 |
| src/app/personal.css | .project-card:hover | 1473, 2222, 4462, 16392, 17577 |
| src/app/personal.css | .recording-tabs | 1550, 2233, 4174, 6456, 17071 |
| src/app/personal.css | .recording-tabs a | 1560, 2241, 4190, 6468 |
| src/app/personal.css | .recording-tabs a[aria-current='page'] | 1570, 4211, 6492 |
| src/app/personal.css | .activation-notice | 1644, 4218 |
| src/app/personal.css | .activation-notice h2 | 1658, 4230 |
| src/app/personal.css | .activation-notice p | 1662, 4237 |
| src/app/personal.css | .recording-metrics | 1665, 2244, 4381 |
| src/app/personal.css | .recording-metrics > div | 1671, 2250, 4388 |
| src/app/personal.css | .recording-metrics strong | 1677, 2259, 4407 |
| src/app/personal.css | .ledger-wrap | 1688, 2188, 11378, 17090 |
| src/app/personal.css | .ledger-table | 1694, 11390 |
| src/app/personal.css | .ledger-table th | 1700, 11400 |
| src/app/personal.css | .ledger-table td | 1707, 11413 |
| src/app/personal.css | .table-title | 1720, 11604 |
| src/app/personal.css | .date-field | 1766, 2086, 22774 |
| src/app/personal.css | .date-input | 1772, 5424 |
| src/app/personal.css | .date-picker-head | 1816, 8879 |
| src/app/personal.css | .date-picker-head strong | 1822, 8887 |
| src/app/personal.css | .date-picker-head button | 1825, 8893, 22778 |
| src/app/personal.css | .date-picker-week | 1830, 1837, 8912 |
| src/app/personal.css | .date-picker-days button | 1842, 8919, 22779 |
| src/app/personal.css | .date-picker-days button[data-outside='true'] | 1850, 8938 |
| src/app/personal.css | .date-picker-days button[aria-current='date'] | 1854, 8943 |
| src/app/personal.css | .date-picker-days button[aria-pressed='true'] | 1857, 8950, 22780 |
| src/app/personal.css | .date-picker-footer | 1861, 8957 |
| src/app/personal.css | .date-picker-footer button | 1868, 8967, 22778 |
| src/app/personal.css | @media (prefers-reduced-motion: reduce) → .project-card | 1991, 13637 |
| src/app/personal.css | .sidebar-areas | 2032, 2168 |
| src/app/personal.css | .sidebar-areas a[aria-current='page'] | 2051, 2171 |
| src/app/personal.css | @media (max-width: 600px) → .editor | 2056, 2517 |
| src/app/personal.css | :root | 2100, 2534, 4760 |
| src/app/personal.css | .dark | 2111, 2657, 4846 |
| src/app/personal.css | .notebook-toolbar | 2262, 4243, 17074 |
| src/app/personal.css | .notebook-toolbar h2 | 2269, 4251 |
| src/app/personal.css | .notebook-toolbar p | 2273, 4259 |
| src/app/personal.css | .notebook-search | 2277, 4265, 24528 |
| src/app/personal.css | .notebook-search input | 2284, 4276 |
| src/app/personal.css | .notebook-layout | 2290, 17078 |
| src/app/personal.css | .notebook-row | 2296, 4295 |
| src/app/personal.css | .notebook-row:hover | 2306, 4305 |
| src/app/personal.css | .notebook-spine | 2331, 4310 |
| src/app/personal.css | .spine-0 | 2343, 4322 |
| src/app/personal.css | .spine-1 | 2348, 4327 |
| src/app/personal.css | .spine-2 | 2353, 4332 |
| src/app/personal.css | .spine-3 | 2358, 4337 |
| src/app/personal.css | .notebook-count | 2363, 4342, 24555 |
| src/app/personal.css | .recent-notes | 2389, 4351, 6389, 17084 |
| src/app/personal.css | .recent-note | 2396, 4362 |
| src/app/personal.css | @keyframes fadeIn → from | 2711, 3191 |
| src/app/personal.css | @keyframes fadeIn → to | 2712, 3194 |
| src/app/personal.css | .skeleton-circle-icon | 2715, 2814 |
| src/app/personal.css | .skeleton-circle-icon-sm | 2715, 2974 |
| src/app/personal.css | .skeleton-circle-progress | 2715, 2892 |
| src/app/personal.css | .skeleton-circle-dot | 2715, 2944 |
| src/app/personal.css | .skeleton-bar | 2715, 2917 |
| src/app/personal.css | .skeleton-bar-day | 2715, 2923 |
| src/app/personal.css | .skeleton-progress-bar | 2715, 2790, 2863 |
| src/app/personal.css | .skeleton-work-col | 2782, 2790 |
| src/app/personal.css | .skeleton-banner-card | 2790, 2803 |
| src/app/personal.css | .skeleton-filters-row | 2790, 2828 |
| src/app/personal.css | .skeleton-task-cards-list | 2790, 2834 |
| src/app/personal.css | .skeleton-task-card | 2790, 2840 |
| src/app/personal.css | .skeleton-card-top | 2790, 2851 |
| src/app/personal.css | .skeleton-card-meta | 2790, 2857 |
| src/app/personal.css | .database-views button | 3016, 6468 |
| src/app/personal.css | .database-views button:hover | 3034, 6485 |
| src/app/personal.css | .scrum-task-card | 3060, 5809, 9300 |
| src/app/personal.css | .scrum-task-card:hover | 3067, 5820, 9315 |
| src/app/personal.css | .scrum-progress-bar-fill | 3072, 9671 |
| src/app/personal.css | button.button | 3091, 24501 |
| src/app/personal.css | .task-detail-panel | 3163, 24297 |
| src/app/personal.css | .drawer-top-bar | 3199, 24301 |
| src/app/personal.css | .btn-mark-complete | 3215, 24501 |
| src/app/personal.css | .btn-icon | 3242, 22705, 24426 |
| src/app/personal.css | .btn-icon:hover | 3256, 22742, 24466 |
| src/app/personal.css | .btn-drawer-action | 3273, 24501 |
| src/app/personal.css | .task-submission-card | 3306, 24331 |
| src/app/personal.css | .submission-status-pill | 3353, 24540 |
| src/app/personal.css | .btn-add-submission-quick | 3400, 24501 |
| src/app/personal.css | .submission-open-badge | 3451, 24540 |
| src/app/personal.css | .submission-quick-actions | 3467, 24337 |
| src/app/personal.css | .btn-tiny-delete | 3473, 3502 |
| src/app/personal.css | .project-badge | 3558, 24540 |
| src/app/personal.css | .priority-badge | 3568, 12169, 24540 |
| src/app/personal.css | .task-detail-title | 3594, 22330 |
| src/app/personal.css | .inline-edit-icon | 3606, 22357 |
| src/app/personal.css | .task-detail-title:hover .inline-edit-icon | 3614, 22374 |
| src/app/personal.css | .btn-tiny-save | 3666, 24519 |
| src/app/personal.css | .btn-tiny-cancel | 3695, 24519 |
| src/app/personal.css | .drawer-description-box | 3718, 24325 |
| src/app/personal.css | .metadata-cards-grid | 3749, 6528 |
| src/app/personal.css | .meta-label | 3771, 14174 |
| src/app/personal.css | .subtasks-section | 3870, 24344 |
| src/app/personal.css | .subtasks-header | 3876, 24348 |
| src/app/personal.css | .subtasks-progress-badge | 3889, 24555 |
| src/app/personal.css | .subtasks-progress-bar | 3899, 24352 |
| src/app/personal.css | .subtasks-tree-list | 3916, 24356 |
| src/app/personal.css | .subtask-tree-row | 3922, 24363 |
| src/app/personal.css | .add-subtask-form | 3989, 24368, 24528 |
| src/app/personal.css | .btn-add-subtask | 4008, 24519 |
| src/app/personal.css | .btn-submit-comment | 4086, 24501 |
| src/app/personal.css | .recording-tabs a:hover | 4206, 6485 |
| src/app/personal.css | .notebook-index | 4284, 6389 |
| src/app/personal.css | dialog.editor | 4479, 15476, 15892 |
| src/app/personal.css | .editor-modal-head | 4517, 15514 |
| src/app/personal.css | .editor-title-wrap | 4528, 15532 |
| src/app/personal.css | .editor-badge-eyebrow | 4534, 24555 |
| src/app/personal.css | .editor-close-btn | 4557, 12864, 15551, 15968, 22705, 24426 |
| src/app/personal.css | .editor-close-btn:hover | 4585, 15576, 15985, 22742, 24466 |
| src/app/personal.css | .field-input | 4634, 8318, 15923 |
| src/app/personal.css | .field-select | 4634, 4649, 15923 |
| src/app/personal.css | .field-textarea | 4634, 4662, 15923 |
| src/app/personal.css | .field-input:focus | 4653, 15946 |
| src/app/personal.css | .field-select:focus | 4653, 15946 |
| src/app/personal.css | .field-textarea:focus | 4653, 15946 |
| src/app/personal.css | .btn-editor-cancel | 4725, 24501 |
| src/app/personal.css | .btn-editor-submit | 4742, 24501 |
| src/app/personal.css | .manager-topbar | 4940, 15284, 20528 |
| src/app/personal.css | .manager-location-wrap | 5007, 15858 |
| src/app/personal.css | .manager-location | 5035, 21308 |
| src/app/personal.css | .topbar-fav-btn | 5045, 5116, 15865 |
| src/app/personal.css | .topbar-fav-btn:hover | 5061, 5131, 15882 |
| src/app/personal.css | .manager-actions button:not(.quick-action-hub-btn) | 5075, 12870 |
| src/app/personal.css | .manager-actions a:not(.quick-action-hub-btn) | 5075, 12870 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn | 5096, 15390 |
| src/app/personal.css | .manager-actions .quick-action-hub-btn:hover | 5110, 15391 |
| src/app/personal.css | .manager-sidebar | 5137, 6960, 15291, 20533 |
| src/app/personal.css | .close-navigation | 5192, 5834 |
| src/app/personal.css | .manager-sidebar-nav-scroll | 5235, 15292, 16947, 20549 |
| src/app/personal.css | .sidebar-nav-item | 5291, 15298, 20552 |
| src/app/personal.css | .sidebar-nav-item:hover | 5305, 20557 |
| src/app/personal.css | .sidebar-item-icon | 5309, 20566 |
| src/app/personal.css | .sidebar-nav-item.is-active | 5328, 15299, 20560 |
| src/app/personal.css | .sidebar-nav-item[aria-current='page'] | 5328, 15299, 20560 |
| src/app/personal.css | .project-dot | 5362, 9397 |
| src/app/personal.css | .sidebar-avatar | 5393, 12875 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell | 5442, 16679, 18867 |
| src/app/personal.css | .calendar-days > section.calendar-day-cell:hover | 5456, 16694 |
| src/app/personal.css | .calendar-days > section.calendar-selected | 5464, 16701 |
| src/app/personal.css | .calendar-days > section.calendar-today | 5470, 16707 |
| src/app/personal.css | .calendar-days > section.calendar-outside | 5473, 16711 |
| src/app/personal.css | .calendar-add | 5485, 5529 |
| src/app/personal.css | .calendar-agenda-add-btn | 5561, 20007, 24501 |
| src/app/personal.css | .calendar-agenda-add-btn:hover | 5577, 20024 |
| src/app/personal.css | .calendar-agenda-title-group | 5581, 19963 |
| src/app/personal.css | .calendar-agenda-task-count | 5587, 19990, 24540 |
| src/app/personal.css | .calendar-agenda-actions | 5596, 20000 |
| src/app/personal.css | .calendar-agenda-clear-btn | 5602, 20029, 24501 |
| src/app/personal.css | .calendar-agenda-clear-btn:hover | 5616, 20044 |
| src/app/personal.css | .calendar-event | 5655, 6518, 18876 |
| src/app/personal.css | .color-style-card | 5717, 15437, 16769 |
| src/app/personal.css | .color-swatches-grid | 5723, 15413, 16744 |
| src/app/personal.css | .color-swatch-item | 5730, 15355, 15414 |
| src/app/personal.css | .color-swatch-item:hover | 5744, 15415 |
| src/app/personal.css | .color-swatch-item.is-selected | 5749, 15416 |
| src/app/personal.css | .home-panel | 5809, 6221, 16372 |
| src/app/personal.css | .next-meeting | 5809, 5881, 24276 |
| src/app/personal.css | .focus-task | 5809, 6085 |
| src/app/personal.css | .sprint-summary-card | 5809, 9681 |
| src/app/personal.css | .daily-group-card | 5809, 10299, 17043 |
| src/app/personal.css | .focus-task:hover | 5820, 6099 |
| src/app/personal.css | .sprint-summary-card:hover | 5820, 9695 |
| src/app/personal.css | .manager-main | 5827, 15283 |
| src/app/personal.css | .manager-dock | 5834, 21890 |
| src/app/personal.css | .manager-main .page-heading | 5839, 15285, 24263 |
| src/app/personal.css | .manager-main .page-heading h1 | 5842, 15286 |
| src/app/personal.css | .home-overview | 5876, 13642 |
| src/app/personal.css | .meeting-mode-pill | 5949, 11260 |
| src/app/personal.css | .round-arrow | 5982, 12879, 24534 |
| src/app/personal.css | .focus-filters | 6008, 6921, 24280 |
| src/app/personal.css | .focus-open | 6126, 12883 |
| src/app/personal.css | .home-text-link | 6213, 6954 |
| src/app/personal.css | .home-records | 6326, 16372 |
| src/app/personal.css | .home-records .section-head > a | 6334, 6954 |
| src/app/personal.css | select option | 6438, 22126 |
| src/app/personal.css | @media (max-width: 767px) → .manager-topbar | 6535, 23061 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location | 6549, 23126 |
| src/app/personal.css | @media (max-width: 767px) → .topbar-fav-btn | 6549, 23136 |
| src/app/personal.css | @media (max-width: 767px) → .manager-location-wrap | 6557, 21439, 23112 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions | 6560, 23139 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions button:not(.quick-action-hub-btn) | 6564, 23146 |
| src/app/personal.css | @media (max-width: 767px) → .manager-actions a:not(.quick-action-hub-btn) | 6564, 23146 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar | 6577, 6937 |
| src/app/personal.css | @media (max-width: 767px) → .manager-sidebar.is-open | 6583, 6940 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main | 6601, 20768, 20931, 23163 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock | 6606, 20934 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock a | 6626, 20955 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock button:not(.dock-center-action) | 6626, 20955 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock a:hover | 6646, 20975 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock button:not(.dock-center-action):hover | 6646, 20975 |
| src/app/personal.css | @media (max-width: 767px) → .manager-dock [aria-current='page'] | 6651, 20980 |
| src/app/personal.css | @media (max-width: 767px) → .home-grid | 6656, 23607 |
| src/app/personal.css | @media (max-width: 767px) → .home-panel | 6679, 6715 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task-list | 6682, 23609 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task | 6686, 23610 |
| src/app/personal.css | @media (max-width: 767px) → .focus-task h2 | 6690, 23611 |
| src/app/personal.css | @media (max-width: 767px) → .next-meeting | 6701, 23416 |
| src/app/personal.css | @media (max-width: 767px) → .round-arrow | 6708, 23428 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-days | 6735, 6749 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week | 6735, 7174 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-week strong | 6740, 7177 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-toolbar | 6838, 6949, 7143 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-title | 6842, 7146 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes | 6845, 7167 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-modes button | 6848, 7170 |
| src/app/personal.css | @media (max-width: 767px) → .calendar-month | 6851, 7158 |
| src/app/personal.css | .home-panel .section-head | 6887, 13255 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head | 7083, 20774 |
| src/app/personal.css | @media (max-width: 767px) → .task-database > .section-head .primary | 7112, 20778 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days | 7204, 21040 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-days > section.calendar-day-cell | 7209, 21061 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-header | 7220, 21080 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-day-number | 7227, 21090 |
| src/app/personal.css | .manager-main .notebook-row | 7344, 13643 |
| src/app/personal.css | .manager-main .notebook-link | 7363, 13644 |
| src/app/personal.css | .manager-main .notebook-add-btn | 7480, 13645 |
| src/app/personal.css | .stakeholder-badge | 7697, 12857 |
| src/app/personal.css | .close-btn | 8265, 12864, 22705, 24426 |
| src/app/personal.css | .close-btn:hover | 8293, 22742, 24466 |
| src/app/personal.css | .textarea-input | 8318, 8338 |
| src/app/personal.css | .select-input | 8318, 8345 |
| src/app/personal.css | .btn-cancel | 8379, 15181 |
| src/app/personal.css | .dropzone-success | 8497, 24540 |
| src/app/personal.css | .dropzone-error | 8517, 24540 |
| src/app/personal.css | .close-picker-btn | 8686, 22705, 24426 |
| src/app/personal.css | .close-picker-btn:hover | 8700, 22742, 24466 |
| src/app/personal.css | .btn-clear-range | 8828, 24501 |
| src/app/personal.css | .btn-apply-range | 8846, 24501 |
| src/app/personal.css | .range-days-pill | 8863, 24540 |
| src/app/personal.css | .card-task-code | 9356, 21335 |
| src/app/personal.css | .card-priority-pill | 9405, 24555 |
| src/app/personal.css | .card-date-pill | 9436, 24555 |
| src/app/personal.css | .scrum-assignee-pill | 9516, 12337 |
| src/app/personal.css | .sprint-action-btn | 9753, 22705, 24426 |
| src/app/personal.css | .sprint-action-btn:hover | 9768, 22742, 24466 |
| src/app/personal.css | .daily-tasks-container | 9845, 17040 |
| src/app/personal.css | .daily-nav-arrow-btn | 9888, 24534 |
| src/app/personal.css | .btn-quick-add-day | 10412, 24519 |
| src/app/personal.css | .task-code-tag | 10543, 12039 |
| src/app/personal.css | .task-title-text | 10555, 11065 |
| src/app/personal.css | .task-project-pill | 10571, 11081, 17121 |
| src/app/personal.css | .today-view-wrapper | 10684, 17028 |
| src/app/personal.css | .today-header-card | 10691, 17031 |
| src/app/personal.css | .today-quick-add-card | 10783, 17034, 21411 |
| src/app/personal.css | .today-grid-layout | 10875, 17037 |
| src/app/personal.css | .today-task-card | 10988, 18521 |
| src/app/personal.css | .today-check-circle | 11021, 21417 |
| src/app/personal.css | .today-check-circle.checked | 11041, 21430 |
| src/app/personal.css | .btn-reschedule-today | 11134, 24519 |
| src/app/personal.css | .task-table | 11390, 11710 |
| src/app/personal.css | .task-table tbody tr:last-child td | 11422, 11771 |
| src/app/personal.css | .task-table tbody tr:hover td | 11427, 11775 |
| src/app/personal.css | .badge-late | 11501, 12903 |
| src/app/personal.css | .table-btn-done | 11670, 12389 |
| src/app/personal.css | .task-assignee-empty | 12330, 12378 |
| src/app/personal.css | .custom-select-option-content | 12615, 22233 |
| src/app/personal.css | .meeting-detail-row | 12640, 12727 |
| src/app/personal.css | .meeting-section-box | 12655, 12734 |
| src/app/personal.css | .meeting-section-box > svg | 12740, 12747 |
| src/app/personal.css | .meeting-section-header | 12766, 15737 |
| src/app/personal.css | .task-project-label | 12896, 21323 |
| src/app/personal.css | .dash-stats-row | 12915, 21831, 24271 |
| src/app/personal.css | .dash-stat-link | 12925, 13257 |
| src/app/personal.css | .dash-stat-card | 12932, 13258, 15994, 21834, 22788 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent | 12951, 16014, 22799 |
| src/app/personal.css | .dash-stat-top | 12965, 13638, 16033 |
| src/app/personal.css | .dash-stat-label | 12972, 13639, 16040 |
| src/app/personal.css | .dash-stat-value | 12980, 16048 |
| src/app/personal.css | .dash-stat-sub | 12989, 13259, 13640, 16056 |
| src/app/personal.css | .dash-sparkline | 12999, 13632 |
| src/app/personal.css | .dash-bar-chart | 13007, 13401, 16119, 18676 |
| src/app/personal.css | .dash-bar-col | 13015, 16128, 18684 |
| src/app/personal.css | .dash-bar-count | 13024, 13436, 16148, 18706 |
| src/app/personal.css | .dash-bar-track | 13032, 13449, 16156, 18719 |
| src/app/personal.css | .dash-bar-fill | 13044, 13463, 16170, 18730 |
| src/app/personal.css | .bar-today .dash-bar-track | 13052, 13471, 16178 |
| src/app/personal.css | .bar-today .dash-bar-fill | 13057, 13476, 16183 |
| src/app/personal.css | .dash-bar-label | 13062, 13487, 16202, 18742 |
| src/app/personal.css | .bar-today .dash-bar-label | 13069, 18760 |
| src/app/personal.css | .dash-donut-wrap | 13075, 13521, 16214 |
| src/app/personal.css | .dash-donut-svg-wrap | 13082, 13529, 16221 |
| src/app/personal.css | .dash-donut-svg | 13089, 13536, 16228 |
| src/app/personal.css | .dash-donut-center | 13095, 13549, 16241 |
| src/app/personal.css | .dash-donut-center strong | 13105, 13559, 16251 |
| src/app/personal.css | .dash-donut-center span | 13112, 13566, 16258 |
| src/app/personal.css | .dash-donut-legend | 13120, 13574, 16264 |
| src/app/personal.css | .donut-legend-row | 13128, 16271 |
| src/app/personal.css | .donut-dot | 13135, 13607, 16291 |
| src/app/personal.css | .donut-legend-label | 13143, 13614, 16298 |
| src/app/personal.css | .donut-legend-val | 13149, 13622, 16305 |
| src/app/personal.css | .dash-proj-bar-row | 13162, 16312 |
| src/app/personal.css | .dash-proj-bar-row:hover | 13175, 16322 |
| src/app/personal.css | .dash-proj-bar-meta | 13180, 16326 |
| src/app/personal.css | .dash-proj-bar-label | 13187, 16332 |
| src/app/personal.css | .dash-proj-bar-pct | 13197, 16338 |
| src/app/personal.css | .dash-proj-bar-track | 13204, 16344 |
| src/app/personal.css | .dash-proj-bar-fill | 13212, 16352 |
| src/app/personal.css | .dashboard-controls | 13260, 15585 |
| src/app/personal.css | button.dash-bar-col | 13267, 13410 |
| src/app/personal.css | button.dash-bar-col:hover | 13268, 13425 |
| src/app/personal.css | .dash-analytics-row | 13270, 21682 |
| src/app/personal.css | @media (max-width: 900px) → .dash-analytics-row | 13278, 21690 |
| src/app/personal.css | .week-barchart-modern | 13296, 18587 |
| src/app/personal.css | .week-barchart-header | 13302, 18592 |
| src/app/personal.css | .week-barchart-metric | 13312, 18601 |
| src/app/personal.css | .week-metric-main | 13321, 18607 |
| src/app/personal.css | .week-metric-num | 13327, 18612 |
| src/app/personal.css | .week-metric-text-group | 13335, 18619 |
| src/app/personal.css | .week-metric-title | 13341, 18624 |
| src/app/personal.css | .week-metric-sub | 13347, 18630 |
| src/app/personal.css | .week-metric-pills | 13352, 18634 |
| src/app/personal.css | .week-metric-pill | 13359, 18640 |
| src/app/personal.css | .week-metric-pill.peak-pill | 13369, 18649 |
| src/app/personal.css | .week-filter-reset-chip | 13375, 18654 |
| src/app/personal.css | .week-filter-reset-chip:hover | 13390, 18668 |
| src/app/personal.css | .week-filter-reset-chip .reset-x | 13395, 18671 |
| src/app/personal.css | button.dash-bar-col.is-selected-bar | 13430, 18702 |
| src/app/personal.css | .dash-bar-count.has-value | 13444, 18715 |
| src/app/personal.css | .dash-bar-labels-wrap | 13480, 18736 |
| src/app/personal.css | .dash-bar-daynum | 13494, 18747 |
| src/app/personal.css | .today-badge-dot | 13500, 18752 |
| src/app/personal.css | .week-barchart-footer | 13507, 18764 |
| src/app/personal.css | .dash-chart-caption | 13513, 21382 |
| src/app/personal.css | .donut-segment | 13541, 16233 |
| src/app/personal.css | .donut-segment:hover | 13545, 16237 |
| src/app/personal.css | .relation-pill | 13661, 18834 |
| src/app/personal.css | .kpi-icon-wrap | 14216, 17453 |
| src/app/personal.css | .kpi-info | 14219, 17480 |
| src/app/personal.css | .manager-action-dialog | 14442, 15892 |
| src/app/personal.css | .action-modal-close | 14519, 15968, 21291, 22705, 24426 |
| src/app/personal.css | .action-modal-close:hover | 14535, 15985, 21303, 22742, 24466 |
| src/app/personal.css | :root[data-theme-color='lime'] | 15279, 20515 |
| src/app/personal.css | :root.dark[data-theme-color='lime'] | 15282, 20523 |
| src/app/personal.css | .workspace-page | 15290, 16364 |
| src/app/personal.css | .sidebar-group-toggle | 15294, 16972 |
| src/app/personal.css | .follow-up-panel | 15314, 16372, 16406, 17051 |
| src/app/personal.css | .follow-up-panel .section-head h2 | 15315, 16422 |
| src/app/personal.css | .follow-up-list | 15319, 16478, 16555 |
| src/app/personal.css | .follow-up-row | 15320, 16485, 16561 |
| src/app/personal.css | .follow-up-marker | 15324, 16505 |
| src/app/personal.css | .appearance-settings | 15345, 15439, 16769 |
| src/app/personal.css | .weekly-review | 15393, 16372 |
| src/app/personal.css | .settings-container | 15407, 16717, 17095 |
| src/app/personal.css | .settings-tabs-row | 15408, 16734, 17098 |
| src/app/personal.css | .settings-content-grid | 15412, 16727 |
| src/app/personal.css | .theme-live-preview-card | 15420, 15438, 16769 |
| src/app/personal.css | .settings-fields-grid | 15435, 16753 |
| src/app/personal.css | .security-settings-card | 15448, 16769 |
| src/app/personal.css | .backup-settings-card | 15450, 16769 |
| src/app/personal.css | .backup-action-boxes | 15451, 16761 |
| src/app/personal.css | .home-date-chip | 15834, 21855 |
| src/app/personal.css | .dash-stat-card:hover | 16008, 22794 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent:hover | 16020, 22807 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-label | 16024, 22813 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-sub | 16024, 22830 |
| src/app/personal.css | .dash-stat-card.dash-stat-accent .dash-stat-value | 16029, 22822 |
| src/app/personal.css | .dash-bar-col:hover | 16143, 18698 |
| src/app/personal.css | .home-journal | 16372, 21488 |
| src/app/personal.css | .follow-up-wrapper | 16399, 17048 |
| src/app/personal.css | .project-code-tag | 17596, 23754 |
| src/app/personal.css | .follow-up-compact-bar | 18395, 21860, 24292 |
| src/app/personal.css | .journal-join-chip | 18846, 21724 |
| src/app/personal.css | .journal-join-chip:hover | 18858, 21738 |
| src/app/personal.css | .calendar-agenda-day-head | 18887, 20059 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-nav-card:active | 19387, 19512 |
| src/app/personal.css | @media (max-width: 768px) → .mobile-sheet-footer-btn:active | 19485, 19512 |
| src/app/personal.css | .drawer-status-select-wrap | 19725, 22537 |
| src/app/personal.css | .drawer-priority-select-wrap | 19725, 19861, 22537 |
| src/app/personal.css | .drawer-status-select | 19733, 19832 |
| src/app/personal.css | .drawer-priority-select | 19733, 19877 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-trigger | 19755, 22549, 24494 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-trigger | 19755, 22549, 24494 |
| src/app/personal.css | .drawer-status-select-wrap.status-rencana .custom-select-trigger | 19771, 22566 |
| src/app/personal.css | .drawer-status-select-wrap.status-proses .custom-select-trigger | 19777, 22571 |
| src/app/personal.css | .drawer-status-select-wrap.status-selesai .custom-select-trigger | 19783, 22576 |
| src/app/personal.css | .drawer-status-select-wrap.status-dibatalkan .custom-select-trigger | 19789, 22581 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-rendah .custom-select-trigger | 19795, 22587 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-normal .custom-select-trigger | 19801, 22592 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-tinggi .custom-select-trigger | 19807, 22597 |
| src/app/personal.css | .drawer-priority-select-wrap.priority-mendesak .custom-select-trigger | 19813, 22602 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-chevron | 19819, 22608 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-chevron | 19819, 22608 |
| src/app/personal.css | .drawer-status-select-wrap .custom-select-menu | 19826, 22616 |
| src/app/personal.css | .drawer-priority-select-wrap .custom-select-menu | 19826, 22616 |
| src/app/personal.css | @media (max-width: 767px) → .manager-main .task-calendar .calendar-week | 21040, 21048 |
| src/app/personal.css | @media (max-width: 767px) → .timeline-mobile-list small | 21232, 21237 |
| src/app/personal.css | .activity-summary-section | 21244, 24373 |
| src/app/personal.css | .timeline-feed | 21250, 24377 |
| src/app/personal.css | .timeline-event | 21256, 24383 |
| src/app/personal.css | @media (max-width: 767px) → .home-date-chip | 21482, 23203 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-badge | 21867, 21872 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-snippet | 21867, 21881 |
| src/app/personal.css | .follow-up-compact-bar .compact-bar-actions | 21867, 21876 |
| src/app/personal.css | .project-section-nav | 21931, 24018, 24415 |
| src/app/personal.css | .project-next-actions > summary | 22077, 22094 |
| src/app/personal.css | .project-next-actions | 22093, 24069 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .follow-up-compact-bar | 22111, 23245 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-info | 22112, 23261 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-text-group | 22113, 23268 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-main-line | 22114, 23272 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-badge | 22115, 23278 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-snippet | 22116, 23289 |
| src/app/personal.css | @media (max-width: 767px) → .manager-home .compact-bar-actions | 22117, 23292 |
| src/app/personal.css | .custom-select-trigger | 22121, 22157, 24488 |
| src/app/personal.css | .custom-select-option | 22121, 22204 |
| src/app/personal.css | select:not(.custom-select-native) | 22129, 24488 |
| src/app/personal.css | .task-status-custom-select .custom-select-trigger | 22261, 24494 |
| src/app/personal.css | .drawer-properties-grid | 22380, 24317 |
| src/app/personal.css | .prop-user-chip | 22432, 24540 |
| src/app/personal.css | .prop-text-badge | 22486, 24540 |
| src/app/personal.css | .drawer-prop-control.date-prop-editable | 22500, 24540 |
| src/app/personal.css | button.btn-icon | 22705, 24426 |
| src/app/personal.css | button.close-drawer-btn | 22705, 24426 |
| src/app/personal.css | .close-drawer-btn | 22705, 24426 |
| src/app/personal.css | button.editor-close-btn | 22705, 24426 |
| src/app/personal.css | button.close-btn | 22705, 24426 |
| src/app/personal.css | button.action-modal-close | 22705, 24426 |
| src/app/personal.css | button.close-picker-btn | 22705, 24426 |
| src/app/personal.css | button.sprint-action-btn | 22705, 24426 |
| src/app/personal.css | button.btn-icon:hover | 22742, 24466 |
| src/app/personal.css | button.close-drawer-btn:hover | 22742, 24466 |
| src/app/personal.css | .close-drawer-btn:hover | 22742, 24466 |
| src/app/personal.css | button.editor-close-btn:hover | 22742, 24466 |
| src/app/personal.css | button.close-btn:hover | 22742, 24466 |
| src/app/personal.css | button.action-modal-close:hover | 22742, 24466 |
| src/app/personal.css | button.close-picker-btn:hover | 22742, 24466 |
| src/app/personal.css | button.sprint-action-btn:hover | 22742, 24466 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-label | 23027, 23039 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-value | 23029, 23040 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-card .dash-stat-sub | 23031, 23041 |
| src/app/personal.css | .dark .dash-stats-row > :nth-child(4) .dash-stat-icon-wrap | 23033, 23042 |
| src/app/personal.css | .project-properties-grid | 23861, 24407 |
| src/app/personal.css | .project-progress-card | 23948, 24411 |

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
- `30px`
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
- `var(--control-text-size, 13px)`
- `var(--control-text-size, 14px)`
- `var(--font-size-base)`
- `var(--font-size-sm)`
- `var(--font-size-xs)`
- `var(--page-title-size)`
- `var(--section-title-size)`
- `var(--table-td-font-size)`
- `var(--table-th-font-size)`

### height

- `0`
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
- `var(--btn-height-md)`
- `var(--btn-height-sm)`
- `var(--control-height-md)`
- `var(--table-th-height)`
