import{_ as S,c as n,j as t,a2 as g,a9 as b,F as c,C as u,o as i,t as r}from"./framework.CElktlHO.js";const _={data(){return{isLoggedIn:!1,adminEmail:"6657@qq.com",adminPassword:"12345",users:[],roomStats:{},wishBullets:[]}},mounted(){this.initializeAdmin(),this.checkLoginStatus()},methods:{initializeAdmin(){const e=JSON.parse(localStorage.getItem("users")||"[]");e.find(s=>s.email===this.adminEmail)||(e.push({username:"admin",email:this.adminEmail,password:this.adminPassword,isAdmin:!0}),localStorage.setItem("users",JSON.stringify(e)))},checkLoginStatus(){const e=JSON.parse(localStorage.getItem("currentUser"));this.isLoggedIn=(e==null?void 0:e.isAdmin)||!1,this.isLoggedIn&&this.loadAllData()},async loadAllData(){this.users=JSON.parse(localStorage.getItem("users")||"[]"),this.roomStats=JSON.parse(localStorage.getItem("roomStats")||"{}"),this.wishBullets=JSON.parse(localStorage.getItem("wishBullets")||"[]")},async handleAdminLogin(){const s=JSON.parse(localStorage.getItem("users")||"[]").find(m=>m.email===this.adminEmail&&m.password===this.adminPassword&&m.isAdmin);s?(localStorage.setItem("currentUser",JSON.stringify(s)),this.isLoggedIn=!0,await this.loadAllData()):alert("管理员邮箱或密码错误")},logout(){localStorage.removeItem("currentUser"),this.isLoggedIn=!1},deleteUser(e){confirm("确定要删除该用户吗？")&&(this.users=this.users.filter(s=>s.email!==e),localStorage.setItem("users",JSON.stringify(this.users)))},deleteRoom(e){confirm("确定要删除该自习室吗？")&&(delete this.roomStats[e],localStorage.setItem("roomStats",JSON.stringify(this.roomStats)))},deleteWish(e){confirm("确定要删除该愿望吗？")&&(this.wishBullets.splice(e,1),localStorage.setItem("wishBullets",JSON.stringify(this.wishBullets)))},viewRoomUsers(e){const s=Object.keys(this.roomStats[e]||{});alert(`${e} 的成员：
${s.join(`
`)||"暂无成员"}`)}}},f={class:"admin-container"},y={key:0,class:"admin-login"},v={key:1,class:"admin-panel"},p={class:"d-flex justify-content-end mb-4"},k={class:"row"},w={class:"col-md-4 mb-4"},I={class:"card"},A={class:"card-body"},O={class:"table"},L=["onClick"],N={key:1,class:"badge bg-primary"},C={class:"col-md-4 mb-4"},J={class:"card"},B={class:"card-body"},U={class:"table"},x=["onClick"],E=["onClick"],P={class:"col-md-4 mb-4"},j={class:"card"},D={class:"card-body"},R={class:"table"},V=["onClick"];function q(e,s,m,z,o,a){return i(),n("div",f,[o.isLoggedIn?(i(),n("div",v,[t("div",p,[t("button",{onClick:s[3]||(s[3]=(...l)=>a.logout&&a.logout(...l)),class:"btn btn-danger"},"退出登录")]),t("div",k,[t("div",w,[t("div",I,[s[6]||(s[6]=t("div",{class:"card-header bg-primary text-white"},"用户管理",-1)),t("div",A,[t("table",O,[s[5]||(s[5]=t("thead",null,[t("tr",null,[t("th",null,"用户名"),t("th",null,"邮箱"),t("th",null,"操作")])],-1)),t("tbody",null,[(i(!0),n(c,null,u(o.users,l=>(i(),n("tr",{key:l.email},[t("td",null,r(l.username),1),t("td",null,r(l.email),1),t("td",null,[l.isAdmin?(i(),n("span",N,"管理员")):(i(),n("button",{key:0,onClick:d=>a.deleteUser(l.email),class:"btn btn-sm btn-danger"}," 删除 ",8,L))])]))),128))])])])])]),t("div",C,[t("div",J,[s[8]||(s[8]=t("div",{class:"card-header bg-success text-white"},"自习室管理",-1)),t("div",B,[t("table",U,[s[7]||(s[7]=t("thead",null,[t("tr",null,[t("th",null,"名称"),t("th",null,"人数"),t("th",null,"操作")])],-1)),t("tbody",null,[(i(!0),n(c,null,u(o.roomStats,(l,d)=>(i(),n("tr",{key:d},[t("td",null,r(d),1),t("td",null,r(Object.keys(l).length),1),t("td",null,[t("button",{onClick:h=>a.viewRoomUsers(d),class:"btn btn-sm btn-info me-2"}," 查看 ",8,x),t("button",{onClick:h=>a.deleteRoom(d),class:"btn btn-sm btn-danger"}," 删除 ",8,E)])]))),128))])])])])]),t("div",P,[t("div",j,[s[10]||(s[10]=t("div",{class:"card-header bg-warning text-dark"},"愿望管理",-1)),t("div",D,[t("table",R,[s[9]||(s[9]=t("thead",null,[t("tr",null,[t("th",null,"内容"),t("th",null,"操作")])],-1)),t("tbody",null,[(i(!0),n(c,null,u(o.wishBullets,(l,d)=>(i(),n("tr",{key:d},[t("td",null,r(l.content),1),t("td",null,[t("button",{onClick:h=>a.deleteWish(d),class:"btn btn-sm btn-danger"}," 删除 ",8,V)])]))),128))])])])])])])])):(i(),n("div",y,[s[4]||(s[4]=t("h2",null,"管理员登录",-1)),g(t("input",{"onUpdate:modelValue":s[0]||(s[0]=l=>o.adminEmail=l),placeholder:"邮箱",class:"form-control mb-3"},null,512),[[b,o.adminEmail]]),g(t("input",{"onUpdate:modelValue":s[1]||(s[1]=l=>o.adminPassword=l),type:"password",placeholder:"密码",class:"form-control mb-3"},null,512),[[b,o.adminPassword]]),t("button",{onClick:s[2]||(s[2]=(...l)=>a.handleAdminLogin&&a.handleAdminLogin(...l)),class:"btn btn-primary w-100"},"登录")]))])}const W=S(_,[["render",q],["__scopeId","data-v-c274471e"]]);export{W as default};
