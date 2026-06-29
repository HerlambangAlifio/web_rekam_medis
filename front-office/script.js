document.addEventListener("DOMContentLoaded", function() {
    
    // Interaktif: Tombol Bridging BPJS Vclaim
    const btnBridging = document.querySelector('.btn-outline-blue');
    if (btnBridging) {
        btnBridging.addEventListener('click', function() {
            alert('Sinkronisasi Bridging Vclaim BPJS sedang berjalan...');
        });
    }

    // Interaktif: Tombol Registrasi Pasien Baru
    const btnNewPatient = document.querySelector('.btn-teal');
    if (btnNewPatient) {
        btnNewPatient.addEventListener('click', function() {
            alert('Membuka formulir registrasi pasien baru.');
        });
    }

    // Interaktif: Tombol Terbitkan SEP Baru
    const btnSep = document.querySelector('.btn-block-blue');
    if (btnSep) {
        btnSep.addEventListener('click', function() {
            const inputField = document.querySelector('.vclaim-input-wrapper input');
            const cardNo = inputField ? inputField.value : '';
            alert('Memproses pembuatan Surat Eligibilitas Peserta (SEP) untuk Nomor Kartu: ' + cardNo);
        });
    }

    // Interaktif: Tombol Aksi Edit di Tabel Antrean
    const editButtons = document.querySelectorAll('.btn-edit-action');
    editButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            alert('Mengedit antrean indeks ke-' + (index + 1));
        });
    });
});