function parseSnapshotAndMerge(snapshot) {
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

module.exports = { parseSnapshotAndMerge };
