/*const API_URL = "http://localhost:3000";

const userForm =
document.getElementById("userForm");

const usersList =
document.getElementById("usersList");

const requestsList =
document.getElementById("requestsList");



async function fetchUsers() {

    try {

        const response =
        await fetch(`${API_URL}/users`);

        const result =
        await response.json();

        console.log(result);

        usersList.innerHTML = "";

        result.data.forEach(user => {

            usersList.innerHTML += `

            <div class="user-card">

                <h3>
                    ${user.name}
                </h3>

                <p class="email">
                    ${user.email}
                </p>

                <p>
                    <strong>
                    User ID:
                    </strong>
                    ${user.id}
                </p>

                <div class="skill-box">

                    <p class="skill-title">
                        Skills Have
                    </p>

                    <div class="badges">

                        ${user.skillsHave
                            .map(skill =>
                                `<span class="badge">
                                    ${skill}
                                </span>`
                            )
                            .join("")}

                    </div>

                </div>

                <div class="skill-box">

                    <p class="skill-title">
                        Skills Want
                    </p>

                    <div class="badges">

                        ${user.skillsWant
                            .map(skill =>
                                `<span class="badge want">
                                    ${skill}
                                </span>`
                            )
                            .join("")}

                    </div>

                </div>

                <button
                onclick="sendRequest(
                    ${user.id}
                )">

                    Request Skill

                </button>

            </div>
            `;
        });

    } catch (error) {

        console.log(
            "Fetch User Error:",
            error
        );
    }
}


// =========================
// REGISTER USER
// =========================

userForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            const name =
            document
            .getElementById("name")
            .value
            .trim();

            const email =
            document
            .getElementById("email")
            .value
            .trim();

            const skillsHave =
            document
            .getElementById("skillsHave")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

            const skillsWant =
            document
            .getElementById("skillsWant")
            .value
            .split(",")
            .map(skill => skill.trim())
            .filter(Boolean);

            const response =
            await fetch(
                `${API_URL}/users`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        skillsHave,
                        skillsWant
                    })
                }
            );

            const result =
            await response.json();

            console.log(result);

            alert(result.message);

            userForm.reset();

            await fetchUsers();

        } catch (error) {

            console.log(
                "Register Error:",
                error
            );
        }
    }
);


// =========================
// SEND REQUEST
// =========================

async function sendRequest(
    receiverId
) {

    const senderId =
    prompt(
        "Enter Sender User ID"
    );

    if (!senderId) return;

    const skill =
    prompt(
        "Enter Skill Name"
    );

    if (!skill) return;

    try {

        const response =
        await fetch(
            `${API_URL}/requests`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({
                    senderId:
                    Number(senderId),

                    receiverId,

                    skill
                })
            }
        );

        const result =
        await response.json();

        alert(result.message);

        await fetchRequests();

    } catch (error) {

        console.log(
            "Send Request Error:",
            error
        );
    }
}


// =========================
// FETCH REQUESTS
// =========================

async function fetchRequests() {

    try {

        const response =
        await fetch(
            `${API_URL}/requests`
        );

        const result =
        await response.json();

        console.log(result);

        requestsList.innerHTML =
        "";

        result.data.forEach(req => {

            requestsList.innerHTML += `

            <div class="user-card">

                <h3>
                    Request #${req.id}
                </h3>

                <p>
                    <strong>
                    Sender:
                    </strong>
                    ${req.senderId}
                </p>

                <p>
                    <strong>
                    Receiver:
                    </strong>
                    ${req.receiverId}
                </p>

                <p>
                    <strong>
                    Skill:
                    </strong>
                    ${req.skill}
                </p>

                <p>
                    <strong>
                    Status:
                    </strong>

                    <span class="
                    ${
                        req.status ===
                        "Accepted"

                        ? "badge"

                        : req.status ===
                        "Rejected"

                        ? "badge want"

                        : "badge"
                    }
                    ">

                    ${req.status}

                    </span>
                </p>

                ${
                    req.status ===
                    "Pending"

                    ?

                    `
                    <button
                    onclick=
                    "acceptRequest(
                    ${req.id}
                    )">

                    Accept

                    </button>

                    <button
                    onclick=
                    "rejectRequest(
                    ${req.id}
                    )">

                    Reject

                    </button>
                    `

                    :

                    ""
                }

            </div>
            `;
        });

    } catch (error) {

        console.log(
            "Fetch Request Error:",
            error
        );
    }
}


// =========================
// ACCEPT REQUEST
// =========================

async function acceptRequest(
    id
) {

    try {

        const response =
        await fetch(
            `${API_URL}/requests/${id}/accept`,
            {
                method: "PUT"
            }
        );

        const result =
        await response.json();

        alert(result.message);

        await fetchRequests();

    } catch (error) {

        console.log(
            "Accept Error:",
            error
        );
    }
}


// =========================
// REJECT REQUEST
// =========================

async function rejectRequest(
    id
) {

    try {

        const response =
        await fetch(
            `${API_URL}/requests/${id}/reject`,
            {
                method: "PUT"
            }
        );

        const result =
        await response.json();

        alert(result.message);

        await fetchRequests();

    } catch (error) {

        console.log(
            "Reject Error:",
            error
        );
    }
}


fetchUsers();
fetchRequests();  */


