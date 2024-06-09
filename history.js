$(document).ready(function () {
    // Retrieve the BMI data from localStorage
    var storedBmiData = localStorage.getItem("Bmidata");
    var bmiArray;
    
    // Check if there is any stored data, if not initialize an empty array
    if (storedBmiData === null) {
        bmiArray = [];
    } else {
        bmiArray = JSON.parse(storedBmiData);
    }

    function renderBMIHistory() {
        var bmiHistoryTable = $('#bmi-history-table');
        bmiHistoryTable.empty();
        bmiArray.forEach(function (bmiData, index) {
            var row = `
                <tr data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                    <td>${bmiData.Date}</td>
                    <td>${bmiData.Name}</td>
                    <td><button class="btn btn-sm btn-primary">Expand</button></td>
                </tr>
                <tr>
                    <td colspan="3" class="p-0">
                        <div class="collapse" id="collapse${index}">
                            <div class="card card-body">
                                <p><strong>Weight (kg):</strong> ${bmiData.Weight || 'N/A'}</p>
                                <p><strong>Height (m):</strong> ${bmiData.Height || 'N/A'}</p>
                                <p><strong>BMI Result:</strong> ${bmiData.Result}</p>
                                <p><strong>Status:</strong> ${bmiData.Status}</p>
                            </div>
                        </div>
                    </td>
                </tr>`;
            bmiHistoryTable.append(row);
        });
    }

    renderBMIHistory();

    $('#backBtn').click(function () {
        window.location.href = "index.html";
    });
});
