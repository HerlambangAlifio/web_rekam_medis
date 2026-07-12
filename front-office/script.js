document.addEventListener("DOMContentLoaded", function() {
    
    // Logika tombol bridging bawaan
    const btnBridging = document.querySelector('.btn-outline-blue');
    if (btnBridging) {
        btnBridging.addEventListener('click', function() {
            alert('Sinkronisasi Bridging Vclaim BPJS sedang berjalan...');
        });
    }

    const queueTableBody = document.querySelector('#queueTableBody');

    // Pewarnaan label berdasarkan data penjamin dari database
    const getInsuranceClass = function(insurance) {
        if (insurance.includes('BPJS')) return 'bpjs-pbi';
        if (insurance === 'UMUM') return 'umum';
        return 'swasta';
    };

    // Pewarnaan status berdasarkan data dari database
    const getStatusClass = function(status) {
        return status === 'Selesai' ? 'done' : 'waiting';
    };

    // =========================================================
    // READ: AMBIL DATA DARI DATABASE (MENGGANTIKAN DATA DUMMY)
    // =========================================================
    const renderQueue = function() {
        if (!queueTableBody) return;

        // Ambil data langsung dari endpoint API PHP
        fetch('api.php')
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    // Jika data kosong di database
                    if (res.data.length === 0) {
                        queueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Belum ada antrean untuk hari ini.</td></tr>`;
                        return;
                    }

                    // Tampilkan data dinamis dari database ke dalam tabel
                    queueTableBody.innerHTML = res.data.map(function(item) {
                        return `
                            <tr>
                                <td class="queue-id">${item.no_antrean}</td>
                                <td class="patient-cell">
                                    <strong>${item.nama_pasien}</strong>
                                    <span>RM: ${item.no_rm}</span>
                                </td>
                                <td><span class="tag-insurance ${getInsuranceClass(item.penjamin)}">${item.penjamin}</span></td>
                                <td class="doctor-cell">
                                    <strong>${item.klinik}</strong>
                                    <span>${item.dpjp}</span>
                                </td>
                                <td><span class="status-pill ${getStatusClass(item.status_antrean)}">${item.status_antrean}</span></td>
                                <td style="text-align: center;">
                                    <button class="btn-edit-action" type="button" data-id="${item.no_antrean}">
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join('');

                    // Re-attach event listener untuk tombol edit dinamis jika diperlukan
                    queueTableBody.querySelectorAll('.btn-edit-action').forEach(function(btn) {
                        btn.addEventListener('click', function() {
                            const id = this.getAttribute('data-id');
                            alert('Fitur ubah status atau edit untuk antrean ' + id + ' siap dikembangkan.');
                        });
                    });
                } else {
                    console.error("Gagal memuat data dari server:", res.message);
                }
            })
            .catch(err => console.error("Kesalahan jaringan:", err));
    };

    // Jalankan pemanggilan data pertama kali saat halaman dimuat
    renderQueue();

    // =========================================================
    // CREATE: LOGIKA MODAL INPUT & SIMPAN KE DATABASE
    // =========================================================
    const btnNewPatient = document.querySelector('.action-header-buttons .btn-teal');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
        <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div class="modal-header">
                <div>
                    <h3 id="modal-title">Registrasi Pasien Baru</h3>
                    <p>Isi data antrean pasien baru di bawah ini.</p>
                </div>
                <button class="modal-close" type="button" aria-label="Tutup">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <form class="modal-form">
                <div class="form-grid">
                    <label>
                        <span>No. Antrean</span>
                        <input name="queueNumber" type="text" placeholder="Contoh: A-005" required>
                    </label>
                    <label>
                        <span>Nama Pasien</span>
                        <input name="patientName" type="text" placeholder="Masukkan nama pasien" required>
                    </label>
                    <label>
                        <span>No. RM</span>
                        <input name="patientRm" type="text" placeholder="Contoh: 12-34-56" required>
                    </label>
                    <label>
                        <span>Penjamin</span>
                        <select name="insurance" required>
                            <option value="">Pilih penjamin</option>
                            <option value="BPJS PBI">BPJS PBI</option>
                            <option value="BPJS Mandiri">BPJS Mandiri</option>
                            <option value="UMUM">UMUM</option>
                            <option value="ASURANSI SWASTA">ASURANSI SWASTA</option>
                        </select>
                    </label>
                 <label>
    <span>Klinik</span>
    <select name="clinic" required>
        <option value="">Pilih Poliklinik</option>
        <option value="1">Poli Umum</option>
        <option value="2">Poli Gigi</option>
        <option value="3">Poli Anak</option>
        <option value="4">Poli Kandungan</option>
    </select>
</label>

<label>
    <span>DPJP</span>
    <select name="dpjp" required>
        <option value="">Pilih Dokter</option>
        <option value="1">dr. Andi</option>
        <option value="2">dr. Budi</option>
    </select>
</label>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-outline-blue modal-cancel">Batal</button>
                    <button type="submit" class="btn btn-teal">Simpan</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modalOverlay);

    const closeModal = function() { modalOverlay.classList.remove('active'); };
    const openModal = function() { modalOverlay.classList.add('active'); };

    if (btnNewPatient) {
        btnNewPatient.addEventListener('click', openModal);
    }

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay || event.target.closest('.modal-cancel') || event.target.closest('.modal-close')) {
            closeModal();
        }
    });

    const form = modalOverlay.querySelector('.modal-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Ambil data kiriman dari elemen input form
            const dataObj = {
                queueNumber: form.queueNumber.value,
                patientName: form.patientName.value,
                no_rm: form.patientRm.value,
                insurance: form.insurance.value,
                clinic: form.clinic.value,
                dpjp: form.dpjp.value
            };

            // Kirim data terstruktur dalam bentuk JSON string ke api.php via POST
            fetch('api.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataObj)
            })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    alert(result.message);
                    form.reset();
                    closeModal();
                    renderQueue(); // Segera segarkan tabel agar data terbaru dari database langsung naik
                } else {
                    alert("Gagal mendaftarkan pasien: " + result.message);
                }
            })
            .catch(err => {
                console.error("Gagal melakukan registrasi:", err);
                alert("Terjadi gangguan koneksi ke server backend.");
            });
        });
    }

    // Logika tombol penerbitan SEP bawaan
    const btnSep = document.querySelector('.btn-block-blue');
    if (btnSep) {
        btnSep.addEventListener('click', function() {
            const inputField = document.querySelector('.vclaim-input-wrapper input');
            const cardNo = inputField ? inputField.value : '';
            alert('Memproses pembuatan Surat Eligibilitas Peserta (SEP) untuk Nomor Kartu: ' + cardNo);
        });
    }
});