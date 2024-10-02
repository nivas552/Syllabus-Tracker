document.getElementById("syllabus-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page refresh

    // Get form values
    const subject = document.getElementById("subject").value;
    const unitsCovered = parseInt(document.getElementById("units").value);
    const totalUnits = parseInt(document.getElementById("total-units").value);
    const labNames = document.getElementById("lab-names").value.split(",");
    const labsCovered = parseInt(document.getElementById("labs").value);
    const totalLabs = parseInt(document.getElementById("total-labs").value);
    const deadline = document.getElementById("deadline").value;

    // Calculate remaining units and labs
    const unitsRemaining = totalUnits - unitsCovered;
    const labsRemaining = totalLabs - labsCovered;
    const progressUnits = (unitsCovered / totalUnits) * 100;
    const progressLabs = (labsCovered / totalLabs) * 100;

    // Update Chart.js with new data (ensure you create these charts first)
    updateCharts(unitsCovered, totalUnits, labsCovered, totalLabs);

    // Update the result table
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear previous entries
    const newRow = `
        <tr>
            <td>${subject}</td>
            <td>${unitsCovered}</td>
            <td>${unitsRemaining}</td>
            <td>${labsCovered}</td>
            <td>${labsRemaining}</td>
            <td>${labNames.join(", ")}</td>
            <td>${Math.round(progressUnits)}%</td>
            <td>${deadline || 'N/A'}</td>
        </tr>`;
    tableBody.insertAdjacentHTML('beforeend', newRow);
});

// Function to update charts
function updateCharts(unitsCovered, totalUnits, labsCovered, totalLabs) {
    // Assuming you have already initialized the charts globally
    const unitsChart = new Chart(document.getElementById('unitsChart'), {
        type: 'bar',
        data: {
            labels: ['Covered', 'Remaining'],
            datasets: [{
                label: 'Units',
                data: [unitsCovered, totalUnits - unitsCovered],
                backgroundColor: ['#106c9f', '#b8e0e8'],
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const labsChart = new Chart(document.getElementById('labsChart'), {
        type: 'bar',
        data: {
            labels: ['Covered', 'Remaining'],
            datasets: [{
                label: 'Labs',
                data: [labsCovered, totalLabs - labsCovered],
                backgroundColor: ['#106c9f', '#b8e0e8'],
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const progressPieChart = new Chart(document.getElementById('progressPieChart'), {
        type: 'pie',
        data: {
            labels: ['Units Covered', 'Units Remaining', 'Labs Covered', 'Labs Remaining'],
            datasets: [{
                label: 'Progress',
                data: [unitsCovered, totalUnits - unitsCovered, labsCovered, totalLabs - labsCovered],
                backgroundColor: ['#106c9f', '#b8e0e8', '#91d8f3', '#d0e6ec'],
            }]
        }
    });
  document.getElementById("download-report").addEventListener("click", function() {
    const element = document.getElementById("charts-section"); // This is the section you want to download

    // Download as image
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "syllabus_tracker_report.png"; // Image filename
        link.click();
    });

    // Download as PDF
    const pdf = new jsPDF();
    pdf.html(element, {
        callback: function (doc) {
            doc.save("syllabus_tracker_report.pdf"); // PDF filename
        },
        x: 10,
        y: 10
    });
});

}