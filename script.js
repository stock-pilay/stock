document.addEventListener("DOMContentLoaded", () => {
    const unitTableBody = document.getElementById("unitTableBody");
    const downloadExcelBtn = document.getElementById("downloadExcel");
    const addUnitBtn = document.getElementById("addUnitBtn");

    const modal = document.getElementById("modal");
    const modalForm = document.getElementById("modalForm");
    const modalTitle = document.getElementById("modalTitle");
    const cancelModal = document.getElementById("cancelModal");

    let units = JSON.parse(localStorage.getItem("units")) || [];
    let editingIndex = null;

    // Mostrar modal
    function openModal(title, unit = null) {
        modal.classList.remove("hidden");
        modal.classList.add("visible");
        modalTitle.textContent = title;

        if (unit) {
            document.getElementById("desarrollo").value = unit.Desarrollo || "";
            document.getElementById("unidad").value = unit.Unidad || "";
            document.getElementById("dormitorios").value = unit.Dormitorios || "";
            document.getElementById("producto").value = unit.Producto || "";
            document.getElementById("destino").value = unit.Destino || "";
            document.getElementById("estado").value = unit.Estado || "";
            document.getElementById("cliente").value = unit.Cliente || "";
        } else {
            modalForm.reset();
        }
    }

    // Ocultar modal
    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("visible");
        editingIndex = null;
    }

    // Renderizar tabla
    function renderTable() {
        unitTableBody.innerHTML = "";
        units.forEach((unit, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${unit.Desarrollo}</td>
                <td>${unit.Unidad}</td>
                <td>${unit.Dormitorios}</td>
                <td>${unit.Producto}</td>
                <td>${unit.Destino}</td>
                <td>${unit.Estado}</td>
                <td>${unit.Cliente}</td>
                <td>
                    <button class="btn edit-btn" data-index="${index}">Editar</button>
                    <button class="btn delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            unitTableBody.appendChild(row);
        });

        localStorage.setItem("units", JSON.stringify(units));
    }

    // Guardar datos y generar Excel
    function saveToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(units);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unidades");
        XLSX.writeFile(workbook, "bbdd_actualizado.xlsx");
    }

    // Eventos
    addUnitBtn.addEventListener("click", () => openModal("Agregar Unidad"));
    cancelModal.addEventListener("click", closeModal);

    unitTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            editingIndex = index;
            openModal("Editar Unidad", units[index]);
        }

        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            units.splice(index, 1);
            renderTable();
            saveToExcel();
        }
    });

    modalForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newUnit = {
            Desarrollo: document.getElementById("desarrollo").value,
            Unidad: document.getElementById("unidad").value,
            Dormitorios: document.getElementById("dormitorios").value,
            Producto: document.getElementById("producto").value,
            Destino: document.getElementById("destino").value,
            Estado: document.getElementById("estado").value,
            Cliente: document.getElementById("cliente").value,
        };

        if (editingIndex !== null) {
            units[editingIndex] = newUnit;
        } else {
            units.push(newUnit);
        }

        renderTable();
        saveToExcel();
        closeModal();
    });

    // Renderizar tabla inicial
    renderTable();
});
