<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MedCloud SIMRS - Nurse Station</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
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
                <a href="../Nurse_Station/index.php" class="nav-item active"><i class="fa-solid fa-user-nurse"></i> Nurse Station</a>
                <a href="../doctor-emr/index.php" class="nav-item"><i class="fa-solid fa-user-doctor"></i> Doctor EMR</a>
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
                    <div class="integration-status">
                        <span class="status-label">SatuSehat Connected</span>
                        <div class="status-dots">
                            <span class="dot-green"></span>
                            <span class="dot-green"></span>
                        </div>
                    </div>
                </div>
                <div class="header-right">
                    <div class="search-wrapper">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Cari Pasien / Layanan...">
                    </div>
                    <button class="icon-notification"><i class="fa-regular fa-bell"></i></button>
                    <button class="icon-settings"><i class="fa-solid fa-gear"></i></button>
                    <button class="icon-help"><i class="fa-regular fa-circle-question"></i></button>
                </div>
            </header>

            <div class="dashboard-grid">
                
                <aside class="queue-container">
                    <div class="queue-header">
                        <h3>Antrean Aktif</h3>
                        <p>Poli Penyakit Dalam - Dr. Gunawan</p>
                    </div>
                    <div class="queue-list" id="queueList"></div>
                </aside>

                <section class="form-container">
                    
                    <div class="content-card progress-card">
                        <div class="progress-header">
                            <span>Progres Asesmen</span>
                            <strong>65% Selesai</strong>
                        </div>
                        <div class="progress-bar-wrapper">
                            <div class="progress-fill" style="width: 65%;"></div>
                        </div>
                        <div class="progress-steps">
                            <div class="step completed"><i class="fa-solid fa-circle-check"></i> IDENTITAS</div>
                            <div class="step completed"><i class="fa-solid fa-circle-check"></i> TANDA VITAL</div>
                            <div class="step active"><i class="fa-regular fa-circle"></i> RIWAYAT & SKRINING</div>
                            <div class="step"><i class="fa-regular fa-circle"></i> FINALISASI</div>
                        </div>
                    </div>

                    <div class="content-card assessment-form-card">
                        <div class="form-title">
                            <div class="form-icon"><i class="fa-solid fa-file-medical"></i></div>
                            <h2>Asesmen Awal & Tanda Vital (TTV)</h2>
                        </div>

                        <div class="form-section">
                            <h3 class="section-heading">Tanda-Tanda Vital</h3>
                            <div class="inputs-grid-6">
                                <div class="input-group">
                                    <label>Tekanan Darah (mmHg)</label>
                                    <input
type="text"
id="td"
placeholder="120/80"
>
                                </div>
                                <div class="input-group">
                                    <label>Nadi (bpm)</label>
                                    <input type="text" id="nadi" placeholder="80">
                                </div>
                                <div class="input-group">
                                    <label>Suhu (°C)</label>
                                    <input type="text" id="suhu" placeholder="36.5">
                                </div>
                                <div class="input-group">
                                    <label>Berat Badan (kg)</label>
                                    <input
type="text"
id="bb"
placeholder="70"
>
                                </div>
                                <div class="input-group">
                                    <label>Tinggi Badan (cm)</label>
                                    <input type="text" id="tb" placeholder="170">
                                </div>
                                <div class="input-group">
                                    <label>Laju Pernapasan (/mnt)</label>
                                    <input type="text" id="rr" placeholder="18">
                                </div>
                            </div>
                        </div>

                        <div class="form-section">
                            <h3 class="section-heading">Riwayat & Keluhan</h3>
                            <div class="input-group full-width">
                                <label>Keluhan Utama</label>
                              <textarea
id="keluhan"
placeholder="Deskripsikan alasan pasien berobat...">
</textarea>
                            </div>
                            <div class="inputs-grid-2 mt-3">
                                <div class="input-group">
                                    <label>Riwayat Alergi</label>
                                    <textarea
id="alergi"
placeholder="Sebutkan obat/makanan..."
class="textarea-small">
</textarea>
                                </div>
                                <div class="input-group">
                                    <label>Skrining Risiko Jatuh</label>
                                   <textarea
id="risiko"
placeholder="Catat hasil skrining risiko jatuh..."
class="textarea-small">
</textarea>
                                </div>
                            </div>
                        </div>

                        <footer class="form-footer">
                            <div class="save-status">
                                <i class="fa-solid fa-cloud-arrow-up"></i>
                                <span>Terakhir disimpan:<br><strong>10:42 WIB</strong></span>
                            </div>
                            <div class="footer-buttons">
                                <button class="btn btn-outline">Simpan Draft</button>
                                <button class="btn btn-primary-teal"><i class="fa-solid fa-paper-plane"></i> Siap Diperiksa Dokter</button>
                            </div>
                        </footer>
                    </div>

                    <div class="summary-widgets-row">
                        <div class="widget-card widget-purple">
                            <div class="widget-content">
                                <span class="widget-label">KUNJUNGAN TERAKHIR</span>
                                <h4 class="widget-value">14 Jan 2024</h4>
                                <p class="widget-sub">Poli Umum - Dr. Sarah</p>
                            </div>
                            <i class="fa-solid fa-rotate-left widget-bg-icon"></i>
                        </div>
                        <div class="widget-card widget-blue">
                            <span class="widget-label">RUJUKAN AKTIF</span>
                            <h4 class="widget-value">Internal</h4>
                            <p class="widget-sub text-green-dark">Klinik Jantung</p>
                        </div>
                        <div class="widget-card widget-red">
                            <span class="widget-label text-red">PERINGATAN MEDIS</span>
                            <h4 class="widget-value text-red">Hipertensi</h4>
                            <p class="widget-sub text-red"><i class="fa-solid fa-circle-exclamation"></i> Perhatian dosis obat</p>
                        </div>
                    </div>

                </section>

            </div>
        </main>
    </div>

    <script src="script.js"></script>
</body>
</html>