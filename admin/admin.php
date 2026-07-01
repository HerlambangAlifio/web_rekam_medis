<?php
// 1. Hubungkan ke konfigurasi database
require_once '../Config/db.php'; 

// 2. Ambil statistik realtime lewat query langsung untuk efisiensi load awal
try {
    // Hitung total antrean hari ini
    $stmtTotal = $pdo->query("SELECT COUNT(*) FROM antrean WHERE tanggal_antrean = CURDATE()");
    $totalPasienHariIni = $stmtTotal->fetchColumn();

    // Hitung antrean yang masih menunggu
    $stmtMenunggu = $pdo->query("SELECT COUNT(*) FROM antrean WHERE tanggal_antrean = CURDATE() AND status_antrean = 'Menunggu di Klinik'");
    $totalMenunggu = $stmtMenunggu->fetchColumn();
} catch (Exception $e) {
    $totalPasienHariIni = 0;
    $totalMenunggu = 0;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MedCloud SIMRS - Admin Dashboard</title>
    <!-- Font Awesome v6 untuk ikon -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Hubungkan ke file CSS eksternal front-office -->
    <link rel="stylesheet" href="../front-office/style.css"> 
    <style>
        /* Penyesuaian khusus elemen kontrol Admin */
        .btn-status-done { background-color: #22c55e; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600; }
        .btn-status-wait { background-color: #e2e8f0; color: #334155; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600; }
        .btn-delete-admin { background-color: #ef4444; color: white; border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600; margin-left: 4px; }
        .btn-status-done:hover { background-color: #16a34a; }
        .btn-delete-admin:hover { background-color: #dc2626; }
        .badge-count { background-color: #fee2e2; color: #ef4444; padding: 2px 6px; border-radius: 10px; font-size: 11px; font-weight: bold; }
    </style>
</head>
<body>

    <div class="dashboard-wrapper">
        
        <!-- SIDEBAR UTAMA -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h2>RS</h2>
                <p>Clinical System</p>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="nav-item active"><i class="fa-solid fa-user-gear"></i> front office</a>
            </nav>
            <div class="sidebar-footer">
                <a href="../login/index.html" class="logout-link"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </div>
        </aside>

        <!-- KONTEN UTAMA -->
        <main class="main-body">
            
            <!-- TOP HEADER -->
            <header class="top-header">
                <div class="header-left">
                    <span class="brand-text">MedCloud SIMRS</span>
                    <span style="color: var(--border-color); margin: 0 8px;">/</span>
                    <span style="font-weight: 600;">Pusat Kontrol Admin (PHP Mode)</span>
                </div>
                <div class="header-right">
                    <div class="user-profile" style="display: flex; align-items: center; gap: 10px;">
                        <strong>Super Admin</strong>
                        <span class="badge-count">Live Session</span>
                    </div>
                </div>
            </header>

            <!-- CONTAINER UTAMA -->
            <div class="content-container" style="padding: 20px;">
                
                <!-- TITLE BAR -->
                <div class="content-title-bar">
                    <div class="title-text">
                        <h1>Manajemen Kontrol Antrean</h1>
                        <p>Pantau riwayat pendaftaran, eksekusi status klaim pelayanan, dan kelola integritas data.</p>
                    </div>
                </div>

                <!-- LIVE METRICS CARD (Dihitung langsung via PHP) -->
                <div class="stats-row" style="display: flex; gap: 16px; margin-bottom: 20px;">
                    <div class="stat-box border-purple" style="flex: 1; background: white; padding: 14px; border-radius: 6px; border-left: 4px solid #a855f7;">
                        <div class="stat-label" style="font-size: 10px; color: var(--text-muted); font-weight: 600;">TOTAL ANTREAN HARI INI</div>
                        <div class="stat-value" style="font-size: 24px; font-weight: 700; margin-top: 4px;"><?= $totalPasienHariIni; ?></div>
                    </div>
                    <div class="stat-box border-blue" style="flex: 1; background: white; padding: 14px; border-radius: 6px; border-left: 4px solid #3b82f6;">
                        <div class="stat-label" style="font-size: 10px; color: var(--text-muted); font-weight: 600;">BELUM DILAYANI</div>
                        <div class="stat-value" style="font-size: 24px; font-weight: 700; margin-top: 4px; color: #3b82f6;"><?= $totalMenunggu; ?></div>
                    </div>
                </div>

                <!-- TABLE DATA CONTROL -->
                <div class="card" style="background: white; padding: 16px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div class="table-filter-header" style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
                        <h3>Log Monitor & Aksi CRUD Sistem</h3>
                        <button onclick="renderQueue()" class="btn-page" style="padding: 6px 12px; cursor: pointer;"><i class="fa-solid fa-arrows-rotate"></i> Refresh Tabel</button>
                    </div>

                    <table class="queue-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr>
                                <th>TANGGAL</th>
                                <th>NO. ANTREAN</th>
                                <th>PASIEN / RM</th>
                                <th>KLINIK / DPJP</th>
                                <th>STATUS</th>
                                <th style="text-align: center; width: 200px;">AKSI KONTROL</th>
                            </tr>
                        </thead>
                        <!-- AJAX Fetch dari api.php akan merender baris ke sini -->
                        <tbody id="adminQueueTableBody"></tbody>
                    </table>
                </div>

            </div>
        </main>
    </div>

    <!-- Hubungkan ke file controller JavaScript khusus admin -->
    <script src="admin-script.js"></script>
</body>
</html>