const API_URL = "http://localhost:3000";

const userForm =
document.getElementById("userForm");

const usersList =
document.getElementById("usersList");

const requestsList =
document.getElementById("requestsList");

const editModal =
document.getElementById("editModal");

const saveEditBtn =
document.getElementById("saveEdit");

let currentUserId = null;


// =========================
// FETCH USERS
// =========================

async function fetchUsers() {

    try {

        const response =
        await fetch(
            `${API_URL}/users`
        );

        const result =
        await response.json();

        usersList.innerHTML =
        "";

        result.data.forEach(user => {

            usersList.innerHTML += `

            <div class="user-card">

                <h3>
                    ${user.name}
                </h3>

                <p class="email">
                    ${user.email}
                </p>

                <p>
                    <strong>
                    User ID:
                    </strong>
                    ${user.id}
                </p>

                <div class="skill-box">

                    <p class="skill-title">
                        Skills Have
                    </p>

                    <div class="badges">

                        ${user.skillsHave
                        .map(skill =>
                        `<span class="badge">
                            ${skill}
                        </span>`)
                        .join("")}

                    </div>

                </div>

                <div class="skill-box">

                    <p class="skill-title">
                        Skills Want
                    </p>

                    <div class="badges">

                        ${user.skillsWant
                        .map(skill =>
                        `<span class=
                        "badge want">
                            ${skill}
                        </span>`)
                        .join("")}

                    </div>

                </div>

                <div
                class="card-actions">

                    <button
                    onclick=
                    "openEditModal(
                        ${user.id},
                        '${user.name}',
                        '${user.email}',
                        '${user.skillsHave.join(",")}',
                        '${user.skillsWant.join(",")}'
                    )">

                    Edit

                    </button>

                    <button
                    onclick=
                    "deleteUser(
                        ${user.id}
                    )">

                    Delete

                    </button>

                    <button
                    onclick=
                    "sendRequest(
                        ${user.id}
                    )">

                    Request Skill

                    </button>

                </div>

            </div>
            `;
        });

    } catch (error) {

        console.log(
            "Fetch User Error:",
            error
        );
    }
}


// =========================
// REGISTER USER
// =========================

userForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        try {

            const name =
            document
            .getElementById("name")
            .value
            .trim();

            const email =
            document
            .getElementById("email")
            .value
            .trim();

            const skillsHave =
            document
            .getElementById("skillsHave")
            .value
            .split(",")
            .map(skill =>
            skill.trim())
            .filter(Boolean);

            const skillsWant =
            document
            .getElementById("skillsWant")
            .value
            .split(",")
            .map(skill =>
            skill.trim())
            .filter(Boolean);

            const response =
            await fetch(
                `${API_URL}/users`,
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({
                        name,
                        email,
                        skillsHave,
                        skillsWant
                    })
                }
            );

            const result =
            await response.json();

            alert(
                result.message
            );

            userForm.reset();

            fetchUsers();

        } catch (error) {

            console.log(
                "Register Error:",
                error
            );
        }
    }
);


// =========================
// DELETE USER
// =========================

