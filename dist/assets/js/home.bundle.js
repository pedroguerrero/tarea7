(()=>{"use strict";const e=[{title:"Consultas",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/service-1.png"},{title:"Urgencias",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/service-2.png"},{title:"Especialidades",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/service-3.png"}],t=[{name:"Card title",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/patient-1.png"},{name:"Pedro Guerrero",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/patient-3.png"},{name:"Card title",description:"Some quick example text to build on the card title and make up the bulk of the card's content.",image:"img/patient-2.png"}];console.log("home");const i=document.querySelector(".services-row");let n="";for(const{image:t,title:i,description:c}of e)n+=`\n    <div class="col-md-4 mb-5">\n      <div class="card text-center">\n        <img src="${t}" class="card-img-top" alt="" />\n        <div class="card-body">\n          <h3 class="card-title">${i}</h3>\n          <p class="card-text">\n            ${c}\n          </p>\n        </div>\n      </div>\n    </div>`;i.innerHTML=n;const c=document.querySelector(".patients-row");let a="";for(const{image:e,name:i,description:n}of t)a+=`\n    <div class="col-md-4 mb-5">\n      <div class="card text-center">\n        <img src="${e}" class="card-img-top" alt="" />\n        <div class="card-body">\n          <h3 class="card-title">${i}</h3>\n          <p class="card-text">\n            ${n}\n          </p>\n        </div>\n      </div>\n    </div>`;c.innerHTML=a})();