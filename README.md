### auth stands for authorization.
### To authenticate a user, a client application must send a JSON Web Token (JWT) in the authorization header of the HTTP request to your backend API. API Gateway validates the token on behalf of your API, so you don't have to add any code in your API to process the authentication.

### initial: 
[]

### after blogger registration: 
```json
{
  "username": "Abhiram",
  "password": "abhiram",
  "blogs": [],
  "_id": "61633022427a5156612e8b1f",
  "__v": 0
}
```

### after blogger loggin in and getting token:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.QWJoaXJhbQ.8bTAUqRnwR-nXj6jpFFzBzOCDy_HRNBdFqvJgrsEs5c"
}
```

### after blogger uploading blog:
```json
Blogs array updated
```

### after commentor registration:
```json
{
  "username": "Jane",
  "password": "jane",
  "blogs": [],
  "_id": "616330c2427a5156612e8b26",
  "__v": 0
}
```

### after commentor logging in:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9.SmFuZQ.k8EUPJzzkCYDDFK5DGM895_ZVHHetsC9SZuT5yv1hEw"
}
```

### Now seeing the whole database:
```json
[
  {
    "_id": "61633022427a5156612e8b1f",
    "username": "Abhiram",
    "password": "abhiram",
    "blogs": [
      {
        "title": "Introduction to JS",
        "author": "Abhiram",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "likes": 0,
        "dislikes": 0,
        "comments": []
      }
    ],
    "__v": 0
  },
  {
    "_id": "616330c2427a5156612e8b26",
    "username": "Jane",
    "password": "jane",
    "blogs": [],
    "__v": 0
  }
]
```

### after commentor commenting and liking the blog:
```json
Blogs array updated
```

### Now again seeing the whole database:
```json
[
  {
    "_id": "61633022427a5156612e8b1f",
    "username": "Abhiram",
    "password": "abhiram",
    "blogs": [
      {
        "title": "Introduction to JS",
        "author": "Abhiram",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "likes": 1,
        "dislikes": 0,
        "comments": [
          {
            "username": "Jane",
            "comment": "Awesome article"
          }
        ]
      }
    ],
    "__v": 0
  },
  {
    "_id": "616330c2427a5156612e8b26",
    "username": "Jane",
    "password": "jane",
    "blogs": [],
    "__v": 0
  }
]
```


