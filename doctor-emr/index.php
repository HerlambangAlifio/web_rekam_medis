<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MedCloud SIMRS - EMR Dokter</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="dashboard-wrapper">
        
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h2>RS</h2>
                <p>Clinical System</p>
            </div>
            <nav class="sidebar-nav">
                <a href="../front-office/index.php" class="nav-item"><i class="fa-solid fa-desktop"></i> Front Office</a>
                <a href="../Nurse_Station/index.php" class="nav-item"><i class="fa-solid fa-user-nurse"></i> Nurse Station</a>
                <a href="../doctor-emr/index.php" class="nav-item active"><i class="fa-solid fa-user-doctor"></i> Doctor EMR</a>
                <a href="../billing/index.php" class="nav-item"><i class="fa-solid fa-file-invoice-dollar"></i> Billing</a>
            </nav>
            <div class="sidebar-footer">
                <a href="../login/index.html" class="logout-link"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </div>
        </aside>

        <main class="main-body">
            
            <header class="top-header">
                <div class="header-left">
                    <span class="brand-text">MedCloud SIMRS</span>
                    <span class="separator">/</span>
                    <span class="page-sub-title">EMR Dokter</span>
                </div>
                <div class="header-right">
                    <button class="icon-btn notification-badge"><i class="fa-regular fa-bell"></i></button>
                    <button class="icon-btn"><i class="fa-solid fa-gear"></i></button>
                    <button class="icon-btn"><i class="fa-regular fa-circle-question"></i></button>
                </div>
            </header>
                
            <div class="dashboard-grid">

                <aside class="queue-container">
                    <div class="queue-header">
                        <h3>Pasien Menunggu Dokter</h3>
                    </div>
                    <div id="queueList" class="queue-list">
                        </div>
                </aside>

                <section class="emr-center-panel">
                                
                    <div class="patient-banner">
                        <div class="patient-avatar-box" id="avatarPasien">
                            -
                        </div>
                        <div class="patient-primary-details">
                            <h2 id="namaPasien">Belum ada pasien</h2>
                            <div class="patient-sub-details">
                                <span id="noRM">No. RM : -</span>
                            </div>
                            <div class="patient-allergy">
                                <strong>Keluhan :</strong>
                                <span id="keluhan">-</span>
                            </div>
                        </div>
                        <div class="patient-vitals-grid">
                            <div class="vital-item">
                                <span class="vital-label">TD</span>
                                <span class="vital-value" id="tekananDarah">-</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">NADI</span>
                                <span class="vital-value" id="nadi">-</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">SUHU</span>
                                <span class="vital-value" id="suhu">-</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">BB</span>
                                <span class="vital-value" id="beratBadan">-</span>
                            </div>
                            <div class="vital-item">
                                <span class="vital-label">TB</span>
                                <span class="vital-value" id="tinggiBadan">-</span>
                            </div>
                        </div>
                    </div>

                    <div class="card prescription-card">
                        <div class="prescription-header">
                            <h3>E-Resep <button
class="btn btn-primary"
id="btnSaveResep">

Simpan Resep

</button></h3>
                        </div>
                        <table class="prescription-table" id="prescriptionTable">
                            <thead>
                                <tr>
                                    <th>Nama Obat</th>
                                    <th>Signa (Aturan Pakai)</th>
                                    <th style="width: 80px;">Jumlah</th>
                                    <th style="width: 40px; text-align: center;"></th>
                                </tr>
                            </thead>
<tbody id="tbodyResep">

</tbody>
                        </table>
                        <button class="add-med-btn" id="addMedRowBtn"><i class="fa-solid fa-plus"></i> Tambah Obat</button>
                    </div>
                </section>
            </div> </main>
    </div> <script src="script.js"></script>
</body>
</html>