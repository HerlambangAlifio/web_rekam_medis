let selectedPatientId = null;

document.addEventListener("DOMContentLoaded", function () {
    loadQueue();
    setInterval(loadQueue, 3000);
});

function loadQueue() {
    fetch("api_queue.php")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("queueList");
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = "<p>Tidak ada pasien.</p>";
                return;
            }

            data.forEach((p, index) => {
                const pasien = encodeURIComponent(JSON.stringify(p));

                list.innerHTML += `
                    <div class="queue-card ${index === 0 ? 'active' : ''}"
                         onclick="pilihPasien('${pasien}', this)">
                        <div class="card-top">
                            <span class="queue-number">${p.no_antrean}</span>
                        </div>
                        <h4>${p.nama_pasien}</h4>
                        <small>${p.nama_poli}</small>
                    </div>
                `;
            });

            tampilBanner(data[0]);
        })
        .catch(err => {
            console.error(err);
        });
}

function pilihPasien(data, card) {
    data = JSON.parse(decodeURIComponent(data));

    document.querySelectorAll(".queue-card").forEach(item => {
        item.classList.remove("active");
    });

    card.classList.add("active");
    tampilBanner(data);
}

function tampilBanner(data) {
    selectedPatientId = data.id_daftar;

    document.getElementById("avatarPasien").innerHTML =
        data.nama_pasien.substring(0, 2).toUpperCase();

    document.getElementById("namaPasien").innerHTML = data.nama_pasien;
    document.getElementById("noRM").innerHTML = "No. RM : " + data.no_rm;
    document.getElementById("keluhan").innerHTML = data.keluhan_utama || "-";
    document.getElementById("tekananDarah").innerHTML = data.tekanan_darah || "-";
    document.getElementById("nadi").innerHTML = data.nadi || "-";
    document.getElementById("suhu").innerHTML = data.suhu_tubuh || "-";
    document.getElementById("beratBadan").innerHTML = data.berat_badan || "-";
    document.getElementById("tinggiBadan").innerHTML = data.tinggi_badan || "-";
}

// ===========================
// TAMBAH BARIS RESEP
// ===========================

const tbodyResep = document.getElementById("tbodyResep");

function tambahBarisResep(nama = "", signa = "", jumlah = "") {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="text" class="table-input nama-obat" value="${nama}">
        </td>
        <td>
            <input type="text" class="table-input signa" value="${signa}">
        </td>
        <td>
            <input type="number" class="table-input jumlah" value="${jumlah}">
        </td>
        <td style="text-align:center">
            <button class="btn-delete-row">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    `;

    tbodyResep.appendChild(row);
}

// Satu baris kosong saat halaman dibuka
tambahBarisResep();

document.getElementById("addMedRowBtn").addEventListener("click", () => {
    tambahBarisResep();
});

// Event listener global untuk hapus baris resep
document.addEventListener("click", function (e) {
    if (e.target.closest(".btn-delete-row")) {
        e.target.closest("tr").remove();
    }
});

// Event listener untuk menyimpan resep
document.getElementById("btnSaveResep").addEventListener("click", function () {
    const resep = [];

    document.querySelectorAll("#tbodyResep tr").forEach(row => {
        const namaObatInput = row.querySelector(".nama-obat");
        const signaInput = row.querySelector(".signa");
        const jumlahInput = row.querySelector(".jumlah");

        // Memastikan element input ditemukan sebelum mengambil nilainya
        if (namaObatInput && signaInput && jumlahInput) {
            resep.push({
                nama_obat: namaObatInput.value,
                signa: signaInput.value,
                jumlah: jumlahInput.value
            });
        }
    });

    console.log(selectedPatientId);

    fetch("save_resep.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_daftar: selectedPatientId,
            resep: resep
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.status == "success") {
            alert(res.message);
            selectedPatientId = null;

            document.getElementById("avatarPasien").innerHTML = "-";
            document.getElementById("namaPasien").innerHTML = "Belum ada pasien";
            document.getElementById("noRM").innerHTML = "No. RM : -";
            document.getElementById("keluhan").innerHTML = "-";
            document.getElementById("tekananDarah").innerHTML = "-";
            document.getElementById("nadi").innerHTML = "-";
            document.getElementById("suhu").innerHTML = "-";
            document.getElementById("beratBadan").innerHTML = "-";
            document.getElementById("tinggiBadan").innerHTML = "-";

            if (tbodyResep) {
                tbodyResep.innerHTML = "";
                tambahBarisResep(); // Reset baris resep jadi kosong kembali
            }

            loadQueue();
        } else {
            alert(res.message);
        }
    })
    .catch(err => {
        console.error(err);
    });
}); // <--- Tanda penutup ini yang sebelumnya hilang di kode Anda