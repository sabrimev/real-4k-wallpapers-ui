(this["webpackJsonpreal-4k-wallpapers-ui"]=this["webpackJsonpreal-4k-wallpapers-ui"]||[]).push([[0],{122:function(e,t,a){},206:function(e,t,a){e.exports=a(391)},211:function(e,t,a){},230:function(e,t,a){},391:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(31),i=a.n(o),s=(a(211),a(122),a(73)),r=a(74),c=a(84),u=a(75),m=a(48),d=a(85),p=a(56),f=a.n(p),g=(l.a.Component,a(87),a(230),a(115)),h=a(111),b=a.n(h),C=a(406),w=a(403),E=a(408),v=a(405),y=a(409),T=a(194),P=a(116),S=a(404),D=a(172),F=a.n(D),x=a(173),H=a.n(x);new(a(247))(f.a).onPost("/file/upload/enpoint").reply(200);var N=F()(new Date("2015-01-01T00:00"),1),K=(H()(N,"YYYY-MM-DD"),[]),k=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(u.a)(t).call(this,e))).onFormSubmit=function(e){if(e.preventDefault(),console.log("form submit"),0===a.state.categories.length||null==a.state.file4K||null==a.state.fileHD||null==a.state.fileThumbnail||""==a.state.password)return console.error(Error("Provide all the information")),a.setState({statusCode:404,submitting:!1},(function(){console.log("Provide all the information",a.state.statusCode)})),console.log("form submit canceled"),void window.scrollTo(0,0);a.fileUploadFetch(a.state.file4K,a.state.fileHD,a.state.fileThumbnail,a.state.isPremium,a.state.password,a.state.source,a.state.categories),a.setState({submitting:!0}),window.scrollTo(0,0)},a.fileChange4K=function(e){a.setState({file4K:e.target.files[0],fileName4K:e.target.files[0].name},(function(){console.log("File chosen ---\x3e",a.state.file4K,console.log("File name  ---\x3e",a.state.fileName4K))}))},a.fileChangeHD=function(e){a.setState({fileHD:e.target.files[0],fileNameHD:e.target.files[0].name},(function(){console.log("File chosen ---\x3e",a.state.fileHD,console.log("File name  ---\x3e",a.state.fileNameHD))}))},a.fileChangeThumbnail=function(e){a.setState({imagePreview:URL.createObjectURL(e.target.files[0]),fileThumbnail:e.target.files[0],fileNameThumbnail:e.target.files[0].name},(function(){console.log("File chosen ---\x3e",a.state.fileThumbnail,console.log("File name  ---\x3e",a.state.fileNameThumbnail))}))},a.getCategoryFetch=function(){return b.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://wallpaper.westeurope.cloudapp.azure.com/wallpaper/getAllCategory",{method:"GET",redirect:"follow"}).then((function(e){return e.text()})).then((function(e){console.log(e),a.setState({category:e,categoryDownloaded:!0}),K=JSON.parse(e),a.setState(a.state)})).catch((function(e){return console.log("error",e)}));case 2:case"end":return e.stop()}}))},a.fileUploadFetch=function(e,t,n,l,o,i,s){var r;return b.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:(r=new FormData).append("Image4k",e),r.append("ImageHD",t),r.append("ImageThumbnail",n),r.append("Password",o),r.append("IsPremium",l),r.append("Source",i),s.map((function(e){return r.append("Categories",e)})),console.log("Sending data..");try{(new Headers).append("Content-Type","application/json"),fetch("https://wallpaper.westeurope.cloudapp.azure.com/wallpaper/UploadImage",{method:"POST",body:r}).then((function(e){return console.log(e),console.log(e.status),a.setState({statusCode:e.status,submitting:!1},(function(){console.log("This is the response status code ---\x3e",a.state.statusCode)})),200===e.status&&a.setState({submitting:!1,file4K:null,fileHD:null,fileThumbnail:null,fileName4K:"",fileNameHD:"",fileNameThumbnail:""}),e.text()})).then((function(e){return console.log(e)})).catch((function(e){console.log("error",e),a.setState({statusCode:500,submitting:!1},(function(){console.log("This is the response status code-err ---\x3e",a.state.statusCode)}))}))}catch(u){console.error(Error("Error uploading file ".concat(u.message))),a.setState({statusCode:500,submitting:!1},(function(){console.log("This is the response status code-err2 ---\x3e",a.state.statusCode)}))}case 10:case"end":return c.stop()}}))},a.onPasswordChange=function(e){console.log("onPasswordChange"),a.setState({password:e.target.value}),console.log(a.state.password)},a.onSourceChange=function(e){console.log("onSourceChange"),a.setState({source:e.target.value}),console.log(a.state.source)},a.onPremiumChange=function(e){console.log("onPremiumChange : "+!a.state.isPremium),a.setState({isPremium:!a.state.isPremium})},a.handleCategoryClick=function(e,t,n){if(console.log(t),t.checked&&!a.state.categories.includes(t.id))a.setState({categories:[].concat(Object(g.a)(a.state.categories),[t.id])});else if(a.state.categories.includes(t.id)){var l=Object(g.a)(a.state.categories),o=l.indexOf(t.id);-1!==o&&(l.splice(o,1),a.setState({categories:l}))}console.log("selected categories except last one: "+a.state.categories)},a.state={imagePreview:null,categories:[],categoryDownloaded:!1,file4K:null,fileHD:null,fileThumbnail:null,fileName4K:"",fileNameHD:"",fileNameThumbnail:"",isPremium:!1,password:"",source:"",isUploading:!1,statusCode:"",submitting:!1},a.getCategoryFetch(),a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state.statusCode,a=[{menuItem:"Import ",render:function(){return l.a.createElement(C.a.Pane,{attached:!1,className:"Testo",loading:e.state.submitting},t&&200===t?l.a.createElement(w.a,{style:{marginTop:"20px"},percent:100,success:!0,progress:!0},"File Upload Success"):t&&500===t?l.a.createElement(w.a,{style:{marginTop:"20px"},percent:0,error:!0,active:!0,progress:!0},"File Upload Failed"):t&&401===t?l.a.createElement(w.a,{style:{marginTop:"20px"},percent:0,error:!0,active:!0,progress:!0},"File Upload Failed: Wrong password"):t&&404===t?l.a.createElement(w.a,{style:{marginTop:"20px"},percent:0,error:!0,active:!0,progress:!0},"Provide all the information"):null,l.a.createElement(E.a,null,"Provide all the information below"),l.a.createElement(v.a,{onSubmit:e.onFormSubmit},l.a.createElement(v.a.Group,{widths:"equal"},l.a.createElement(v.a.Field,null,l.a.createElement(v.a.Checkbox,{label:"Premium wallpaper",checked:e.state.isPremium,fluid:!0,value:e.state.isPremium,onChange:e.onPremiumChange}),l.a.createElement(v.a.Input,{fluid:!0,placeholder:"Password",value:e.state.password,onChange:e.onPasswordChange}),l.a.createElement(v.a.Input,{fluid:!0,placeholder:"Source",value:e.state.source,onChange:e.onSourceChange}),l.a.createElement(y.a,{as:"label",htmlFor:"file4K",type:"button",animated:"fade"},l.a.createElement(y.a.Content,{visible:!0}),l.a.createElement(y.a.Content,null,"Choose 4K Wallpaper")),l.a.createElement("input",{type:"file",id:"file4K",hidden:!0,onChange:e.fileChange4K}),l.a.createElement(v.a.Input,{fluid:!0,placeholder:"file4K",readOnly:!0,value:e.state.fileName4K}),l.a.createElement(y.a,{as:"label",htmlFor:"fileHD",type:"button",animated:"fade"},l.a.createElement(y.a.Content,null,"Choose HD Wallpaper")),l.a.createElement("input",{type:"file",id:"fileHD",hidden:!0,onChange:e.fileChangeHD}),l.a.createElement(v.a.Input,{fluid:!0,placeholder:"fileHD",readOnly:!0,value:e.state.fileNameHD}),l.a.createElement(y.a,{as:"label",htmlFor:"fileThumbnail",type:"button",animated:"fade"},l.a.createElement(y.a.Content,null,"Choose Thumbnail Wallpaper")),l.a.createElement("input",{type:"file",id:"fileThumbnail",hidden:!0,onChange:e.fileChangeThumbnail}),l.a.createElement(v.a.Input,{fluid:!0,placeholder:"fileThumbnail",readOnly:!0,value:e.state.fileNameThumbnail}),l.a.createElement(T.a,{src:e.state.imagePreview,size:"small"}),l.a.createElement(y.a,{style:{marginTop:"20px"},type:"submit"},"Upload")),l.a.createElement(v.a.Field,null,e.state.categoryDownloaded&&K.map((function(t,a){return l.a.createElement(v.a.Checkbox,{id:t.id+"",label:t.categoryName,onChange:function(t,n){return e.handleCategoryClick(t,n,a)},name:t.categoryName,defaultChecked:!1})}))))))}}];return l.a.createElement(P.a,{style:{padding:"1em 1em"},vertical:!0},l.a.createElement(S.a,{horizontal:!0},"REAL 4K WALLPAPERS FILE UPLOAD SERVICE"),l.a.createElement(C.a,{menu:{pointing:!0},panes:a}))}}]),t}(n.Component);var I=function(){return l.a.createElement(k,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[206,1,2]]]);
//# sourceMappingURL=main.dffedeb6.chunk.js.map