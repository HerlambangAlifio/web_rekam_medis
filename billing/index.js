let selectedPatient = null;

document.addEventListener("DOMContentLoaded", function () {

    loadQueue();

    setInterval(loadQueue, 3000);

    // ===========================
    // METODE PEMBAYARAN
    // ===========================

    const paymentMethods = document.querySelectorAll(".method-card");

    paymentMethods.forEach(method => {

        method.addEventListener("click", function () {

            paymentMethods.forEach(item => item.classList.remove("active"));

            this.classList.add("active");

        });

    });

    // ===========================
// TOMBOL SELESAI / PULANG
// ===========================
document.querySelector(".btn-primary").addEventListener("click", function () {
    if (selectedPatient == null) {
        alert("Pilih pasien terlebih dahulu.");
        return;
    }

    // Konfirmasi tindakan kasir
    if (confirm("Apakah pasien ini sudah menyelesaikan pembayaran dan diizinkan pulang?")) {
        
        // Kirim request ke update_status.php menggunakan POST
        fetch("update_status.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_daftar: selectedPatient
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                alert(data.message);
                
                // Reset pasien terpilih ke null agar sistem dapat memuat antrean pertama yang tersisa
                selectedPatient = null;

                // Reset juga kontainer resep di sebelah kanan ke tampilan default
                document.getElementById("resepContainer").innerHTML = `
                    <div class="prescription-box mt-3">
                        <center>
                            <br>
                            <h4>Silakan pilih pasien</h4>
                            <p>Daftar resep akan muncul di sini.</p>
                            <br>
                        </center>
                    </div>
                `;

                // Muat ulang antrean secara instan tanpa menunggu interval 3 detik
                loadQueue();
            } else {
                alert("Gagal memperbarui status: " + data.message);
            }
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Terjadi kesalahan koneksi sistem.");
        });
    }
});

    // ===========================
    // CETAK
    // ===========================

    document.querySelector(".btn-outline")
    .addEventListener("click", function () {

        window.print();

    });

});



function loadQueue(){

    fetch("api_queue.php")

    .then(res=>res.json())

    .then(data=>{

        const list=document.getElementById("billingQueue");

        list.innerHTML="";

        document.getElementById("jumlahAntrean").innerHTML=data.length;

        data.forEach((p,index)=>{

            list.innerHTML+=`

            <div class="patient-card ${index==0?'active':''}"

                onclick="pilihPasien(${p.id_daftar},this)">

                <div class="avatar-text">

                    ${p.nama_pasien.substring(0,2).toUpperCase()}

                </div>

                <div class="patient-info">

                    <h4>${p.nama_pasien}</h4>

                    <p>

                        RM : ${p.no_rm}

                        <br>

                        ${p.nama_poli}

                    </p>

                </div>

            </div>

            `;

        });

        if(data.length>0 && selectedPatient==null){

            pilihPasien(data[0].id_daftar);

        }

    });

}



function pilihPasien(id, card = null) {
    selectedPatient = id;

    document.querySelectorAll(".patient-card")
        .forEach(x => x.classList.remove("active"));

    if (card) {
        card.classList.add("active");
    }

    fetch("get_resep.php?id_daftar=" + id)
        .then(res => res.json())
        .then(data => {
            const box = document.getElementById("resepContainer");
            box.innerHTML = "";

            // Cek jika response sukses dan memiliki item resep
            if (data.status === "success" && data.items && data.items.length > 0) {
                
                // Render setiap item obat
                data.items.forEach(r => {
                    box.innerHTML += `
                        <div class="prescription-box mt-3">
                            <div class="d-flex justify-between align-center">
                                <strong>${r.nama_obat}</strong>
                                <span class="bold text-primary">Rp ${r.subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            <p class="subtext mt-2">
                                ${r.signa} <br>
                                Jumlah : ${r.jumlah} x Rp ${r.harga_satuan.toLocaleString('id-ID')}
                            </p>
                        </div>
                    `;
                });

                // Render Total Pembayaran / Grand Total di bagian bawah resep
                box.innerHTML += `
                    <div class="total-banner mt-3">
                        <span>Total Resep:</span>
                        <span class="total-amount">Rp ${data.grand_total.toLocaleString('id-ID')}</span>
                    </div>
                `;

            } else {
                box.innerHTML = `
                    <div class="prescription-box mt-3 text-center">
                        <p class="text-muted">Tidak ada resep obat untuk pasien ini.</p>
                    </div>
                `;
            }
        })
        .catch(err => {
            console.error("Error fetching resep:", err);
        });
}
    

