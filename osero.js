var Osero = (function() {
    return function Osero(bordId, numberOfRow, numberOfColumn) {
        var blackStone = '●';
        var whiteStone = '○';
        var $bord = $('#' + bordId);

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

        // 中央に4つ置く
        masuList[3][3].text(whiteStone);
        masuList[3][4].text(blackStone);
        masuList[4][3].text(blackStone);
        masuList[4][4].text(whiteStone);

        var self = this;
        $bord.find('td').on('click', function() {
            var row = Number($(this).attr('id').split('_')[0]);
            var column = Number($(this).attr('id').split('_')[1]);
            self.set(column, row);
        });

        var nextStone = blackStone;
        this.set = function(x, y) {
            if (masuList[y][x].text() !== '') return;

            masuList[y][x].text(nextStone);

            reverseStones(x, y, nextStone);

            nextStone = nextStone === blackStone ? whiteStone : blackStone;
        };

        var reverseStones = function(newStoneX, newStoneY, newStone) {
            var reverseStone = newStone === blackStone ? whiteStone : blackStone;

            var column;
            var row;

            // 左
            reverseStraightLine(newStoneX, newStoneY, newStone, -1, 0, reverseStone);

            // 右
            reverseStraightLine(newStoneX, newStoneY, newStone, 1, 0, reverseStone);

            // 上
            reverseStraightLine(newStoneX, newStoneY, newStone, 0, -1, reverseStone);

            // 下
            reverseStraightLine(newStoneX, newStoneY, newStone, 0, 1, reverseStone);

            // 左斜め上
            reverseStraightLine(newStoneX, newStoneY, newStone, -1, -1, reverseStone);

            // 左斜め下
            reverseStraightLine(newStoneX, newStoneY, newStone, -1, 1, reverseStone);

            // 右斜め上
            reverseStraightLine(newStoneX, newStoneY, newStone, 1, -1, reverseStone);

            // 右斜め下
            reverseStraightLine(newStoneX, newStoneY, newStone, 1, 1, reverseStone);
        };

        var reverseStraightLine = function(x, y, stone, dx, dy, reverseStone) {
            var xx = x + dx;
            var yy = y + dy;
            if (inBord(xx, yy) && masuList[yy][xx].text() === reverseStone) {

                var exists = false;

                var xi = xx;
                var yi = yy;
                while (inBord(xi, yi)) {
                    exists = exists || masuList[yi][xi].text() === stone;

                    xi += dx;
                    yi += dy;
                }

                if (exists) {
                    xi = xx;
                    yi = yy;
                    while (inBord(xi, yi) && masuList[yi][xi].text() === reverseStone) {
                        masuList[yi][xi].text(stone);

                        xi += dx;
                        yi += dy;
                    }
                }
            }
        };

        var inBord = function(x, y) {
            return x >= 0 &&
                x < numberOfColumn &&
                y >= 0 &&
                y < numberOfRow;
        };
    };
})();

$(function() {
    var osero = new Osero('bord', 8, 8);
});