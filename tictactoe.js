
svg = d3.select('#canvas').append('svg')
  .attr('height','400px')
  .attr('width','600px');

board = svg.append('g')
  .attr('transform','translate(100,50)');

board.append('path')
  .attr('id','vLine1')
  .attr('d','M80 0 V 240')
  .attr('stroke','black');

board.append('path')
  .attr('id','vLine2')
  .attr('d','M160 00 V 240')
  .attr('stroke','black');

board.append('path')
  .attr('id','hLine1')
  .attr('d','M0 80 H 240')
  .attr('stroke','black');

board.append('path')
  .attr('id','hLine2')
  .attr('d','M0 160 H 240')
  .attr('stroke','black');

var boxPositions = ['translate(0,0)','translate(80,0)','translate(160,0)',
                    'translate(0,80)','translate(80,80)','translate(160,80)',
                    'translate(0,160)','translate(80,160)','translate(160,160)'];

var gameStatus = "x";

var myvar1;
var myvar2;

checkWinner = function() {
  // collect the set of boxes with x and the set with o
  xboxes = [];
  oboxes = [];
  d3.selectAll('.x').each(function() {xboxes.push(+this.id.substring(1))});
  d3.selectAll('.o').each(function() {oboxes.push(+this.id.substring(1))});
  allboxes = xboxes.concat(oboxes);
  allboxes.sort();
  myvar1 = allboxes;

  winners = [
    [1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
  ]
  xwin = 0
  owin = 0
  NobodyWins = 0;
  winners.forEach(function(d) {
    if (xboxes.indexOf(d[0])!=-1 & xboxes.indexOf(d[1])!=-1 & xboxes.indexOf(d[2])!=-1) {
      xwin = 1;
    } else if (oboxes.indexOf(d[0])!=-1 & oboxes.indexOf(d[1])!=-1 & oboxes.indexOf(d[2])!=-1){
      owin = 1;
    } else if (allboxes.length==9) {
      NobodyWins = 1;
    }
  })

  if (xwin==1) {
    alert('x wins! refresh the page to play again.');
    d3.selectAll('rect').on('click',function(){});
  } else if (owin==1) {
    alert('o wins! refresh the page to play again.');
    d3.selectAll('rect').on('click',function(){});
  }else if (NobodyWins==1) {
    alert('Nobody Wins! refresh the page to play again.');
    d3.selectAll('rect').on('click',function(){});
  }
}



mouseclick = function(number) {
  mybox = d3.select('#box' + number);
  mybox.selectAll('rect').on('click',function() {});
  if (gameStatus=="x") {
    mybox.append('text')
      .attr('id','x' + number)
      .attr('class','x')
      .attr('x',20)
      .attr('y',60)
      .text('X')
      .style('font-size','60')
      .style('font-family','arial');
    checkWinner();
    gameStatus = "o";
  } else {
    mybox.append('text')
      .attr('id', 'o' + number)
      .attr('class','o')
      .attr('x',15)
      .attr('y',60)
      .text('O')
      .style('font-size','60')
      .style('font-family','arial');
    checkWinner();
    gameStatus = "x";
  }
}

for (i=1; i<10; i++) {
  board.append('g')
    .attr('id','box'+i)
    .attr('transform',boxPositions[i-1])
    .append('rect')
    .attr('id','rect'+i)
    .attr('number',i)
    .attr('width','80px')
    .attr('height','80px')
    .attr('fill','none')
    .style('pointer-events','all')
    .on('click',function() {
      number = d3.select(this).attr('number');
      mouseclick(number);
    })
}
