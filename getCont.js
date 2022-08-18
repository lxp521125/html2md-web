
  (function() {
    function xpPostData(url, data) {
        // Default options are marked with *
           var a = '';
           if( data.cont){
              a = "title="+encodeURIComponent(data.title)+"&cont="+encodeURIComponent(data.cont);
           }else{
               a = "title="+encodeURIComponent(data.title)+"&url="+encodeURIComponent(data.url);
           }
        console.log(JSON.stringify({url:url,data:a}));
    }
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