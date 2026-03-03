async function getLinks() {
    const res = await fetch(`${API_URL}?action=getLinks`);
    return res.json();
}

async function addLink(title, url) {

    const formData = new FormData();
    formData.append("action", "addLink");
    formData.append("title", title);
    formData.append("url", url);

    const res = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    return res.json();
}

async function deleteLink(id) {

    const formData = new FormData();
    formData.append("action", "deleteLink");
    formData.append("id", id);

    const res = await fetch(API_URL, {
        method: "POST",
        body: formData
    });

    return res.json();
}