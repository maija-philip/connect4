# Check is Winner method

## 1. Check no winner
_Should return_ `{ valid: true, x: 0, y: 5, hasWinner: false }`

Call: `POST /game/2/takeTurn` as <span style="color:pink">Player Pink</span> \
With body:
```
{
    moveColumn: 0
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 1, 2, 1, 2, 1, 0],
[ 0, 1, 1, 2, 1, 2, 0],
[ 1, 1, 1, 2, 2, 2, 0]
```

## 2. Winner Up and Down (Vertical)
_Should return_ `{ valid: true, x: 0, y: 2, hasWinner: true }`

Call: `POST /game/2/takeTurn` as <span style="color:pink">Player Pink</span> \
With body:
```
{
    moveColumn: 1
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 3, 0, 0, 0, 0, 0],
[ 0, 3, 2, 1, 2, 1, 0],
[ 0, 3, 1, 2, 1, 2, 0],
[ 0, 3, 1, 2, 2, 2, 0]
```

## 3. Winner Side to Side (Horizontal)
_Should return_ `{ valid: true, x: 3, y: 3, hasWinner: true }`

Call: `POST /game/3/takeTurn` as <span style="color:yellow">Player Yellow</span> \
With body:
```
{
    moveColumn: 3
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 2, 0, 0, 0, 0, 2],
[ 0, 1, 1, 0, 0, 0, 2],
[ 0, 1, 1, 4, 4, 4, 4],
[ 0, 1, 1, 2, 1, 2, 2],
[ 0, 1, 1, 1, 1, 1, 2]
```


## 3. Winner Diagonal Positive
_Should return_ `{ valid: true, x: 5, y: 2, hasWinner: true }`

Call: `POST /game/3/takeTurn` as <span style="color:yellow">Player Yellow</span> \
With body:
```
{
    moveColumn: 5
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 2, 0, 0, 0, 0, 4],
[ 0, 1, 1, 0, 0, 4, 2],
[ 0, 1, 1, 0, 4, 2, 2],
[ 0, 1, 1, 4, 1, 2, 2],
[ 0, 1, 1, 1, 1, 1, 2]
```

## 3. Winner Diagonal Negative
_Should return_ `{ valid: true, x: 3, y: 3, hasWinner: true }`

Call: `POST /game/3/takeTurn` as <span style="color:pink">Player Pink</span> \
With body:
```
{
    moveColumn: 3
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 2, 0, 0, 0, 0, 2],
[ 0, 1, 3, 0, 0, 0, 2],
[ 0, 1, 1, 3, 2, 2, 2],
[ 0, 1, 1, 2, 3, 2, 2],
[ 0, 1, 1, 1, 1, 3, 2]
```

## 3. Double Win (Horizontal + Diagonal Negative)
_Should return_ `{ valid: true, x: 6, y: 5, hasWinner: true }`

Call: `POST /game/2/takeTurn` as <span style="color:yellow">Player Yellow</span> \
With body:
```
{
    moveColumn: 6
}
```

Board after call:
```
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0],
[ 0, 1, 0, 0, 0, 0, 0],
[ 0, 1, 2, 1, 2, 1, 0],
[ 0, 1, 1, 2, 1, 2, 0],
[ 0, 1, 1, 4, 4, 4, 4]
```
