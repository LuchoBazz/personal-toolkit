"use strict";(self.webpackChunkpersonal_toolkit=self.webpackChunkpersonal_toolkit||[]).push([[302],{7532:(e,o,n)=>{n.r(o),n.d(o,{assets:()=>h,contentTitle:()=>c,default:()=>g,frontMatter:()=>u,metadata:()=>m,toc:()=>b});var t=n(4848),s=n(8453),r=n(6540),a=n(1567),i=n(5128);const l={US:{code:"1",name:"United States"},ES:{code:"34",name:"Spain"},BR:{code:"55",name:"Brazil"},CO:{code:"57",name:"Colombia"},UK:{code:"44",name:"United Kingdom"},IN:{code:"91",name:"India"},MT:{code:"356",name:"Malta"}};const d=function(){const[e,o]=(0,r.useState)(""),[n,s]=(0,r.useState)(""),[d,u]=(0,r.useState)("{}");return(0,t.jsxs)("div",{className:"max-w-md mx-auto p-6 bg-white shadow-md rounded-lg",children:[(0,t.jsx)("h2",{className:"text-2xl font-semibold mb-4",children:"Enter Phone Number"}),(0,t.jsxs)("select",{value:n,onChange:e=>{s(e.target.value)},className:"w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",children:[(0,t.jsx)("option",{value:"",children:"Select country code"}),Object.entries(l).map((e=>{let[o,n]=e;return(0,t.jsxs)("option",{value:n.code,children:[n.name," (+",n.code,")"]},o)}))]}),(0,t.jsx)("input",{type:"text",value:e,onChange:e=>{o(e.target.value)},placeholder:"Enter phone number",className:"w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"}),(0,t.jsx)("button",{onClick:()=>{if(!n||!e)return void u("Please enter both country code and phone number.");const o=(0,i.lq)("+"+n+e);u(JSON.stringify(o,void 0,2))},className:"w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500",children:"Get Country"}),"\n",d&&(0,t.jsx)(a.A,{language:"json",children:d})]})},u={sidebar_position:1,title:"Phone Number Tools",sidebar_label:"Phone Number Tools"},c="Phone Number Tools",m={id:"tools/phone-number",title:"Phone Number Tools",description:"",source:"@site/docs/tools/phone-number.md",sourceDirName:"tools",slug:"/tools/phone-number",permalink:"/personal-toolkit/docs/tools/phone-number",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tools/phone-number.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Phone Number Tools",sidebar_label:"Phone Number Tools"},sidebar:"tutorialSidebar",previous:{title:"Tools",permalink:"/personal-toolkit/docs/category/tools"}},h={},b=[];function p(e){const o={h1:"h1",header:"header",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.header,{children:(0,t.jsx)(o.h1,{id:"phone-number-tools",children:"Phone Number Tools"})}),"\n","\n",(0,t.jsx)(d,{})]})}function g(e={}){const{wrapper:o}={...(0,s.R)(),...e.components};return o?(0,t.jsx)(o,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}}}]);