document.addEventListener("DOMContentLoaded", function() {
    const btnBridging = document.querySelector('.btn-outline-blue');
    if (btnBridging) {
        btnBridging.addEventListener('click', function() {
            alert('Sinkronisasi Bridging Vclaim BPJS sedang berjalan...');
        });
    }

    const queueTableBody = document.querySelector('#queueTableBody');
    const dummyQueue = [
        {
            id: 'A-001',
            name: 'Budi Santoso',
            rm: '10-22-45',
            insurance: 'BPJS PBI',
            clinic: 'Poli Jantung',
            dpjp: 'dr. Heru Prasetyo, Sp.JP',
            status: 'Menunggu di Klinik'
        },
        {
            id: 'A-002',
            name: 'Siti Aminah',
            rm: '11-04-12',
            insurance: 'UMUM',
            clinic: 'Poli Anak',
            dpjp: 'dr. Maya Sari, Sp.A',
            status: 'Selesai'
        },
        {
            id: 'A-003',
            name: 'Dedi Kurniawan',
            rm: '10-88-21',
            insurance: 'BPJS Mandiri',
            clinic: 'Poli Gigi',
            dpjp: 'drg. Anita Wijaya',
            status: 'Menunggu di Klinik'
        },
        {
            id: 'A-004',
            name: 'Ratna Sari',
            rm: '12-15-33',
            insurance: 'ASURANSI SWASTA',
            clinic: 'Poli Mata',
            dpjp: 'dr. Bambang, Sp.M',
            status: 'Selesai'
        }
    ];

    const getInsuranceClass = function(insurance) {
        if (insurance.includes('BPJS')) return 'bpjs-pbi';
        if (insurance === 'UMUM') return 'umum';
        return 'swasta';
    };

    const getStatusClass = function(status) {
        return status === 'Selesai' ? 'done' : 'waiting';
    };

    const renderQueue = function() {
        if (!queueTableBody) return;

        queueTableBody.innerHTML = dummyQueue.map(function(item) {
            return `
                <tr>
                    <td class="queue-id">${item.id}</td>
                    <td class="patient-cell">
                        <strong>${item.name}</strong>
                        <span>RM: ${item.rm}</span>
                    </td>
                    <td><span class="tag-insurance ${getInsuranceClass(item.insurance)}">${item.insurance}</span></td>
                    <td class="doctor-cell">
                        <strong>${item.clinic}</strong>
                        <span>${item.dpjp}</span>
                    </td>
                    <td><span class="status-pill ${getStatusClass(item.status)}">${item.status}</span></td>
                    <td style="text-align: center;"><button class="btn-edit-action" type="button"><i class="fa-regular fa-pen-to-square"></i></button></td>
                </tr>
            `;
        }).join('');

        queueTableBody.querySelectorAll('.btn-edit-action').forEach(function(btn) {
            btn.addEventListener('click', function() {
                alert('Fitur edit data dummy sedang siap dikembangkan.');
            });
        });
    };

    renderQueue();

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
                        <span>Penjamin</span>
                        <select name="insurance" required>
                            <option value="">Pilih penjamin</option>
                            <option>BPJS PBI</option>
                            <option>BPJS Mandiri</option>
                            <option>UMUM</option>
                            <option>ASURANSI SWASTA</option>
                        </select>
                    </label>
                    <label>
                        <span>Klinik</span>
                        <input name="clinic" type="text" placeholder="Contoh: Poli Anak" required>
                    </label>
                    <label>
                        <span>DPJP</span>
                        <input name="dpjp" type="text" placeholder="Contoh: dr. Maya Sari" required>
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

    const closeModal = function() {
        modalOverlay.classList.remove('active');
    };

    const openModal = function() {
        modalOverlay.classList.add('active');
    };

    if (btnNewPatient) {
        btnNewPatient.addEventListener('click', openModal);
    }

    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay || event.target.closest('.modal-cancel')) {
            closeModal();
        }
    });

    const closeBtn = modalOverlay.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    const form = modalOverlay.querySelector('.modal-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const newPatient = {
                id: formData.get('queueNumber') || 'A-999',
                name: formData.get('patientName') || 'Pasien Baru',
                rm: '99-99-99',
                insurance: formData.get('insurance') || 'UMUM',
                clinic: formData.get('clinic') || 'Poli Umum',
                dpjp: formData.get('dpjp') || 'dr. Umum',
                status: 'Menunggu di Klinik'
            };

            dummyQueue.unshift(newPatient);
            renderQueue();
            form.reset();
            closeModal();
            alert('Pasien baru berhasil ditambahkan ke antrean dummy.');
        });
    }

    const btnSep = document.querySelector('.btn-block-blue');
    if (btnSep) {
        btnSep.addEventListener('click', function() {
            const inputField = document.querySelector('.vclaim-input-wrapper input');
            const cardNo = inputField ? inputField.value : '';
            alert('Memproses pembuatan Surat Eligibilitas Peserta (SEP) untuk Nomor Kartu: ' + cardNo);
        });
    }
});