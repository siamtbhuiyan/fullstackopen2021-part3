(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(15),c=t.n(r),o=t(6),a=t(3),u=t(2),i=t(0),d=function(e){var n=e.search,t=e.setSearch;return Object(i.jsx)("form",{children:Object(i.jsxs)("div",{children:["name:"," ",Object(i.jsx)("input",{value:n,onChange:function(e){return t(e.target.value)}})]})})},l=function(e){var n=e.addPerson,t=e.newName,r=e.handleNameChange,c=e.newNumber,o=e.handleNumberChange;return Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:t,onChange:r})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:c,onChange:o})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.person,t=e.handleDelete;return Object(i.jsxs)(i.Fragment,{children:[n.name," ",n.number,Object(i.jsx)("button",{onClick:t,children:"Delete"})]})},b=function(e){var n=e.message,t={};return t=null!==n?n.includes("[error]")?{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{},Object(i.jsx)("div",{style:t,children:n})},h=t(4),f=t.n(h),j="/api/persons",m={getAll:function(){return f.a.get(j).then((function(e){return e.data}))},create:function(e){return f.a.post(j,e).then((function(e){return e.data}))},remove:function(e){return f.a.delete("".concat(j,"/").concat(e)).then((function(e){return e}))},update:function(e,n){return f.a.put("".concat(j,"/").concat(n),e).then((function(e){return e.data}))}},O=function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)(""),h=Object(a.a)(c,2),f=h[0],j=h[1],O=Object(u.useState)(""),g=Object(a.a)(O,2),v=g[0],p=g[1],x=Object(u.useState)(null),w=Object(a.a)(x,2),S=w[0],C=w[1],N=Object(u.useState)(""),y=Object(a.a)(N,2),k=y[0],T=y[1];Object(u.useEffect)((function(){m.getAll().then((function(e){r(e)})).catch((function(e){C("[error] Couldn't Get Data from the Server"),setTimeout((function(){C(null)}),3e3)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)(b,{message:S}),Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(d,{search:k,setSearch:T}),Object(i.jsx)("h2",{children:"add a new"}),Object(i.jsx)(l,{addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===f}));if(n){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){console.log(f);var c={name:f,number:v},a=t.find((function(e){return e.id===f.id})),u=Object(o.a)(Object(o.a)({},a),{},{number:f.number});m.update(c,n.id).then((function(e){r(t.map((function(e){return e.id===c.id?u:e}))),C("New Number added to ".concat(f)),setTimeout((function(){C(null)}),3e3)})).catch((function(e){C("[error] ".concat(c.name," has already been removed from server")),setTimeout((function(e){C(null)}),3e3)}))}}else{var i={name:f,number:v};m.create(i).then((function(e){r(e),C("Added ".concat(f)),setTimeout((function(){C(null)}),3e3)})).catch((function(e){console.log(e),C("[error] Couldn't add ".concat(f," to the server")),setTimeout((function(){C(null)}),3e3)}))}j(""),p("")},newName:f,handleNameChange:function(e){j(e.target.value)},newNumber:v,handleNumberChange:function(e){p(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),t.filter((function(e){return""===e?e:e.name.toLowerCase().includes(k.toLowerCase())})).map((function(e){return Object(i.jsx)("p",{children:Object(i.jsx)(s,{person:e,handleDelete:function(){return function(e){var n=e.id,c=e.name;window.confirm("Delete ".concat(c,"?"))&&m.remove(n).then((function(){C("".concat(c," was deleted")),setTimeout((function(){C(null)}),3e3)})).catch((function(e){console.log(e),C("[error] ".concat(c," was already deleted")),setTimeout((function(){C(null)}),3e3)}));var o=t.filter((function(e){return e.name!==c}));r(o)}(e)}})},e.id)}))]})};t(39);c.a.render(Object(i.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.31af479a.chunk.js.map