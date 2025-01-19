document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    const index = params.get("index");

    const form = document.getElementById("unitForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const backToHomeBtn = document.getElementById("backToHome");

    let units = JSON.parse(localStorage.getItem("units")) || [];

    // Cargar datos de la unidad si es edición
    if (action === "edit" && index !== null) {
        const unit = units[index];
        if (unit) {
            document.getElementById("desarrollo").value = unit.Desarrollo || "";
            document.getElementById("unidad").value = unit.Unidad || "";
            document.getElementById("dormitorios").value = unit.Dormitorios || "";
            document.getElementById("producto").value = unit.Producto || "";
            document.getElementById("destino").value = unit.Destino || "";
            document.getElementById("estado").value = unit.Estado || "";
            document.getElementById("cliente").value = unit.Cliente || "";
            document.getElementById("unitIndex").value = index;
        }
    }

    // Generar archivo Excel actualizado
    function saveToExcel() {
        const worksheet = XLSX.utils.json_to_sheet(units);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unidades");
        XLSX.writeFile(workbook, "bbdd_actualizado.xlsx");
    }

    // Guardar datos (nueva unidad o edición)
    form.addEventListener("submit", (event) => {
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

        const unitIndex = document.getElementById("unitIndex").value;

        if (action === "edit" && unitIndex !== null && unitIndex !== "") {
            units[unitIndex] = newUnit; // Actualizar unidad existente
        } else {
            units.push(newUnit); // Agregar nueva unidad
        }

        // Guardar los datos en localStorage
        localStorage.setItem("units", JSON.stringify(units));

        // Generar el archivo Excel actualizado
        saveToExcel();

        // Mostrar mensaje de confirmación
        confirmationMessage.style.display = "block";
        backToHomeBtn.style.display = "inline-block";
    });
});
