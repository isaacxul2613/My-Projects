function renderPharmacyDashboard(area, user) {
  const prescriptions = MediLinkDB.getPrescriptions("pharmacy", user.email);
  const orders = MediLinkDB.getOrders("pharmacy", user.email);

  area.innerHTML = `
    <section class="card">
      <h2>Incoming Prescriptions</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Doctor</th><th>Patient</th><th>Medicine</th><th>Qty</th><th>Action</th></tr></thead>
        <tbody>
          ${prescriptions.map(p => `
            <tr>
              <td>${p.id}</td>
              <td>${p.doctor}</td>
              <td>${p.patientEmail}</td>
              <td>${p.medicine}</td>
              <td>${p.quantity}</td>
              <td><button class="btn btn-primary fulfill" data-id="${p.id}">Fulfill</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </section>

    <section class="card" style="margin-top:20px">
      <h2>Orders Processed</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Patient</th><th>Medicine</th><th>Status</th></tr></thead>
        <tbody>
          ${orders.map(o => `
            <tr><td>${o.id}</td><td>${o.patientEmail}</td><td>${o.medicine}</td><td>${o.status}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;

  area.querySelectorAll(".fulfill").forEach(btn => {
    btn.addEventListener("click", () => {
      const prescId = parseInt(btn.dataset.id);
      const prescription = prescriptions.find(p => p.id === prescId);
      MediLinkDB.placeOrder({
        pharmacy: user.email,
        patientEmail: prescription.patientEmail,
        medicine: prescription.medicine,
        status: "Ready for Pickup",
      });
      alert("Prescription fulfilled ✅");
      renderPharmacyDashboard(area, user);
    });
  });
}
