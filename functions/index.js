const functions = require("firebase-functions");
const admin = require("firebase-admin"); // for access to firestore
admin.initializeApp();

//see
//https://firebase.google.com/docs/functions/write-firebase-functions
//https://firebase.google.com/docs/functions/get-started

//cloudfunctions need to return null, Object or Promise.
//call cloudfunction with someurl/addMessage?text=hej

const addMessage = async (req, res) => {
  const query = req.query;
  if (query.text) {
    const writeResult = await admin
      .firestore()
      .collection("messages")
      .add({ original: query.text });

    const id = writeResult.id;
    res.json({
      result: `Your message ${query.text} has been stored in my database. It also triggered a completely different function that listens for database writes.`,
    });
  } else {
    res.json({
      result: `usage: /addMessage?text=hello`,
    });
  }
};

const modifyMessage = (snap, context) => {
  //const id = context.params.documentId
  //modifies the document to also have an uppercase field (in addition to the "original" field) of the created document
  const doc = snap.data();
  const uppercase = doc.original.toUpperCase();
  return snap.ref.set({ uppercase }, { merge: true });
};

const mul = (req, res) => {
  const query = req.query;
  //functions.logger.log("q", q);
  const a = Number(query.a);
  const b = Number(query.b);
  const y = a * b;
  //res.send(`result: ${y}`);
  res.json({
    result: y,
  });
};

exports.mul = functions.region("europe-west1").https.onRequest(mul);
exports.addMessage = functions
  .region("europe-west1")
  .https.onRequest(addMessage);

exports.makeUppercase = functions
  .region("europe-west1")
  .firestore.document("/messages/{documentId}")
  .onCreate(modifyMessage); // Listen for "onCreate" changes at specified path and run function any time it happens. be specific to prevent unnessary runs.
