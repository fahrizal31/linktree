document.addEventListener("DOMContentLoaded", loadLinks);

async function loadLinks() {

    try {
        const data = await getLinks();
        const table = document.getElementById("tableLinks");
        table.innerHTML = "";

        if (!Array.isArray(data)) return;

        data.forEach(link => {
            table.innerHTML += `
                <tr class="border-b">
                    <td class="p-4">${link.title}</td>
                    <td class="p-4">
                        <a href="${link.url}" target="_blank" class="text-indigo-600 hover:underline">
                            ${link.url}
                        </a>
                    </td>
                    <td class="p-4">
                        <button onclick="removeLink('${link.id}')"
                            class="bg-red-500 text-white px-3 py-1 rounded">
                            Hapus
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
        alert("Gagal mengambil data dari API");
    }
}

async function createLink() {

    const title = document.getElementById("title").value.trim();
    const url = document.getElementById("url").value.trim();

    if (!title || !url) {
        alert("Judul dan URL wajib diisi");
        return;
    }

    try {
        const result = await addLink(title, url);
        alert(result.message);

        document.getElementById("title").value = "";
        document.getElementById("url").value = "";

        loadLinks();

    } catch (err) {
        console.error(err);
        alert("Gagal menambah link");
    }
}

async function removeLink(id) {

    if (!confirm("Yakin ingin hapus?")) return;

    try {
        const result = await deleteLink(id);
        alert(result.message);
        loadLinks();

    } catch (err) {
        console.error(err);
        alert("Gagal menghapus link");
    }
}