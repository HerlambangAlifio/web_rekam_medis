let selectedPatientId = null;
let listObatGlobal = []; // Menyimpan daftar dummy obat dari server

document.addEventListener("DOMContentLoaded", function () {
    loadDaftarObat(); // Ambil daftar obat dulu
    loadQueue();
    setInterval(loadQueue, 3000);
});

// ===========================
// AMBIL MASTER DUMMY OBAT
// ===========================
function loadDaftarObat() {
    fetch("get_obat.php")
        .then(res => res.json())
        .then(res => {
            if (res.status === "success") {
                listObatGlobal = res.data;
                // Render baris pertama setelah daftar obat siap
                if (tbodyResep && tbodyResep.children.length === 0) {
                    tambahBarisResep();
                }
            }
        })
        .catch(err => console.error("Gagal memuat daftar obat:", err));
}

function loadQueue() {
    fetch("api_queue.php")
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("queueList");
            if (!list) return;

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

            if (selectedPatientId === null && data.length > 0) {
                tampilBanner(data[0]);
            }
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

    if (card) {
        card.classList.add("active");
    }
    tampilBanner(data);
}

function tampilBanner(data) {
    selectedPatientId = data.id_daftar;

    const avatar = document.getElementById("avatarPasien");
    if (avatar) avatar.innerHTML = data.nama_pasien.substring(0, 2).toUpperCase();

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
// TAMBAH BARIS RESEP (DROPDOWN)
// ===========================

const tbodyResep = document.getElementById("tbodyResep");

function tambahBarisResep(nama = "", signa = "", jumlah = "1") {
    const row = document.createElement("tr");

    // Opsi Dropdown
    let optionsObat = '<option value="">-- Pilih Obat --</option>';
    listObatGlobal.forEach(o => {
        const isSelected = (o.nama_obat === nama) ? 'selected' : '';
        optionsObat += `<option value="${o.nama_obat}" ${isSelected}>${o.nama_obat}</option>`;
    });

    row.innerHTML = `
        <td>
            <select class="table-input nama-obat" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px;">
                ${optionsObat}
            </select>
        </td>
        <td>
            <input type="text" class="table-input signa" value="${signa}" placeholder="3x1 sesudah makan" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px;">
        </td>
        <td>
            <input type="number" class="table-input jumlah" value="${jumlah || 1}" min="1" style="width:100%; padding:6px; border:1px solid #cbd5e1; border-radius:6px; font-size:13px;">
        </td>
        <td style="text-align:center">
            <button class="btn-delete-row" type="button" style="background:none; border:none; color:#be123c; cursor:pointer;">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </td>
    `;

    if (tbodyResep) {
        tbodyResep.appendChild(row);
    }
}

// Tombol Tambah Baris
const addBtn = document.getElementById("addMedRowBtn");
if (addBtn) {
    addBtn.addEventListener("click", () => {
        tambahBarisResep();
    });
}

// Event listener global untuk hapus baris resep
document.addEventListener("click", function (e) {
    if (e.target.closest(".btn-delete-row")) {
        e.target.closest("tr").remove();
    }
});

// ===========================
// SIMPAN RESEP & SOAP
// ===========================
document.getElementById("btnSaveResep").addEventListener("click", function () {
    if (!selectedPatientId) {
        alert("Silahkan pilih pasien terlebih dahulu.");
        return;
    }

    const subjective = document.getElementById("inputSubjective") ? document.getElementById("inputSubjective").value : "";
    const assessment = document.getElementById("inputAssessment") ? document.getElementById("inputAssessment").value : "";
    const plan = document.getElementById("inputPlan") ? document.getElementById("inputPlan").value : "";
    const resep = [];

    document.querySelectorAll("#tbodyResep tr").forEach(row => {
        const namaObatSelect = row.querySelector(".nama-obat");
        const signaInput = row.querySelector(".signa");
        const jumlahInput = row.querySelector(".jumlah");

        if (namaObatSelect && signaInput && jumlahInput) {
            if (namaObatSelect.value.trim() !== "") {
                resep.push({
                    nama_obat: namaObatSelect.value,
                    signa: signaInput.value,
                    jumlah: jumlahInput.value
                });
            }
        }
    });
    

    fetch("save_resep.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_daftar: selectedPatientId,
            subjective: subjective,
            assessment: assessment,
            plan: plan,
            resep: resep
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.status === "success") {
            alert(res.message);
            selectedPatientId = null;

            // Reset banner pasien
            document.getElementById("avatarPasien").innerHTML = "-";
            document.getElementById("namaPasien").innerHTML = "Belum ada pasien";
            document.getElementById("noRM").innerHTML = "No. RM : -";
            document.getElementById("keluhan").innerHTML = "-";
            document.getElementById("tekananDarah").innerHTML = "-";
            document.getElementById("nadi").innerHTML = "-";
            document.getElementById("suhu").innerHTML = "-";
            document.getElementById("beratBadan").innerHTML = "-";
            document.getElementById("tinggiBadan").innerHTML = "-";

            // Clear input SOAP
            if (document.getElementById("inputSubjective")) document.getElementById("inputSubjective").value = "";
            if (document.getElementById("inputAssessment")) document.getElementById("inputAssessment").value = "";
            if (document.getElementById("inputPlan")) document.getElementById("inputPlan").value = "";

            // Reset tabel resep
            if (tbodyResep) {
                tbodyResep.innerHTML = "";
                tambahBarisResep();
            }

            // Muat ulang antrean
            loadQueue();
        } else {
            alert(res.message);
        }
    })
    .catch(err => {
        console.error("Error:", err);
    });
});