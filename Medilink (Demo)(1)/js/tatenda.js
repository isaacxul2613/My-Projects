function renderDoctorDashboard(area, user) {
  const prescriptions = MediLinkDB.getPrescriptions("tatenda", user.email);
  const pharmacies = MediLinkDB.getPharmacies();

  area.innerHTML = `
    <section class="card">
      <h2>Create Prescription</h2>
      <form id="prescForm" class="form">
        <label>Patient Email</label>
        <input type="email" id="patientEmail" required placeholder="patient@domain.test">

        <label>Medicine</label>
        <input type="text" id="medicine" required placeholder="Paracetamol 500mg">

        <label>Quantity</label>
        <input type="number" id="quantity" required min="1" value="1">

        <label>Select Pharmacy</label>
        <select id="pharmacySelect">
          ${pharmacies.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
        </select>

        <button type="submit" class="btn btn-primary">Send Prescription</button>
      </form>
    </section>

    <section class="card" style="margin-top:20px">
      <h2>Sent Prescriptions</h2>
      <table class="data-table">
        <thead><tr><th>ID</th><th>Patient</th><th>Medicine</th><th>Qty</th><th>Pharmacy</th></tr></thead>
        <tbody>
          ${prescriptions.map(p => `
            <tr><td>${p.id}</td><td>${p.patientEmail}</td><td>${p.medicine}</td><td>${p.quantity}</td><td>${p.pharmacy}</td></tr>
          `).join('')}
        </tbody>
      </table>
    </section>
  `;

  const form = document.getElementById("prescForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = {
      doctor: user.email,
      patientEmail: document.getElementById("patientEmail").value,
      medicine: document.getElementById("medicine").value,
      quantity: parseInt(document.getElementById("quantity").value),
      pharmacy: document.getElementById("pharmacySelect").value,
    };
    MediLinkDB.createPrescription(data);
    alert("Prescription sent successfully!");
    renderDoctorDashboard(area, user);
  });
}
