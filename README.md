# Receipt Tracker
Create a `.env` file in root. <br/>
Sample of .env below. Repalce "user", "password" with your own mongodb atlas username and password
`ATLAS_URI="mongodb+srv://<username>:<password>@cluster0.f59dr.mongodb.net/receipt-tracker?retryWrites=true&w=majority"` <br/>
<br/>
Run: <br/>
`npm install` <br/>
`npm start` <br/>

<br/>
<br/>

## Test Flow <br/>
* POST users/login or users/signup
* POST receipts/upload to upload receipts into db
* GET receipts to check all receipts uploaded or stored in db
* POST receipts/id/:id to update, delete tags
* GET receipts/tag/:tag to fetch receipts based on tags


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




