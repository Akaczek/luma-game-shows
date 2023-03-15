migrate((db) => {
  const collection = new Collection({
    "id": "tbbmrltn86800hg",
    "created": "2023-03-14 17:00:04.594Z",
    "updated": "2023-03-14 17:00:04.594Z",
    "name": "music_question",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lh9gq0wq",
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
        "id": "cdsbk7dx",
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
        "id": "jjlwqzlt",
        "name": "file",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "audio/mpeg",
            "audio/wav",
            "audio/mp4"
          ],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "sefwdctn",
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
  const collection = dao.findCollectionByNameOrId("tbbmrltn86800hg");

  return dao.deleteCollection(collection);
})
