migrate((db) => {
  const collection = new Collection({
    "id": "4cpri2lxcjpetb6",
    "created": "2023-03-14 17:00:04.594Z",
    "updated": "2023-03-14 17:00:04.594Z",
    "name": "quiz_question",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dgyktkic",
        "name": "quiz",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "66y533j8gxkn4jh",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "name"
          ]
        }
      },
      {
        "system": false,
        "id": "yzsr8wqd",
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
        "id": "oyo8jflk",
        "name": "answer_1",
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
        "id": "3vnzoy5t",
        "name": "answer_2",
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
        "id": "hgxahr5b",
        "name": "answer_3",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "9vhdyuzj",
        "name": "answer_4",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 512,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "fwlitgkv",
        "name": "real_answer",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 4
        }
      },
      {
        "system": false,
        "id": "9xow7w1w",
        "name": "photo",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg",
            "image/svg+xml"
          ],
          "thumbs": []
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
  const collection = dao.findCollectionByNameOrId("4cpri2lxcjpetb6");

  return dao.deleteCollection(collection);
})
