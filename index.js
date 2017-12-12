const acceptedTypes = {
    'image/png': true,
    'image/jpg': true,
    'image/jpeg': true,
    'image/gif': true
};

const readfile = function (file, onread) {
    if (acceptedTypes[file.type] === true) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = new Image();
            image.src = event.target.result;
            onread && onread(image);
        };
        reader.readAsDataURL(file);
    }
    console.log(file.name + ':' + (file.size ? (file.size / 1024 | 0) + 'K' : ''));
};

const readfiles = function (files, { apiUrl, data = {}, onprogress, onread }) {
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file[]', files[i]);
        readfile(files[i], onread);
    }
    for (let p in data) {
        if (!data.hasOwnProperty(p)) continue;
        if (typeof data[p] === 'function') {
            formData.append(p, data[p]());
        } else {
            formData.append(p, data[p]);
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl);
    xhr.onload = function () {
        onprogress(100);
    };
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            let complete = (event.loaded / event.total * 100 | 0);
            onprogress(complete);
        }
    }
    xhr.send(formData);
};

const bind = (el, options = {}) => {
    let { apiUrl, data, ondragover, ondragend, ondrop, onprogress, onread } = options;

    el.ondragover = function () {
        ondragover.apply(this);
        return false;
    };

    el.ondragend = function () {
        ondragend.apply(this);
        return false;
    };

    el.ondrop = function (e) {
        e.preventDefault();
        ondrop.apply(this);
        readfiles(e.dataTransfer.files, {
            apiUrl,
            data,
            onprogress,
            onread
        });
    }
};

module.exports = bind;