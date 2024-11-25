# Test move() validation

## 1. Column given is out of bounds (greater than)
_Should return_ `{valid: false}`

Call: `POST /game/0/takeTurn`
With body:
```
{
    moveColumn: 7
}
```

## 2. Column given is out of bounds (less than)
_Should return_ `{valid: false}`

Call: `POST /game/0/takeTurn`
With body:
```
{
    moveColumn: -1
}
```

## 3. Game does not exist
_Should return_ `{valid: false, error: "This game is not valid or doesn't exist"}`

Call: `POST /game/0/takeTurn`
With body:
```
{
    moveColumn: 2
}
```

## 4. Column is full 
_Should return_ `{valid: false, error: "This column is full, you can not move here"}`

Call: `POST /game/1/takeTurn`
With body:
```
{
    moveColumn: 1
}
```

## 5. Valid Move (Empty Column) 
_Should return_ `{ valid: true, x: 2, y: 5, hasWinner: false }`

Call: `POST /game/1/takeTurn`
With body:
```
{
    moveColumn: 2
}
```

## 6. Valid Move (Half-full Column) 
_Should return_ `{ valid: true, x: 3, y: 2, hasWinner: false }`

Call: `POST /game/1/takeTurn`
With body:
```
{
    moveColumn: 3
}
```