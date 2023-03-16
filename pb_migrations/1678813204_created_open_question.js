migrate((db) => {
  const collection = new Collection({
    "id": "ftefam1y5us0u6i",
    "created": "2023-03-14 17:00:04.594Z",
    "updated": "2023-03-14 17:00:04.594Z",
    "name": "open_question",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "aruureyv",
        "name": "quiz",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "66y533j8gxkn4jh",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "dlzinwd4",
        "name": "question",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wm8jxekz",
        "name": "real_answer",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 512,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ftefam1y5us0u6i");

  return dao.deleteCollection(collection);
})
