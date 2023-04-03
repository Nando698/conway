let canva 
let ctx
let fps = 15



let canvasX = 700
let canvasY = 700

let tileX, tileY


let board
let rows = 100
let col = 100

let white = '#FFFFFF'
let black = '#000000'



const createArray = (r,c) => {

    let obj = new Array(r)

    for (let i = 0; i < c; i++) {
        
        obj[i] = new Array(c)
    }
return obj
}


let Cell = function(x, y, state) {
     this.x = x
     this.y = y
     this.state = state
     this.nextState = this.state

     this.around = []

     this.addAround = function(){
        let x_around
        let y_around

        for(let i = -1; i<2; i++){
            for(let j = -1; j<2; j++){

                x_around = (this.x + j + col) % col
                y_around = (this.y + i + rows) % rows
            
            
                if(i != 0 || j != 0)
                this.around.push(board[y_around][x_around])
            }
        }
     }

     this.draw = function(){
        
        let color
        if(this.state == 1){
            color = white
        }else{
            color = black
        }

        ctx.fillStyle = color
        ctx.fillRect(this.x * tileX, this.y*tileY, tileX, tileY)
     }


    this.liveAround = () => {
        let tot = 0
    
    for(let i=0; i<this.around.length;i++){
        tot += this.around[i].state
    }


    this.nextState = this.state

    if(tot < 2 || tot > 3){
        this.nextState = 0
    }

    if(tot == 3){
        this.nextState = 1
    }


}

this.mutation = function(){
    this.state = this.nextState
}



}


const boardInit = (obj) => {
    let state
    for(let y=0; y<rows ; y++){
        for(let x=0; x<col; x++){
            state = Math.floor(Math.random()*2)
            obj[y][x] = new Cell(x,y,state)
        }
    }

    for(let y=0; y<rows ; y++){
        for(let x=0; x<col; x++){
            obj[y][x].addAround()
        }
    }






}



const init = () => {
    canva = document.getElementById('myCanvas')
    ctx = canva.getContext('2d')

    canva.width = canvasX
    canva.height = canvasY


    tileX = Math.floor(canvasX / rows)
    tileY = Math.floor(canvasY / col)

    
    board = createArray(rows, col)
    
    boardInit(board)
    
    
    
    
    
    
    document.getElementById('btn-start').addEventListener('click', () => {

        
        setInterval(() => {
            main()
        }, 1000/fps);
    })


}


const drawBoard = (ob) => {
for( let y=0;y<rows;y++){
    for(let x=0; x< col ;x++){
        ob[y][x].draw()
    }
}

for(let y=0 ; y<rows ; y++){
    for(let x = 0; x<col ; x++){
        ob[y][x].liveAround()
    }
}

for(let y=0 ; y<rows ; y++){
    for(let x = 0; x<col ; x++){
        ob[y][x].mutation()
    }
}


}



const refresh = () => {

    canva.width = canva.width
    canva.height = canva.height

}














const main = () => {

refresh()
drawBoard(board)


}