const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

class Address {
  constructor(id, address) {
    this.id = id;
    this.address = address;
  }

  getPlainObject() {
    return Object.assign({}, this.address);
  }
}

exports.get = id =>
  new Promise((resolve, reject) => {
    db.collection("addresses")
      .doc(id)
      .get()
      .then(snapshot => {
        const data = Object.assign({}, snapshot.data(), {
          id
        });
        resolve(data);
        return snapshot;
      })
      .catch(console.log);
  });

exports.getAll = () =>
  new Promise((resolve, reject) => {
    db.collection("addresses")
      .get()
      .then(snapshot => {
        let addresses = [];
        snapshot.forEach(doc => {
          const data = Object.assign({}, doc.data(), {
            id: doc.id
          });
          addresses.push(data);
        });

        resolve(addresses);
        return snapshot;
      })
      .catch(console.log);
  });

exports.insert = address =>
  new Promise((resolve, reject) => {
    const addr = new Address(undefined, address).getPlainObject();
    db.collection("addresses")
      .add(addr)
      .then(doc => resolve(doc.id))
      .catch(console.log);
  });

exports.update = (id, address) =>
  new Promise((resolve, reject) => {
    const addr = new Address(id, address).getPlainObject();
    console.log(JSON.stringify(addr));
    db.collection("addresses")
      .doc(id)
      .update(addr)
      .then(() => resolve(id))
      .catch(console.log);
  });

exports.delete = id =>
  new Promise((resolve, reject) => {
    db.collection("addresses")
      .doc(id)
      .delete()
      .then(() => resolve(id))
      .catch(console.log);
  });
