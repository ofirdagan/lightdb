## LightDB

### CLI
* `npm i -g @ofirdagan/lightdb`
* In terminal run `lightdb`

### REST API

#### Register

```
POST /registerUser
```

Body: 
```typescript
{
    email: string
}
```
---
#### Verify Code
```
POST /verifyCode 
```
Body: 
```typescript
{
    email: string,
    code: string
}
```

Returns:
```typescript
{
    token: string
}
```
---
#### New Key
```
POST /newKey 
```
Body: 
```typescript
{
    name?: string //optional
}
```
Headers: 
```typescript
{
    authorization: <token>
}
```
Returns:
```typescript
{
    key: string
}
```
---
#### Set Value
```
POST /setValue/<key> 
```
Body: 
```typescript
{
    value: any
}
```
Headers: 
```typescript
{
    authorization: <token>
}
```
Returns:
```typescript
{
    key: string,
    value: any
}
```
---
#### Get Value
```
GET /key/<key> 
```
Returns:
```typescript
<any>
```
---
#### Keys's List
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
```typescript
[
    key: string,
    name: string
    createDate: string
]
```
---
#### Logout
```
POST /logout 
```
Headers: 
```typescript
{
    authorization: <token>
}
```
Returns:
```typescript
<string>
```
