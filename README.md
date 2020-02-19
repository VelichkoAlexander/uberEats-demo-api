## Fake UberEats Api

Returns json data about a restorans places.

### Url

- `GET /v1/places` (pagination through query params `limit` and `offset`)

### Method:

- `GET`

### URL Params:

- limit=[integer]
- offset=[integer]

### Success Response:

- **Code**: 200
- **Content**:

```javascript
{
  "id":10,
  "title" : "Маоедун",
  "type" : "Китайская кухня",
	"img" : "/images/img.jpg",
	"price" : "₴₴",
	"rating" : "3",
	"reviews" : "44"
}
```

### Sample Call:

```javascript
fetch('/v1/places')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
  .catch(err => console.log(err));
```
