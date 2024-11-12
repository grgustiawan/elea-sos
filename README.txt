Demo aplikasi bisa diakses di https://sos.galihrakagustiawan.site

Running Apps using Docker
1. Pastikan Docker Engine Berjalan
3. Buka Folder dimana file docker-compose.yaml berada
4. Buka CMD dan jalankan: docker-compose up --build
*Setelah dijalankan akan terbentuk frontend, backend, database dan isi datanya.
5. Aplikasi bisa diakses melalui localhost

Untuk Menghapus semua yang sudah dicompose sebelumnya
1. docker-compose down -v
4. docker image prune -a