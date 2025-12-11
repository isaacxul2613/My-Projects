function renderAdminDashboard(area, user) {
  const db = MediLinkDB.getData();

  area.innerHTML = `
    <section class="card">
      <h2>System Overview</h2>
      <div class="stats-grid">
        <div class="stat-card"><h3>${db.users.length}</h3><p>Registered Users</p></div>
        <div class="stat-card"><h3>${db.pharmacies.length}</h3><p>Pharmacies</p></div>
        <div class="stat-card"><h3>${db.prescriptions.length}</h3><p>Prescriptions</p></div>
        <div class="stat-card"><h3>${db.orders.length}</h3><p>Orders</p></div>
      </div>
    </section>

    <section class="card" style="margin-top:20px">
      <h2>Recent Orders</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Pharmacy</th><th>Patient</th><th>Medicine</th><th>Status</th></tr></thead>
        <tbody>
          ${db.orders.map(o => `
            <tr><td>${o.id}</td><td>${o.pharmacy}</td><td>${o.patientEmail}</td><td>${o.medicine}</td><td>${o.status}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}
