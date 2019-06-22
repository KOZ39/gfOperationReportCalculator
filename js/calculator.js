const DOLL_ACC_EXP_LIST = [
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

const FAIRY_ACC_EXP_LIST = [
    0,
    0, 300, 900, 1800, 3000,
    4500, 6300, 8400, 10800, 13500,
    16500, 19800, 23400, 27300, 31500,
    36000, 40800, 45900, 51400, 57400,
    63900, 71000, 79000, 88000, 98000,
    109000, 121200, 134600, 149300, 165300,
    182800, 201700, 222200, 244400, 268300,
    294000, 321600, 351100, 382700, 416400,
    452300, 490500, 531000, 574000, 619500,
    667700, 718600, 772300, 828900, 888500,
    951200, 1017100, 1086300, 1158900, 1234900,
    1314500, 1397800, 1484800, 1575700, 1670600,
    1769600, 1872700, 1980100, 2091900, 2208200,
    2329100, 2454700, 2585100, 2720400, 2860800,
    3006300, 3157100, 3313200, 3474800, 3642000,
    3814900, 3993600, 4178300, 4369000, 4565900,
    4768200, 4977800, 5193900, 5416700, 5646300,
    5882800, 6126300, 6376900, 6634800, 6900100,
    7172900, 7453300, 7741500, 8037600, 8341700,
    8654000, 8974600, 9303600, 9641100, 9998100
];

const SQUAD_ACC_EXP_LIST = [
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

const REPORT_THROUGHPUT_PER_HOUR_LIST = [
    1, 3, 3, 5, 7, 7, 9, 11, 11, 13, 15
];

const EXP_PER_REPORT = 3000;
const OATH_MULTIPLE = 2;

$(document).ready(function() {
    $('[data-toggle="popover"]').popover({
        placement : "bottom",
        trigger : "focus",
        title : "최대 현재 경험치",
        html : true
    });
});

document.getElementById("dfCurrentLv").addEventListener("input", ChangeDfPopoverData);
document.getElementById("hocCurrentLv").addEventListener("input", ChangeHocPopoverData);

document.getElementById("dfCurrentLv").addEventListener("input", DollOperationReportCalc);
document.getElementById("dfCurrentExp").addEventListener("input", DollOperationReportCalc);
document.getElementById("dfTargetLv").addEventListener("input", DollOperationReportCalc);

document.getElementById("dfCurrentLv").addEventListener("input", FairyOperationReportCalc);
document.getElementById("dfCurrentExp").addEventListener("input", FairyOperationReportCalc);
document.getElementById("dfTargetLv").addEventListener("input", FairyOperationReportCalc);

document.getElementById("hocCurrentLv").addEventListener("input", HocOperationReportCalc);
document.getElementById("hocCurrentExp").addEventListener("input", HocOperationReportCalc);
document.getElementById("hocTargetLv").addEventListener("input", HocOperationReportCalc);
document.getElementById("hocTrainingGroundLv").addEventListener("input", HocOperationReportCalc);

function ChangeDfPopoverData() {
    var dfCurrentLv = Number(document.getElementById("dfCurrentLv").value);
    var dollMaxCurrentExp = 0;
    var fairyMaxCurrentExp = 0;

    if (dfCurrentLv > 0 && dfCurrentLv >= 100 && dfCurrentLv < 120) {
        dollMaxCurrentExp = "인형 : " + (DOLL_ACC_EXP_LIST[dfCurrentLv+1] - DOLL_ACC_EXP_LIST[dfCurrentLv] - 1).toLocaleString();
        fairyMaxCurrentExp = "요정 : N/A";
    }
    else if (dfCurrentLv > 0 && dfCurrentLv < 100) {
        dollMaxCurrentExp = "인형 : " + (DOLL_ACC_EXP_LIST[dfCurrentLv+1] - DOLL_ACC_EXP_LIST[dfCurrentLv] - 1).toLocaleString();
        fairyMaxCurrentExp = "요정 : " + (FAIRY_ACC_EXP_LIST[dfCurrentLv+1] - FAIRY_ACC_EXP_LIST[dfCurrentLv] - 1).toLocaleString();
    }
    else {
        dollMaxCurrentExp = "인형 : N/A";
        fairyMaxCurrentExp = "요정 : N/A";
    }

    document.getElementById("dfCurrentExp").dataset.content = dollMaxCurrentExp + "<br>" + fairyMaxCurrentExp;
}

function ChangeHocPopoverData() {
    var hocCurrentLv = Number(document.getElementById("hocCurrentLv").value);
    var hocMaxCurrentExp = 0;

    if (hocCurrentLv > 0 && hocCurrentLv < 100) {
        hocMaxCurrentExp = "중장비 : " + (SQUAD_ACC_EXP_LIST[hocCurrentLv+1] - SQUAD_ACC_EXP_LIST[hocCurrentLv] - 1).toLocaleString();
    }
    else {
        hocMaxCurrentExp = "중장비 : N/A";
    }

    document.getElementById("hocCurrentExp").dataset.content = hocMaxCurrentExp;
}

function DollOperationReportCalc() {
    var currentLv = Number(document.getElementById("dfCurrentLv").value);
    var currentExp = Math.max(Number(document.getElementById("dfCurrentExp").value), 0);
    var targetLv = Number(document.getElementById("dfTargetLv").value);
    var operationReport = {
        "doll": 0,
        "oath": 0
    };

    if (IsValidLv(currentLv, currentExp, targetLv, DOLL_ACC_EXP_LIST)) {
        if (targetLv > 115) {
            operationReport.doll += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 115)] - currentExp) / EXP_PER_REPORT);
            operationReport.oath += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 115)] - currentExp) / (EXP_PER_REPORT * OATH_MULTIPLE));
            targetLv = 115;
            currentExp = 0;
        }

        if (targetLv > 110 && currentLv < 115) {
            operationReport.doll += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 110)] - currentExp) / EXP_PER_REPORT);
            operationReport.oath += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 110)] - currentExp) / (EXP_PER_REPORT * OATH_MULTIPLE));
            targetLv = 110;
            currentExp = 0;
        }

        if (targetLv > 100 && currentLv < 110) {
            operationReport.doll += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 100)] - currentExp) / EXP_PER_REPORT);
            operationReport.oath += Math.ceil((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[Math.max(currentLv, 100)] - currentExp) / (EXP_PER_REPORT * OATH_MULTIPLE));
            targetLv = 100;
            currentExp = 0;
        }

        if (targetLv <= 100 && currentLv < 100) {
            operationReport.doll += Math.ceil(((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[currentLv]) - currentExp) / EXP_PER_REPORT);
            operationReport.oath += Math.ceil(((DOLL_ACC_EXP_LIST[targetLv] - DOLL_ACC_EXP_LIST[currentLv]) - currentExp) / EXP_PER_REPORT);
        }

        document.getElementById("dollOperationReportCalcResult").innerHTML = "(인형) : " + operationReport.doll.toLocaleString() + "<small>개</small><br>(서약) : " + operationReport.oath.toLocaleString() + "<small>개</small>";
    }
    else {
        document.getElementById("dollOperationReportCalcResult").innerHTML = "(인형) : N/A<br>(서약) : N/A";
    }
}

