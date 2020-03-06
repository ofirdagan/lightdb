## LightDB

### API


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
```
GET /key/<key> 
```
Returns:
```typescript
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
```typescript
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
```typescript
{
    authorization: <token>
}
```
Returns:
```typescript
<string>
```
