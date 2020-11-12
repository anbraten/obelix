(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"1cfa":function(e,t,n){"use strict";n("983d")},"44d2":function(e,t,n){var a=n("b622"),s=n("7c73"),r=n("9bf2"),i=a("unscopables"),c=Array.prototype;void 0==c[i]&&r.f(c,i,{configurable:!0,value:s(null)}),e.exports=function(e){c[i][e]=!0}},"7db0":function(e,t,n){"use strict";var a=n("23e7"),s=n("b727").find,r=n("44d2"),i=n("ae40"),c="find",o=!0,u=i(c);c in[]&&Array(1)[c]((function(){o=!1})),a({target:"Array",proto:!0,forced:o||!u},{find:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),r(c)},"983d":function(e,t,n){},d354:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bookings"},[n("div",{staticClass:"head"},[n("div",{staticClass:"date"},[n("div",{staticClass:"prevDay button",on:{click:e.prevDay}},[n("i",{staticClass:"fas fa-backward"})]),n("div",{staticClass:"selectedDate"},[e._v(" "+e._s(e._f("date")(e.selectedDate))+" ")]),e.isTodaySelected?e._e():n("div",{staticClass:"today button",on:{click:e.today}},[e._v(" Heute ")]),n("div",{staticClass:"nextDay button",on:{click:e.nextDay}},[n("i",{staticClass:"fas fa-forward"})])]),e.canBook?n("div",{staticClass:"actions"},[n("b-button",{staticClass:"button",attrs:{type:"is-info",outlined:"","icon-left":"plus"},on:{click:e.newBooking}},[e._v(" Boot ausleihen ")])],1):e._e()]),e.bookings&&e.bookings.length>0?e._l(e.bookings,(function(t){return n("div",{key:t.id,staticClass:"booking"},[n("div",{staticClass:"rentables"},e._l(t.rentables,(function(t){return n("div",{key:t.id,staticClass:"rentable"},[n("b-icon",{staticClass:"icon",attrs:{pack:"fas",icon:"ship",size:"is-small"}}),n("span",[e._v(e._s(t.name))])],1)})),0),n("div",{staticClass:"time"},[n("b-icon",{staticClass:"icon",attrs:{pack:"fas",icon:"clock",size:"is-small"}}),n("span",[e._v(e._s(t.startTime)+" - "+e._s(t.endTime))])],1),n("div",{staticClass:"user"},[n("b-icon",{staticClass:"icon",attrs:{pack:"fas",icon:"user",size:"is-small"}}),n("span",[e._v(e._s(t.user.name))])],1),t.note?n("div",{staticClass:"note"},[n("b-icon",{staticClass:"icon",attrs:{pack:"fas",icon:"sticky-note",size:"is-small"}}),n("span",[e._v(e._s(t.note))])],1):e._e(),n("div",{staticClass:"actions"},[t.canCancel?n("b-button",{staticClass:"remove",attrs:{type:"is-danger",size:"is-small","icon-left":"trash"},on:{click:function(n){return e.cancelBooking(t)}}}):e._e()],1)])})):0===e.bookings.length?n("div",{staticClass:"empty"},[n("span",[e._v("Es liegen noch keine Reservierungen vor!")])]):n("b-loading",{attrs:{"is-full-page":!0,active:!0,"can-cancel":!1}})],2)},s=[],r=(n("99af"),n("7db0"),n("d81d"),n("ac1f"),n("5319"),n("df26"),n("42c2")),i=n("0b38"),c=n("c206"),o=n.n(c),u=n("b3c8"),l=n("e740"),d=n("9ce4"),f=Object(u["a"])("Bookings"),h={name:"Bookings",filters:{date:function(e){return o()(e).format("dddd - D. MMMM YYYY")}},computed:Object(i["a"])(Object(i["a"])({},Object(d["b"])("rental",["isTrainer","isAdmin"])),{},{rentables:function(){return this.$store.state.rental.rentables||[]},bookings:function(){var e=this,t=this.$store.state.rental.bookings[this.selectedDate]||[];return t=t.sort((function(e,t){return new Date("1970/01/01 ".concat(e.startTime))-new Date("1970/01/01 ".concat(t.startTime))})),t=t.map((function(t){var n=o()("".concat(t.date," ").concat(t.startTime),l["b"]),a=Object(l["e"])(n,"minutes"),s=(t.user.id===e.userId||e.isAdmin)&&!a,r=t.rentables.map((function(t){return e.rentables.find((function(e){return e.id===t}))}));return Object(i["a"])(Object(i["a"])({},t),{},{canCancel:s,rentables:r})})),t},selectedDate:function(){return this.$route.hash?this.$route.hash.substr(1):o()().format(l["a"])},userId:function(){return this.$store.getters["auth/userId"]},canBook:function(){var e=o()(this.selectedDate,l["a"]),t=this.isTrainer?21:7,n=Math.abs(Object(l["c"])(e,"days"))<t;return Object(l["f"])(e)||Object(l["d"])(e)&&n},isTodaySelected:function(){return Object(l["f"])(o()(this.selectedDate,l["a"]))}}),watch:{selectedDate:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadData();case 2:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(Object(l["g"])(e.selectedDate)){t.next=3;break}return e.$router.replace({hash:null}),t.abrupt("return");case 3:return t.next=5,e.loadData();case 5:case"end":return t.stop()}}),t)})))()},methods:{today:function(){this.$route.hash&&this.$router.replace({hash:null})},nextDay:function(){var e=o()(this.selectedDate,l["a"]).add(1,"days").format(l["a"]);this.$router.replace({hash:"#".concat(e)})},prevDay:function(){var e=o()(this.selectedDate,l["a"]).subtract(1,"days").format(l["a"]);this.$router.replace({hash:"#".concat(e)})},newBooking:function(){this.$router.push({name:"booking-create",hash:"#".concat(this.selectedDate)})},loadData:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("rental/getRentables");case 2:return t.next=4,e.$store.dispatch("rental/getBookings",e.selectedDate);case 4:case"end":return t.stop()}}),t)})))()},cancelBooking:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$buefy.dialog.confirm({title:"Reservierung löschen",message:"Möchtest du deine Reservierung wirklich löschen?",cancelText:"Abbrechen",confirmText:"Löschen",type:"is-danger",hasIcon:!0,onConfirm:function(){var n=Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$store.dispatch("rental/cancelBooking",e.id);case 3:n.next=10;break;case 5:return n.prev=5,n.t0=n["catch"](0),f(n.t0),t.$buefy.toast.open({message:"Es ist ein Fehler aufgetreten.",position:"is-top",type:"is-danger"}),n.abrupt("return");case 10:return n.next=12,t.loadData();case 12:t.$buefy.toast.open({message:"Deine Reservierung wurde erfolgreich storniert.",position:"is-top",type:"is-success"});case 13:case"end":return n.stop()}}),n,null,[[0,5]])})));function a(){return n.apply(this,arguments)}return a}()});case 1:case"end":return n.stop()}}),n)})))()}}},b=h,p=(n("1cfa"),n("2be6")),v=Object(p["a"])(b,a,s,!1,null,"cdc05300",null);t["default"]=v.exports},d81d:function(e,t,n){"use strict";var a=n("23e7"),s=n("b727").map,r=n("1dde"),i=n("ae40"),c=r("map"),o=i("map");a({target:"Array",proto:!0,forced:!c||!o},{map:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=home.56605cc3.js.map