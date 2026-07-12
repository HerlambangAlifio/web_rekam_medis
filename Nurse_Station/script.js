let selectedPatient = null;

document.addEventListener("DOMContentLoaded", function () {

    loadQueue();

    setInterval(loadQueue, 5000);

    const btnSubmit = document.querySelector(".btn-primary-teal");

    if(btnSubmit){

        btnSubmit.addEventListener("click", kirimKeDokter);

    }

});


// ==========================
// LOAD ANTREAN
// ==========================

function loadQueue(){

    fetch("api_queue.php")

    .then(res=>res.json())

    .then(data=>{

        const list=document.getElementById("queueList");

        if(!list){
            console.error("queueList tidak ditemukan");
            return;
        }

        list.innerHTML="";

        if(data.length==0){

            list.innerHTML=`
            <div style="padding:20px;text-align:center;color:#888">
                Tidak ada antrean pasien.
            </div>
            `;

            return;
        }

        data.forEach(item=>{

            list.innerHTML+=`

            <div class="queue-card">

                <div class="card-top">

                    <span class="queue-number">
                        ${item.no_antrean}
                    </span>

                    <span class="status-badge waiting">
                        ${item.status_periksa}
                    </span>

                </div>

                <h4 class="patient-name">
                    ${item.nama_pasien}
                </h4>

                <p>${item.nama_poli}</p>

                <small>${item.nama_dokter}</small>

                <button
                    class="btn-panggil"
                    onclick="panggilPasien(${item.id_daftar},this)">
                    <i class="fa fa-bullhorn"></i>
                    Panggil
                </button>

            </div>

            `;

        });

    })

    .catch(err=>console.error(err));

}



// ==========================
// PANGGIL PASIEN
// ==========================

function panggilPasien(id,btn){

    selectedPatient=id;

    document.querySelectorAll(".queue-card")
    .forEach(c=>c.classList.remove("active"));

    btn.closest(".queue-card").classList.add("active");

    // aktifkan semua input

    document.querySelectorAll(".assessment-form-card input")
    .forEach(i=>i.disabled=false);

    document.querySelectorAll(".assessment-form-card textarea")
    .forEach(i=>i.disabled=false);

    alert("Pasien dipanggil. Silakan lakukan pemeriksaan tanda vital.");

}



// ==========================
// KIRIM KE DOKTER
// ==========================

function kirimKeDokter(){

    if(selectedPatient==null){

        alert("Silakan panggil pasien terlebih dahulu.");

        return;

    }

    const data={

        id_daftar:selectedPatient,

        status:"Menunggu Dokter",

        tekanan_darah:document.getElementById("td").value,

        nadi:document.getElementById("nadi").value,

        suhu_tubuh:document.getElementById("suhu").value,

        laju_pernapasan:document.getElementById("rr").value,

        berat_badan:document.getElementById("bb").value,

        tinggi_badan:document.getElementById("tb").value,

        keluhan_utama:document.getElementById("keluhan").value,

        alergi:document.getElementById("alergi").value,

        risiko_jatuh:document.getElementById("risiko").value

    };

    fetch("update_status.php",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    })

    .then(res=>res.json())

    .then(res=>{

        alert(res.message);

        selectedPatient=null;

        document.querySelectorAll(".assessment-form-card input")
        .forEach(i=>{

            i.value="";
            i.disabled=true;

        });

        document.querySelectorAll(".assessment-form-card textarea")
        .forEach(i=>{

            i.value="";
            i.disabled=true;

        });

        loadQueue();

    })

    .catch(err=>{

        console.error(err);

        alert("Gagal mengirim data.");

    });

}