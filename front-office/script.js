document.addEventListener("DOMContentLoaded", function() {
    
    // Logika tombol bridging bawaan
    const btnBridging = document.querySelector('.btn-outline-blue');
    if (btnBridging) {
        btnBridging.addEventListener('click', function() {
            alert('Sinkronisasi Bridging Vclaim BPJS sedang berjalan...');
        });
    }

    const queueTableBody = document.querySelector('#queueTableBody');
    const paginationContainer = document.querySelector('#paginationContainer');
    const paginationInfo = document.querySelector('#paginationInfo');

    // =========================================================
    // VARIABEL GLOBAL UNTUK PAGINATION & PENCARIAN
    // =========================================================
    let allQueueData = [];      // Menyimpan seluruh data asli dari database
    let filteredData = [];      // Menyimpan data setelah difilter (pencarian)
    let currentPage = 1;        // Halaman aktif saat ini
    const rowsPerPage = 5;      // Batasan jumlah antrean per halaman (bisa diubah sesuai keinginan)

    // Pewarnaan label berdasarkan data penjamin dari database
    const getInsuranceClass = function(insurance) {
        if (insurance && insurance.includes('BPJS')) return 'bpjs-pbi';
        if (insurance === 'UMUM') return 'umum';
        return 'swasta';
    };

    // Pewarnaan status berdasarkan data dari database (perbaikan bug 'status_antrean')
    const getStatusClass = function(status) {
        return status === 'Selesai' ? 'done' : 'waiting';
    };

    // =========================================================
    // FUNGSI RENDER DATA HANYA UNTUK HALAMAN AKTIF
    // =========================================================
    const displayTableData = function(page) {
        if (!queueTableBody) return;

        currentPage = page;
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        
        // Potong data sesuai batasan halaman (misal: indeks 0 sampai 5)
        const paginatedItems = filteredData.slice(start, end);

        if (paginatedItems.length === 0) {
            queueTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Belum ada antrean untuk ditampilkan.</td></tr>`;
            if (paginationInfo) paginationInfo.textContent = "Menampilkan 0 dari 0 antrean";
            return;
        }

        // Render baris tabel HTML
        queueTableBody.innerHTML = paginatedItems.map(function(item) {
            // Perbaikan: Jika database Anda menggunakan status_periksa, gunakan itu sebagai cadangan
            const statusText = item.status_antrean || item.status_periksa || "Menunggu Perawat";
            
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
                    <td><span class="status-pill ${getStatusClass(statusText)}">${statusText}</span></td>
                    <td style="text-align: center;">
                        <button class="btn-edit-action" type="button" data-id="${item.no_antrean}">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');

        // Teks info baris (Contoh: Menampilkan 1-5 dari 12 antrean)
        if (paginationInfo) {
            const actualEnd = Math.min(end, filteredData.length);
            paginationInfo.textContent = `Menampilkan ${start + 1}-${actualEnd} dari ${filteredData.length} antrean`;
        }

        // Re-attach event listener tombol edit
        queueTableBody.querySelectorAll('.btn-edit-action').forEach(function(btn) {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                alert('Fitur ubah status atau edit untuk antrean ' + id + ' siap dikembangkan.');
            });
        });
    };

    // =========================================================
    // FUNGSI BUAT TOMBOL PAGINATION SECARA DINAMIS
    // =========================================================
    const setupPagination = function() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = "";

        const pageCount = Math.ceil(filteredData.length / rowsPerPage);
        if (pageCount <= 1) return; // Jika halaman hanya 1, tidak perlu tombol halaman

        // 1. Tombol "Sebelumnya"
        const prevBtn = document.createElement('button');
        prevBtn.className = 'btn-page';
        prevBtn.textContent = 'Sebelumnya';
        if (currentPage === 1) prevBtn.disabled = true;
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayTableData(currentPage);
                setupPagination();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // 2. Tombol Angka Halaman (1, 2, 3, dst.)
        for (let i = 1; i <= pageCount; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `btn-page ${currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', function() {
                displayTableData(i);
                setupPagination();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // 3. Tombol "Berikutnya"
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn-page';
        nextBtn.textContent = 'Berikutnya';
        if (currentPage === pageCount) nextBtn.disabled = true;
        nextBtn.addEventListener('click', function() {
            if (currentPage < pageCount) {
                currentPage++;
                displayTableData(currentPage);
                setupPagination();
            }
        });
        paginationContainer.appendChild(nextBtn);
    };

    // =========================================================
    // READ: AMBIL DATA DARI DATABASE (LOAD AWAL)
    // =========================================================
    // =========================================================
    // READ: AMBIL DATA DARI DATABASE (LOAD AWAL)
    // =========================================================
    const renderQueue = function() {
        fetch('api.php')
            .then(response => response.json())
            .then(res => {
                if (res.status === 'success') {
                    allQueueData = res.data;
                    filteredData = [...allQueueData]; // Salin semua data ke variabel filter
                    
                    // --- TAMBAHKAN KODE INI DI SINI ---
                    const totalPatientsEl = document.querySelector('#totalPatients');
                    if (totalPatientsEl) {
                        // Menghitung jumlah total baris pendaftaran yang ada di database
                        totalPatientsEl.textContent = allQueueData.length;
                    }
                    // ----------------------------------

                    currentPage = 1; // Kembali ke halaman pertama
                    displayTableData(currentPage);
                    setupPagination();
                } else {
                    console.error("Gagal memuat data dari server:", res.message);
                }
            })
            .catch(err => console.error("Kesalahan jaringan:", err));
    };

    // Jalankan pemanggilan data pertama kali saat halaman dimuat
    renderQueue();


    // =========================================================
    // INTEGRASI FITUR PENCARIAN DENGAN PAGINATION
    // =========================================================
    const searchInput = document.querySelector('#searchQueueInput');
    const btnSearch = document.querySelector('#btnSearchQueue');

    const performSearch = function() {
        if (!searchInput) return;
        const keyword = searchInput.value.toUpperCase().trim();

        // Saring data dari array utama
        filteredData = allQueueData.filter(function(item) {
            const queueNo = item.no_antrean.toUpperCase();
            return queueNo.includes(keyword);
        });

        currentPage = 1; // Reset ke halaman 1 saat pencarian baru dilakukan
        displayTableData(currentPage);
        setupPagination();
    };

    if (btnSearch) btnSearch.addEventListener('click', performSearch);
    if (searchInput) searchInput.addEventListener('input', performSearch);


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

            const dataObj = {
                queueNumber: form.queueNumber.value,
                patientName: form.patientName.value,
                no_rm: form.patientRm.value,
                insurance: form.insurance.value,
                clinic: form.clinic.value,
                dpjp: form.dpjp.value
            };

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
                    renderQueue(); // Memuat ulang data dari database & memperbarui halaman
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