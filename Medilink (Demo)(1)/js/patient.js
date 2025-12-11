function renderPatientDashboard(area, user) {
  const prescriptions = MediLinkDB.getPrescriptions("patient", user.email);
  const orders = MediLinkDB.getOrders("patient", user.email);

  area.innerHTML = `
    <section class="card">
      <h2>My Prescriptions</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Doctor</th><th>Medicine</th><th>Qty</th><th>Pharmacy</th></tr></thead>
        <tbody>
          ${prescriptions.map(p => `
            <tr><td>${p.id}</td><td>${p.doctor}</td><td>${p.medicine}</td><td>${p.quantity}</td><td>${p.pharmacy}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>

    <section class="card" style="margin-top:20px">
      <h2>My Orders</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Pharmacy</th><th>Medicine</th><th>Status</th></tr></thead>
        <tbody>
          ${orders.map(o => `
            <tr><td>${o.id}</td><td>${o.pharmacy}</td><td>${o.medicine}</td><td>${o.status}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;
}
