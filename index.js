let holder = document.getElementById('holder');

let acceptedTypes = {
    'image/png': true,
    'image/jpeg': true,
    'image/gif': true
};

function readfile(file) {
    if (acceptedTypes[file.type] === true) {
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = new Image();
            image.src = event.target.result;
            image.width = 250; // a fake resize
            holder.appendChild(image);
        };
        reader.readAsDataURL(file);
    }
    console.log(file.name + ':' + (file.size ? (file.size / 1024 | 0) + 'K' : ''));
}

function readfiles(files, progress, readfile) {
    let formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
        readfile(files[i]);
    }

    // now post a new XHR request
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/devnull.php');
    xhr.onload = function () {
        progress(100);
    };

    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            let complete = (event.loaded / event.total * 100 | 0);
            progress(complete);
        }
    }

    xhr.send(formData);
}

holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files, () => { }, readfile);
}