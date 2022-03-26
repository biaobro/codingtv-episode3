/*
 * @Descripttion: 
 * @version: 
 * @Author: BiaoBro
 * @Date: 2022-03-26 18:16:06
 * @LastEditors: BiaoBro
 * @LastEditTime: 2022-03-26 18:18:25
 */

const { Client } = require("@notionhq/client")

// initializing a client
const notion = new Client({
    // secret_dNWrIJQkGheIqrYRbLFP10iLa6C4kxJdRwrrWbrKiAr
    // auth:process.env.NOTION_TOKEN
    auth:"secret_dNWrIJQkGheIqrYRbLFP10iLa6C4kxJdRwrrWbrKiAr"
})


exports.handler = async function(event, context) {
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

    return {
        statusCode:200,
        body:JSON.stringify(data),
    };
}