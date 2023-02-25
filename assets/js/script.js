"use strict";
// form submit

let inputElem = document.querySelector("input");
let formElem = document.querySelector("form");
let pElem = document.querySelector("p");

formElem.addEventListener("submit", function (event) {
    event.preventDefault();
    if (inputElem.value == "") {
        inputElem.nextElementSibling.innerHTML = "Cant be empty";
    }
    else {
        inputElem.nextElementSibling.innerHTML = "";
        pElem.innerHTML = inputElem.value;
        inputElem.value = ""
    }
});

// drag-drop
let dragElems = document.querySelectorAll(".item");
let dropElem = document.getElementById("drop-elem");

dragElems.forEach(dragElem => {
    dragElem.ondragstart = e => {
        e.dataTransfer.setData("id", dragElem.getAttribute("id"));
        dropElem.style.border = "2px dashed black";
    }
    dropElem.ondrop = e => {
        let id = e.dataTransfer.getData("id");
        let el = document.getElementById(id);
        dropElem.append(el);
        // dragElem.style.filter = "blur(10px)"
    }
})
dropElem.ondragover = e => {
    e.preventDefault();
}

// dragElems.forEach(el => {
//     el.addEventListener("dragstart", function () {
//         dropElem.style.border = "2px dashed black"
//         dropElem.ondrop = () => {
//             dropElem.append(el)
//         }
//     })
// })


//file-upload
let fileUploadArea = document.querySelector(".file-upload-area");
let clickIcon = document.querySelector("a");
let tableElem = document.querySelector("table");

clickIcon.addEventListener("click", function (e) {
    e.preventDefault();
    this.nextElementSibling.click()
})

clickIcon.nextElementSibling.addEventListener("change", function (e) {
    for (const file of e.target.files) {
       readFile(file);
    }
})


 fileUploadArea.addEventListener("dragover", function (e) {
     e.preventDefault();
     fileUploadArea.style.border = "2px dashed black";
 })
 fileUploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    let files = e.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
        readFile(files[i]);
     
    }
    fileUploadArea.style.border = "1px solid black"
})

function readFile(file) {
    let reader = new FileReader();
    reader.onloadend = event => {
        let fileBase64 = event.currentTarget.result;
        tableElem.classList.remove("d-none");

        tableElem.children[1].innerHTML +=
            `<tr class="table-active">
            <td>${file.name}</td>
            <td>${Math.round(file.size / 1024)} KB</td>
            <td><div class="img"><img src="${fileBase64}" alt=""></div></td>
            <td><i class="fa-solid fa-trash"></i></td>
        </tr>`
        let delIcons = document.querySelectorAll("td i");
        deleteItem(delIcons);
    }

    reader.readAsDataURL(file)
}

function deleteItem(elems) {
    let trElems = document.querySelectorAll(".table-active");
    let count = trElems.length;
    elems.forEach(element => {
        element.addEventListener("click", function () {
            if(count == 1){
                tableElem.classList.add("d-none");
            }
            else{
                this.parentNode.parentNode.remove();
                count--;
            }
        })
    });
}
