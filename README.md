# mongo-writer

## Usage

```javascript
const Writer = require('../Writer')
const writer = new Writer({ collection: User })

writer.update(
    {
        username: 'shovity',
    },
    {
        $set: {
            say: 'hi',
        }
    },
    {
        upsert: true,
    },
)
````