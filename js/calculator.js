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

const squadAccExp = [
    0,
    0, 500, 1400, 2700, 4500,
    6700, 9400, 12600, 16200, 20200,
    24700, 29700, 35100, 40900, 47200,
    54000, 61200, 68800, 77100, 86100,
    95900, 106500, 118500, 132000, 147000,
    163500, 181800, 201900, 223900, 247900,
    274200, 302500, 333300, 366600, 402400,
    441000, 482400, 526600, 574000, 624600,
    678400, 735700, 796500, 861000, 929200,
    1001500, 1077900, 1158400, 1243300, 1332700,
    1426800, 1525600, 1629400, 1738300, 1852300,
    1971800, 2096700, 2227200, 2363500, 2505900,
    2654400, 2809000, 2970100, 3137800, 3312300,
    3493800, 3682300, 3877800, 4080800, 4291400,
    4509600, 4735800, 4970000, 5212500, 5463300,
    5722800, 5990800, 6267800, 6553800, 6849300,
    7154000, 7468500, 7792500, 8127000, 8471000,
    8826000, 9191000, 9567000, 9954000, 10352000,
    10761000, 11182000, 11614000, 12058000, 12514000,
    12983000, 13464000, 13957000, 14463000, 15000000
];

const perHour = [
    1, 3, 3, 5, 7, 7, 9, 11, 11, 13, 15
];

document.getElementById("oath").addEventListener("change", DollOperationReportCalc);
document.getElementById("fairy").addEventListener("change", DollOperationReportCalc);
document.getElementById("dollCurrentLv").addEventListener("keyup", DollOperationReportCalc);
document.getElementById("dollCurrentExp").addEventListener("keyup", DollOperationReportCalc);
document.getElementById("dollTargetLv").addEventListener("keyup", DollOperationReportCalc);

document.getElementById("hocCurrentLv").addEventListener("keyup", HocOperationReportCalc);
document.getElementById("hocCurrentExp").addEventListener("keyup", HocOperationReportCalc);
document.getElementById("hocTargetLv").addEventListener("keyup", HocOperationReportCalc);
document.getElementById("hocTrainingGroundLv").addEventListener("keyup", HocOperationReportCalc);

function DollOperationReportCalc() {
    var oath = document.getElementById("oath").checked + 1;
    var fairy = document.getElementById("fairy").checked ? 3 : 1;
    var currentLv = Number(document.getElementById("dollCurrentLv").value);
    var currentExp = Number(document.getElementById("dollCurrentExp").value);
    var targetLv = Number(document.getElementById("dollTargetLv").value);
    var operationReport = 0;

    if (IsValidLv(currentLv, currentExp, targetLv, fairy, 0, dollAccExp)) {
        if (targetLv > 115) {
            operationReport += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 115)] - currentExp) / (3000 * oath));
            targetLv = 115;
            currentExp = 0;
        }

        if (targetLv > 110 && currentLv < 115) {
            operationReport += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 110)] - currentExp) / (3000 * oath));
            targetLv = 110;
            currentExp = 0;
        }

        if (targetLv > 100 && currentLv < 110) {
            operationReport += Math.ceil((dollAccExp[targetLv] - dollAccExp[Math.max(currentLv, 100)] - currentExp) / (3000 * oath));
            targetLv = 100;
            currentExp = 0;
        }

        if (targetLv <= 100 && currentLv < 100) {
            operationReport += Math.ceil(((dollAccExp[targetLv] - dollAccExp[currentLv]) * fairy - currentExp) / 3000);
        }

        document.getElementById("dollOperationReportCalcResult").innerText = "필요 작전보고서 : " + operationReport + " 개";
    }
    else {
        document.getElementById("dollOperationReportCalcResult").innerText = "필요 작전보고서 : N/A";
    }
}

function HocOperationReportCalc() {
    var currentLv = Number(document.getElementById("hocCurrentLv").value);
    var currentExp = Number(document.getElementById("hocCurrentExp").value);
    var targetLv = Number(document.getElementById("hocTargetLv").value);
    var trainingGroundLv = Number(document.getElementById("hocTrainingGroundLv").value);
    var operationReport = 0;
    var trainingTime = 0;
    var battery = 0;

    if (IsValidLv(currentLv, currentExp, targetLv, 1, trainingGroundLv, squadAccExp)) {
        operationReport = Math.ceil((squadAccExp[targetLv] - squadAccExp[currentLv] - currentExp) / 3000);
        trainingTime = Math.ceil(operationReport / perHour[trainingGroundLv]);
        battery = trainingTime * 5;

        document.getElementById("hocOperationReportCalcResult").innerText = "필요 특수작전보고서 : " + operationReport + " 개\n훈련시간 : " + trainingTime + " 시간\n전지 : " + battery + " 개";
    }
    else {
        document.getElementById("hocOperationReportCalcResult").innerText = "필요 특수작전보고서 : N/A\n훈련시간 : N/A\n전지 : N/A";
    }
}

function IsValidLv(currentLv, currentExp, targetLv, fairy, trainingGroundLv, AccExp) {
    if ((currentLv < targetLv) && (currentExp >= 0) && ((AccExp[currentLv+1] - AccExp[currentLv]) * fairy > currentExp) && ((fairy == 1 && targetLv < AccExp.length) || (fairy == 3 && targetLv <= 100)) && (trainingGroundLv >= 0) && (perHour.length > trainingGroundLv)) {
        return true;
    }

    return false;
}