const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

exports.get = id =>
	new Promise((resolve, reject) => {
		db.collection('addresses')
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
		db.collection('addresses')
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
