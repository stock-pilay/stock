document.addEventListener("DOMContentLoaded", () => {
    const unitTableBody = document.getElementById("unitTableBody");
    const downloadExcelBtn = document.getElementById("downloadExcel");

    let units = JSON.parse(localStorage.getItem("units")) || [];

    // Renderizar la tabla de unidades
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

        // Guardar los datos en localStorage
        localStorage.setItem("units", JSON.stringify(units));
    }

    // Eliminar una unidad
    unitTableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            units.splice(index, 1);
            renderTable();
        }
    });

    // Descargar archivo Excel
    downloadExcelBtn.addEventListener("click", () => {
        const worksheet = XLSX.utils.json_to_sheet(units);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unidades");
        XLSX.writeFile(workbook, "bbdd_actualizado.xlsx");
    });

    // Cargar la tabla inicial
    renderTable();
});
