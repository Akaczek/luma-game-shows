migrate((db) => {
  const collection = new Collection({
    "id": "66y533j8gxkn4jh",
    "created": "2023-03-14 17:00:04.592Z",
    "updated": "2023-03-14 17:00:04.592Z",
    "name": "quiz",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vohecsw0",
        "name": "user",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": [
            "username"
          ]
        }
      },
      {
        "system": false,
        "id": "pbejfwlo",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 128,
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
  const collection = dao.findCollectionByNameOrId("66y533j8gxkn4jh");

  return dao.deleteCollection(collection);
})
