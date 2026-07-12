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
    // TOMBOL SELESAI
    // ===========================

    document.querySelector(".btn-primary")
    .addEventListener("click", function () {

        if(selectedPatient==null){

            alert("Pilih pasien terlebih dahulu.");

            return;

        }

        alert("Tahap berikutnya kita buat update status menjadi SELESAI.");

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



function pilihPasien(id,card=null){

    selectedPatient=id;

    document.querySelectorAll(".patient-card")
    .forEach(x=>x.classList.remove("active"));

    if(card){

        card.classList.add("active");

    }

    fetch("get_resep.php?id_daftar="+id)

    .then(res=>res.json())

    .then(data=>{

        const box=document.getElementById("resepContainer");

        box.innerHTML="";

        data.forEach(r=>{

            box.innerHTML+=`

            <div class="prescription-box mt-3">

                <strong>${r.nama_obat}</strong>

                <p>

                    ${r.signa}

                    <br>

                    Jumlah : ${r.jumlah}

                </p>

            </div>

            `;

        });

    });

}