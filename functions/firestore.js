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
				resolve(snapshot.data());
				return snapshot;
			})
			.catch(console.log);
	});
