var osero = (function() {

})();

$(function() {
    var blackStone = '●';
    var whiteStone = '○';

    var numberOfRow = 8;
    var numberOfColumn = 8;

    var $bord = $('#bord');

    var masuList = [];
    for (var row = 0; row < numberOfRow; row++) {
        var $tr = $('<tr>');
        $bord.append($tr);

        masuList.push([]);
        for (var column = 0; column < numberOfColumn; column++) {
            var $td = $('<td id="' + row + '_' + column + '"></td>');
            $tr.append($td);
            masuList[masuList.length - 1].push($td);
        }
    }

    masuList[3][3].text(whiteStone);
    masuList[3][4].text(blackStone);
    masuList[4][3].text(blackStone);
    masuList[4][4].text(whiteStone);

    var nextStone = blackStone;
    $bord.find('td').on('click', function() {
        if ($(this).text() !== '') return;

        $(this).text(nextStone);

        var row = Number($(this).attr('id').split('_')[0]);
        var column = Number($(this).attr('id').split('_')[1]);
        reverseStones(row, column, nextStone);

        nextStone = nextStone === blackStone ? whiteStone : blackStone;
    });

    var reverseStones = function(newStoneRow, newStoneColumn, newStone) {
        var reverseStone = newStone === blackStone ? whiteStone : blackStone;

        var column;
        var row;

        // 左
        if (newStoneColumn !== 0 && masuList[newStoneRow][newStoneColumn - 1].text() === reverseStone) {
            var exists = false;
            for (column = 0; column < newStoneColumn; column++) {
                exists = exists || masuList[newStoneRow][column].text() === newStone;
            }

            if (exists) {
                for (column = newStoneColumn - 1; column > 0; column--) {
                    if (masuList[newStoneRow][column].text() !== reverseStone) break;
                    masuList[newStoneRow][column].text(newStone);
                }
            }
        }

        // 右
        if (newStoneColumn !== numberOfColumn - 1 && masuList[newStoneRow][newStoneColumn + 1].text() === reverseStone) {
            var exists = false;
            for (column = newStoneColumn + 1; column < numberOfColumn; column++) {
                exists = exists || masuList[newStoneRow][column].text() === newStone;
            }

            if (exists) {
                for (column = newStoneColumn + 1; column < numberOfColumn; column++) {
                    if (masuList[newStoneRow][column].text() !== reverseStone) break;
                    masuList[newStoneRow][column].text(newStone);
                }
            }
        }

        // 上
        if (newStoneRow !== 0 && masuList[newStoneRow - 1][newStoneColumn].text() === reverseStone) {
            var exists = false;
            for (row = 0; row < newStoneRow; row++) {
                exists = exists || masuList[row][newStoneColumn].text() === newStone;
            }

            if (exists) {
                for (row = newStoneRow - 1; row > 0; row--) {
                    if (masuList[row][newStoneColumn].text() !== reverseStone) break;
                    masuList[row][newStoneColumn].text(newStone);
                }
            }
        }

        // 下
        if (newStoneRow !== numberOfRow - 1 && masuList[newStoneRow + 1][newStoneColumn].text() === reverseStone) {
            var exists = false;
            for (row = newStoneRow + 1; row < numberOfRow; row++) {
                exists = exists || masuList[row][newStoneColumn].text() === newStone;
            }

            if (exists) {
                for (row = newStoneRow + 1; row < numberOfRow; row++) {
                    if (masuList[row][newStoneColumn].text() !== reverseStone) break;
                    masuList[row][newStoneColumn].text(newStone);
                }
            }
        }
    };
});