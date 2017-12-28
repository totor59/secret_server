var successbox =  `
  <div v-html class="alert alert-danger alert-dismissible fade show" role="alert">
  <i class="fa fa-exclamation-circle" aria-hidden="true"></i>&nbsp;<b>Authentification OK</b>\nYou will be redirect to your dashboard
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>`



var app = new Vue({
  delimiters: ['[[', ']]'],
  el: '#loginForm',
  data: {
	password: '',
	message: '',
	success: '<h1 v-html>success!!</h1>',
	fail: '<h1 v-html>fail!!</h1>',
  },
  methods: {
	hashPasswd: function() {
	  var hashPass = CryptoJS.SHA256(this.password).toString();
	  this.$http.post($SCRIPT_ROOT+'login',
		{password: hashPass},
		{emulateJSON:true},
		{headers : {'Content-Type': 'application/json'}}
	  ).then(response => {
		var resp = response.body.msg
		if(resp == 'success') {
		  this.message = this.success
		  setTimeout(function () {
			window.location.href = $SCRIPT_ROOT; //will redirect to your blog page (an ex: blog.html)
		  }, 2000);
		} else {
		  this.message = this.fail
		} 	
	  }, response => {
		console.log("error");
	  });
	}
  }
});


