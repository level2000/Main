var Augury = Object.create(HTMLElement.prototype);

Augury.createdCallback = function() {
  var statements = this.innerHTML.split("\n")
  statements.map(function(x){return x.trim()});
  this.innerHTML = '<div class="augury-test"><div class="augury-test_statements"></div><div class="augury-test_footer"><button>View</button></div></div>'
  for(var i = 0; i < statements.length; i++){
    this.querySelector(".augury-test_statements").innerHTML += '<div class="augury-test_statement">'+statements[i]+'</div>';
  }
};

document.registerElement('augury-test', {prototype: Augury});
