/*
 * @Descripttion: 
 * @version: 
 * @Author: BiaoBro
 * @Date: 2022-03-26 16:38:25
 * @LastEditors: BiaoBro
 * @LastEditTime: 2022-03-26 18:21:37
 */

class Timer{
    constructor(totalSeconds, elementId, h, s, l){
        this.isRunning = false
        this.interval = null
        this.totalSeconds = totalSeconds
        this.seconds = totalSeconds
        this.elementId = elementId
        this.h = h
        this.s = s
        this.l = l
        

        this.renderElement()
        this.renderTimer() 
        this.renderButtons()
    }

    renderElement(){
        const element = document.createElement("div")
        element.setAttribute("id", this.elementId)
        element.style.backgroundColor = `hsl(${this.h},${this.s}%,${this.l}%)`
        document.getElementById("root").appendChild(element)
        this.element = element
    }

    renderTimer(){
        if(this.seconds <=0){
            clearInterval(this.interval)
            return 
        }
        let minutes = parseInt(this.seconds/60)
        let seconds = this.seconds % 60

        if(minutes < 10){minutes = "0" + minutes}
        if(seconds < 10){seconds = "0" + seconds}

        const nextL =  parseInt(this.l * (this.seconds/ this.totalSeconds))

        if(document.getElementById(this.elementId + "_time")){
            document.getElementById(this.elementId + "_time").innerHTML = minutes + ":" + seconds
            this.element.style.backgroundColor = `hsl(${this.h},${this.s}%,${nextL}%)`
        }else{
            const timeElement = document.createElement("div")
            timeElement.setAttribute("class", 'time')
            timeElement.setAttribute("id", this.elementId + "_time")
            timeElement.innerHTML = minutes + ":" + seconds
            this.element.appendChild(timeElement)
        }

        
    }

    renderButtons(){
        const pauseButton = document.createElement("div")
        const againButton = document.createElement("div")
        pauseButton.setAttribute("class", "button")
        pauseButton.innerHTML = "Pause"
        pauseButton.onclick = this.pauseOrGo.bind(this)

        againButton.setAttribute("class", "button")
        againButton.innerHTML = "Again"
        againButton.onclick = this.again.bind(this)


        this.element.appendChild(pauseButton)
        this.element.appendChild(againButton)
    }
    
    processTime(){
        this.seconds = this.seconds - 1
        this.renderTimer()
    }

    pauseOrGo(){
        if(this.isRunning){
            this.isRunning = false
            clearInterval(this.interval)
        }else{
            this.isRunning = true
            this.interval = setInterval(this.processTime.bind(this),  100) 
        }
        
    }

    again(){
        if(this.isRunning){
            this.isRunning = false
            clearInterval(this.interval)
        }
        this.seconds = this.totalSeconds
        this.renderTimer()
    }
}

// const data = [
//     {seconds:1200,id:"timer_1",h:0,s:100,l:83},
//     {seconds:1000,id:"timer_2",h:228,s:100,l:78},
//     {seconds:800,id:"timer_3",h:162,s:72,l:65},
//     {seconds:1200,id:"timer_4",h:48,s:100,l:70},
// ]

// fetch("timer")
fetch("/.netlify/functions/timer")
    .then(resp => resp.json())
    .then(data => {
        data.map(item =>{
            new Timer(item.seconds, item.id, item.h, item.s, item.l)
        }) 
    })
