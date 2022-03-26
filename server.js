/*
 * @Descripttion: 
 * @version: 
 * @Author: BiaoBro
 * @Date: 2022-03-26 16:44:42
 * @LastEditors: BiaoBro
 * @LastEditTime: 2022-03-26 18:13:49
 */
const express = require('express');
const server = express();

const { Client } = require("@notionhq/client")

// initializing a client
const notion = new Client({
    // secret_dNWrIJQkGheIqrYRbLFP10iLa6C4kxJdRwrrWbrKiAr
    // auth:process.env.NOTION_TOKEN
    auth:"secret_dNWrIJQkGheIqrYRbLFP10iLa6C4kxJdRwrrWbrKiAr"
})

server.use(express.static("public"))


// router
server.get('/timer', async function(req, res){
    // style1
    // res.send("hello conding TV!")


    // style2
    // res.send(`s
    //     <h1>Coding TV</h1>
    //     <button>Nothing</button>
    // `)

    // style3
    // res.json({
    //     greeting:"Hello world"
    // })

    // const data = [
    //     {seconds:1200,id:"timer_1",h:0,s:100,l:83},
    //     {seconds:1000,id:"timer_2",h:228,s:100,l:78},
    //     {seconds:800,id:"timer_3",h:162,s:72,l:65},
    //     {seconds:1200,id:"timer_4",h:48,s:100,l:70},
    // ]

    let data = await notion.databases.query({database_id:"9048edbb44fa4085965821fe4b25147b"})

    data = data.results.map(i => i.properties)
    data = data.map(i => {
        // 注意大小写对应， 编辑器不做检查
        return {
            h: i.ColorH.number,
            l: i.ColorL.number,
            s: i.ColorS.number,
            seconds: i.Seconds.number,
            id: i.Id.title[0].plain_text,
        }
    })

    res.json(data);
})

server.listen(8080)

