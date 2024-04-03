const canvas = document.querySelector('canvas')//To select a spesific html element.
const c = canvas.getContext('2d')

canvas.width = window.innerWidth // the full width from the left to right of the window
canvas.height = window.innerHeight

const gravity=0.5

class Player{
    constructor(){
        this.position={
            x:100,
            y:100
        }

        //gravity (to push player down)
        this.velocity= {
            x:0,
            y:1
        }
        this.width=30
        this.height=30
    }

    
    //katwrina player kifach dayr
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }



        //bach l gravity tb9a dima katw9e3 l player .
        update(){        
            this.draw()        
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            
            if (this.position.y + this.height + this.velocity.y <= canvas.height)
               this.velocity.y += gravity
            else this.velocity.y= 0
             
        }
    }

    