## LightDB

### API


```
POST /registerUser
```

Body: 
```
{
    email: string
}
```
---
```
POST /verifyCode 
```
Body: 
```
{
    email: string,
    code: string
}
```

Returns:
```
{
    token: string
}
```
---
```
POST /newKey 
```
Body: 
```
{
    name?: string //optional
}
```
Headers: 
```
{
    authorization: <token>
}
```
Returns:
```
{
    key: string
}
```
---
```
POST /setValue/<key> 
```
Body: 
```
{
    value: any
}
```
Headers: 
```
{
    authorization: <token>
}
```
Returns:
```
{
    key: string,
    value: any
}
```
---
```
GET /key/<key> 
```
Returns:
```
<any>
```
---
```
GET /list 
```
Headers: 
```
{
    authorization: <token>
}
```
Returns:
```
[
    key: string,
    name: string
    createDate: string
]
```
---
```
POST /logout 
```
Headers: 
```
{
    authorization: <token>
}
```
Returns:
```
<string>
```