function FairyOperationReportCalc() {
    var currentLv = Number(document.getElementById("dfCurrentLv").value);
    var currentExp = Number(document.getElementById("dfCurrentExp").value);
    var targetLv = Number(document.getElementById("dfTargetLv").value);
    var operationReport = 0;

    if (IsValidLv(currentLv, currentExp, targetLv, FAIRY_ACC_EXP_LIST)) {
        if (targetLv <= 100 && currentLv < 100) {
            operationReport += Math.ceil((FAIRY_ACC_EXP_LIST[targetLv] - FAIRY_ACC_EXP_LIST[currentLv] - currentExp) / EXP_PER_REPORT);
        }

        document.getElementById("fairyOperationReportCalcResult").innerHTML = "(요정) : " + operationReport.toLocaleString() + "<small>개</small>";
    }
    else {
        document.getElementById("fairyOperationReportCalcResult").innerHTML = "(요정) : N/A";
    }
}

function HocOperationReportCalc() {
    var currentLv = Number(document.getElementById("hocCurrentLv").value);
    var currentExp = Number(document.getElementById("hocCurrentExp").value);
    var targetLv = Number(document.getElementById("hocTargetLv").value);
    var trainingGroundLv = Math.max(Number(document.getElementById("hocTrainingGroundLv").value), 0);
    var operationReport = 0;
    var trainingTime = 0;
    var battery = 0;

    if (IsValidLv(currentLv, currentExp, targetLv, SQUAD_ACC_EXP_LIST, trainingGroundLv)) {
        operationReport = Math.ceil((SQUAD_ACC_EXP_LIST[targetLv] - SQUAD_ACC_EXP_LIST[currentLv] - currentExp) / EXP_PER_REPORT);
        trainingTime = Math.ceil(operationReport / REPORT_THROUGHPUT_PER_HOUR_LIST[trainingGroundLv]);
        battery = trainingTime * 5;

        document.getElementById("hocOperationReportCalcResult").innerHTML = "필요 특수작전보고서 : " + operationReport.toLocaleString() + "<small>개</small><br>훈련시간 : " + trainingTime.toLocaleString() + "<small>시간</small><br>전지 : " + battery.toLocaleString() + "<small>개</small>";
    }
    else {
        document.getElementById("hocOperationReportCalcResult").innerHTML = "필요 특수작전보고서 : N/A<br>훈련시간 : N/A<br>전지 : N/A";
    }
}

function IsValidLv(currentLv, currentExp, targetLv, accExpList, trainingGroundLv=0) {
    if (
        currentLv < targetLv
        && currentExp < accExpList[currentLv+1] - accExpList[currentLv]
        && targetLv < accExpList.length
        && trainingGroundLv < REPORT_THROUGHPUT_PER_HOUR_LIST.length
    ) {
        return true;
    }

    return false;
}