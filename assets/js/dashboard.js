// dashboard.js
document.addEventListener("DOMContentLoaded", loadLinks);

// ================== LOAD LINKS ==================
async function loadLinks() {
    try {
        const data = await getLinks(); // ambil data dari API
        if (!Array.isArray(data)) return;

        renderTable(data); // render tabel
    } catch (err) {
        console.error(err);
        alert("Gagal mengambil data dari API");
    }
}

// ================== CREATE LINK ==================
async function createLink() {
    const title = document.getElementById("title").value.trim();
    const url = document.getElementById("url").value.trim();

    if (!title || !url) {
        alert("Judul dan URL wajib diisi");
        return;
    }

    try {
        const result = await addLink(title, url); // API addLink
        alert(result.message);

        document.getElementById("title").value = "";
        document.getElementById("url").value = "";

        loadLinks(); // refresh table
    } catch (err) {
        console.error(err);
        alert("Gagal menambah link");
    }
}

// ================== REMOVE LINK ==================
async function removeLink(id) {
    if (!confirm("Yakin ingin hapus?")) return;

    try {
        const result = await deleteLink(id); // API deleteLink
        alert(result.message);
        loadLinks(); // refresh table
    } catch (err) {
        console.error(err);
        alert("Gagal menghapus link");
    }
}

// ================== RENDER TABLE ==================
function renderTable(data) {
    const table = document.getElementById("tableLinks");
    table.innerHTML = "";

    data.forEach(link => {
        table.innerHTML += `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-4">${link.title}</td>
                <td class="p-4">
                    <a href="${link.url}" target="_blank" class="text-indigo-600 hover:underline">
                        ${link.url}
                    </a>
                </td>
                <td class="p-4 space-x-2">
                    <!-- TOMBOL EDIT -->
                    <button
                        data-id="${link.id}"
                        data-title="${encodeURIComponent(link.title)}"
                        data-url="${encodeURIComponent(link.url)}"
                        onclick="openEditModal(this)"
                        class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg">
                        Edit
                    </button>

                    <!-- TOMBOL HAPUS -->
                    <button onclick="removeLink('${link.id}')"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                        Hapus
                    </button>
                </td>
            </tr>
        `;
    });
}

// ================== MODAL EDIT ==================
function openEditModal(button) {
    const id = button.dataset.id;
    const title = decodeURIComponent(button.dataset.title);
    const url = decodeURIComponent(button.dataset.url);

    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editUrl").value = url;

    const modal = document.getElementById("editModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function closeModal() {
    const modal = document.getElementById("editModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
}

// ================== UPDATE LINK ==================
async function updateLink() {
    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value.trim();
    const url = document.getElementById("editUrl").value.trim();

    if (!title || !url) {
        alert("Judul dan URL wajib diisi");
        return;
    }

    try {
        const result = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "update",
                id: id,
                title: title,
                url: url
            })
        }).then(res => res.json());

        alert(result.message);
        closeModal();
        loadLinks(); // refresh table
    } catch (err) {
        console.error(err);
        alert("Gagal memperbarui link");
    }
}
