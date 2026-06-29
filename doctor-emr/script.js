document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Logika Pengalihan Tab Dokumentasi SOAP
    const tabs = document.querySelectorAll(".soap-tab");
    const textarea = document.querySelector(".soap-textarea");

    // Catatan placeholder atau tiruan isi database berdasarkan tab
    const tabContents = {
        subjektif: "Pasien mengeluh pusing sejak tadi pagi. Leher terasa kaku dan pegal. Tidur kurang nyenyak semalam. Riwayat hipertensi sejak 2 tahun lalu namun kontrol tidak teratur.",
        objektif: "Kesadaran: Compos Mentis. Tekanan Darah: 120/80 mmHg. Nadi: 82 x/menit. Suhu: 36.7 °C. Kepala/Leher: JVP tidak meningkat, pembesaran KGB (-). Jantung: Irama reguler, bising jantung (-).",
        asesmen: "Diagnosis Kerja: Essential (primary) hypertension (ICD-10: I10).",
        plan: "Rencana Pengobatan: Pemberian Amlodipine 5mg sekali sehari. Edukasi pembatasan konsumsi garam dan olahraga ringan teratur. Kontrol kembali ke poli dalam 2 minggu."
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Hapus kelas aktif dari tab sebelumnya
            tabs.forEach(t => t.classList.remove("active"));
            // Tambahkan kelas aktif pada tab terpilih
            this.classList.add("active");

            // Ubah isi konten teks sesuai tab yang dipilih
            const tabKey = this.getAttribute("data-tab");
            if (tabContents[tabKey]) {
                textarea.value = tabContents[tabKey];
            }
        });
    });

    // 2. Logika Interaksi Tambah Baris Resep Obat (E-Resep)
    const addMedRowBtn = document.getElementById("addMedRowBtn");
    const prescriptionTableBody = document.querySelector("#prescriptionTable tbody");

    if (addMedRowBtn && prescriptionTableBody) {
        addMedRowBtn.addEventListener("click", function () {
            // Ambil baris tiruan isian baru (baris kedua)
            const inputRow = document.querySelector(".row-input-new");
            const inputs = inputRow.querySelectorAll("input");
            
            const namaObat = inputs[0].value.trim();
            const signa = inputs[1].value.trim();
            const jumlah = inputs[2].value.trim();

            // Validasi sederhana: pastikan nama obat diisi sebelum ditambahkan
            if (namaObat === "") {
                alert("Silakan isi nama obat terlebih dahulu pada baris pencarian.");
                inputs[0].focus();
                return;
            }

            // Buat elemen baris tabel baru (tr) untuk dimasukkan ke daftar atas
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <td><input type="text" class="table-input" value="${namaObat}"></td>
                <td><input type="text" class="table-input" value="${signa}"></td>
                <td><input type="number" class="table-input" value="${jumlah}"></td>
                <td style="text-align: center;"><button class="btn-delete-row"><i class="fa-solid fa-xmark"></i></button></td>
            `;

            // Pasang event listener hapus baris pada tombol hapus yang baru dibuat
            newRow.querySelector(".btn-delete-row").addEventListener("click", function () {
                newRow.remove();
            });

            // Masukkan baris baru tepat sebelum baris input pencarian obat
            prescriptionTableBody.insertBefore(newRow, inputRow);

            // Bersihkan kolom pencarian agar bisa digunakan kembali
            inputs[0].value = "";
            inputs[1].value = "";
            inputs[2].value = "";
            inputs[0].focus();
        });
    }

    // Pasang handler penghapusan untuk baris obat bawaan pertama (Amlodipine)
    const defaultDeleteBtn = document.querySelector(".btn-delete-row");
    if (defaultDeleteBtn) {
        defaultDeleteBtn.addEventListener("click", function () {
            this.closest("tr").remove();
        });
    }

    // 3. Tombol Aksi Finalisasi & Simpan EMR
    const btnSaveEmr = document.querySelector(".btn-save-emr");
    const confirmCheckbox = document.getElementById("confirmCheckbox");

    if (btnSaveEmr) {
        btnSaveEmr.addEventListener("click", function () {
            if (confirmCheckbox && !confirmCheckbox.checked) {
                alert("Harap centang kotak konfirmasi validasi data terlebih dahulu sebelum melakukan finalisasi.");
                return;
            }
            alert("Sukses! Rekam Medis Elektronik (EMR) pasien berhasil dikunci, ditandatangani secara digital, dan disinkronisasikan.");
        });
    }
});