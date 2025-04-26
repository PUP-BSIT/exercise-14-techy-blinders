function submitPhone() {
    const phoneType = document.getElementById("phone_type").value;
    const phoneName = document.getElementById("phone_name").value;
    const releaseDate = document.getElementById("release_date").value;
    const creator = document.getElementById("creator").value;
    const price = document.getElementById("price").value;

    if (!phoneType || !phoneName || !releaseDate || !creator || !price) {
        alert("Please fill in all fields.");
        return;
    }

    fetch("crud.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "phoneType=" + encodeURIComponent(phoneType) + "&" +
              "phoneName=" + encodeURIComponent(phoneName) + "&" +
              "releaseDate=" + encodeURIComponent(releaseDate) + "&" +
              "creator=" + encodeURIComponent(creator) + "&" +
              "price=" + encodeURIComponent(price)
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
        if (!responseText.includes("Error")) {
            document.getElementById("phone_type").value = "";
            document.getElementById("phone_name").value = "";
            document.getElementById("release_date").value = "";
            document.getElementById("creator").value = "";
            document.getElementById("price").value = "";
            loadPhones();
        }
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
}

function loadPhones() {
    fetch("crud.php")
        .then(response => response.text())
        .then(data => {
            document.getElementById("phone_list").innerHTML = data;
        })
        .catch(error => {
            alert("Error loading phones: " + error.message);
        });
}

function editPhone(id) {
    const phoneType = prompt("Enter new phone type:");
    const phoneName = prompt("Enter new phone name:");
    const releaseDate = prompt("Enter new release date:");
    const creator = prompt("Enter new creator:");
    const price = prompt("Enter new price:");

    if (!phoneType || !phoneName || !releaseDate || !creator || !price) {
        alert("All fields must be filled.");
        return;
    }

    fetch("crud.php", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "id=" + encodeURIComponent(id) + "&" +
              "phoneType=" + encodeURIComponent(phoneType) + "&" +
              "phoneName=" + encodeURIComponent(phoneName) + "&" +
              "releaseDate=" + encodeURIComponent(releaseDate) + "&" +
              "creator=" + encodeURIComponent(creator) + "&" +
              "price=" + encodeURIComponent(price)
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
        loadPhones();
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
}

function deletePhone(id) {
    if (!confirm("Are you sure you want to delete this phone?")) return;

    fetch("crud.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "id=" + encodeURIComponent(id)
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
        loadPhones();
    })
    .catch(error => {
        alert("Error: " + error.message);
    });
}

window.onload = function() {
    loadPhones();
}