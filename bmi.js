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

    $('#calculate-bmi').click(function () {
        var date = $("#date").val();
        var name = $("#name").val();
        var weight = parseFloat($("#weight").val());
        var height = parseFloat($("#height").val());

        // Validate input
        if (!date || !name || weight <= 0 || height <= 0) {
            $("#bmi-result").html(
                `<p class="text-danger">Please enter valid weight and height values.</p>`
            );
        } else {
            var bmi = weight / (height * height);
            var bmiResult = bmi.toFixed(2);
            
            var status = null;
            var link="images/";
            if (bmiResult < 18.5) {
                status = "Underweight";
                link=link+"underweight.png";
            } else if (bmiResult >= 18.5 && bmiResult <= 24.9) {
                status = "Normal weight";
                link=link+"normal.png";
            } else if (bmiResult >= 25.0 && bmiResult <= 29.9) {
                status = "Overweight";
                link=link+"overweight.png";
            } else if (bmiResult >= 30.0) {
                status = "Obesity";
                link=link+"obese.png";
            }

            var bmiData = {
                "Date": date,
                "Name": name,
                "Height" :height,
                "Weight" :weight,
                "Result": bmiResult,
                "Status": status
            };

            bmiArray.push(bmiData); // Store the data in the array

            // Calculate ideal weight for normal BMI range (18.5 - 24.9)
            var minNormalWeight = 18.5 * (height * height);
            var maxNormalWeight = 24.9 * (height * height);

            var weightToLose = 0;
            var weightToAdd = 0;

            if (bmiResult < 18.5) {
                weightToAdd = (18.5 - bmiResult) * (height * height);
            } else if (bmiResult > 24.9) {
                weightToLose = (bmiResult - 24.9) * (height * height);
            }
            
            // Update localStorage with the new array
            localStorage.setItem("Bmidata", JSON.stringify(bmiArray));
            $("#bmi-result").css("display", "block");
            // Display the result
            $("#bmi-result").html(
                
                `<img width="100px" src=${link}></img>
                <p>Date: ${date}</p>
                 <p>Name: ${name}</p>
                 <p>Weight: ${weight}</p>
                 <p>Height: ${height}</p>
                 <p>BMI Result: ${bmiResult}</p>
                 <p>Status: ${status}</p>`
            );

            if (weightToLose > 0) {
                $("#bmi-result").append(`<p>Weight to Lose: ${weightToLose.toFixed(2)} kg</p>`);
            } else if (weightToAdd > 0) {
                $("#bmi-result").append(`<p>Weight to Add: ${weightToAdd.toFixed(2)} kg</p>`);
            }

            console.log(bmiArray); // Optional: log the array to the console for debugging
        }
    });

    $('#bmi-history').click(function(){
        window.location.href = "history.html";
    });

});
