var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#loginForm',
  data: {
	password: '',
	message: '',
  },
  methods: {
	hashPasswd: function() {
	  var hashPass = CryptoJS.SHA256(this.password).toString();
	  this.$http.post('http://localhost:5000/login',
		{password: hashPass},
		{emulateJSON:true},
		{headers : {'Content-Type': 'application/json'}}
	  ).then(response => {
		var resp = response.body.msg
		if(resp == 'success') {
		  this.message = 'Authentification OK.\nYou will be redirect to your dashboard'
		  setTimeout(function () {
			window.location.href = "http://localhost:5000"; //will redirect to your blog page (an ex: blog.html)
		  }, 2000);
		} else {
		  this.message = 'Authentification KO.\nWrong password/username'
		} 	
	  }, response => {
		console.log("error");
	  });
	}
  }
});


