const MediLinkDB = (() => {
  const seedData = () => {
    const demo = {
      users: [
        { email: "doc@medilink.test", password: "doctor123", role: "doctor", name: "Dr. Tendai Ncube" },
        { email: "pharm@medilink.test", password: "pharm123", role: "pharmacy", name: "PharmaPlus Avondale" },
        { email: "patient@medilink.test", password: "patient123", role: "patient", name: "Farai Chikore" },
        { email: "admin@medilink.test", password: "admin123", role: "admin", name: "System Admin" },
      ],
      pharmacies: [
        { id: 1, name: "PharmaPlus Avondale", stock: ["Amoxicillin", "Paracetamol", "Ibuprofen", "Cough Syrup"] },
        { id: 2, name: "HealthNet Borrowdale", stock: ["Ibuprofen", "Cetirizine", "Vitamin C"] },
      ],
      prescriptions: [],
      orders: [],
    };
    localStorage.setItem("medilinkDB", JSON.stringify(demo));
    return demo;
  };

  const load = () => {
    const data = localStorage.getItem("medilinkDB");
    return data ? JSON.parse(data) : seedData();
  };

  const save = (data) => localStorage.setItem("medilinkDB", JSON.stringify(data));


  return {
    reset: seedData,

    getData: load,

    authenticate(email, password, role) {
      const db = load();
      const user = db.users.find(
        (u) => u.email === email && u.password === password && u.role === role
      );
      return user || null;
    },

    getPharmacies() {
      return load().pharmacies;
    },

    getPrescriptions(role, email) {
      const db = load();
      if (role === "doctor") return db.prescriptions.filter((p) => p.doctor === email);
      if (role === "pharmacy") return db.prescriptions;
      if (role === "patient") return db.prescriptions.filter((p) => p.patientEmail === email);
      return db.prescriptions;
    },

    createPrescription(prescription) {
      const db = load();
      prescription.id = Date.now();
      db.prescriptions.push(prescription);
      save(db);
      return prescription;
    },

    placeOrder(order) {
      const db = load();
      order.id = Date.now();
      db.orders.push(order);
      save(db);
      return order;
    },

    getOrders(role, email) {
      const db = load();
      if (role === "patient") return db.orders.filter((o) => o.patientEmail === email);
      if (role === "pharmacy") return db.orders.filter((o) => o.pharmacy === email);
      if (role === "admin") return db.orders;
      return [];
    },
  };
})();
