# Receipt Tracker
`npm install` <br/>
`npm start`<br/>

<br/>

## API Documentation

### User
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


### Receipts
* `GET /receipts` <br/>
    * Get all receipts based on username(based on session)

* `POST /receipts` <br>
    * Post a new receipt directly through request body(easier to test)
    ``` 
    {
        "receiptId": "87450",
        "tag": "Food",
        "date": "05.04.2020",
        "total": 50.60
    }
    ```
* `POST /receipts/upload` <br/>
    * Upload .txt file containing receipt information. (Request must be "form-data", with key name as "upload".) Can also provide key "tag" with its value(ex: "Food") while sending post request

* `GET /receipts/id/:id` <br/>
    * Get specific receipt based on receiptId

* `POST /receipts/id/:id` <br/>
    * Update specific receipt based on receiptId. Below updates/adds a tag "Beverage" to receipt : 92737.
     ``` 
        {
            "receiptId": "92737",
            "tag": "Beverage"
        }
    ```
    * Below deletes the tag from the receipt (post request with empty tag)
    ```
        {
            "receiptId: "92737",
            "tag": ""
        }
    ```
* `GET /receipts/tag/:tag` <br/>
    * Get receipts based on tag (ex: `/receipts/tag/food` returns all receipts with the tag "food" uploaded by the current user)




