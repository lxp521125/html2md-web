// ==UserScript==
// @name         保存文档
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?(pos|eclick)\.baidu\.com\/.*$)/
// @exclude      /.*lanhuapp\.com\/.*$)/
// @exclude      /.*lanhuapp\.com\/.*$)/
// @exclude      /.*\.tapd\.cn/?.*/
// @exclude      /.*\.(gaodunwangxiao|lanhuapp|googlesyndication|gaodun)\.com/?.*/
// @exclude      /.*(www|signin|console)\.aliyun\.com/?.*/
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?(docs|exmail)\.qq\.(cn|com)/?.*/
// @exclude      /(^[^:\/#\?]*:\/\/([^#\?\/]*\.)?(cloud|www)\.italent\.(cn|com)/?.*/
// @match        *://*.com/*
// @match        *://*.cn/*
// @match        *://www.jb51.net/*
// @match        *://www.jianshu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @match        *://blog.csdn.net/*
// @match        *://juejin.cn/*
// @match        *://mp.weixin.qq.com/*
// @match        *://www.cnblogs.com/*
// @match        *://www.jianshu.com/*
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://www.google.com/s2/favicons?domain=juejin.cn
// @grant        none
// ==/UserScript==
function xpPostData(url, data) {
    // Default options are marked with *
       var a = '';
       if( data.cont){
          a = "title="+encodeURIComponent(data.title)+"&cont="+encodeURIComponent(data.cont);
       }else{
           a = "title="+encodeURIComponent(data.title)+"&url="+encodeURIComponent(data.url);
       }
    return fetch(url, {
      body: a, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
       'content-type': 'application/x-www-form-urlencoded '
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()) // parses response to JSON
  }
  (function() {
      'use strict';
      function handleDoc(){
          var head_title = document.querySelector("title").innerText.trim();
          if(head_title == ""){
              head_title = document.querySelector("#activity-name").innerText.trim();
          }
          if(head_title != ""){
              var read = {title: head_title, url:window.location.href};
              xpPostData("https://doc.aitboy.cn/index", read);
          }
          var url = "https://doc.aitboy.cn";
          var pd = {title:head_title,cont:""};
      if(window.location.host == "zhuanlan.zhihu.com"){
          url = "https://doc.aitboy.cn/zhihu";
          pd.title = document.querySelector("#root > div > main > div > article > header > h1").innerText.trim();
          pd.cont = document.querySelector("#root > div > main > div > article > div.Post-RichTextContainer").innerHTML;
      }else if(window.location.host =="blog.csdn.net"){
          pd.title = document.querySelector("#articleContentId").innerText.trim();
          pd.cont = document.querySelector(".blog-content-box").innerHTML;
      }else if(window.location.host =="juejin.cn"){
          url = "https://doc.aitboy.cn/juejin";
          pd.title = document.querySelector("#juejin > div.view-container > main > div > div.main-area.article-area > article > h1").innerText.trim();
          pd.cont = document.querySelector("#juejin > div.view-container > main > div > div.main-area.article-area > article > div.article-content").innerHTML;
      }else if(window.location.host =="mp.weixin.qq.com"){
          url = "https://doc.aitboy.cn/wechat";
          pd.title = document.querySelector("#activity-name").innerText.trim();
          pd.cont = document.querySelector("#js_content").innerHTML;
      }else if(window.location.host =="www.cnblogs.com"){
          pd.title = document.querySelector("#topics > div > h1").innerText.trim();
          pd.cont = document.querySelector("#cnblogs_post_body").innerHTML;
      }else if(window.location.host =="www.jianshu.com"){
          pd.title = document.querySelector("#__next > div._21bLU4._3kbg6I > div > div > section:nth-child(1) > h1").innerText.trim();
          pd.cont = document.querySelector("#__next > div._21bLU4._3kbg6I > div > div > section:nth-child(1) > article").innerHTML;
      }else{
          var titleNum = document.querySelectorAll("h1").length;
          if(document.querySelector("h1")){
             pd.title = document.querySelector("h1").innerText.trim();
          }
          if(pd.title != ""){
                var con = document.querySelector("h1").nextElementSibling;
                if (con) {
                  for(var i=0;i<10;i++){
                      if(con && con.innerText.length > 800){
                          pd.cont = con.innerHTML;
                          break;
                      }
                      if (con) {
                          con = con.nextElementSibling;
                      }else{
                          break;
                      }
                  }
              }
          }
          if (pd.cont == "" && titleNum > 1) {
              pd.title = document.querySelectorAll("h1")[titleNum-1].innerText.trim();
              if(pd.title != ""){
                  con = document.querySelectorAll("h1")[titleNum-1].nextElementSibling;
                  if (con) {
                    for(i=0;i<10;i++){
                        if(con && con.innerText.length > 800){
                            pd.cont = con.innerHTML;
                            break;
                        }
                        if (con) {
                            con = con.nextElementSibling;
                        }else{
                            break;
                        }
                    }
                }
            }
          }
          if (pd.cont == "" && pd.title != "") {
              if(document.querySelector("article")){
                  pd.cont = document.querySelector("article").innerHTML;
              }
              if(pd.cont == "" && document.querySelector("#article")){
                  pd.cont = document.querySelector("#article").innerHTML;
              }
  
          }
          if(pd.cont == ""){
          return 0;
          }
      }
      // console.log(pd);
      xpPostData(url, pd);
      }
      setTimeout(handleDoc, 4000);
      // Your code here...
  })();