async function deleteUser(
    id
) {

    const confirmDelete =
    confirm(
        "Delete this user?"
    );

    if (!confirmDelete)
    return;

    try {

        const response =
        await fetch(
            `${API_URL}/users/${id}`,
            {
                method:
                "DELETE"
            }
        );

        const result =
        await response.json();

        alert(
            result.message
        );

        fetchUsers();

    } catch (error) {

        console.log(
            "Delete Error:",
            error
        );
    }
}


// =========================
// EDIT USER
// =========================

function openEditModal(
    id,
    name,
    email,
    skillsHave,
    skillsWant
) {

    currentUserId =
    id;

    editModal.classList
    .remove("hidden");

    document
    .getElementById(
        "editName"
    ).value =
    name;

    document
    .getElementById(
        "editEmail"
    ).value =
    email;

    document
    .getElementById(
        "editSkillsHave"
    ).value =
    skillsHave;

    document
    .getElementById(
        "editSkillsWant"
    ).value =
    skillsWant;
}


function closeModal() {

    editModal.classList
    .add("hidden");
}


saveEditBtn.addEventListener(
    "click",
    async () => {

        try {

            const name =
            document
            .getElementById(
                "editName"
            ).value;

            const email =
            document
            .getElementById(
                "editEmail"
            ).value;

            const skillsHave =
            document
            .getElementById(
                "editSkillsHave"
            )
            .value
            .split(",");

            const skillsWant =
            document
            .getElementById(
                "editSkillsWant"
            )
            .value
            .split(",");

            const response =
            await fetch(
                `${API_URL}/users/${currentUserId}`,
                {
                    method:"PUT",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body:
                    JSON.stringify({
                        name,
                        email,
                        skillsHave,
                        skillsWant
                    })
                }
            );

            const result =
            await response.json();

            alert(
                result.message
            );

            closeModal();

            fetchUsers();

        } catch (error) {

            console.log(
                "Edit Error:",
                error
            );
        }
    }
);


// =========================
// SEND REQUEST
// =========================

async function sendRequest(
    receiverId
) {

    const senderId =
    prompt(
        "Enter Sender User ID"
    );

    if (!senderId)
    return;

    const skill =
    prompt(
        "Enter Skill Name"
    );

    if (!skill)
    return;

    try {

        const response =
        await fetch(
            `${API_URL}/requests`,
            {
                method:
                "POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:
                JSON.stringify({
                    senderId:
                    Number(senderId),

                    receiverId,

                    skill
                })
            }
        );

        const result =
        await response.json();

        alert(
            result.message
        );

        fetchRequests();

    } catch (error) {

        console.log(
            "Request Error:",
            error
        );
    }
}


// =========================
// FETCH REQUESTS
// =========================

async function fetchRequests() {

    try {

        const response =
        await fetch(
            `${API_URL}/requests`
        );

        const result =
        await response.json();

        requestsList.innerHTML =
        "";

        result.data.forEach(req => {

            requestsList.innerHTML += `

            <div class="user-card">

                <h3>
                    Request #${req.id}
                </h3>

                <p>
                    Sender:
                    ${req.senderId}
                </p>

                <p>
                    Receiver:
                    ${req.receiverId}
                </p>

                <p>
                    Skill:
                    ${req.skill}
                </p>

                <p>
                    Status:
                    <span class=
                    "badge">

                    ${req.status}

                    </span>
                </p>

                ${
                    req.status ===
                    "Pending"

                    ?

                    `
                    <div class=
                    "card-actions">

                    <button
                    onclick=
                    "acceptRequest(
                        ${req.id}
                    )">

                    Accept

                    </button>

                    <button
                    onclick=
                    "rejectRequest(
                        ${req.id}
                    )">

                    Reject

                    </button>

                    </div>
                    `

                    :

                    ""
                }

            </div>
            `;
        });

    } catch (error) {

        console.log(
            "Fetch Request Error:",
            error
        );
    }
}


// =========================
// ACCEPT REQUEST
// =========================

async function acceptRequest(
    id
) {

    await fetch(
        `${API_URL}/requests/${id}/accept`,
        {
            method:"PUT"
        }
    );

    fetchRequests();
}


// =========================
// REJECT REQUEST
// =========================

async function rejectRequest(
    id
) {

    await fetch(
        `${API_URL}/requests/${id}/reject`,
        {
            method:"PUT"
        }
    );

    fetchRequests();
}


// =========================
// INITIAL LOAD
// =========================

fetchUsers();
fetchRequests();