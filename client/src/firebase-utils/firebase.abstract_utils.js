import { getLastElementInArray } from "../global.utils";
import { firestore, fileStorage } from "./firebase.config";

export const CART_COLLECTION_NAME = "carts";
export const CART_ITEM_COLLECTION_NAME = "cart_items";
export const PRODUCT_CATEGORY_COLLECTION_NAME = "product_categories";
export const PRODUCT_COLLECTION_NAME = "products";
export const USER_COLLECTION_NAME = "users";
export const SALE_COLLECTION_NAME = "sales";
export const SALE_SUMMARY_COLLECTION_NAME = "sales_summary";

export const getCollectionRefByName = (collectionName) => {
  const collectionRef = firestore.collection(collectionName);
  return collectionRef;
};

export const FIRESTORE_COLLECTION_REFS = {
  cartCollectionRef: getCollectionRefByName(CART_COLLECTION_NAME),
  cartItemCollectionRef: getCollectionRefByName(CART_ITEM_COLLECTION_NAME),
  productCategoryCollectionRef: getCollectionRefByName(
    PRODUCT_CATEGORY_COLLECTION_NAME
  ),
  productCollectionRef: getCollectionRefByName(PRODUCT_COLLECTION_NAME),
  saleCollectionRef: getCollectionRefByName(SALE_COLLECTION_NAME),
  saleSummaryCollectionRef: getCollectionRefByName(
    SALE_SUMMARY_COLLECTION_NAME
  ),
  userCollectionRef: getCollectionRefByName(USER_COLLECTION_NAME)
};

export const getDocRefById = (collectionName, docId) => {
  const docRef = firestore.doc(`${collectionName}/${docId}`);
  return docRef;
};

export const getDocSnapshotById = async (collectionName, docId) => {
  const docRef = getDocRefById(collectionName, docId);
  const docSnapshot = await docRef.get();
  return docSnapshot;
};

export const getDocSnapshotByRef = async (docRef) => await docRef.get();

export const getDocDataFromSnapshot = (
  docSnapshot,
  includeDocId = false,
  nameOfIdField = "id"
) => ({
  ...docSnapshot.data(),
  ...(includeDocId && { [nameOfIdField]: docSnapshot.id })
});

export const getDocDataByRef = async (
  docRef,
  includeDocId = false,
  nameOfIdField = "id"
) => {
  const docSnapshot = await getDocSnapshotByRef(docRef);
  const docData = getDocDataFromSnapshot(
    docSnapshot,
    includeDocId,
    nameOfIdField
  );
  return docData;
};

const getLastVisibleDoc = (docSnapshots) => getLastElementInArray(docSnapshots);

export const getAllDocsInCollection = async (
  collectionRef,
  includeDocId,
  nameOfIdField = "id"
) => {
  const docsInCollectionSnapshots = await executeQuery(collectionRef);
  const populatedDocs = populateDocSnapshots(
    docsInCollectionSnapshots,
    includeDocId,
    nameOfIdField
  );
  return populatedDocs;
};

export const populateDocSnapshots = (
  docSnapshots,
  includeDocId,
  nameOfIdField = "id"
) =>
  docSnapshots.map((docSnapshot) =>
    getDocDataFromSnapshot(docSnapshot, includeDocId, nameOfIdField)
  );

export const createNewDoc = async (collectionRef, newDocData) => {
  const newDocRef = await collectionRef.add(newDocData);
  return newDocRef;
};

export const updateDocDataById = async (
  collectionName,
  docId,
  updatedDocData
) => {
  const docRef = getDocRefById(collectionName, docId);
  await updateDocDataByRef(docRef, updatedDocData);
};

export const updateDocDataByRef = async (docRef, updatedDocData) =>
  await docRef.update(updatedDocData);

export const setDocDataByRef = async (docRef, docData) =>
  await docRef.set(docData);

export const deleteDocById = async (collectionName, docId) => {
  const docRef = getDocRefById(collectionName, docId);
  await deleteDocByRef(docRef);
};

export const deleteDocByRef = async (docRef) => await docRef.delete();

export const executePaginatedQuery = async (paginatedQuery) => {
  const docSnapshots = await executeQuery(paginatedQuery);
  const lastVisibleDoc = getLastVisibleDoc(docSnapshots);
  return { lastVisibleDoc, docSnapshots };
};

export const executeQuery = async (query) => {
  const querySnapshot = await query.get();
  const queryDocSnapshots = querySnapshot.docs;
  return queryDocSnapshots;
};

export const uploadFile = async (file, rootPathToSaveFile = "") =>
  new Promise((resolve, reject) => {
    const uniqueFileName = new Date().getTime() + file.name;
    const fileStoragePath = `${rootPathToSaveFile}/${uniqueFileName}`;
    const uploadFileTask = fileStorage.ref(fileStoragePath).put(file);
    uploadFileTask.on(
      "state_changed",
      () => {},
      (err) => reject(err),
      () =>
        fileStorage
          .ref()
          .child(fileStoragePath)
          .getDownloadURL()
          .then((fileUrl) => resolve(fileUrl))
          .catch((err) => reject(err))
    );
  });

export const uploadMultipleFiles = async (files, rootPathToSaveFiles = "") => {
  const fileUrls = [];
  try {
    for (let file of files) {
      let fileUrl = await uploadFile(file, rootPathToSaveFiles);
      fileUrls.push(fileUrl);
    }
  } catch (err) {}
  return fileUrls;
};

export const deleteUploadedFile = async (absoluteFilePath) => {
  const fileRef = fileStorage.refFromURL(absoluteFilePath);
  await fileRef.delete();
};

export const deleteMultipleUploadedFiles = async (absoluteFilePaths) => {
  for (let absoluteFilePath of absoluteFilePaths) {
    await deleteUploadedFile(absoluteFilePath);
  }
};
