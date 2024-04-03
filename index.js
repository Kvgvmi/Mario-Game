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

    //--------------------------platforms-------------------------
class Platform {
    constructor({x,y}){
        this.position = {
            x,
            y
        }
        this.width= 200
        this.height= 20
    }
    draw(){
        c.fillStyle= 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}



const player = new Player()//  creation d player and enabling access to its properties and methods. 
const platforms = [new Platform({x:200 , y:100 }), new Platform({x: 500 , y: 200})]

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}


//animation to keep the palyer moving
function animate() {
    requestAnimationFrame(animate) // to create an infinit loop of movment . doing the same movement over and over
    c.clearRect(0, 0, canvas.width, canvas.height ) // clears the entire canvas by removing all content within its boundaries
    player.update()
    // hadi bdelnaha 7it bghina bach ikuno 3endna bzaf d platforms o 3endna array
    platforms.forEach(platform =>{
        platform.draw()
    })
    

    if (keys.right.pressed 
        && player.position.x < 400) {
        player.velocity.x= 5 //ila wzrekna kaytmcha
    } else  if (keys.left.pressed
        && player.position.x > 100 ) { //ila bdlna kibdl itijah 7ta howa
        player.velocity.x=-5 }
     else {
        player.velocity.x = 0
       // ila 7iydna idina kay7bss
       //les conditions bach ila player ne9ez fo9 platform ib9a fo9ha
       if(keys.right.pressed){ // creating the ilusion of movment
        platforms.forEach(platform =>{
            platform.position.x -= 5 // dekhelnaha f west sigha jdida li bedelna
        })
        
        } else if (keys.left.pressed){
            platforms.forEach(platform =>{
                platform.position.x += 5
            })
        }

    } 
    //platform collision detection 

    platforms.forEach(platform =>{
     if (player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x
        && player.position.x <= platform.position.x + platform.width ) {
        player.velocity.y = 0
        
     }
    })
}
animate()

//--------------------------movment-----------------------------


// hena kola key 3endha keycode dyalha . b7al a -> keycode:65
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode){
        case 65: 
        console.log('left')
        keys.left.pressed=true
        break

        case 83: 
        console.log('down')
        break

        case 68: 
        console.log('right')
        keys.right.pressed=true
        break

        case 87: 
        console.log('up')
        player.velocity.y -= 20
        break
    }
})

//keyup -> makanb9ach daghta 3la l key
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode){
        case 65: 
        console.log('left')
        keys.left.pressed=false
        break

        case 83: 
        console.log('down')
        break

        case 68: 
        console.log('right')        
        keys.right.pressed=false
        break

        case 87: 
        console.log('up')
        player.velocity.y -= 20
        break
    }
})


