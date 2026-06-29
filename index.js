document.addEventListener("DOMContentLoaded", function() {
    
    // INTERAKTIVITAS: Memilih Metode Pembayaran
    const paymentMethods = document.querySelectorAll('.method-card');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Hapus class active dari seluruh metode
            paymentMethods.forEach(item => item.classList.remove('active'));
            
            // Tambahkan class active ke metode yang sedang di-klik
            this.classList.add('active');
            
            console.log("Metode pembayaran diubah ke:", this.getAttribute('data-method'));
        });
    });

    // INTERAKTIVITAS: Selesai / Pulang Button Action
    const btnSelesai = document.querySelector('.btn-primary');
    btnSelesai.addEventListener('click', function() {
        alert('Transaksi Berhasil Disimpan. Status Pasien: Selesai / Pulang.');
    });

    // INTERAKTIVITAS: Cetak Kuitansi Action
    const btnCetak = document.querySelector('.btn-outline');
    btnCetak.addEventListener('click', function() {
        alert('Menghubungkan ke printer... Dokumen Kuitansi dicetak.');
    });

});