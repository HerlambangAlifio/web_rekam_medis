document.addEventListener("DOMContentLoaded", function() {
    // Daftarkan fungsi ke objek window agar bisa dipanggil langsung dari atribut onclick HTML
    window.renderQueue = function() {
        const adminQueueTableBody = document.querySelector('#adminQueueTableBody');
        if (!adminQueueTableBody) return;

        // Tampilkan indikator loading ringan
        adminQueueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Memuat data dari server...</td></tr>`;

        // Panggil endpoint GET pada admin-api.php
        fetch('./admin-api.php')
            .then(response => {
                if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
                return response.json();
            })
            .then(res => {
                if (res.status === 'success') {
                    if (res.data.length === 0) {
                        adminQueueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Tidak ada data log antrean sistem.</td></tr>`;
                        return;
                    }

                    // Render setiap baris data dari database
                    adminQueueTableBody.innerHTML = res.data.map(function(item) {
                        // Logika pewarnaan status pill
                        const statusClass = item.status_antrean === 'Selesai' ? 'done' : 'waiting';
                        
                        // Switch tombol aksi berdasarkan status saat ini
                        let actionButton = '';
                        if (item.status_antrean === 'Menunggu di Klinik') {
                            actionButton = `<button class="btn-status-done" onclick="updateStatus(${item.id}, 'Selesai')"><i class="fa-solid fa-check"></i> Selesai</button>`;
                        } else {
                            actionButton = `<button class="btn-status-wait" onclick="updateStatus(${item.id}, 'Menunggu di Klinik')"><i class="fa-solid fa-clock"></i> Antrekan</button>`;
                        }

                        return `
                            <tr>
                                <td style="color: var(--text-muted); font-size:11px;">${item.tanggal_antrean}</td>
                                <td class="queue-id"><strong>${item.no_antrean}</strong></td>
                                <td class="patient-cell">
                                    <strong>${item.nama_pasien}</strong>
                                    <span>RM: ${item.no_rm}</span>
                                </td>
                                <td class="doctor-cell">
                                    <strong>${item.klinik}</strong>
                                    <span>${item.dpjp}</span>
                                </td>
                                <td><span class="status-pill ${statusClass}">${item.status_antrean}</span></td>
                                <td style="text-align: center;">
                                    ${actionButton}
                                    <button class="btn-delete-admin" onclick="deleteAntrean(${item.id})"><i class="fa-regular fa-trash-can"></i> Hapus</button>
                                </td>
                            </tr>
                        `;
                    }).join('');
                } else {
                    adminQueueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">${res.message || 'Gagal memuat data dari server.'}</td></tr>`;
                }
            })
            .catch(err => {
                console.error("Gagal mengambil data:", err);
                adminQueueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red;">Gagal memuat data dari server: ${err.message}</td></tr>`;
            });
    };

    // Fungsi Mengubah Status Antrean Pasien (PUT)
    window.updateStatus = function(id, statusBaru) {
        fetch('admin-api.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, status: statusBaru })
        })
        .then(res => res.json())
        .then(result => {
            if (result.status === 'success') {
                renderQueue(); // Segarkan isi tabel komponen
            } else {
                alert("Gagal memperbarui status: " + result.message);
            }
        })
        .catch(err => alert("Terjadi masalah jaringan"));
    };

    // Fungsi Menghapus Rekor Antrean (DELETE)
    window.deleteAntrean = function(id) {
        if (confirm("Apakah Anda sangat yakin ingin menghapus antrean ini secara permanen dari database?")) {
            fetch('admin-api.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    alert(result.message);
                    renderQueue(); // Segarkan isi tabel komponen
                } else {
                    alert("Gagal menghapus rekor: " + result.message);
                }
            })
            .catch(err => alert("Terjadi masalah jaringan"));
        }
    };

    // Eksekusi otomatis saat admin pertama kali membuka halaman
    renderQueue();
});