document.addEventListener("DOMContentLoaded", () => {
    const unitTableBody = document.getElementById("unitTableBody");
    const downloadExcelBtn = document.getElementById("downloadExcel");

    let units = [];

    async function loadExcel() {
        try {
            const response = await fetch("bbdd.xlsx");
            const data = await response.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            units = XLSX.utils.sheet_to_json(worksheet);
            renderTable();
        } catch (error) {
            console.error("Error al cargar el archivo Excel:", error);
        }
    }

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
                    <a href="form_unit.html?action=edit&index=${index}" class="btn">Editar</a>
                    <button class="btn delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            unitTableBody.appendChild(row);
        });
    }

    unitTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            units.splice(index, 1);
            renderTable();
            saveToExcel();
        }
    });

    downloadExcelBtn.addEventListener("click", saveToExcel);

    function saveToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(units);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unidades");
        XLSX.writeFile(workbook, "bbdd.xlsx");
    }

    loadExcel();
});
