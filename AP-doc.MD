# API Documentation

## User
* `POST /users/login` <br/>
    * Login using username and password
```
{
    "username":"johnsmith",
    "password":"password"
}
```
<br/>

* `POST /users/signup` <br/>
    * Create new user
<br/>

* `GET /users/` <br/>
    * Get all existing users


## Receipts
* `GET /receipts` <br/>
    * Get all receipts based on username(based on session)

* `POST /add` <br>
    * Upload a receipt(tag is not required)
```
{
    "receiptId": "87450",
    "tag": "Food",
    "date": "05.04.2020",
    "total": 50.60
}
```
<br/> 
* `GET /receipts/id/:id` <br/>
    * Get specific receipt based on receiptId

