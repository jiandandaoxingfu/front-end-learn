/** 
 *圆形渐变色
 *ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
 *前三个代表渐变开始圆的圆心及半径,后三个代表结束的.
 */

// 黑棋先手，白棋为AI

// 使用canvas需要在标签中定义宽高.
var chessboard = document.getElementById("chessboard");
	ctx = chessboard.getContext("2d");
const RECT_LENGTH = Math.min( document.body.clientWidth || document.documentElement.clientWidth, document.body.clientHeight || document.documentElement.clientHeight );

chessboard.height = RECT_LENGTH;
chessboard.width = RECT_LENGTH;

const ROWS = 15; // 每行/列棋子个数;
var state_matrix = []; // 棋盘每个落字点的状态矩阵： -1/0/1分别表示黑/无/白;
for (let i = 0; i < ROWS; i++) {
	state_matrix.push([]);
	for (let j = 0; j < ROWS; j++) {
		state_matrix[i].push(0);
	}
}

//画棋盘.
const CHESS_WIDHT = (RECT_LENGTH - 30)/(ROWS - 1); // 正方形方格的边长.
const PADDING = 15; // 棋盘与边界的padding.

(function() {
	ctx.strokeStyle = "black";
	for (var i = 0; i < ROWS; i++) {
		ctx.moveTo(PADDING + CHESS_WIDHT * i, PADDING);
		ctx.lineTo(PADDING + CHESS_WIDHT * i, RECT_LENGTH - PADDING);
		ctx.moveTo(PADDING, PADDING + CHESS_WIDHT * i);
		ctx.lineTo(RECT_LENGTH - PADDING, PADDING + CHESS_WIDHT * i);
	}
	ctx.stroke();
})();

// 将鼠标当前offset坐标转化为棋盘位置和坐标
function mouse_offset_convert(e) {
	let column = Math.round((e.offsetX - PADDING) / CHESS_WIDHT), 
		row = Math.round((e.offsetY - PADDING) / CHESS_WIDHT), 
		x = column * CHESS_WIDHT + PADDING, 
		y = row * CHESS_WIDHT + PADDING,
		pos = {x: x, y: y, row: row, column: column};
	return pos;
}

const R = 15; // 棋子大小.
var current_chess_state = -1; // 将要落子的棋子状态， 黑子先

// 在点击的交叉点画出圆.
function drawChess(pos) {
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, R, 0, 2 * Math.PI);
	ctx.closePath();
	let gradient = get_gradient(pos.x, pos.y);
	ctx.fillStyle = gradient;
	ctx.fill();
}

// 棋子的径向渐变色
function get_gradient(x, y) {
	let gradient = ctx.createRadialGradient(x, y, 0, x, y, 0.6 * R);
	if (current_chess_state === -1) {
		gradient.addColorStop(.4, "#8B8989");
		gradient.addColorStop(.7, "#515151");
		gradient.addColorStop(1, 'black');
	} else {
		gradient.addColorStop(0, "#FFF");
		gradient.addColorStop(0.7, "#CCC");
	}
	return gradient;
}

// 获得点击的交叉的坐标,并画出棋子.
chessboard.onclick = function(e) {
	let pos = mouse_offset_convert(e), 
		i = pos.row,
		j = pos.column;
	if(state_matrix[i][j] != 0) return;
	drawChess(pos);
	if(current_chess_state === 1) {
		state_matrix[i][j] = 1;
		current_chess_state = -1;
	} else {
		state_matrix[i][j] = -1;
		current_chess_state = 1;
	}
}