# Step 12, Quality Check

## Tujuan

Pastikan dashboard siap dipakai untuk tahap storytelling final.

## Checklist fungsional

Pastikan:

```text
7 tab muncul.
Semua tab bisa diklik.
Semua chart render tanpa error.
Semua chart memakai data dari MySQL API.
Tidak ada angka hardcode.
Tooltip aktif di semua visual utama.
Jika API gagal, UI menampilkan pesan error yang jelas.
Jika data kosong, UI menampilkan empty state.
```

## Checklist visual

Pastikan:

```text
Font Google Sans aktif.
Warna mengikuti palette project dan palette tambahan.
Layout terasa seperti web presentasi.
Tiap tab punya judul besar.
Tiap visual ada dalam card yang rapi.
Chart tidak terlalu penuh label.
Profit negatif selalu merah.
Growth atau profit positif memakai hijau.
Warning atau discount tinggi memakai kuning/oranye.
```

## Checklist data

Pastikan:

```text
Total Sales sesuai database.
Total Profit sesuai database.
Distinct Order ID benar.
Distinct Customer ID benar.
Profit Margin = Profit / Sales.
Average Order Value = Sales / Orders.
Average Discount = AVG(discount).
Growth dihitung dari periode sebelumnya.
```

## Checklist D3.js

Pastikan:

```text
Chart responsive.
SVG memakai viewBox.
Container dibersihkan sebelum render ulang.
Tooltip tidak keluar viewport.
Hover memberi highlight.
Axis dan label terbaca jelas.
```

## Checklist API

Pastikan endpoint ini berjalan:

```text
/api/health
/api/analytics/summary
/api/analytics/sales-by-month
/api/analytics/overview-by-year
/api/analytics/overview-by-quarter
/api/analytics/category-summary
/api/analytics/subcategory-summary
/api/analytics/region-summary
/api/analytics/segment-summary
/api/analytics/top-customers?limit=10
/api/analytics/top-products?limit=10&sortBy=sales
```

## Jangan lakukan

Jangan:

```text
Menggunakan Chart.js untuk chart utama.
Membuat semua chart dalam satu halaman panjang tanpa tab.
Menggunakan warna random.
Menggunakan pie chart jika bar chart lebih jelas.
Menampilkan tabel terlalu besar.
Memberi label angka di semua titik sampai penuh.
Membuat tooltip yang hanya berisi satu angka.
Mengubah isi database.
Menghapus style lama project tanpa alasan.
Mengabaikan profit negatif.
```

## Kriteria selesai final

Dashboard dianggap selesai jika:

```text
Web presentasi 7 tab berjalan.
Semua visual D3.js tampil.
Semua data berasal dari MySQL API.
Tooltip informatif.
Warna konsisten.
Layout rapi dan responsif.
Siap untuk tahap berikutnya, yaitu storytelling final.
```
