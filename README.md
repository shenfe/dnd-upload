# dnd-upload

Upload files in drag-and-drop way.

## Installation

```bash
npm install dnd-upload --save
```

## Usage

```js
const uploader = require('dnd-upload');
uploader(elementToDndIn, {
    apiUrl: '/path/to/api',
    data: { /**/ },
    ondragover: function () { /**/ },
    ondragend: function () { /**/ },
    ondrop: function () { /**/ },
    onprogress: function (percent) { /**/ },
    onread: function () { /**/ }
});
```

## Compatibility

* Chrome

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, [shenfe](https://github.com/shenfe)