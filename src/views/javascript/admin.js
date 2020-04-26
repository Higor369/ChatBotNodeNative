const admin_password = prompt('Digite a sua senha de administrador');
	entrar('admin', admin_password);

	function entrar(user_name='', password='') {
		const http = new XMLHttpRequest();
		http.open('POST', '/admin/search', false);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let objJSON = JSON.parse(http.responseText);
				if((objJSON.user_name!=user_name)||(objJSON.password!=password)) {
					window.location.href = '/login';
				}else {
					listar();
				}
			}
		}
		http.send(`user_name=${user_name}&password=${password}`);
	}

	function listar() {
		const http = new XMLHttpRequest();
		http.open('POST', '/user/find', true);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let objJSON = JSON.parse(http.responseText);
				if(objJSON.length>0) {
					let strLinhas = '';
					for(let i=0; i<objJSON.length; i++) {
						strLinhas +=
						`
							<tr>
								<td width="400px">${objJSON[i].full_name}</td>
								<td align="center">
									<button class="btn btn-info"
									onclick="selecionar(${objJSON[i].code_user})">
										selecionar
									</button>
								</td>
							</tr>
						`;
					}
					linhas.innerHTML = strLinhas;
				}
			}
		}
		http.send();  			
	}

	function selecionar(_code_user=-1) {
		const http = new XMLHttpRequest();
		http.open('POST', '/user/find', true);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let objJSON = JSON.parse(http.responseText);
				if(objJSON.length>0) {
					const code_user = document.getElementById('code_user');
					const activateF = document.getElementById('activateF');
					const activateT = document.getElementById('activateT');
					const full_name = document.getElementById('full_name');
					const user_name = document.getElementById('user_name');
					const email = document.getElementById('email');
					const password = document.getElementById('password');

					code_user.value = objJSON[0].code_user;
					const activate = Number(objJSON[0].activate);
					if(activate>0) activateT.checked = true;
					else activateF.checked = true;
					full_name.value = objJSON[0].full_name;
					user_name.value = objJSON[0].user_name;
					email.value = objJSON[0].email;
					password.value = objJSON[0].password;
				}
			}
		}
		http.send(`code_user=${_code_user}`);
	}

	function novo() {
		document.getElementById('code_user').value = 0;
		document.getElementById('activateF').checked = false;
		document.getElementById('activateT').checked = true;
		document.getElementById('full_name').value = '';
		document.getElementById('user_name').value = '';
		document.getElementById('email').value = '';
		document.getElementById('password').value = '';
		document.getElementById('full_name').focus();
	}

	function salvar() {
		const code_user = Number(document.getElementById('code_user').value);
		const activateT = document.getElementById('activateT');
		const full_name = document.getElementById('full_name').value.toString().trim();
		const user_name = document.getElementById('user_name').value.toString().trim();
		const email = document.getElementById('email').value.toString().trim();
		const password = document.getElementById('password').value.toString().trim();

		let params = '';
		if(code_user>0) params += `code_user=${code_user}&`;
		if(activateT.checked) params += `activate=1&`; else params += `activate=0&`;
		if(full_name.length>0) params += `full_name=${full_name}&`;
		if(user_name.length>0) params += `user_name=${user_name}&`;
		if(email.length>0) params += `email=${email}&`;
		if(password.length>0) params += `password=${password}&`;
		params += '#';
		params = params.replace('&#', '');

		const http = new XMLHttpRequest();
		if(code_user<=0)
			http.open('POST', '/user/insert', true);
		else
			http.open('POST', '/user/update', true);

		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let objJSON = JSON.parse(http.responseText);
				if(Number(objJSON.result.n)>0) {
					listar();
				}
			}
		}
		http.send(params);	   			
	}

	function deletar() {
		const code_user = Number(document.getElementById('code_user').value);
		const activateT = document.getElementById('activateT');
		const full_name = document.getElementById('full_name').value.toString().trim();
		const user_name = document.getElementById('user_name').value.toString().trim();
		const email = document.getElementById('email').value.toString().trim();
		const password = document.getElementById('password').value.toString().trim();

		let params = '';
		if(code_user>0) params += `code_user=${code_user}&`;
		if(activateT.checked) params += `activate=1&`; else params += `activate=0&`;
		if(full_name.length>0) params += `full_name=${full_name}&`;
		if(user_name.length>0) params += `user_name=${user_name}&`;
		if(email.length>0) params += `email=${email}&`;
		if(password.length>0) params += `password=${password}&`;
		params += '#';
		params = params.replace('&#', '');

		const http = new XMLHttpRequest();
		http.open('POST', '/user/delete', true);

		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		http.onreadystatechange = function() {
			if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				let objJSON = JSON.parse(http.responseText);
				if(Number(objJSON.result.n)>0) {
					listar();
					novo();
				}
			}
		}
		http.send(params);	 	   			
	}