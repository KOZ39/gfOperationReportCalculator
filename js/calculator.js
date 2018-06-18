const dollAccExp = [
    0,
    0, 100, 300, 600, 1000,
    1500, 2100, 2800, 3600, 4500,
    5500, 6600, 7800, 9100, 10500,
    12000, 13600, 15300, 17100, 19000,
    21000, 23100, 25300, 27600, 30000,
    32500, 35100, 37900, 41000, 44400,
    48600, 53200, 58200, 63600, 69400,
    75700, 82400, 89600, 97300, 105500,
    114300, 123600, 133500, 144000, 155100,
    166900, 179400, 192500, 206400, 221000,
    236400, 252500, 269400, 287100, 305700,
    325200, 345600, 366900, 389200, 412500,
    436800, 462100, 488400, 515800, 544300,
    573900, 604700, 636700, 669900, 704300,
    749400, 796200, 844800, 895200, 947400,
    1001400, 1057300, 1115200, 1175000, 1236800,
    1300700, 1366700, 1434800, 1505100, 1577700,
    1652500, 1729600, 1809100, 1891000, 1975300,
    2087900, 2204000, 2323500, 2446600, 2573300,
    2703700, 2837800, 2975700, 3117500, 3263200,
    3363200, 3483200, 3623200, 3783200, 3963200,
    4163200, 4383200, 4623200, 4903200, 5263200,
    5743200, 6383200, 7283200, 8483200, 10083200,
    12283200, 15283200, 19283200, 24283200, 30283200
];

document.getElementById("oath").addEventListener("change", OperationReportCalc);
document.getElementById("fairy").addEventListener("change", OperationReportCalc);

document.getElementById("currentLv").addEventListener("keyup", OperationReportCalc);
document.getElementById("currentExp").addEventListener("keyup", OperationReportCalc);
document.getElementById("targetLv").addEventListener("keyup", OperationReportCalc);

function OperationReportCalc() {
    var oath = document.getElementById("oath").checked + 1;
    var fairy = document.getElementById("fairy").checked ? 3 : 1;
    var currentLv = Number(document.getElementById("currentLv").value);
    var currentExp = Number(document.getElementById("currentExp").value);
    var targetLv = Number(document.getElementById("targetLv").value);
    var operationRepor = 0;

    if (IsValidLv(fairy, currentLv, currentExp, targetLv)) {
        if (targetLv > 115) {
            operationRepor += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 115)] - currentExp) / (3000 * oath));
            targetLv = 115;
            currentExp = 0;
        }

        if (targetLv > 110 && currentLv < 115) {
            operationRepor += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 110)] - currentExp) / (3000 * oath));
            targetLv = 110;
            currentExp = 0;
        }

        if (targetLv > 100 && currentLv < 110) {
            operationRepor += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 100)] - currentExp) / (3000 * oath));
            targetLv = 100;
            currentExp = 0;
        }

        if (targetLv <= 100 && currentLv < 100) {
            operationRepor += Math.ceil((dollAccExp[targetLv] - dollAccExp[currentLv] - currentExp) / 3000);
        }

        document.getElementById("operationReporCalcResult").innerText = operationRepor * fairy + " 개";
    }
    else {
        document.getElementById("operationReporCalcResult").innerText = "N/A";
    }
}

function IsValidLv(fairy, currentLv, currentExp, targetLv) {
    if (targetLv > currentLv && currentExp >= 0 && (dollAccExp[currentLv+1] - dollAccExp[currentLv]) * fairy > currentExp && (fairy == 1 && targetLv < dollAccExp.length) || (fairy == 3 && targetLv <= 100))
        return true;

    return false;
}