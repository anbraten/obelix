(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin-rentables"],{1960:function(e,t,n){"use strict";n("e25f")},3914:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page"},[n("div",{staticClass:"head"},[n("div",{staticClass:"button",on:{click:function(t){return e.$router.go(-1)}}},[n("i",{staticClass:"fas fa-angle-double-left"})]),n("div",{staticClass:"head-title"},[e._v(" Boote verwalten ")]),n("div",{staticClass:"button",on:{click:function(t){return e.$router.push({name:"admin-create-rentable"})}}},[e._v(" Neues Boot anlegen ")])]),e.rentables?n("div",{staticClass:"rentables"},e._l(e.rentables,(function(t){return n("div",{key:t.id,staticClass:"rentable",on:{click:function(n){return e.selectRentable(t)}}},[n("span",[e._v(e._s(t.name))])])})),0):e._e()])},a=[],s=(n("df26"),n("42c2")),i={name:"AdminRentables",computed:{rentables:function(){return this.$store.state.rental.rentables}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadData();case 2:case"end":return t.stop()}}),t)})))()},methods:{loadData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("rental/getRentables");case 2:case"end":return t.stop()}}),t)})))()},selectRentable:function(e){this.$router.push({name:"admin-rentable",params:{rentableId:e.id}})}},removeRentable:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("rental/removeRentable",e);case 2:return n.next=4,t.loadData();case 4:case"end":return n.stop()}}),n)})))()}},c=i,u=(n("1960"),n("2be6")),o=Object(u["a"])(c,r,a,!1,null,"53618023",null);t["default"]=o.exports},e25f:function(e,t,n){}}]);
//# sourceMappingURL=admin-rentables.a2aaf49d.js.map