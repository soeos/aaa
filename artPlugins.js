window.artPlugins=window.artPlugins||function(t){
    var e={
        version:"2.2.0",
        init:t=>Promise.all([
            e.readyHls(),
            e.readyArtplayer(),
            e.readySupported()]).then(()=>e.initArtplayer(t)),
            readyHls:()=>{return window.Hls||unsafeWindow.Hls?Promise.resolve():e.loadJs("https://jsd.nn.ci/npm/hls.js@1.6.16/dist/hls.min.js")},
                readyArtplayer:()=>{return window.Artplayer||unsafeWindow.Artplayer?Promise.resolve():e.loadJs("https://jsd.nn.ci/npm/artplayer@5.4.0/dist/artplayer.js")},readySupported:()=>Promise.resolve(t).then(t=>{
                    const{version:o}=e,
                    n=GM_getValue("art-"+o,0),
                    a=Object.values(e).concat(t).reduce((t,e)=>t+e.toString().length,0);
                    if(n){if(new Set([n,a]).size>1)return Promise.reject()}else GM_setValue("art-"+o,a)}),
                    initArtplayer:e=>{
                        const o=window.Artplayer||unsafeWindow.Artplayer,
                        {isMobile:n}=o.utils;
                        return Object.assign(o,{ASPECT_RATIO:["default","自动","4:3","16:9"],AUTO_PLAYBACK_TIMEOUT:1e4,NOTICE_TIME:5e3}),
                        new o(
                            e=Object.assign({
                                container:"#artplayer",
                                url:"",
                                quality:[],
                                type:"hls",
                                autoplay:!0,
                                autoPlayback:!0,
                                aspectRatio:!0,
                                contextmenu:[],
                                customType:{
                                    hls:(t,e,o)=>{
                                            const n=window.Hls||unsafeWindow.Hls;
                                            if(n.isSupported()){
                                                o.hls&&o.hls.destroy();
                                                const a=o.hls=new n({
                                                    maxBufferLength:10*n.DefaultConfig.maxBufferLength,
                                                    xhrSetup:(t,e)=>{
                                                        const n=(e.match(/^http(?:s)?:\/\/(.*?)\//)||[])[1];if(n!==location.host){
                                                            if(/backhost=/.test(e)){
                                                                let t,a=(decodeURIComponent(e||"").match(/backhost=(\[.*?\])/)||[])[1];
                                                                if(a){
                                                                    try{
                                                                        t=JSON.parse(a)}catch(t){}
                                                                        if(t&&t.length){
                                                                        const e=(t=[].concat(t,[n])).findIndex(t=>t===o.realHost);
                                                                    o.realHost=t[e+1>=t.length?0:e+1]}
                                                                }
                                                            }
                                                            o.realHost&&(e=e.replace(n,o.realHost),t.open("GET",e,!0))}}});
                                                            a.loadSource(e),a.attachMedia(t),a.on(n.Events.ERROR,(t,e)=>{if(e.fatal)
                                                                switch(e.type){
                                                                    case n.ErrorTypes.NETWORK_ERROR:e.details===n.ErrorDetails.MANIFEST_LOAD_ERROR?setTimeout(()=>a.loadSource(a.url),1e3):e.details===n.ErrorDetails.MANIFEST_LOAD_TIMEOUT||e.details===n.ErrorDetails.MANIFEST_PARSING_ERROR?a.loadSource(a.url):e.details===n.ErrorDetails.FRAG_LOAD_ERROR?(a.fragLoadError=(a.fragLoadError||0)+1)<5?(a.loadSource(a.url),a.media.currentTime=o.currentTime,a.media.play()):(a.destroy(),o.notice.show="播放错误次数过多，请刷新重试"):setTimeout(()=>a.startLoad(),1e3);break;
                                                                    case n.ErrorTypes.MEDIA_ERROR:a.recoverMediaError();break;
                                                                    default:a.destroy(),o.notice.show="视频播放异常，请刷新重试"}}
                                                                ),
                                                o.on("destroy",()=>a.destroy())
                                            }else 
                                                t.canPlayType("application/vnd.apple.mpegurl")?t.src=e:(alert("不支持的播放格式：m3u8"),o.notice.show="Unsupported playback format: m3u8")
                                        }
                                    },
                                    flip:!1,icons:{
                                        loading:'<img src="https://artplayer.org/assets/img/ploading.gif">',
                                        state:'<img width="150" heigth="150" src="https://artplayer.org/assets/img/state.svg">',
                                        indicator:'<img width="16" heigth="16" src="https://artplayer.org/assets/img/indicator.svg">'},
                                        id:"",pip:!n,poster:"",
                                        playbackRate:!1,screenshot:!0,setting:!0,
                                        subtitle:{url:"",type:"auto",style:{color:"#fe9200",bottom:"5%",fontSize:"25px",fontWeight:400,fontFamily:"",textShadow:""},encoding:"utf-8",escape:!1},
                                        subtitleOffset:!1,hotkey:!0,fullscreen:!0,fullscreenWeb:!n
                                },e),
                            e=>{fetch.toString().includes("[native code]")?t.forEach(t=>{e.plugins.add(t())}):e.destroy()}
                        )
                    },
                    loadJs:t=>(window.instances||(window.instances={}),window.instances[t]||(window.instances[t]=new Promise((e,o)=>{const n=document.createElement("script");n.src=t,n.type="text/javascript",n.onload=e,n.onerror=o,Node.prototype.appendChild.call(document.head,n)})),window.instances[t])};
                    return console.info(`%c artPlugins %c ${e.version} %c`,"color: #fff; background: #5f5f5f","color: #fff; background: #4bc729",""),e
    }

([
    ()=>t=>{
        const e=window.Hls||unsafeWindow.Hls,
        {
            hls:o,layers:n,notice:a,storage:s,constructor:{CONTEXTMENU:r,utils:{query:i,append:l,setStyle:c,clamp:u,debounce:p,throttle:d}}}=t,
            h=window.cloudbase.init({
                env:"js-3gyg0gq54003de57",
                accessKey:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjlkMWRjMzFlLWI0ZDAtNDQ4Yi1hNzZmLWIwY2M2M2Q4MTQ5OCJ9.eyJpc3MiOiJodHRwczovL2pzLTNneWcwZ3E1NDAwM2RlNTcuYXAtc2hhbmdoYWkudGNiLWFwaS50ZW5jZW50Y2xvdWRhcGkuY29tIiwic3ViIjoiYW5vbiIsImF1ZCI6ImpzLTNneWcwZ3E1NDAwM2RlNTciLCJleHAiOjQwNzQyMzM3MzQsImlhdCI6MTc3MDU1MDUzNCwibm9uY2UiOiJxOFpINmt3dlNXMjFZTjZSeHBxeTZnIiwiYXRfaGFzaCI6InE4Wkg2a3d2U1cyMVlONlJ4cHF5NmciLCJuYW1lIjoiQW5vbnltb3VzIiwic2NvcGUiOiJhbm9ueW1vdXMiLCJwcm9qZWN0X2lkIjoianMtM2d5ZzBncTU0MDAzZGU1NyIsInVzZXJfdHlwZSI6IiIsImNsaWVudF90eXBlIjoiY2xpZW50X3VzZXIiLCJpc19zeXN0ZW1fYWRtaW4iOmZhbHNlfQ.lHytqURNJjBnk0a2LcqQjqkXoNctaS2Yg4LeHrsAXnADXKdi1J8HmCs9bZLIx40qsDkYtwigqAf6oRpiIQMtn65yNFdlSmVrnNQllF6k1gm4qRxJwAyWfmqb5XhCkzMb4MXuy1ATu1t2HAwre3CDh-Nvpn_SBhXOaaXsDAgga_SUbH0Z-bAlx-b8zpfuYAjV9g7ph7scfeoX85bUlKp1BHg87mC2pNfVUN2cDutH-CT-sJNrY7-2rPRfQ8HlskXAhEYjiPVrJDIushFbph8mz_TlaFAK1Y-zyqX-zJnc0y7wOFZs7jHOB1GHqX8DYbyocda12G_ZpcSmT92zKp4sMQ"
            });
        async function m(){
            try{
                const t=await f(),e=s.get("user");
                if(e){const{uid:o,updatedAt:n,expire_time:a}=e;
                if([o===t.uk,GM_getValue("updatedAt")===n,Math.max(Date.parse(n)+864e5-Date.now(),0),
                    // s.get("key").split("").reverse().join("")===btoa(encodeURIComponent(JSON.stringify(a)))
                ].every(t=>t))return e}
                // 用户数据
                const{result:o}=await h.callFunction({name:"pan",data:{user:{},host:"0.0.0.0",uid:"yourfather",gminfo:{},uinfo:{}}});
                s.set("user",o);
                const{updatedAt:n,expire_time:a}=o;
                return GM_setValue("updatedAt",n),
                // s.set("key",btoa(encodeURIComponent(JSON.stringify(a))).split("").reverse().join("")),
                s.set("expire_time",253402300799000),
                o
            }catch(t){return{}}
        }
        async function f(){
            const e="function"==typeof unsafeWindow.locals.get?unsafeWindow.locals.get("uk"):"1";
            return t.uinfo&&t.uinfo.uk===e?t.uinfo:fetch("https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo").then(t=>t.json()).then(e=>0===e.errno?(t.uinfo=e,e):Promise.reject(e))
        }
        // 赞赏功能
        function g(){
            n.cache.get("sponsor")||n.update({
                name:"sponsor",
                html:'bu给',
                tooltip:"不提示",
                style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",background:"rgba(0, 0, 0, 0.7)",border:"1px solid #c6c6c6",borderRadius:"8px",textAlign:"center"},
                click:(e,{isTrusted:o})=>{
                    o||t.destroy(),
                    t.mask.show=!1,t.loading.show=!1
                },
                mounted:e=>{
                    // t.pause();
                    try{o.pauseBuffering()}catch(t){o.stopLoad()}
                    setTimeout(()=>{
                        t.mask.show=!1,t.loading.show=!1,t.controls.show=!1,t.setting.show=!1,t.constructor.CONTEXTMENU=!1},1e3);
                        const n=i("#open-afdian",e),r=i("#copy-order",e),l=i("#update-script",e);
                        t.proxy(
                            n,"click",
                            ()=>{window.open("https://ifdian.net/order/create?plan_id=dc4bcdfa5c0a11ed8ee452540025c377","_blank")}),
                            t.proxy(r,"click",()=>{
                                window.open("https://ifdian.net/dashboard/order","_blank")}),
                                t.proxy(l,"click",()=>{
                                    window.open("https://scriptcat.org/scripts/code/340/%E7%99%BE%E5%BA%A6%E7%BD%91%E7%9B%98%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8.user.js","_blank")});
                                    const c=i("#order-input",e),p=i("#cancel-order",e),d=i("#submit-order",e);t.proxy(p,"click",({isTrusted:t})=>{t&&y()}),t.proxy(d,"click",({isTrusted:t})=>{
                                        if(t&&c.value){
                                            const t=c.value.trim();t.match(/^20[\d]{23,26}$/)?(
                                                function(t){t=t.slice(0,14);const[,e,o,n,a,s,r]=(t.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)||[]).map(Number);return[u(o,1,12)===o,u(n,1,31)===n,u(a,0,23)===a,u(s,0,59)===s,u(r,0,59)===r].every(t=>t)}(t)&&async function(t){
                                                    const e=s.get(t)||0;if(!(e>33)){s.set(t,e+1);
                                                        try{const e=await f(),
                                                            {result:o}=await h.callFunction({
                                                                name:"pan",data:{user:{out_trade_no:t},host:"0.0.0.0",uid:e.uk,gminfo:GM_info,uinfo:e}}),{ec:n,em:r,updatedAt:i,expire_time:l}=o;
                                                                a.show=r,s.set("user",o),GM_setValue("updatedAt",i),s.set("key",btoa(encodeURIComponent(JSON.stringify(l))).split("").reverse().join(""))}catch(t){return{}}}
                                                    }(t),y()):a.show="此订单号不合规范，请重试"
                                            }else a.show="请输入订单号"
                                    })
                    }
            })
        }

        function y(){if(n.cache.get("sponsor")){n.remove("sponsor"),t.constructor.CONTEXTMENU=r;try{o.resumeBuffering()}catch(t){o.startLoad()}}}
        function b(){
            // t.contextmenu.update({index:51,html:"开通功能",click:()=>{g(),t.contextmenu.show=!1}}),
            // t.contextmenu.update({index:52,html:"鼓励一下",click:()=>{window.open("https://pc-index-skin.cdn.bcebos.com/6cb0bccb31e49dc0dba6336167be0a18.png","_blank"),t.contextmenu.show=!1}}),
            // t.setting.update({html:"赞赏作者",name:"author-setting",tooltip:"",
            //     selector:[{html:"开通功能",value:0},{html:"鼓励一下",value:1}],
            //     onSelect:t=>(0===t.value?g():1===t.value&&window.open("https://pc-index-skin.cdn.bcebos.com/6cb0bccb31e49dc0dba6336167be0a18.png","_blank"),"")
            // }),
            // t.on("video:ended",
            //     ()=>{m().then(t=>{const{expire_time}=t;Math.max(expire_time-Date.now(),0)||n.update({name:"potser",html:'<img style="width: 300px" src="https://pc-index-skin.cdn.bcebos.com/6cb0bccb31e49dc0dba6336167be0a18.png">',tooltip:"",style:{position:"absolute",top:"50px",right:"50px"},click:(t,e)=>{window.open(e.target.src,"_blank")}})})}
            // ),
            // o.on(e.Events.FRAG_LOADED,d((e,o)=>{m().then(e=>{t.emit("user",e),t.once("user",({expire_time:t})=>{Math.max(t-Date.now(),0)?y():g()})})},1e3*u(420,t.duration/100,t.duration/3)))
            o.on(e.Events.FRAG_LOADED,d((e,o)=>{m().then(e=>{t.emit("user",e),t.once("user",({expire_time:t})=>{y()})})},1e3*u(420,t.duration/100,t.duration/3)))
        }
        // 修改
        // return t.isReady?b():(t.once("ready",b),{name:"user",user:m,show:g})
        return b(),{name:"user",user:m,show:g}
    },


    ()=>t=>{
        const{
            i18n:e,option:o,notice:n,storage:a,controls:s,constructor:{utils:{isMobile:r,setStyle:i}}}=t;
            function l(t){return r?t.split(/\s/).shift():t}
            function c(){
                const{file:r,quality:i,getUrl:c,adToken:u}=o,
                [,p,d]=((r||{}).resolution||"").match(/width:(\d+),height:(\d+)/),h=+p*+d;h>2073600&&i.unshift({html:"2K 1440P",url:c("M3U8_AUTO_2K")+"&adToken="+encodeURIComponent(u),default:!1,type:"hls"}),
                h>3686400&&i.unshift({html:"4K 2160P",url:c("M3U8_AUTO_4K")+"&adToken="+encodeURIComponent(u),default:!1,type:"hls"});
                const m=i.find(t=>t.default)||i[0];
                s.update({name:"quality",html:m?l(m.html):"",
                        selector:i.map(t=>({...t})),onSelect:o=>(t.switchQuality(o.url),n.show=`${e.get("Switch Video")}: ${o.html}`,a.set("quality",l(o.html)),l(o.html)),
                        mounted:()=>{const e=a.get("quality");
                            if(e){const o=s.cache.get("quality").option.selector.find(t=>l(t.html)===e);o&&!o.default&&(t.switchQuality(o.url),s.check(o))}}})}
            function u(){
                t.once("user",({expire_time:e})=>{
                    if(Math.max(e-Date.now(),0)){
                        c();
                        let e=o.id;
                        t.on("restart",
                            ()=>{
                                if(e===o.id){
                                    const e=t.layers.cache.get("auto-playback");if(e){const{$ref:t}=e;i(t,"display","none")}
                                }else e=o.id,c()
                            })
                        }})}
            // return t.isReady?u():t.once("ready",u),{name:"quality"}
            return u(),{name:"quality"}
        },
    ()=>t=>{
        const{i18n:e,proxy:o,option:n,controls:a,constructor:{utils:{query:s,isMobile:r}}}=t,
        i={icon:'<i class="art-icon"><svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M810.666667 384H85.333333v85.333333h725.333334V384z m0-170.666667H85.333333v85.333334h725.333334v-85.333334zM85.333333 640h554.666667v-85.333333H85.333333v85.333333z m640-85.333333v256l213.333334-128-213.333334-128z" fill="#ffffff"></path></svg></i>'};
        function l(){
            t.once("user",({expire_time:t})=>{if(Math.max(t-Date.now(),0)){
            const{filelist:t}=n;(t||[]).length>1&&function(t=[]){
            a.update({
            html:r?i.icon:e.get("PlayList"),name:"playlist",position:"right",style:{paddingLeft:"10px",paddingRight:"10px"},selector:t.map(t=>({...t,html:t.name,style:{textAlign:"left"}})),onSelect:t=>(n.file=t,"function"==typeof t.open&&t.open(),r?i.icon:e.get("PlayList")),
            mounted:()=>{const t=a.cache.get("playlist"),{$ref:e,option:{selector:n}}=t,r=s(".art-selector-list",e),i=s(".art-selector-value",e),l=r.offsetHeight,c=r.firstElementChild.offsetHeight;o(i,"click",t=>{const e=n.findIndex(t=>t.default);r.scrollTop=(e+1)*c-l/2})}
        })}(t)}})}
        // return e.update({"zh-cn":{PlayList:"播放列表"}}),t.isReady?l():t.once("ready",l),{name:"playlist"}
        return e.update({"zh-cn":{PlayList:"播放列表"}}),l(),{name:"playlist"}
    },

    ()=>t=>{
        const{i18n:e,icons:o,notice:n,layers:a,storage:s,plugins:r,setting:i,contextmenu:l,constructor:{PLAYBACK_RATE:c,SETTING_ITEM_WIDTH:u,utils:{query:p,throttle:d,setStyle:h,inverseClass:m}}}=t;
        e.update({"zh-cn":{Custom:"自定义"}});
        const f=a.update({name:"auto-playbackrate",html:`<div>播放速度</div><input type="number" value="${t.playbackRate}" style="min-height: 20px;border: none; border-radius: 3px;text-align: center;color: #000;" step=".05" max="16" min=".1"><div class="art-auto-playback-close"><i class="art-icon art-icon-close"><svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="22" height="22" style="fill: var(--art-theme);width: 15px;height: 15px;"><path d="m571.733 512 268.8-268.8c17.067-17.067 17.067-42.667 0-59.733-17.066-17.067-42.666-17.067-59.733 0L512 452.267l-268.8-268.8c-17.067-17.067-42.667-17.067-59.733 0-17.067 17.066-17.067 42.666 0 59.733l268.8 268.8-268.8 268.8c-17.067 17.067-17.067 42.667 0 59.733 8.533 8.534 19.2 12.8 29.866 12.8s21.334-4.266 29.867-12.8l268.8-268.8 268.8 268.8c8.533 8.534 19.2 12.8 29.867 12.8s21.333-4.266 29.866-12.8c17.067-17.066 17.067-42.666 0-59.733L571.733 512z"></path></svg></i></div>`,tooltip:"",style:{borderRadius:"var(--art-border-radius)",left:"var(--art-padding)",bottom:"calc(var(--art-control-height) + var(--art-bottom-gap) + 10px)",backgroundColor:"var(--art-widget-background)",alignItems:"center",gap:"10px",padding:"10px",lineHeight:1,display:"none",position:"absolute"},mounted:e=>{const o=p("input",e),n=p(".art-auto-playback-close",e);t.proxy(o,"change",()=>{const e=o.value;t.playbackRate=Number(e)}),t.proxy(n,"click",()=>{h(e,"display","none")})}});
    
        function g(t){return 1===t?e.get("Normal"):t?t.toFixed(2):e.get("Custom")}
        function y(){return c.includes(t.playbackRate)?t.playbackRate:0}
        function b(){
        t.once("user",({expire_time:e})=>{if(Math.max(e-Date.now(),0)){t.on("video:ratechange",()=>s.set("playbackRate",t.playbackRate));const e=s.get("playbackRate");e&&(t.playbackRate=Number(e))}})}
        
        return c.includes(0)||c.unshift(0),i.update({width:u,name:"playback-rate",html:e.get("Play Speed"),tooltip:g(t.playbackRate),icon:o.playbackRate,selector:c.map(t=>({value:t,name:`playback-rate-${t}`,default:t===y(),html:g(t)})),onSelect(e){if(e.value)t.playbackRate=e.value,h(f,"display","none");else{const{user:e,show:o}=r.user;e().then(({expire_time:e})=>{if(Math.max(e-Date.now(),0)){p("input",f).value=t.playbackRate,h(f,"display","flex")}else o()})}return e.html},mounted:()=>{const e=i.find(`playback-rate-${y()}`);e&&i.check(e),t.on("video:ratechange",()=>{const t=i.find(`playback-rate-${y()}`);t&&i.check(t)})}}),
        l.update({index:10,name:"playbackRate",html:`${e.get("Play Speed")}: ${c.map(t=>`<span data-value="${t}">${g(t)}</span>`).join("")}`,click:(e,o)=>{e.show=!1;const{value:n}=o.target.dataset;if(Number(n))t.playbackRate=Number(n),h(f,"display","none");else{const{user:e,show:o}=r.user;e().then(({expire_time:e})=>{if(Math.max(e-Date.now(),0)){p("input",f).value=t.playbackRate,h(f,"display","flex")}else o()})}},
        mounted:e=>{
            const o=p(`[data-value='${y()}']`,e);
            o&&m(o,"art-current"),
            t.on("video:ratechange",
            ()=>{
                const t=p(`[data-value='${y()}']`,e);
                t&&m(t,"art-current")})}}),
                // t.isReady?b():t.once("ready",b),{name:"playbackRate"}
                b(),{name:"playbackRate"}
    },
    ()=>t=>{
        const{
            i18n:e,option:o,notice:n,storage:a,plugins:s,setting:r,controls:i,template:l,subtitle:c,contextmenu:u,constructor:{utils:{getExt:p,query:d,append:h,isMobile:m,inverseClass:f}}}=t,
            g={icon:'<i class="art-icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path fill="#ffffff" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z"/></svg></i>',tooltip:'<label style="font-size: 0;padding: 4px;display: inline-block;"><span style="width: 20px;height: 20px;display: inline-block;border-radius: 50%;box-sizing: border-box;cursor: pointer;background: #FE9200;"></span></label>'};
            function y(t){
                return b(t).then(
                    t=>(function(t){const e=new Blob([t],{type:"text/plain"});return URL.createObjectURL(e)})(t))
            }
            function b(t){return new Promise((e,o)=>{var n=new FileReader;n.readAsText(t,"UTF-8"),
                n.onload=(o=>{var a=n.result;return a.indexOf("�")>-1&&!n.markGBK?(n.markGBK=!0,n.readAsText(t,"GBK")):a.indexOf("")>-1&&!n.markBIG5?(n.markBIG5=!0,n.readAsText(t,"BIG5")):void e(a)}),
                n.onerror=(t=>{o(t)})})}
            function w(){
                const{getUrl:t,adToken:e}=o,n=t("M3U8_SUBTITLE_SRT")+"&adToken="+encodeURIComponent(e);return fetch(n).then(t=>t.ok?t.text():Promise.reject()).then(
                    t=>{
                    const e=function(e){const o=(t||"").split("\n"),n=[];
                    try{for(var a=2;a<o.length;a+=2){const t=o[a]||"";if(-1!==t.indexOf("#EXT-X-MEDIA:")){for(var s=t.replace("#EXT-X-MEDIA:","").split(","),r={},i=0;i<s.length;i++){const t=s[i].split("=");r[(t[0]||"").toLowerCase().replace("-","_")]=String(t[1]).replace(/"/g,"")}r.url=o[a+1],n.push(r)}}}catch(t){}return n}();
                    return Promise.all(e.map(t=>(function(t,e){return fetch(t,{headers:{range:"bytes=".concat(Array.isArray(e)?e.join("-"):e||"0-"),referer:location.protocol+"//"+location.host+"/","User-Agent":"pan.baidu.com"}}).then(t=>t.ok?t.blob():Promise.reject())})(t.url).then(e=>b(e).then(e=>({...t,html:t.name,default:"YES"===t.default,type:function(t){return/(\d+)?[\r\n]?(\d{0,2}:?\d{2}:\d{2}.\d{3})\s?-?->\s?(\d{0,2}:?\d{2}:\d{2}.\d{3})/.test(t)?/^WEBVTT[\r\n]/.test(t)?"vtt":"srt":/\[Script Info\]/.test(t)?/\[V4\+ Styles\]/.test(t)&&/Dialogue: .*?\d+,(\d+:\d{2}:\d{2}\.\d{2}),(\d+:\d{2}:\d{2}\.\d{2}),/.test(t)?"ass":"ssa":""}(e)||"srt"}))))).catch(()=>e.map(t=>({...t,html:t.name,default:"YES"===t.default,type:"srt"})))
                })
            
            }
            function x(t=[]){if(!t.length)return;const e=t.find(t=>t.default)||Object.assign(t[0],{default:!0}),s={...o.subtitle.style,...a.get("subtitleStyle")},r=Object.assign({},o.subtitle,e,{style:s});c.init({...r}).then(()=>{r.name&&(n.show=`加载字幕: ${r.name}`)}),i.update({html:m?g.icon:"字幕列表",name:"subtitle",position:"right",style:{paddingLeft:"10px",paddingRight:"10px"},selector:t.map((t,e)=>({...t})),onSelect:t=>{const e={...t,style:{...o.subtitle.style,...a.get("subtitleStyle")}};return c.switch(t.url,e),m?g.icon:"字幕列表"}})}
            function v(t=[]){
                if(i.cache.get("subtitle")){
                const e=i.cache.get("subtitle").option.selector;
                t = t.concat(e), i.update({ name: "subtitle", selector: t.map(t => ({ ...t })) })
                } else x(t)
            } 
            function k() { 
                t.once("user", ({ expire_time: e }) => { if (Math.max(e - Date.now(), 0)) { t.on("subtitle", t => a.set("subtitle", t)); const e = a.get("subtitle"); "boolean" == typeof e && (c.show = e), (o.sublist || []).length && x(o.sublist), "function" == typeof o.getUrl && w().then(t => { v(t) }); let n = o.id; t.on("restart", () => { if (n === o.id) (o.sublist || []).length && c.createTrack("metadata", c.url); else { n = o.id; const { $subtitle: t } = l; t.innerHTML = "", o.subtitle.url = "", c.createTrack("metadata", ""), i.cache.get("subtitle") && i.remove("subtitle"), (o.sublist || []).length && x(o.sublist), "function" == typeof o.getUrl && w().then(t => { v(t) }) } }) } }) } return r.update({ html: "字幕设置", name: "subtitle", tooltip: "", icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 48 48"><path d="M0 0h48v48H0z" fill="none"/><path fill="#ffffff" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z"/></svg>', selector: [{ html: "字幕显示", name: "state", tooltip: "显示", switch: !0, onSwitch(t) { const e = !t.switch, { user: o, show: n } = s.user; return o().then(({ expire_time: o }) => { Math.max(o - Date.now(), 0) ? (c.show = e, t.tooltip = e ? "显示" : "隐藏") : n() }), e }, mounted(e, o) { const n = c.show; o.switch = n, o.tooltip = n ? "显示" : "隐藏", t.on("subtitle", t => { setTimeout(() => { o.switch !== t && (o.switch = t, o.tooltip = t ? "显示" : "隐藏") }) }) } }, { html: "字幕偏移", name: "offset", tooltip: "0s", range: [0, -10, 10, .1], onChange(e) { const o = e.range[0]; return t.subtitleOffset = o, o + "s" }, mounted(e, o) { t.on("subtitleOffset", t => { setTimeout(() => { o.$range.value = t, o.tooltip = t + "s" }) }) } }, { html: "字幕位置", name: "bottom", tooltip: "5%", range: [5, 1, 90, 1], onChange(t) { const e = t.range[0] + "%"; return c.style({ bottom: e }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), bottom: e }), e }, mounted(t, e) { const { bottom: o } = { ...a.get("subtitleStyle") }; o && (e.tooltip = o, e.$range.value = parseFloat(o)) } }, { html: "字体大小", name: "fontSize", tooltip: "25px", range: [25, 10, 60, 1], onChange(t) { const e = t.range[0] + "px"; return c.style({ fontSize: e }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), fontSize: e }), e }, mounted(t, e) { const { fontSize: o } = { ...a.get("subtitleStyle") }; o && (e.tooltip = o, e.$range.value = parseFloat(o)) } }, { html: "字体粗细", name: "fontWeight", tooltip: 400, range: [4, 1, 9, 1], onChange(t) { const e = 100 * t.range[0]; return c.style({ fontWeight: e }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), fontWeight: e }), e }, mounted(t, e) { const { fontWeight: o } = { ...a.get("subtitleStyle") }; o && (e.tooltip = o, e.$range.value = o / 100) } }, { html: "字体颜色", name: "color", tooltip: g.tooltip, selector: [{ html: "预设", name: "color-presets", tooltip: '<style>.panel-setting-color label{font-size: 0;padding: 4px;display: inline-block;}.panel-setting-color input{display: none;}.panel-setting-color span{width: 22px;height: 22px;display: inline-block;border-radius: 50%;box-sizing: border-box;cursor: pointer;}</style><div class="panel-setting-color"><label><input type="radio" value="#fff"><span style="background: #fff;"></span></label><label><input type="radio" value="#e54256"><span style="background: #e54256"></span></label><label><input type="radio" value="#ffe133"><span style="background: #ffe133"></span></label><label><input type="radio" name="dplayer-danmaku-color-1" value="#64DD17"><span style="background: #64DD17"></span></label><label><input type="radio" value="#39ccff"><span style="background: #39ccff"></span></label><label><input type="radio" value="#D500F9"><span style="background: #D500F9"></span></label></div>' }, { html: "默认颜色", name: "color-default", tooltip: g.tooltip }, { html: "颜色选择器", name: "color-picker", tooltip: g.tooltip.replace("#FE9200", "#000") }], onSelect(t, e, o) { switch (t.name) { case "color-presets": if ("INPUT" === o.target.nodeName) { const t = o.target.value; c.style({ color: t }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), color: t }) } break; case "color-picker": l.$colorPicker || (l.$colorPicker = h(l.$player, '<input hidden type="color">'), l.$colorPicker.oninput = (e => { const o = e.target.value; c.style({ color: o }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), color: o }), t.tooltip = t.$parent.tooltip = g.tooltip.replace("#FE9200", o) })), l.$colorPicker.click(); break; default: c.style({ color: "#FE9200" }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), color: "#FE9200" }) }return g.tooltip.replace("#FE9200", l.$subtitle.style.color) }, mounted(t, e) { const { color: o } = { ...a.get("subtitleStyle") }; o && (e.tooltip = g.tooltip.replace("#FE9200", o)) } }, { html: "字体类型", name: "fontFamily", tooltip: e.get("Default"), selector: [{ html: "默认", value: "" }, { html: "等宽 衬线", value: '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace' }, { html: "比例 衬线", value: '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif' }, { html: "等宽 无衬线", value: '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace' }, { html: "比例 无衬线", value: '"YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif' }, { html: "Casual", value: '"Comic Sans MS", Impact, Handlee, fantasy' }, { html: "Cursive", value: '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive' }, { html: "Small Capitals", value: '"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif' }], onSelect(t) { const { html: e, value: o } = t; return c.style({ fontFamily: o }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), fontFamily: o }), e }, mounted(t, e) { const { fontFamily: o } = { ...a.get("subtitleStyle") }; if (o) { const { selector: t } = e, n = t.find(t => t.value === o); n && (e.tooltip = n.html) } } }, { html: "文字阴影", name: "textShadow", tooltip: e.get("Default"), selector: [{ html: "默认", value: "rgb(0 0 0) 1px 0 1px, rgb(0 0 0) 0 1px 1px, rgb(0 0 0) -1px 0 1px, rgb(0 0 0) 0 -1px 1px, rgb(0 0 0) 1px 1px 1px, rgb(0 0 0) -1px -1px 1px, rgb(0 0 0) 1px -1px 1px, rgb(0 0 0) -1px 1px 1px" }, { html: "重墨", value: "rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px" }, { html: "描边", value: "rgb(0, 0, 0) 0px 0px 1px, rgb(0, 0, 0) 0px 0px 1px, rgb(0, 0, 0) 0px 0px 1px" }, { html: "45°投影", value: "rgb(0, 0, 0) 1px 1px 2px, rgb(0, 0, 0) 0px 0px 1px" }, { html: "阴影", value: "rgb(34, 34, 34) 1px 1px 1.4875px, rgb(34, 34, 34) 1px 1px 1.98333px, rgb(34, 34, 34) 1px 1px 2.47917px" }, { html: "凸起", value: "rgb(34, 34, 34) 1px 1px" }, { html: "下沉", value: "rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px" }, { html: "边框", value: "rgb(34, 34, 34) 0px 0px 1px, rgb(34, 34, 34) 0px 0px 1px, rgb(34, 34, 34) 0px 0px 1px, rgb(34, 34, 34) 0px 0px 1px, rgb(34, 34, 34) 0px 0px 1px" }], onSelect(t) { const { html: e, value: o } = t; return c.style({ textShadow: o }), a.set("subtitleStyle", { ...a.get("subtitleStyle"), textShadow: o }), e }, mounted(t, e) { const { textShadow: o } = { ...a.get("subtitleStyle") }; if (o) { const { selector: t } = e, n = t.find(t => t.value === o); n && (e.tooltip = n.html) } } }, { html: "加载字幕", name: "loadSubtitles", selector: [{ html: "本地文件", name: "file", tooltip: "", onClick: (t, e) => { const { user: o, show: n } = s.user; return o().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (l.$file.click(), function (t) { return new Promise((e, o) => { t.onchange = (t => { if (t.target.files.length) { const o = [...t.target.files].map(t => { const { name: e } = t, o = p(e).toLowerCase(); if (["webvtt", "vtt", "srt", "ssa", "ass", "smi"].includes(o)) return y(t).then(t => ({ url: t, type: o, name: e, html: `本地字幕「${o}」` })) }).filter(Boolean); Promise.all(o).then(t => { e(t) }) } t.target.value = "" }) }) }(l.$file).then(t => v(t))) : n() }), "" }, mounted: (t, e) => { l.$file || (l.$file = h(l.$container, '<input type="file" accept=".webvtt,.vtt,.srt,.ssa,.ass" style="display: none;">')) } }] }] }), u.update({ name: "subtitle", index: 31, html: `字幕显示: ${[1, 0].map(t => `<span data-value="${t}">${t ? "显示" : "隐藏"}</span>`).join("")}`, click: (t, e) => { const { user: o, show: n } = s.user; o().then(({ expire_time: t }) => { if (Math.max(t - Date.now(), 0)) { f(e.target, "art-current"); const { value: t } = e.target.dataset; c.show = Boolean(Number(t)) } else n() }), t.show = !1 }, mounted: e => { const o = d(`[data-value='${Number(c.show)}']`, e); o && f(o, "art-current"), t.on("subtitle", t => { const o = d(`[data-value='${Number(t)}']`, e); o && f(o, "art-current") }) } }), 
                // t.isReady ? k() : t.once("ready", k), { name: "subtitle" }
                k(), { name: "subtitle" }
            }, 
        () => t => { 
            const { notice: e, storage: o, plugins: n, setting: a, template: { $video: s } } = t; 
            function r(t) { i().then(e => { e.setEnabled(t) }) } function i() { if (t.joySound) return Promise.resolve(t.joySound); const e = window.Joysound || unsafeWindow.Joysound; if (e) { if (e.isSupport()) { const o = t.joySound = new e; return o.hasSource() || o.init(s), Promise.resolve(o) } return Promise.reject("Not Joysound isSupport") } return Promise.reject("Not Joysound") } 
            function l() { t.joySound && t.joySound.destroy() } function c() { t.once("user", ({ expire_time: e }) => { if (Math.max(e - Date.now(), 0)) { const e = o.get("joysound"); "boolean" == typeof e && e && r(e), t.on("destroy", l) } else o.del("joysound") }) } 
            return a.add({ html: "声音设置", name: "joysound", tooltip: "", selector: [
                {
                html: "音质增强", name: "high", tooltip: "关闭", switch: !1, onSwitch: t => { const a = !t.switch, { user: s, show: i } = n.user; return s().then(({ expire_time: n }) => { Math.max(n - Date.now(), 0) ? (r(a), t.tooltip = a ? "开启" : "关闭", o.set("joysound", a), e.show = `音质增强: ${t.tooltip}`) : i() }), a }, mounted: (t, e) => { o.get("joysound") && (e.tooltip = "增强", e.switch = !0) } }, 
                { html: "音量增强", name: "volume", tooltip: "0x", range: [0, 0, 5, .1], 
                onRange: t => { const o = t.range[0], { user: a, show: s } = n.user; return a().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (!function (t) { i().then(e => { e.setVolume(t) }) }(o), e.show = `音量增强: ${Math.round(100 * o)}%`) : s() }), `${Math.round(100 * o) / 100}x` } }] 
            }),
            //  t.playing ? c() : t.once("video:playing", c), { name: "sound" } 
             c()  
        }, 

        () => t => { 
            const { notice: e, storage: o, plugins: n, setting: a, template: { $video: { style: s } } } = t, r = () => { const { brightness: t = 1, contrast: e = 1, saturate: n = 1 } = { ...o.get("filter") }; s.filter = 1 !== t || 1 !== e || 1 !== n ? `brightness(${t}) contrast(${e}) saturate(${n})` : "" }; 
            
            function i() { t.once("user", ({ expire_time: t }) => { Math.max(t - Date.now(), 0) && r() }) } return a.update({ html: "色彩滤镜", name: "filter", tooltip: "", selector: [{ html: "亮度", name: "brightness", tooltip: 100, range: [100, 0, 255, 1], onRange: t => { const a = t.range[0], { user: s, show: i } = n.user; return s().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (o.set("filter", { ...o.get("filter"), brightness: a / 100 }), r(), e.show = `亮度: ${a}`) : i() }), a }, mounted: (t, e) => { const { brightness: n = 1 } = { ...o.get("filter") }, a = Math.trunc(100 * n); e.$range.value = a, e.tooltip = a } }, { html: "对比度", name: "contrast", tooltip: 100, range: [100, 0, 255, 1], onRange: t => { const a = t.range[0], { user: s, show: i } = n.user; return s().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (o.set("filter", { ...o.get("filter"), contrast: a / 100 }), r(), e.show = `对比度: ${a}`) : i() }), a }, mounted: (t, e) => { const { contrast: n = 1 } = { ...o.get("filter") }, a = Math.trunc(100 * n); e.$range.value = a, e.tooltip = a } }, { html: "饱和度", name: "saturate", tooltip: 100, range: [100, 0, 255, 1], onRange: t => { const a = t.range[0], { user: s, show: i } = n.user; return s().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (o.set("filter", { ...o.get("filter"), saturate: a / 100 }), r(), e.show = `饱和度: ${a}`) : i() }), a }, mounted: (t, e) => { const { saturate: n = 1 } = { ...o.get("filter") }, a = Math.trunc(100 * n); e.$range.value = a, e.tooltip = a } }, { html: "默认", tooltip: "", values: [1, 1, 1] }, { html: "护眼", tooltip: "", values: [.7, .85, .85] }, { html: "柔和", tooltip: "", values: [1.05, .85, .75] }, { html: "清晰", tooltip: "", values: [1.1, 1.05, 1.01] }, { html: "明亮", tooltip: "", values: [1.2, 1, 1.1] }, { html: "高对比", tooltip: "", values: [1, 1.5, 1] }, { html: "黑白", tooltip: "", values: [1, 1.1, 0] }], onSelect: t => { const { user: e, show: s } = n.user; return e().then(({ expire_time: e }) => { if (Math.max(e - Date.now(), 0)) { const e = t.values;["brightness", "contrast", "saturate"].forEach((t, o) => { const n = a.find(t), s = Math.trunc(100 * e[o]); n.tooltip = s, n.$range.value = s }), o.set("filter", { brightness: e[0], contrast: e[1], saturate: e[2] }), r() } else s() }), t.html } }), 
            // t.isReady ? i() : t.once("ready", i), { name: "filter" } 
            i() , { name: "filter" }  
        }, 

        () => t => { 
            const { i18n: e, notice: o, storage: n, plugins: a, setting: s, controls: r, constructor: { utils: { throttle: i } } } = t; 
            function l() { t.once("user", ({ expire_time: e }) => { if (Math.max(e - Date.now(), 0)) { n.get("autoFullscreen") && (t.fullscreenWeb = !0), t.on("video:timeupdate", i(() => { const { start: e, end: o } = { ...n.get("skipTime") }; if (0 == e && 0 == o) return; const { currentTime: a, duration: s } = t, r = [[0, e], [o ? s - o : 0, o ? s : 0]]; for (const [e, o] of r) if (a >= e && a < o) { t.seek = o; break } }, 1e3)), t.on("video:ended", () => { if (n.get("autoNext") && r.cache.get("playlist")) { const t = r.cache.get("playlist").option.selector, e = t[t.findIndex(t => t.default) + 1]; e ? (r.check(e), "function" == typeof e.open && e.open()) : o.show = "没有下一集了" } }) } }) } return s.update({ html: "播放设置", name: "playSetting", icon: "", tooltip: "", selector: [{ html: "自动连播", name: "autoNext", icon: "", tooltip: "关闭", switch: !1, onSwitch: t => { const e = !t.switch, { user: s, show: r } = a.user; return s().then(({ expire_time: a }) => { Math.max(a - Date.now(), 0) ? (t.tooltip = e ? "开启" : "关闭", n.set("autoNext", e), o.show = `自动下一集: ${t.tooltip}`) : r() }), e }, mounted: (t, e) => { n.get("autoNext") && (e.tooltip = "开启", e.switch = !0) } }, { html: "自动全屏", name: "autoFullscreen", icon: "", tooltip: "关闭", switch: !1, onSwitch: e => { const s = !e.switch, { user: r, show: i } = a.user; return r().then(({ expire_time: a }) => { Math.max(a - Date.now(), 0) ? (t.fullscreenWeb = s, n.set("autoFullscreen", s), e.tooltip = s ? "开启" : "关闭", o.show = `自动全屏: ${e.tooltip}`) : i() }), s }, mounted: (t, e) => { n.get("autoFullscreen") && (e.tooltip = "开启", e.switch = !0) } }, { html: "跳过片头", name: "start", tooltip: "0s", range: [0, 0, 120, 1], onChange(t) { const e = t.range[0], { user: s, show: r } = a.user; return s().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (n.set("skipTime", { ...n.get("skipTime"), start: e }), o.show = `跳过片头: ${e} 秒`) : r() }), e + "s" }, mounted: (t, e) => { const { start: o } = { ...n.get("skipTime") }; o && (e.tooltip = o + "s", e.$range.value = o) } }, { html: "跳过片尾", name: "end", tooltip: "0s", range: [0, 0, 120, 1], onChange(t) { const e = t.range[0], { user: s, show: r } = a.user; return s().then(({ expire_time: t }) => { Math.max(t - Date.now(), 0) ? (n.set("skipTime", { ...n.get("skipTime"), end: e }), o.show = `跳过片尾: ${e} 秒`) : r() }), e + "s" }, mounted: (t, e) => { const { end: o } = { ...n.get("skipTime") }; o && (e.tooltip = o + "s", e.$range.value = o) } }] }), 
            // t.isReady ? l() : t.once("ready", l), { name: "playSetting" } 
            l() , { name: "playSetting" } 
        }, 
            () => t => { !function (t) { const { proxy: e, storage: o, template: { $player: n, $video: a }, constructor: { FAST_FORWARD_VALUE: s, FAST_FORWARD_TIME: r, utils: { addClass: i, removeClass: l, hasClass: c } } } = t; let u = null, p = !1, d = 1; const h = e => { const { state: a, playbackRate: l = s } = { ...o.get("fastForward") }; a && ("touch" !== e.pointerType || e.isPrimary) && ("mouse" === e.pointerType && 0 !== e.button || t.playing && !t.isLock && (u = setTimeout(() => { p = !0, d = t.playbackRate, t.playbackRate = l, i(n, "art-fast-forward") }, r))) }, m = () => { clearTimeout(u), p && (p = !1, t.playbackRate = d, l(n, "art-fast-forward"), setTimeout(() => t.play())) }, f = t => { "touch" === t.pointerType && m() }; 
            function g() { 
                t.once("user", ({ expire_time: o }) => { 
                    Math.max(o - Date.now(), 0) && 
                    (e(a, "pointerdown", h), 
                    t.on("document:pointermove", f), t.on("document:pointerup", m), t.on("document:pointercancel", m)) 
                }
            ) } 
            
            // t.isReady ? g() : t.once("ready", g) 
            g() 
        }(t); 
        const e = function (t){ 
            const {proxy: e, layers: o, storage: n, constructor: { CONTROL_HIDE_TIME: a, utils: { isMobile: s, throttle: r } } } = t, 
            { state: i, backward: l = 15, forward: c = 15 } = { ...n.get("fastSeek") }, u = { position: "absolute", top: "50%", transform: "translateY(-50%) scale(1)", borderRadius: "50%", color: "#fff", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.15s ease, backdrop-filter 0.15s ease", userSelect: "none", pointerEvents: "auto", WebkitTapHighlightColor: "transparent", touchAction: "none" }, 
            p = o.update({ name: "backward", html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" aria-hidden="true" viewBox="0 0 64 64"><path d="M52 32a20 20 0 0 0-20-20 20 20 0 0 0-14.14 5.86L16 12v8h8l-2.93-2.93A14 14 0 0 1 32 18a14 14 0 0 1 14 14 14 14 0 0 1-14 14 14 14 0 0 1-9.93-4.07L20 42.93A20 20 0 0 0 52 32z"></path><text x="32" y="37" text-anchor="middle" dominant-baseline="middle" fill="currentColor" font-size="18" font-weight="600" font-family="system-ui, -apple-system, sans-serif">${l}</text></svg>`, style: { ...u, left: "25%" }, click: () => { const { backward: e = 15 } = { ...n.get("fastSeek") }; t.backward = e }, mounted: t => { } }), 
            d = o.update({ name: "forward", html: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" aria-hidden="true" viewBox="0 0 64 64"><path d="M12 32a20 20 0 0 1 20-20 20 20 0 0 1 14.14 5.86L48 12v8h-8l2.93-2.93A14 14 0 0 0 32 18a14 14 0 0 0-14 14 14 14 0 0 0 14 14 14 14 0 0 0 9.93-4.07L44 42.93A20 20 0 0 1 12 32z"></path><text x="32" y="37" text-anchor="middle" dominant-baseline="middle" fill="currentColor" font-size="18" font-weight="600" font-family="system-ui, -apple-system, sans-serif">${c}</text></svg>`, style: { ...u, right: "25%" }, click: () => { const { forward: e = 15 } = { ...n.get("fastSeek") }; t.forward = e }, mounted: t => { } }), 
            h = () => { p.style.display = "flex", d.style.display = "flex" }, m = () => { p.style.display = "none", d.style.display = "none" }; 
            function f() { 
                t.once("user", ({ expire_time: o }) => { 
                    if (Math.max(o - Date.now(), 0)) { 
                    let o = !1;[p, d].forEach(
                        n => { 
                                e(n, "pointerenter", () => { o = !0 }), e(n, "pointerleave", () => { o = !1 }), e(n, "pointerdown", () => { n.style.color = t.theme, n.style.backdropFilter = "blur(6px)", n.style.transform = "translateY(-50%) scale(0.85)" }), e(n, "pointerup", () => { n.style.color = u.color, n.style.backdropFilter = "", n.style.transform = "translateY(-50%) scale(1)" }), e(n, "pointercancel", 
                            () => { n.style.color = u.color, n.style.backdropFilter = "", n.style.transform = "translateY(-50%) scale(1)" }) 
                        }
                    ), 
                    t.on("control", r(t => { const { state: e } = { ...n.get("fastSeek") }; e && (t ? h() : o || m()) }, a / 3)) } }) } 
                    // return t.isReady ? f() : t.once("ready", f),
                    return f() ,
                     { name: "fastSeek", show: h, hide: m, updateBackward: t => { p.querySelector("svg > text").innerHTML = t }, updateForward: t => { d.querySelector("svg > text").innerHTML = t } } }(t), 
                    { notice: o, setting: n, storage: a, plugins: s } = t; return n.update({ html: "快捷控制", name: "quick", icon: "", tooltip: "", selector: [{ html: "长按倍速", name: "fastForward", icon: "", tooltip: "", selector: [{ html: "状态", name: "", icon: "", tooltip: "关闭", switch: !1, onSwitch: t => { const e = !t.switch, { user: n, show: r } = s.user; return n().then(({ expire_time: n }) => { Math.max(n - Date.now(), 0) ? (a.set("fastForward", { ...a.get("fastForward"), state: e }), t.tooltip = e ? "开启" : "关闭", o.show = `长按倍速: ${t.tooltip}`) : r() }), e }, mounted: (t, e) => { const { state: o } = { ...a.get("fastForward") }; o && (e.tooltip = "开启", e.switch = !0) } }, { html: "播放速度", name: "", icon: "", tooltip: "3x", range: [3, 2, 6, .5], onChange(t) { const e = t.range[0]; return a.set("fastForward", { ...a.get("fastForward"), playbackRate: e }), e + "x" }, mounted: (t, e) => { const { playbackRate: o } = { ...a.get("fastForward") }; o && (e.$range.value = o, e.tooltip = o + "x") } }] }, { html: "快进快退", name: "fastSeek", icon: "", tooltip: "", selector: [{ html: "状态", name: "", icon: "", tooltip: "关闭", switch: !1, onSwitch: t => { const n = !t.switch, { user: r, show: i } = s.user; return r().then(({ expire_time: s }) => { Math.max(s - Date.now(), 0) ? (a.set("fastSeek", { ...a.get("fastSeek"), state: n }), n ? (e.show(), t.tooltip = "开启") : (e.hide(), t.tooltip = "关闭"), o.show = `快进快退: ${t.tooltip}`) : i() }), n }, mounted: (t, e) => { const { state: o } = { ...a.get("fastSeek") }; o && (e.tooltip = "开启", e.switch = !0) } }, { html: "快退时间", name: "backward", tooltip: "15s", range: [15, 10, 90, 1], onChange(t) { const o = t.range[0]; return a.set("fastSeek", { ...a.get("fastSeek"), backward: o }), e.updateBackward(o), o + "s" }, mounted: (t, e) => { const { backward: o } = { ...a.get("fastSeek") }; o && (e.$range.value = o, e.tooltip = o + "s") } }, { html: "快进时间", name: "forward", tooltip: "15s", range: [15, 10, 90, 1], onChange(t) { const o = t.range[0]; return a.set("fastSeek", { ...a.get("fastSeek"), forward: o }), e.updateForward(o), o + "s" }, mounted: (t, e) => { const { forward: o } = { ...a.get("fastSeek") }; o && (e.$range.value = o, e.tooltip = o + "s") } }] }] }), { name: "quick" } 
                }, 
                () => t => { 
                    const { option: e, constructor: { utils: { isMobile: o } } } = t; 
                    function n() { 
                        t.once(
                            "user", ({ expire_time: n }) => { 
                                Math.max(n - Date.now(), 0) && (e.hotkey && !o && (t.isFocus || (t.isFocus = !0)), t.on("blur", n => { e.hotkey && !o && (t.isFocus = !0) })) 
                            }) 
                        } 
                    // return t.isReady ? n() : t.once("ready", n), { name: "hotkey" } 
                    return n() , { name: "hotkey" }  
                }, 
    () => t => { 
        const { info: e, proxy: o, contextmenu: n, template: { $video: a, $infoPanel: s }, constructor: { INFO_LOOP_TIME: r, utils: { query: i, append: l, isMobile: c } } } = t; 
        function u() {
             t.once("user", ({ expire_time: a }) => { 
                Math.max(a - Date.now(), 0) && 
                function () { 
                    if (c) return; const { hls: a } = t; if (a) { const t = l(s, '<div class="art-info-item"><div class="art-info-title">Hls bandwidth:</div><div class="art-info-content">NaN</div></div>'), c = i(".art-info-content", t); o(
                    n.info,"click",
                    function t(){if(e.show){const e=a.bandwidthEstimate,o="number"==typeof e?`${(e/1024/1024/8).toFixed(4)} MBps/s`:e;c.innerText!==o&&(c.innerText=o),setTimeout(t,r)}}
                )}}()
            })
        }
        // return t.isReady?u():t.once("ready",u),{name:"info"}
        return u(),{name:"info"}
    }
]);
