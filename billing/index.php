<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MedCloud SIMRS - Kasir & Farmasi</title>
    <link rel="stylesheet" href="style.css">
    <!-- Font Awesome untuk Icon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <div class="dashboard-container">
        
        <!-- SIDEBAR -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h2>RS</h2>
                <p>Clinical System</p>
            </div>
            <nav class="sidebar-nav">
                <a href="../front-office/index.php" class="nav-item"><i class="fa-solid fa-desktop"></i> Front Office</a>
                <a href="../Nurse_Station/index.php" class="nav-item"><i class="fa-solid fa-user-nurse"></i> Nurse Station</a>
                <a href="../doctor-emr/index.php" class="nav-item"><i class="fa-solid fa-user-doctor"></i> Doctor EMR</a>
                <a href="../billing/index.php" class="nav-item active"><i class="fa-solid fa-file-invoice-dollar"></i> Billing</a>
            </nav>
            <div class="sidebar-footer">
                <a href="../login/index.html" class="logout-link"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </div>
        </aside>

        <!-- MAIN CONTENT AREA -->
        <div class="main-content">
            
            <!-- TOP NAVBAR -->
            <header class="navbar">
                <div class="nav-left">
                    <span class="logo-text">MedCloud <small>SIMRS</small></span>
                    <nav class="top-nav-links">
                        <!-- <a href="#" class="active">Kasir Utama</a> -->
                        <!-- <a href="#">Farmasi Klinis</a>
                        <a href="#">Laporan Harian</a> -->
                    </nav>
                </div>
                <div class="nav-right">
                    <div class="search-bar">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Cari Pasien / No. RM...">
                    </div>
                    <i class="fa-regular fa-bell icon-btn"></i>
                    <i class="fa-solid fa-gear icon-btn"></i>
                    <div class="user-profile">
                        <!-- <img src="https://via.placeholder.com/35" alt="User Avatar"> -->
                    </div>
                </div>
            </header>

            <!-- DASHBOARD BODY CONTENT -->
            <div class="content-body">
                
                <!-- LEFT COLUMN: BILLING & PAYMENT -->
                <section class="billing-section">
                    
                    <!-- Pilih Pasien Card -->
                    <div class="card shadow-sm mb-4">
                        <div class="card-header d-flex justify-between align-center">
                            <h3>Pilih Pasien Billing</h3>
                            <span class="badge badge-purple">
    ANTRIAN: <span id="jumlahAntrean">0</span>
</span>
                        </div>
                        <div class="patient-cards-grid mt-3" id="billingQueue"></div>
                    </div>

                    <!-- Metode Pembayaran Card -->
                    <div class="card shadow-sm">
                        <h3>Metode Pembayaran</h3>
                        <div class="payment-methods-grid mt-3">
                            <div class="method-card active" data-method="tunai">
                                <i class="fa-solid fa-money-bill-wave"></i>
                                <span>Tunai</span>
                            </div>
                            <div class="method-card" data-method="card">
                                <i class="fa-regular fa-credit-card"></i>
                                <span>Debit/Kredit</span>
                            </div>
                            <div class="method-card" data-method="qris">
                                <i class="fa-solid fa-qrcode"></i>
                                <span>QRIS</span>
                            </div>
                            <div class="method-card" data-method="jaminan">
                                <span class="bpjs-logo-text">BPJS</span>
                                <span>Jaminan</span>
                            </div>
                        </div>
                        <div class="action-buttons-container mt-4">
                            <button class="btn btn-outline"><i class="fa-solid fa-print"></i> Cetak Kuitansi</button>
                            <button class="btn btn-primary"><i class="fa-solid fa-circle-check"></i> Selesai / Pulang</button>
                        </div>
                    </div>

                </section>

                <!-- RIGHT COLUMN: E-RESEP & PHARMACY METRICS -->
                <section class="pharmacy-section">
                    
                    <!-- E-Resep Aktif Card -->
                    <div class="card shadow-sm mb-4">
                        <div class="card-header d-flex justify-between align-center">
                            <h3>E-Resep Aktif</h3>
                            <div class="realtime-indicator">
                                <small class="text-muted">Real-time Dashboard Farmasi</small>
                                <span class="dot green animated"></span>
                            </div>
                        </div>

<div id="resepContainer">

    <div class="prescription-box mt-3">

        <center>

            <br>

            <h4>Silakan pilih pasien</h4>

            <p>Daftar resep akan muncul di sini.</p>

            <br>

        </center>

    </div>

</div>

                </section>

            </div>
        </div>
    </div>

    <script src="index.js"></script>
</body>
</html>