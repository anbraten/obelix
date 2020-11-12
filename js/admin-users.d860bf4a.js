(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-users"],{"63af":function(e,t,s){"use strict";s("ae47")},"6e64":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"page"},[s("div",{staticClass:"head"},[s("div",{staticClass:"button",on:{click:function(t){return e.$router.go(-1)}}},[s("i",{staticClass:"fas fa-angle-double-left"})]),s("div",{staticClass:"head-title"},[e._v(" Benutzer verwalten ")]),s("div")]),e.users?e._l(e.users,(function(t){return s("div",{key:t.id,staticClass:"user",on:{click:function(s){e.selectedUser=t}}},[s("span",{staticClass:"name"},[s("b-icon",{attrs:{pack:"fas",icon:"user",size:"is-small"}}),e._v(" "+e._s(t.name))],1),s("span",{staticClass:"group"},[e._v(e._s(t.group||"Standard"))])])})):e._e(),s("b-modal",{attrs:{active:e.isModalOpen,"has-modal-card":"","trap-focus":"","destroy-on-hide":!1,"aria-role":"dialog","aria-modal":""},on:{"update:active":function(t){e.isModalOpen=t}}},[e.selectedUser?s("UserForm",{attrs:{user:e.selectedUser},on:{group:e.changeGroup,access:e.changeAccess}}):e._e()],1)],2)},r=[],n=s("0b38"),i=s("9ce4"),c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"modal-card",staticStyle:{width:"auto"}},[s("header",{staticClass:"modal-card-head"},[s("p",{staticClass:"modal-card-title"},[e._v(" "+e._s(e.user.name)+" ")])]),s("section",{staticClass:"modal-card-body"},[s("b-field",{attrs:{label:"Email",horizontal:""}},[s("b-input",{attrs:{type:"email",value:e.user.email,placeholder:"Your email",disabled:""}})],1),s("b-field",{attrs:{label:"Gruppe",horizontal:""}},[s("b-radio-button",{attrs:{value:e.user.group||"","native-value":""},on:{input:function(t){return e.$emit("group","")}}},[e._v(" Standard ")]),s("b-radio-button",{attrs:{value:e.user.group,"native-value":"trainer"},on:{input:function(t){return e.$emit("group","trainer")}}},[e._v(" Trainer ")]),s("b-radio-button",{attrs:{value:e.user.group,"native-value":"admin"},on:{input:function(t){return e.$emit("group","admin")}}},[e._v(" Admin ")])],1),s("b-field",{attrs:{label:"Zugriff",horizontal:""}},[s("b-radio-button",{attrs:{type:"is-success",value:e.user.access||"granted","native-value":"granted"},on:{input:function(t){return e.$emit("access","granted")}}},[e._v(" Freigegeben ")]),s("b-radio-button",{attrs:{type:"is-danger",value:e.user.access,"native-value":"denied"},on:{input:function(t){return e.$emit("access","denied")}}},[e._v(" Gesperrt ")])],1)],1),s("footer",{staticClass:"modal-card-foot"},[s("button",{staticClass:"button",attrs:{type:"button"},on:{click:function(t){return e.$parent.close()}}},[e._v(" Schließen ")])])])},o=[],u={name:"UserForm",props:{user:{type:Object,required:!0}}},l=u,d=s("2be6"),p=Object(d["a"])(l,c,o,!1,null,"eaa491ca",null),f=p.exports,v={name:"AdminUsers",components:{UserForm:f},data:function(){return{selectedUser:null}},computed:Object(n["a"])(Object(n["a"])({},Object(i["c"])("rental",["users"])),{},{isModalOpen:{get:function(){return!!this.selectedUser},set:function(e){e||(this.selectedUser=null)}}}),created:function(){this.loadData()},methods:{loadData:function(){this.$store.dispatch("rental/getUsers")},changeGroup:function(e){this.selectedUser&&(this.$set(this.selectedUser,"group",e),this.$store.dispatch("rental/updateUser",this.selectedUser))},changeAccess:function(e){this.selectedUser&&(this.$set(this.selectedUser,"access",e),this.$store.dispatch("rental/updateUser",this.selectedUser))}}},b=v,h=(s("63af"),Object(d["a"])(b,a,r,!1,null,"68955263",null));t["default"]=h.exports},ae47:function(e,t,s){}}]);
//# sourceMappingURL=admin-users.d860bf4a.js.map