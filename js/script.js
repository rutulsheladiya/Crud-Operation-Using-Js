let btnSubmit = document.getElementById("btnsubmit")
let updateBtnClass = document.getElementById("updatebtnclass")
let updateBtn = document.getElementById("updatebtn")
let productImg = document.getElementById("productimage")
let url = ""
let validateForm = true
let pid = document.getElementById("productid").value
let backBtn = document.getElementById("backbtn")
let mainTable = document.getElementById("maintable")

document.getElementById("btnsubmit").addEventListener('click', function (e) {
    if (validation()) {
        let productId = document.getElementById("productid").value;
        let productName = document.getElementById("productname").value
        let productPrice = document.getElementById("productprice").value
        let productDesc = document.getElementById("productdesc").value
        localStorage.setItem(productId, JSON.stringify({ productName, productPrice, productDesc, url }))
        getproduct()
    }
})
// for storing image in localStorage
function uploadprofile(event) {
    var fr = new FileReader()
    fr.readAsDataURL(event.target.files[0])
    fr.addEventListener('load', () => {
        url = fr.result
    })
}
document.getElementById("image").addEventListener('change', uploadprofile)


// for fetch data from the localstorage and print it in table. 
const tableData = document.getElementById("tabledata")

function getproduct() {
    tableData.innerHTML = ""
    let data = { ...localStorage }
    Object.entries(data).forEach(function ([key, data]) {
        data = JSON.parse(data)
        tableData.innerHTML += `
       <tr>
          <td>${key}</td>
          <td>${data.productName}</td>
          <td>${data.productPrice}</td>
          <td>${data.productDesc}</td>
          <td><img src="${data.url}" width="200"></td>
          <td>
            <button class="btn btn-success" onclick="fetchData(${key})">Edit</button>
            <button class="btn btn-danger ms-3" onclick="deleteData(${key})">Delete</button>
          </td>
       </tr>
     `
    })
    document.getElementById("productid").value = ""
    document.getElementById("productname").value = ""
    document.getElementById("productprice").value = ""
    document.getElementById("productdesc").value = ""
    document.getElementById("image").value = ""
    url = ""
}
getproduct()


// for fetch data in form
function fetchData(updateid) {
    let text = localStorage.getItem(updateid)
    let obj = JSON.parse(text)
    document.getElementById("productid").readOnly = true;
    document.getElementById("productid").value = updateid
    document.getElementById("productname").value = obj.productName
    document.getElementById("productprice").value = obj.productPrice
    document.getElementById("productdesc").value = obj.productDesc
    url = obj.url
    updateBtn.setAttribute("onclick", `updateproduct(${updateid})`)
    productImg.setAttribute("src", obj.url)
    productImg.classList.remove("d-none")
    btnSubmit.classList.add("d-none")
    updateBtnClass.classList.remove("d-none")
    backBtn.setAttribute("onclick",`goback()`)
    mainTable.classList.add("d-none")

}
function goback(){
    window.location.reload()
}

// for update data
function updateproduct(uid) {
    if (updatevalidation()) {
        let productName = document.getElementById("productname").value
        let productPrice = document.getElementById("productprice").value
        let productDesc = document.getElementById("productdesc").value
        localStorage.setItem(uid, JSON.stringify({ productName, productPrice, productDesc, url }));
        updateBtn.removeAttribute("onclick");
        updateBtnClass.classList.add("d-none");
        btnSubmit.classList.remove("d-none");
        productImg.classList.add("d-none")
        document.getElementById("productid").readOnly = false;
        mainTable.classList.remove("d-none")
        getproduct()
    }
}

// for delete function
function deleteData(deleteid) {
    swal({
        title: "Are you sure?",
        text: "You want to delete this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            localStorage.removeItem(deleteid);
          window.location.reload()
        }
      });
    getproduct()
}

// function for validation at insert time
function validation() {
    if (document.getElementById("productid").value.trim() == "") {
        swal("Oops", "Please Enter Product Id.", "error");
        return false;

    }else if (!/^[0-9]+$/.test(document.getElementById("productid").value)) {
        swal("Oops", "Please Enter Numeric Id.", "error");
        return false;
    }

    if (document.getElementById("productname").value.trim() == "") {
        swal("Oops", "Please Enter Product Name.", "error");
        return false;
    } else if (!/^[a-zA-Z]+$/.test(document.getElementById("productname").value)) {
        swal("Oops", "Please Enter Valid Product Name.", "error");
        return false;
    }

    const price = document.getElementById("productprice").value
    if (price.trim() == "") {
        swal("Oops", "Please Enter Product Price.", "error");
        return false;
    } else if (isNaN(price)) {
        swal("Oops", "Please Enter Valid Price.", "error");
        return false;
    }

    if (document.getElementById("productdesc").value.trim() == "") {
        swal("Oops", "Please Enter Product Description.", "error");
        return false;
    }

    let allowImg = /(\.jpg|\.png|\.jpeg|\.gif)/;
    let productImage = document.getElementById("image").value
    if (productImage == "") {
        swal("Oops", "Please Select Product Image", "error");
        return false;
    } else if (!allowImg.exec(productImage)) {
        swal("Oops", "Please Enter Valid Image (.jpg,.png,.jpeg,.gif)", "error");
        return false;
    }

    let data1=localStorage.getItem(document.getElementById("productid").value);
    if (data1){
        swal("Oops", "You Can not insert this data because this key is alredy exist.", "error");
        return false;
    }
    return true;
    
}

// function for validation at update time
function updatevalidation() {
    if (document.getElementById("productname").value.trim() == "") {
        swal("Oops", "Please Enter Product Name.", "error");
        return false;
    } else if (!/^[a-zA-Z]+$/.test(document.getElementById("productname").value)) {
        swal("Oops", "Please Enter Valid Product Name.", "error");
        return false;
    }

    const price = document.getElementById("productprice").value
    if (price.trim() == "") {
        swal("Oops", "Please Enter Product Price.", "error");
        return false;
    } else if (isNaN(price)) {
        swal("Oops", "Please Enter Valid Price.", "error");
        return false;
    }

    if (document.getElementById("productdesc").value.trim() == "") {
        swal("Oops", "Please Enter Product Description.", "error");
        return false;
    }

    let allowImg = /(\.jpg|\.png|\.jpeg|\.gif)/;
    let productImage = document.getElementById("image").value
    if (productImage) {
        if (!allowImg.exec(productImage)) {
            swal("Oops", "Please Enter Valid Image (.jpg,.png,.jpeg,.gif)", "error");
            return false;
        }
    }
    return true;
}