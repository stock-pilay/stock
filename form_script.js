document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const action = params.get("action");
    const index = params.get("index");

    const form = document.getElementById("unitForm");
    const confirmationMessage = document.getElementById("confirmationMessage");
    const backToHomeBtn = document.getElementById("backToHome");

    let units = JSON.parse(localStorage.getItem("units")) || [];

    if (action === "edit" && index !== null) {
        const unit = units[index];
        document.getElementById("desarrollo").value = unit.Desarrollo;
        document.getElementById("unidad").value = unit.Unidad;
        document.getElementById("dormitorios").value = unit.Dormitorios;
        document.getElementById("producto").value = unit.Producto;
        document.getElementById("destino").value = unit.Destino;
        document.getElementById("estado").value = unit.Estado;
        document.getElementById("cliente").value = unit.Cliente;
        document.getElementById("unitIndex").value = index;
    }

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

        if (action === "edit" && index !== null) {
            units[index] = newUnit;
        } else {
            units.push(newUnit);
        }

        localStorage.setItem("units", JSON.stringify(units));

        const worksheet = XLSX.utils.json_to_sheet(units);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Unidades");
        XLSX.writeFile(workbook, "bbdd.xlsx");

        confirmationMessage.style.display = "block";
        backToHomeBtn.style.display = "inline-block";
    });
});
