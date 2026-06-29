document.addEventListener("DOMContentLoaded", function() {

    // INTERAKTIVITAS 1: Simulasi pemilihan antrean pasien di kolom kiri
    const queueCards = document.querySelectorAll('.queue-card');
    
    queueCards.forEach(card => {
        card.addEventListener('click', function() {
            // Hapus status aktif dari semua kartu
            queueCards.forEach(c => c.classList.remove('active'));
            
            // Tambahkan kelas aktif pada kartu yang diklik
            this.classList.add('active');
            
            // Contoh logic dinamis membaca nama pasien
            const patientName = this.querySelector('.patient-name').innerText;
            console.log("Memuat data asesmen untuk pasien: " + patientName);
        });
    });

    // INTERAKTIVITAS 2: Tombol Kirim Ke Dokter ("Siap Diperiksa Dokter")
    const btnSubmit = document.querySelector('.btn-primary-teal');
    if(btnSubmit) {
        btnSubmit.addEventListener('click', function() {
            alert('Sukses: Data Tanda Vital berhasil dikirim ke Dokter EMR.');
        });
    }

    // INTERAKTIVITAS 3: Tombol Simpan Draft
    const btnDraft = document.querySelector('.btn-outline');
    if(btnDraft) {
        btnDraft.addEventListener('click', function() {
            alert('Draft asesmen berhasil disimpan secara lokal.');
        });
    }
});